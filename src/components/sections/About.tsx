import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  TestTube,
  Bot,
  Zap,
  Shield,
  GitBranch,
  Code2,
  Globe,
  Gauge,
  Monitor,
  RefreshCcw,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { ABOUT_DESCRIPTION, STATS, SECTION_HEADERS } from '../../data/constants'

// ============================================
// QA IMPACT BACKGROUND - Unique to About Section
// Shows the IMPACT of QA work, not just dashboards
// ============================================

// Animated counter showing bugs caught over time
const BugsCaughtCounter = () => (
  <motion.div 
    className="absolute top-24 left-4 xl:left-8 opacity-40"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ delay: 0.5 }}
  >
    <div className="text-[9px] text-slate-500 mb-1">Bugs Caught</div>
    <div className="flex items-end gap-1">
      <motion.span 
        className="text-2xl font-bold text-rose-500/60"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        847
      </motion.span>
    </div>
    <div className="flex items-center gap-1 mt-1">
      <span className="text-emerald-500/60 text-[10px]">↓ 32%</span>
      <span className="text-[8px] text-slate-400/60">escape rate</span>
    </div>
  </motion.div>
)

// Time saved visualization
const TimeSavedVisual = () => (
  <motion.div 
    className="absolute top-24 right-4 xl:right-8 opacity-40"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ delay: 0.7 }}
  >
    <div className="text-[9px] text-slate-500 mb-1">Hours Saved</div>
    <div className="flex items-center gap-2">
      <motion.span 
        className="text-xl"
        animate={{ rotate: [0, 180, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        ⏱️
      </motion.span>
      <div>
        <div className="text-xl font-bold text-blue-500/60">1,200+</div>
        <div className="text-[8px] text-slate-400/60">/quarter</div>
      </div>
    </div>
  </motion.div>
)

// Release confidence meter - simple gauge, no card
const ReleaseConfidenceMeter = () => (
  <motion.div 
    className="absolute top-52 xl:top-48 right-4 xl:right-12 opacity-35"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.35 }}
    transition={{ delay: 0.9 }}
  >
    <div className="text-center">
      <div className="text-[9px] text-slate-500/80 mb-1">Confidence</div>
      <div className="relative w-16 h-8 overflow-hidden">
        <div className="absolute inset-0 border-t-2 border-l-2 border-r-2 border-emerald-400/30 rounded-t-full" />
        <motion.div 
          className="absolute bottom-0 left-1/2 w-0.5 h-6 bg-emerald-500/50 origin-bottom rounded-full"
          style={{ transformOrigin: 'bottom center' }}
          animate={{ rotate: [-50, 50, 50] }}
          transition={{ duration: 2, delay: 1 }}
        />
      </div>
      <div className="text-sm font-bold text-emerald-500/50">HIGH</div>
    </div>
  </motion.div>
)

// Deployment frequency - just dots, no card
const DeploymentFrequency = () => (
  <motion.div 
    className="absolute bottom-28 xl:bottom-32 left-4 xl:left-8 opacity-40"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ delay: 1.1 }}
  >
    <div className="text-[9px] text-slate-500/80 mb-2">Deploys</div>
    <div className="grid grid-cols-7 gap-0.5">
      {[3,1,4,2,5,3,4,2,1,5,4,3,2,5,4,3,5,2,4,3,5].map((intensity, i) => (
        <motion.div 
          key={i}
          className="w-2 h-2 rounded-sm"
          style={{ 
            backgroundColor: `rgba(16, 185, 129, ${intensity * 0.15})`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 + i * 0.03 }}
        />
      ))}
    </div>
    <div className="text-[8px] text-slate-400/60 mt-1">52 this month</div>
  </motion.div>
)

// Quality trend - sparkline style, no card
const QualitySparkline = () => (
  <motion.div 
    className="absolute bottom-20 xl:bottom-24 right-4 xl:right-8 opacity-40"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ delay: 1.3 }}
  >
    <div className="text-[9px] text-slate-500/80 mb-1">Quality Trend</div>
    <svg viewBox="0 0 80 30" className="w-20 h-8">
      <motion.path
        d="M0 25 C10 23, 15 20, 25 18 S40 12, 50 10 S65 6, 80 4"
        fill="none"
        stroke="url(#sparklineGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.5 }}
      />
      <defs>
        <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
    <div className="text-[8px] text-emerald-500/60 font-medium">98.5% ↑</div>
  </motion.div>
)

