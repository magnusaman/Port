'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()

  const navStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: active ? 500 : 400,
    color: active ? 'var(--foreground)' : 'var(--muted)',
    background: active ? 'var(--card)' : 'transparent',
    border: active ? '1px solid var(--border)' : '1px solid transparent',
    textDecoration: 'none',
    transition: 'all 0.2s',
  })

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: 'color-mix(in srgb, var(--background) 80%, transparent)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '0 32px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          color: 'var(--foreground)',
        }}>
          <img
            src="/Avatar1.png"
            alt=""
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span style={{
            fontWeight: 600,
            fontSize: 16,
            fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
            letterSpacing: '-0.01em',
          }}>
            Aman Anand
          </span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Link href="/" style={navStyle(pathname === '/')}>Home</Link>
            <Link href="/projects" style={navStyle(pathname === '/projects')}>Projects</Link>
          </nav>
          <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 6px' }} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
