'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Item({ item }) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const isClaimed = item.status === 'claimed'

  async function handleClaim() {
    if (!name.trim()) return

    setLoading(true)

    await supabase
      .from('items')
      .update({
        status: 'claimed',
        claimed_at: new Date().toISOString(),
        claimed_by: name.trim(),
      })
      .eq('id', item.id)

    setLoading(false)
  }

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(!open)}
        className="text-left w-full focus:outline-none"
      >
        <h2 className="text-sm font-medium text-neutral-900">
          {item.title}
        </h2>
        <p className="text-xs text-neutral-500">
          {item.year} · size {item.size}
        </p>
      </button>

      {open && (
        <div className="space-y-4 pt-2">
          <p className="text-sm text-neutral-800 leading-relaxed">
            {item.story}
          </p>

          {item.image_url && (
            <img
              src={item.image_url}
              alt=""
              className="max-w-sm border border-neutral-200 bg-white"
            />
          )}

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
              Transferred
              {item.claimed_by && ` to ${item.claimed_by}`}
              {item.claimed_at &&
                ` · ${new Date(item.claimed_at).toLocaleDateString()}`}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
