'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, FileText, ExternalLink, Camera } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/icons'
import { GithubGraph } from '@/components/github-graph'
import { ViewCounter } from '@/components/view-counter'
import { RotatingText } from '@/components/rotating-text'

/* ── Animation ─────────────────────────────────────── */
const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

/* ── Styles ────────────────────────────────────────── */
/* Layout-critical styles live as responsive classes in globals.css:
   .section-card, .section-heading, .hero-card, .hero-row, .projects-grid, etc. */

const pillStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  color: 'var(--foreground)',
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  textDecoration: 'none',
  transition: 'all 0.2s',
}

const tagStyle: React.CSSProperties = {
  display: 'inline-flex',
  padding: '2px 8px',
  fontSize: '0.85rem',
  fontFamily: 'var(--font-geist-mono), monospace',
  background: 'var(--card)',
  color: 'var(--muted)',
  border: '1px solid var(--border)',
  borderRadius: 4,
}

const cardStyle: React.CSSProperties = {
  padding: 16,
  border: '1px solid var(--border)',
  borderRadius: 10,
  background: 'var(--card)',
  transition: 'all 0.2s',
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
}

/* ── Section wrapper ───────────────────────────────── */
function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      className="section-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fade}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  )
}

/* ── Shutter sound ─────────────────────────────────── */
function playShutter() {
  try {
    const ctx = new AudioContext()
    const bufferSize = ctx.sampleRate * 0.08
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3)
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const gain = ctx.createGain()
    gain.gain.value = 0.15
    source.connect(gain)
    gain.connect(ctx.destination)
    source.start()
  } catch {}
}

/* ── Activity status ───────────────────────────────── */
function useActivityStatus() {
  const [status, setStatus] = useState({ active: true, text: 'Coding · Cooking something' })

  useEffect(() => {
    function check() {
      const now = new Date()
      const istHour = (now.getUTCHours() + 5 + (now.getUTCMinutes() + 30 >= 60 ? 1 : 0)) % 24
      const isActive = istHour >= 9 && istHour < 24

      const activeTexts = [
        'Coding · Cooking something',
        'Coding · Breaking something',
        'Coding · Probably debugging',
        'Coding · Refactoring again',
      ]

      if (isActive) {
        setStatus({ active: true, text: activeTexts[Math.floor(Date.now() / 60000) % activeTexts.length] })
      } else {
        setStatus({ active: false, text: 'Probably sleeping' })
      }
    }
    check()
    const interval = setInterval(check, 60000)
    return () => clearInterval(interval)
  }, [])

  return status
}

/* ── Data ──────────────────────────────────────────── */
const avatars = ['/Avatar1.png', '/Avatar2.png', '/Avatar3.png']

