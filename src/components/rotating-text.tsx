'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const taglines = [
  '23 | AI/ML Engineer',
  'training models at 3am',
  'pip install coffee',
  "git commit -m 'trust me it works'",
  'ECCV 2026',
  'building things that think',
  'LLMs > sleep',
]

const animations = [
  // fadeUp
  {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -14 },
  },
  // typewriter (clipPath reveal)
  {
    initial: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    animate: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
    exit: { opacity: 0, clipPath: 'inset(0 0 0 100%)' },
  },
  // flipY
  {
    initial: { opacity: 0, rotateX: 90 },
    animate: { opacity: 1, rotateX: 0 },
    exit: { opacity: 0, rotateX: -90 },
  },
  // blurIn
  {
    initial: { opacity: 0, filter: 'blur(8px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(8px)' },
  },
  // slideLeft
  {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  // scaleUp
  {
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.3 },
  },
  // glitch (slight jitter)
  {
    initial: { opacity: 0, x: -4, skewX: -8 },
    animate: { opacity: 1, x: 0, skewX: 0 },
    exit: { opacity: 0, x: 4, skewX: 8 },
  },
]

export function RotatingText() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % taglines.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const anim = animations[index % animations.length]

  return (
    <div style={{ position: 'relative', height: 24, overflow: 'hidden', marginTop: 2 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={anim.initial}
          animate={anim.animate}
          exit={anim.exit}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            display: 'block',
            color: 'var(--muted)',
            fontSize: 15,
            whiteSpace: 'nowrap',
          }}
        >
          {taglines[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
