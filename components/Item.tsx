'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Item({ item }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  // local copy for instant UI updates
  const [currentItem, setCurrentItem] = useState(item)

  const isClaimed = currentItem.status === 'claimed'

  async function handleClaim() {
    if (!name.trim()) return

    setLoading(true)

    const claimedAt = new Date().toISOString()

    const { error } = await supabase
      .from('items')
      .update({
        status: 'claimed',
        claimed_at: claimedAt,
        claimed_by: name.trim(),
      })
      .eq('id', currentItem.id)

    if (!error) {
      // optimistic update — instant UI change
      setCurrentItem({
        ...currentItem,
        status: 'claimed',
        claimed_at: claimedAt,
        claimed_by: name.trim(),
      })

      setOpen(false)
    }

    setLoading(false)
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="text-left w-full focus:outline-none"
      >
        <h2 className="text-sm font-medium text-neutral-900">
          {currentItem.title}
        </h2>
        <p className="text-xs text-neutral-500">
          {currentItem.year} · size {currentItem.size}
        </p>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="space-y-4 pt-2">
          {/* Story */}
          <p
            className={`text-sm leading-relaxed ${
              isClaimed ? 'text-neutral-600' : 'text-neutral-800'
            }`}
          >
            {currentItem.story}
          </p>

          {/* Image */}
            {currentItem.image_url && (
            <img
                src={currentItem.image_url}
                alt=""
                style={{
                filter: isClaimed ? 'grayscale(30%)' : 'none',
                }}
                className="
                max-w-sm
                border
                border-neutral-200
                bg-white
                "
            />
            )}


          {/* Claim / Status */}
          {!isClaimed ? (
            <div className="space-y-2 pt-2">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="
                  w-full
                  border
                  border-neutral-300
                  px-2
                  py-1
                  text-sm
                  focus:outline-none
                "
              />

              <button
                onClick={handleClaim}
                disabled={loading}
                className="
                  text-sm
                  text-neutral-900
                  underline
                  disabled:opacity-50
                "
              >
                {loading ? 'Claiming…' : 'Claim'}
              </button>
            </div>
          ) : (
            <p className="text-xs text-neutral-500">
              Claimed
              {currentItem.claimed_by && ` by ${currentItem.claimed_by}`}
              {currentItem.claimed_at &&
                ` · ${new Date(currentItem.claimed_at).toLocaleDateString()}`}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