// Floating achievement badges - just emojis floating
const AchievementBadges = () => (
  <>
    <motion.div 
      className="absolute top-1/2 -translate-y-1/2 left-4 xl:left-12 opacity-30"
      animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 5, repeat: Infinity }}
    >
      <span className="text-2xl">🏆</span>
      <div className="text-[7px] text-amber-600/50 text-center mt-1">Zero<br/>Escapes</div>
    </motion.div>
    
    <motion.div 
      className="absolute bottom-1/3 right-1/4 hidden xl:block opacity-30"
      animate={{ y: [0, -6, 0], rotate: [2, -2, 2] }}
      transition={{ duration: 6, repeat: Infinity, delay: 1 }}
    >
      <span className="text-2xl">⚡</span>
      <div className="text-[7px] text-violet-600/50 text-center mt-1">Fast<br/>Feedback</div>
    </motion.div>
  </>
)

// Main QA Impact Background Component
const QADashboardBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Subtle gradient overlays */}
    <div className="absolute top-0 left-0 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-br from-emerald-400/5 to-transparent rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-tl from-blue-400/5 to-transparent rounded-full blur-3xl" />
    
    {/* Impact elements - visible on lg+ screens */}
    <div className="hidden lg:block">
      <BugsCaughtCounter />
      <TimeSavedVisual />
      <ReleaseConfidenceMeter />
      <DeploymentFrequency />
      <QualitySparkline />
      <AchievementBadges />
    </div>
  </div>
)

// ============================================
// ABOUT SECTION COMPONENT
// ============================================

const keyAreas = [
  { icon: TestTube, label: 'Enterprise Test Automation', color: 'blue' },
  { icon: Bot, label: 'AI Engineering Agents', color: 'purple' },
  { icon: Zap, label: 'Developer Productivity', color: 'amber' },
  { icon: Shield, label: 'Software Quality Engineering', color: 'green' },
  { icon: GitBranch, label: 'CI/CD Automation', color: 'cyan' },
  { icon: Code2, label: 'Frontend Engineering', color: 'pink' },
  { icon: Globe, label: 'API Testing', color: 'indigo' },
  { icon: Gauge, label: 'Performance Engineering', color: 'orange' },
  { icon: Monitor, label: 'Modern UI Testing', color: 'teal' },
  { icon: RefreshCcw, label: 'Legacy System Modernization', color: 'slate' },
]

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/20',
  },
  green: {
    bg: 'bg-green-500/10 dark:bg-green-500/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/20',
  },
  pink: {
    bg: 'bg-pink-500/10 dark:bg-pink-500/20',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-500/20',
  },
  indigo: {
    bg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-500/20',
  },
  orange: {
    bg: 'bg-orange-500/10 dark:bg-orange-500/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/20',
  },
  teal: {
    bg: 'bg-teal-500/10 dark:bg-teal-500/20',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-500/20',
  },
  slate: {
    bg: 'bg-slate-500/10 dark:bg-slate-500/20',
    text: 'text-slate-600 dark:text-slate-400',
    border: 'border-slate-500/20',
  },
}

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50 overflow-hidden"
    >
      {/* QA Dashboard Background */}
      <QADashboardBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              {SECTION_HEADERS.about.badge}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              {SECTION_HEADERS.about.title}
            </h2>
          </motion.div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                {ABOUT_DESCRIPTION.intro}{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {ABOUT_DESCRIPTION.title}
                </span>{' '}
                {ABOUT_DESCRIPTION.passion}{' '}
                <span className="font-semibold">{ABOUT_DESCRIPTION.highlight}</span>{ABOUT_DESCRIPTION.rest}
              </p>

              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                {ABOUT_DESCRIPTION.secondParagraph}
              </p>

              {/* Quote/Highlight */}
              <motion.blockquote
                className="relative pl-6 border-l-4 border-amber-500 dark:border-amber-400"
                variants={itemVariants}
              >
                <p className="text-lg md:text-xl font-medium text-slate-800 dark:text-slate-200 italic">
                  "{ABOUT_DESCRIPTION.quote}"
                </p>
              </motion.blockquote>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 pt-4"
              >
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Key areas grid */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-6">
                Key Areas of Expertise
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {keyAreas.map((area, index) => {
                  const colors = colorClasses[area.color]
                  const Icon = area.icon
                  return (
                    <motion.div
                      key={area.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border transition-all duration-300',
                        colors.bg,
                        colors.border,
                        'hover:shadow-md'
                      )}
                    >
                      <div className={cn('p-2 rounded-lg', colors.bg)}>
                        <Icon className={cn('w-5 h-5', colors.text)} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {area.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
