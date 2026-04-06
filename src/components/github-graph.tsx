'use client'

import { useMemo } from 'react'

// Real GitHub contribution data for magnusaman (last 52 weeks as of 2026-04-06)
// Each sub-array is a week [Sun, Mon, Tue, Wed, Thu, Fri, Sat], value = level 0-4
const CONTRIBUTION_DATA = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,1,1],[0,0,0,0,0,0,0],[0,0,0,0,0,0,1],[0,0,0,0,0,0,0],[0,0,1,1,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,3,0,0,2],[3,0,0,0,0,0,0],[0,0,0,0,0,2,0],[0,0,3,0,0,0,1],[0,0,0,0,0,0,0],[0,0,1,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,1,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,1,4,2,3],[0,0,0,0,0,0,0],[2,0,0,0,0,0,0],[1,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,4,1,2,3,0],[0,3,1,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,3,0,0,0,0,0]]

const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

const COLORS: Record<number, string> = {
  0: 'var(--border)',
  1: '#0e4429',
  2: '#006d32',
  3: '#26a641',
  4: '#39d353',
}

const COLORS_LIGHT: Record<number, string> = {
  0: '#ebedf0',
  1: '#9be9a8',
  2: '#40c463',
  3: '#30a14e',
  4: '#216e39',
}

export function GithubGraph() {
  const total = useMemo(() => {
    return CONTRIBUTION_DATA.flat().filter(v => v > 0).length
  }, [])

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, minWidth: 580 }}>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-geist-mono), monospace', color: 'var(--muted)' }}>
          102 contributions in the last year
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 10, color: 'var(--muted)' }}>
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} style={{
              width: 9, height: 9, borderRadius: 2,
              background: COLORS[level],
            }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 2, minWidth: 580 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingRight: 4 }}>
          {DAYS.map((day, i) => (
            <div key={i} style={{ height: 9, fontSize: 9, lineHeight: '9px', color: 'var(--muted)', fontFamily: 'var(--font-geist-mono), monospace', width: 24 }}>
              {day}
            </div>
          ))}
        </div>
        {CONTRIBUTION_DATA.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {week.map((level, di) => (
              <div
                key={di}
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 2,
                  background: COLORS[level] || COLORS[0],
                }}
                title={`Level ${level}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', marginTop: 4, paddingLeft: 28, minWidth: 580 }}>
        {MONTHS.map((m) => (
          <span
            key={m}
            style={{
              fontSize: 9,
              color: 'var(--muted)',
              fontFamily: 'var(--font-geist-mono), monospace',
              flex: 1,
            }}
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  )
}