const experience = [
  {
    company: 'Independent Research',
    role: 'Indian-Script Scene Text Spotting',
    type: 'Self-directed',
    period: '09.2026 – Present',
    desc: 'Designed AksharaSTR, a recogniser that reads one akshara (visual syllable) per step instead of Unicode codepoints. One 23M-parameter model reads 11 Indic scripts and English, and showed that a published 15-point Hindi–Marathi gap on BSTD came from data collection, not the script. It beats an identical codepoint-based model on all 11 scripts and, zero-shot, outperforms the IndicSTR12 in-domain models on all 11. It raises the best verified IIIT-ILST Hindi result from 56.8 to 63.2. With my own detector, the full system reads 50.9% of BSTD words end to end, against 36% for the published pipeline and 41% for Google OCR.',
    tags: ['PyTorch', 'Scene Text Recognition', 'Indic Scripts'],
  },
  {
    company: 'Raeth.ai',
    role: 'AI Engineer',
    type: 'Full-time',
    period: '03.2026 – 08.2026',
    desc: 'Built Trader Arena, a live benchmark running 8 frontier LLMs autonomously on simulated US equity, crypto and Indian options portfolios, and IPL Arena, a real-time forecasting benchmark scoring LLM probability predictions against live reference odds. Extended it to Quant Arena and Prediction Arena, developed Auction Arena (a multi-agent live-bidding benchmark), and maintained four live evaluation platforms.',
    tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'Supabase', 'LiteLLM', 'Docker', 'Azure'],
  },
  {
    company: 'RGIPT & University of New Brunswick',
    role: 'Undergraduate Researcher, Geospatial ML',
    type: 'Research',
    period: '11.2025 – 03.2026',
    desc: 'With Dr. Susham Biswas and Ankit Sharma. Scored 15 countries on wildfire early-warning maturity from satellite coverage and predictive modelling (5.0/5 for high-income vs. 1.0–1.5/5 for low-income countries). Built MaxEnt and Random Forest models on Sentinel-1/2 and Landsat for wildlife habitat suitability in New Brunswick, and used AlphaEarth embeddings with Sentinel-2, Landsat thermal and LiDAR for forest degradation and wetland mapping. Outputs: one ISPRS Archives paper, one ISPRS Congress 2026 abstract and two preprints.',
    tags: ['Sentinel', 'Landsat', 'MaxEnt', 'Random Forest', 'AlphaEarth'],
  },
  {
    company: 'IIT (ISM) Dhanbad & University of Salford',
    role: 'Research Intern',
    type: 'Research',
    period: '10.2025 – Present',
    desc: 'With Prof. Partha Pratim Roy and Prof. Palaiahnakote Shivakumara. MEVL-STP: six frozen vision encoders (CLIP, DINOv2, SigLIP, EVA-CLIP, SAM, ConvNeXt) fused through a trainable hierarchical feature pyramid, with a LoRA-tuned Qwen3-VL-8B for recognition. On CTW1500 it reaches 91.99% detection F-measure, 94.23% recognition accuracy and 85.86% end-to-end H-mean without synthetic pretraining (first-author, arXiv:2609.28857). Also extended Brain-IT (ICLR 2026) to five LAION-fMRI participants, fusing several people’s scans at test time in one forward pass without retraining, and removed an evaluation bias in brain-guided selection with cross-fitting.',
    tags: ['PyTorch', 'CLIP', 'DINOv2', 'Qwen3-VL', 'LoRA', 'fMRI'],
  },
]

const publications = [
  { title: 'MEVL-STP: Multi-Encoder and Vision Language Model for Arbitrarily Shaped Scene Text Spotting', venue: 'arXiv:2609.28857 · CVPR 2027', status: 'Preprint', link: 'https://arxiv.org/abs/2609.28857', desc: 'Six frozen vision encoders fused through a trainable feature pyramid to find curved text, then a LoRA-tuned Qwen3-VL-8B to read it. New state of the art on CTW1500 without synthetic pretraining. First author.' },
  { title: 'Wildfire Early Warning Systems: A Multisensor and Predictive Modelling Comparison Across Countries with a Canadian Perspective', venue: 'ISPRS Archives XLIX-M-1-2026', status: 'Published', desc: 'Scored 15 countries on wildfire early-warning maturity from satellite coverage and predictive modelling. Peer-reviewed.' },
  { title: 'Habitat Suitability Mapping Using Satellite Imagery and Continuous Landscape Inventory (CLI): A Case Study for New Brunswick, Canada', venue: 'ISPRS Congress 2026 / 47th CSRS, Toronto', status: 'Presented', desc: 'Conference abstract. Combined Canada’s forest inventory with Sentinel-1/2 and Landsat, training MaxEnt and Random Forest models to predict wildlife habitat.' },
  { title: 'AksharaSTR: Akshara-Level Scene Text Spotting for Indic Scripts (working title)', venue: 'In preparation for CVPR 2027', status: 'In prep.', desc: 'Akshara-level recogniser covering 11 Indic scripts and English in one 23M-parameter model.' },
  { title: 'Multi-Subject Fusion for fMRI Image Reconstruction (working title)', venue: 'In preparation for CVPR 2027', status: 'In prep.', desc: 'Test-time fusion of several participants’ fMRI scans for image reconstruction, without retraining.' },
  { title: 'Label-Free Detection of Hidden Forest Degradation Using Sentinel-2, Landsat Thermal Stress and AlphaEarth Embeddings', venue: 'Preprints.org 2026 · not peer reviewed', status: 'Preprint', desc: 'Co-author, with Sharma, Kashyap, Mishra, Zhang and Biswas.' },
  { title: 'Wetland Mapping Under Boundary Uncertainty with AlphaEarth Embeddings, LiDAR and Sentinel', venue: 'Preprints.org 2026 · not peer reviewed', status: 'Preprint', desc: 'Co-author, with Sharma, Kharbanda, Mishra, Zhang and Biswas.' },
]

