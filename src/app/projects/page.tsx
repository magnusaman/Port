import { AnimatedSection } from '@/components/animated-section'
import { ExternalLink } from 'lucide-react'

const allProjects = [
  {
    title: 'Trader Arena',
    description: 'Public benchmark running 8 frontier LLMs autonomously across US equities, crypto, and Indian options on $100K paper accounts each.',
    tech: ['FastAPI', 'Next.js', 'PostgreSQL', 'LiteLLM'],
    link: 'https://trader.raeth.ai',
    date: '2026',
  },
  {
    title: 'IPL Arena',
    description: 'Opus 4.7 and GPT-5.5 wager on IPL cricket against the Stake odds feed in real time, with live settlement and bankroll tracking.',
    tech: ['FastAPI', 'Next.js', 'PostgreSQL', 'Docker'],
    link: 'https://ipl.raeth.ai',
    date: '2026',
  },
  {
    title: 'Quant Arena',
    description: 'Quant-strategy LLM arena I develop and maintain end-to-end, running alongside the trading and forecasting arenas.',
    tech: ['FastAPI', 'Next.js', 'PostgreSQL', 'Docker'],
    link: 'https://quantarena.raeth.ai',
    date: '2026',
  },
  {
    title: 'Prediction Arena',
    description: 'Forecasting arena where LLM agents make and settle real-world predictions, sharing schedulers and stats infra with Trader and IPL.',
    tech: ['FastAPI', 'Next.js', 'Supabase', 'Docker'],
    link: 'https://prediction.raeth.ai',
    date: '2026',
  },
  {
    title: 'Auction Arena',
    description: 'Live LLM bidding platform where agents compete with strategic bidding, budget management, and real-time state updates.',
    tech: ['TypeScript', 'Next.js', 'Supabase', 'Docker'],
    link: 'https://auction.raeth.ai',
    date: '2026',
  },
  {
    title: 'MEVL-STP',
    description: 'Multi-encoder scene text spotting pipeline fusing 6 frozen vision encoders with a LoRA-tuned Qwen3-VL recognizer. Beats prior SOTA on CTW1500 without synthetic data.',
    tech: ['PyTorch', 'CLIP', 'DINOv2', 'Qwen3-VL', 'LoRA'],
    link: 'https://github.com/doubleblind-afk/MEVL-STP',
    date: '2026',
  },
  {
    title: 'Wildfire EWS',
    description: 'Comparative evaluation of wildfire early warning systems across 15 countries using multisensor satellite data and predictive modelling. Accepted at ISPRS 2026.',
    tech: ['Remote Sensing', 'MODIS', 'VIIRS', 'Sentinel'],
    date: '2025',
  },
  {
    title: 'Skin Cancer Classification',
    description: 'InceptionResNetV2 classifier on HAM10000 with metadata fusion and class-balanced augmentation for multi-class skin lesion sensitivity.',
    tech: ['PyTorch', 'InceptionResNetV2'],
    link: 'https://github.com/magnusaman/Skin-Cancer-Classification',
    date: '2024',
  },
  {
    title: 'DmitliChess Extension',
    description: 'Chrome extension adding AI commentary with three voice personas, context-aware move detection, and hybrid caching reducing API calls by 90-95%.',
    tech: ['JavaScript', 'Chrome Extensions'],
    link: 'https://github.com/magnusaman/dmitli-Chess.com',
    date: '2023',
  },
]

export default function ProjectsPage() {
  return (
    <div>
      <AnimatedSection>
        <h1 className="text-2xl font-bold tracking-tight mb-1">Projects</h1>
        <p className="text-sm text-[var(--muted)] mb-8">Things I&apos;ve built and researched.</p>
      </AnimatedSection>

      <div className="space-y-4">
        {allProjects.map((project, i) => (
          <AnimatedSection key={i} delay={i * 0.05}>
            <a
              href={project.link || '#'}
              target={project.link ? '_blank' : undefined}
              rel={project.link ? 'noopener noreferrer' : undefined}
              className="group block p-5 border border-[var(--border)] rounded-lg hover:border-[var(--muted)] hover:bg-[var(--card)] transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-medium">{project.title}</h2>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono text-[var(--muted)]">{project.date}</span>
                  {project.link && (
                    <ExternalLink size={13} className="text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
              <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 bg-[var(--border)]/50 rounded text-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  )
}
