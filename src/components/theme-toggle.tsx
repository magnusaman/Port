'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useRef, useCallback } from 'react'

function playSound(freq: number) {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = 'sine'
    gain.gain.value = 0.06
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    osc.stop(ctx.currentTime + 0.12)
  } catch {}
}

/**
 * Pac-Man that ERASES a canvas filled with the OLD background color,
 * progressively revealing the NEW theme underneath.
 */
function runPacmanReveal(
  canvas: HTMLCanvasElement,
  oldBg: string,
  onDone: () => void,
) {
  const ctx = canvas.getContext('2d')!
  const W = (canvas.width = window.innerWidth)
  const H = (canvas.height = window.innerHeight)

  // Fill canvas with old background (hides the new theme)
  ctx.fillStyle = oldBg
  ctx.fillRect(0, 0, W, H)

  const rowH = 36
  const speed = W / 16
  const totalRows = Math.ceil(H / rowH) + 1
  let x = -30
  let row = 0
  let dir = 1
  let mouth = 0
  let mouthDir = 1

  // Use 'destination-out' to erase the old-color canvas
  let prevX = x
  let prevRow = row

  function eraseTrail() {
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0,0,0,1)'
    const y = row * rowH
    if (dir === 1) {
      ctx.fillRect(Math.max(0, x - speed - 20), y, speed + 40, rowH)
    } else {
      ctx.fillRect(x - 20, y, speed + 40, rowH)
    }
    ctx.restore()
  }

  function drawPacman() {
    // Erase previous pac-man position first (remove yellow residue)
    ctx.save()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0,0,0,1)'
    ctx.beginPath()
    ctx.arc(prevX, prevRow * rowH + rowH / 2, 20, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()

    const py = row * rowH + rowH / 2

    // Draw pac-man fresh
    ctx.save()
    ctx.globalCompositeOperation = 'source-over'
    ctx.translate(x, py)
    if (dir < 0) ctx.scale(-1, 1)

    const mouthAngle = mouth * 0.4
    ctx.beginPath()
    ctx.arc(0, 0, 16, mouthAngle, Math.PI * 2 - mouthAngle)
    ctx.lineTo(0, 0)
    ctx.closePath()
    ctx.fillStyle = '#facc15'
    ctx.fill()

    // Eye
    ctx.beginPath()
    ctx.arc(3, -6, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = '#000'
    ctx.fill()

    ctx.restore()

    prevX = x
    prevRow = row
  }

  function animate() {
    // Erase behind pac-man (reveals new theme)
    eraseTrail()

    // Animate mouth
    mouth += mouthDir * 0.18
    if (mouth > 1) { mouth = 1; mouthDir = -1 }
    if (mouth < 0) { mouth = 0; mouthDir = 1 }

    // Draw pac-man on canvas
    drawPacman()

    // Move
    x += speed * dir

    if (dir === 1 && x > W + 30) {
      // Erase the rest of this row
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,1)'
      ctx.fillRect(0, row * rowH, W, rowH)
      ctx.restore()
      row++
      dir = -1
      x = W + 30
    } else if (dir === -1 && x < -30) {
      ctx.save()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,1)'
      ctx.fillRect(0, row * rowH, W, rowH)
      ctx.restore()
      row++
      dir = 1
      x = -30
    }

    if (row < totalRows) {
      requestAnimationFrame(animate)
    } else {
      // Fade out any remaining canvas
      let opacity = 1
      function fadeOut() {
        opacity -= 0.1
        canvas.style.opacity = String(Math.max(0, opacity))
        if (opacity > 0) requestAnimationFrame(fadeOut)
        else onDone()
      }
      fadeOut()
    }
  }

  animate()
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [animating, setAnimating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => setMounted(true), [])

  const toggle = useCallback(() => {
    if (animating) return

    playSound(resolvedTheme === 'dark' ? 800 : 600)

    const canvas = canvasRef.current
    if (!canvas) return

    // Capture OLD background before switching
    const oldBg = resolvedTheme === 'dark' ? '#0a0a0b' : '#f8f8f8'
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

    setAnimating(true)
    canvas.style.opacity = '1'
    canvas.style.display = 'block'

    // Switch theme IMMEDIATELY — canvas hides the change
    setTheme(newTheme)

    // Pac-Man erases the canvas to reveal the new theme
    runPacmanReveal(canvas, oldBg, () => {
      canvas.style.display = 'none'
      setAnimating(false)
    })
  }, [resolvedTheme, setTheme, animating])

  if (!mounted) return <div style={{ width: 32, height: 32 }} />

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', display: 'none' }}
      />
      <button
        onClick={toggle}
        style={{
          width: 32, height: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: 8,
          border: '1px solid var(--border)',
          background: 'var(--card)',
          color: 'var(--foreground)',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        aria-label="Toggle theme"
      >
        {resolvedTheme === 'dark' ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>
    </>
  )
}
