'use client'

import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'

const NAMESPACE = 'aman-anand-portfolio'
const KEY = 'page-views'

export function ViewCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    // Use CountAPI to track and display views
    fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
      .then(res => res.json())
      .then(data => setCount(data.value))
      .catch(() => {
        // Fallback: use localStorage-based count if API is down
        const stored = parseInt(localStorage.getItem('view-count') || '0', 10) + 1
        localStorage.setItem('view-count', String(stored))
        setCount(stored)
      })
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--muted)', fontSize: 13, flexShrink: 0, paddingTop: 4 }}>
      <Eye size={14} />
      <span style={{ fontFamily: 'var(--font-geist-mono)' }}>
        {count !== null ? count.toLocaleString() : '—'}
      </span>
    </div>
  )
}
