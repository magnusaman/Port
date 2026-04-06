'use client'

import { useState, useEffect } from 'react'

const LEVELS = [
  { label: 'S', scale: 0.85 },
  { label: 'M', scale: 0.95 },
  { label: 'L', scale: 1.0 },
  { label: 'XL', scale: 1.08 },
  { label: 'XXL', scale: 1.18 },
  { label: 'XXXL', scale: 1.3 },
]

export function ZoomSlider() {
  const [level, setLevel] = useState(2) // Default to L (1.0x)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const container = document.getElementById('main-content')
    if (container) {
      container.style.transform = `scale(${LEVELS[level].scale})`
      container.style.transformOrigin = 'top center'
    }
  }, [level])

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
      {open && (
        <div style={{
          position: 'absolute', bottom: 44, right: 0,
          background: 'var(--card)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '12px 16px',
          display: 'flex', flexDirection: 'column', gap: 8,
          minWidth: 180,
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
        }}>
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}>
            Zoom Level
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {LEVELS.map((l, i) => (
              <button
                key={i}
                onClick={() => setLevel(i)}
                style={{
                  flex: 1,
                  padding: '6px 0',
                  fontSize: 11,
                  fontFamily: 'var(--font-geist-mono)',
                  borderRadius: 6,
                  border: i === level ? '1px solid var(--foreground)' : '1px solid var(--border)',
                  background: i === level ? 'var(--foreground)' : 'var(--card)',
                  color: i === level ? 'var(--background)' : 'var(--muted)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--card)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: 'var(--muted)',
          transition: 'all 0.2s',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
        aria-label="Zoom level"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>
        </svg>
      </button>
    </div>
  )
}