const projects = [
  { title: 'Trader Arena', desc: '8 frontier LLMs trading US equities, crypto, and Indian options autonomously on $100K paper accounts.', tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'LiteLLM'], link: 'https://trader.raeth.ai' },
  { title: 'IPL Arena', desc: 'Opus 4.7 and GPT-5.5 wager on IPL cricket against the Stake odds feed in real time.', tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'Docker'], link: 'https://ipl.raeth.ai' },
  { title: 'Quant Arena', desc: 'Quant-strategy LLM arena I develop and maintain end-to-end.', tags: ['FastAPI', 'Next.js', 'PostgreSQL', 'Docker'], link: 'https://quantarena.raeth.ai' },
  { title: 'Prediction Arena', desc: 'Forecasting arena where LLM agents make and settle real-world predictions.', tags: ['FastAPI', 'Next.js', 'Supabase', 'Docker'], link: 'https://prediction.raeth.ai' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/magnusaman', icon: <GithubIcon size={15} /> },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/aman7anand', icon: <LinkedinIcon size={15} /> },
  { label: 'Mail', href: 'mailto:amananand7080@gmail.com', icon: <Mail size={15} /> },
  { label: 'Resume', href: 'https://drive.google.com/file/d/16hfHLyOAzWeFT3Gw1zOR46I03bYQ_CGx/view?usp=drive_link', icon: <FileText size={15} /> },
]

