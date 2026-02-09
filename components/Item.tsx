'use client'

import { useState } from 'react'

export default function Item({ item }) {
  const [open, setOpen] = useState(false)

  const isClaimed = item.status === 'claimed'

  return (
    <div
      className={`space-y-3 ${
        isClaimed ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="text-left w-full"
      >
        <h2 className="text-sm font-medium">
          {item.title}
        </h2>

        <p className="text-xs text-neutral-500">
          {item.year} · size {item.size}
        </p>
      </button>

      {open && (
        <div className="space-y-4 pt-2">
          <p className="text-sm leading-relaxed">
            {item.story}
          </p>

          {item.image_url && (
            <img
              src={item.image_url}
              alt=""
              className="
                max-w-sm
                border
                border-neutral-200
                bg-white
              "
            />
          )}

          <p className="text-xs text-neutral-500">
            {isClaimed
              ? `Claimed${item.claimed_at ? ` · ${new Date(item.claimed_at).toLocaleDateString()}` : ''}`
              : 'If you want this, let me know.'}
          </p>
        </div>
      )}
    </div>
  )
}

