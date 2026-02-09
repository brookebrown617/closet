'use client'

import { useState } from 'react'

export default function Item({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-3">
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
              className="max-w-sm"
            />
          )}

          <p className="text-xs text-neutral-500">
            {item.status === 'available'
              ? 'If you want this, let me know.'
              : `Claimed · ${new Date(item.claimed_at).toDateString()}`
            }
          </p>
        </div>
      )}
    </div>
  )
}