/* ── Page ──────────────────────────────────────────── */
export default function Home() {
  const [avatarIdx, setAvatarIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const status = useActivityStatus()

  const cycleAvatar = (e: React.MouseEvent) => {
    e.stopPropagation()
    playShutter()
    setAvatarIdx(prev => (prev + 1) % avatars.length)
  }

  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <motion.div
        className="hero-card"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="hero-row">
          {/* Avatar with camera button + lightbox */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <motion.div
              layoutId="avatar-container"
              onClick={() => setLightbox(true)}
              style={{ cursor: 'pointer', borderRadius: 18, overflow: 'hidden', width: 100, height: 100 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={avatarIdx}
                  src={avatars[avatarIdx]}
                  alt="Aman Anand"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 100, height: 100, borderRadius: 18,
                    objectFit: 'cover', display: 'block',
                  }}
                />
              </AnimatePresence>
            </motion.div>
            <button
              onClick={cycleAvatar}
              style={{
                position: 'absolute', bottom: -4, right: -4,
                width: 26, height: 26, borderRadius: '50%',
                background: 'var(--card)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--muted)',
                transition: 'all 0.2s',
                zIndex: 2,
              }}
              aria-label="Change avatar"
            >
              <Camera size={12} />
            </button>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {lightbox && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setLightbox(false)}
                style={{
                  position: 'fixed', inset: 0, zIndex: 9000,
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'zoom-out',
                }}
              >
                {/* Close button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.15 }}
                  onClick={() => setLightbox(false)}
                  style={{
                    position: 'absolute', top: 24, right: 24,
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: '#fff', fontSize: 20,
                  }}
                >
                  &times;
                </motion.button>

                {/* Expanded avatar */}
                <motion.div
                  layoutId="avatar-container"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    borderRadius: 24, overflow: 'hidden',
                    boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
                    cursor: 'default',
                    position: 'relative',
                  }}
                >
                  <motion.img
                    src={avatars[avatarIdx]}
                    alt="Aman Anand"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    style={{
                      width: 320, height: 320,
                      objectFit: 'cover', display: 'block',
                    }}
                  />
                  {/* Camera button inside lightbox */}
                  <button
                    onClick={cycleAvatar}
                    style={{
                      position: 'absolute', bottom: 12, right: 12,
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: '#fff',
                    }}
                  >
                    <Camera size={16} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="hero-text" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 className="hero-name">
                Aman Anand
              </h1>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#3b82f6"/>
                <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <RotatingText />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: status.active ? '#22c55e' : '#eab308',
                animation: status.active ? 'pulse-dot 2s ease-in-out infinite' : 'none',
              }} />
              <span style={{ fontSize: 15, color: 'var(--muted)' }}>{status.text}</span>
            </div>
          </div>

          <div className="hero-views">
            <ViewCounter />
          </div>
        </div>
      </motion.div>

      {/* ── About ────────────────────────────────── */}
      <Section delay={0.05}>
        <h2 className="section-heading">About</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: 20, color: 'var(--muted)', fontSize: 16, lineHeight: 1.8 }}>
          <li style={{ marginBottom: 12 }}>
            I&apos;m a 23-year-old engineer from Lucknow who got hooked on making machines see.
            Finished a B.Tech in IT at <span style={{ color: 'var(--foreground)' }}>RGIPT</span>{' '}
            and haven&apos;t stopped building since.
          </li>
          <li style={{ marginBottom: 12 }}>
            My research is on computer vision and vision-language models: combining pretrained
            models and noisy data sources reliably, and evaluating them honestly. Applications so
            far are scene text in low-resource scripts, brain decoding (fMRI), and remote sensing.
          </li>
          <li style={{ marginBottom: 12 }}>
            I work with{' '}
            <span style={{ color: 'var(--foreground)' }}>Prof. Partha Pratim Roy</span> (IIT (ISM) Dhanbad)
            and <span style={{ color: 'var(--foreground)' }}>Prof. Palaiahnakote Shivakumara</span>{' '}
            (University of Salford). MEVL-STP is on arXiv and targeting CVPR 2027, and I&apos;m
            building AksharaSTR for Indic-script text spotting. I also have an ISPRS Archives paper
            and have reviewed for <span style={{ color: 'var(--foreground)' }}>Pattern Recognition</span>.
          </li>
          <li style={{ marginBottom: 12 }}>
            Before this I was an AI Engineer at{' '}
            <span style={{ color: 'var(--foreground)' }}>Raeth.ai</span> (Mar–Aug 2026), where I built
            Trader Arena and IPL Arena and maintained four live LLM evaluation platforms.
          </li>
          <li>
            I like the messy middle ground between ML research and shipping products.
            If it involves making models do something useful in the real world, I&apos;m in.
          </li>
        </ul>
      </Section>

      {/* ── Connect ──────────────────────────────── */}
      <Section delay={0.1}>
        <h2 className="section-heading">Connect</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={pillStyle}>
              {s.icon}
              {s.label}
            </a>
          ))}
        </div>
      </Section>

      {/* ── GitHub Activity ──────────────────────── */}
      <Section delay={0.15}>
        <div className="section-head-row">
          <h2 className="section-heading" style={{ marginBottom: 0 }}>GitHub Activity</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, color: 'var(--muted)' }}>
            <GithubIcon size={14} />
            <span style={{ fontFamily: 'var(--font-geist-mono)' }}>Coding right now</span>
          </div>
        </div>
        <GithubGraph />
      </Section>

      {/* ── Experience ───────────────────────────── */}
      <Section delay={0.2}>
        <h2 className="section-heading">Experience</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {experience.map((exp, i) => (
            <div key={i} style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid var(--muted)', background: 'var(--border)', flexShrink: 0 }} />
                {i < experience.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 4 }} />}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, fontFamily: 'var(--font-geist-sans)' }}>{exp.company}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14 }}>{exp.role}</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>·</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>{exp.type}</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>·</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}>{exp.period}</span>
                </div>
                <p style={{ fontSize: 15, color: 'var(--muted)', marginTop: 8, lineHeight: 1.7 }}>{exp.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                  {exp.tags.map(t => <span key={t} style={tagStyle}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Publications ─────────────────────────── */}
      <Section delay={0.25}>
        <h2 className="section-heading">Publications</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {publications.map((pub, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, margin: 0, fontFamily: 'var(--font-geist-sans)', lineHeight: 1.4 }}>
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                        {pub.title} <ExternalLink size={11} style={{ opacity: 0.4, display: 'inline', verticalAlign: 'middle' }} />
                      </a>
                    ) : pub.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--font-geist-mono)' }}>{pub.venue}</p>
                  <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8, lineHeight: 1.6 }}>{pub.desc}</p>
                </div>
                <span style={{
                  ...tagStyle,
                  fontSize: 13,
                  flexShrink: 0,
                  ...(['Accepted', 'Published', 'Presented'].includes(pub.status) ? { background: 'rgba(34,197,94,0.1)', color: '#22c55e', borderColor: 'rgba(34,197,94,0.2)' } : {}),
                }}>
                  {pub.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Projects ─────────────────────────────── */}
      <Section delay={0.3}>
        <div className="section-head-row">
          <h2 className="section-heading" style={{ marginBottom: 0 }}>Projects</h2>
          <a href="/projects" style={{ fontSize: 14, color: 'var(--muted)', textDecoration: 'none', fontFamily: 'var(--font-geist-mono)' }}>View all →</a>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <a key={i} href={p.link || '#'} target={p.link ? '_blank' : undefined} rel={p.link ? 'noopener noreferrer' : undefined} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, fontFamily: 'var(--font-geist-sans)' }}>{p.title}</h3>
                {p.link && <ExternalLink size={12} style={{ color: 'var(--muted)', opacity: 0.3, flexShrink: 0, marginTop: 1 }} />}
              </div>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 6, lineHeight: 1.6 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
                {p.tags.map(t => <span key={t} style={{ ...tagStyle, fontSize: 11 }}>{t}</span>)}
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* ── Education ────────────────────────────── */}
      <Section delay={0.35}>
        <h2 className="section-heading">Education</h2>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ paddingTop: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid var(--muted)', background: 'var(--border)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, margin: 0, fontFamily: 'var(--font-geist-sans)' }}>
              Rajiv Gandhi Institute of Petroleum Technology
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 15, color: 'var(--muted)' }}>B.Tech in Information Technology</span>
              <span style={{ fontSize: 14, color: 'var(--muted)' }}>·</span>
              <span style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}>CPI: 7.69/10</span>
              <span style={{ fontSize: 14, color: 'var(--muted)' }}>·</span>
              <span style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'var(--font-geist-mono)' }}>11.2022 – 01.2026</span>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Reviewing & Conferences ──────────────── */}
      <Section delay={0.38}>
        <h2 className="section-heading">Reviewing &amp; Conferences</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: 20, color: 'var(--muted)', fontSize: 16, lineHeight: 1.8 }}>
          <li>Reviewer for <span style={{ color: 'var(--foreground)' }}>Pattern Recognition</span> (Elsevier): 2 manuscripts, invited directly by the journal (2026)</li>
          <li>Attended the <span style={{ color: 'var(--foreground)' }}>European Conference on Computer Vision (ECCV 2026)</span>, Malmö, Sweden (Sep 2026)</li>
        </ul>
      </Section>

      {/* ── Footer ───────────────────────────────── */}
      <Section delay={0.4}>
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <p style={{ fontSize: 15, color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'var(--font-geist-sans)' }}>
            &ldquo;Building systems where models think, trade, and read the world.&rdquo;
          </p>
          <p style={{ fontSize: 13, color: 'var(--muted)', opacity: 0.4, marginTop: 16, fontFamily: 'var(--font-geist-mono)' }}>
            © 2026 Aman Anand · Built with Next.js and coffee
          </p>
        </div>
      </Section>
    </div>
  )
}
