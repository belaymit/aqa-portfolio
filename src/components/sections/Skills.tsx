import { motion, useInView } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { 
  Monitor, 
  Server, 
  TestTube2, 
  Wrench,
  Code2,
  Database,
  Gauge,
  GitBranch,
  Sparkles,
  Zap,
  Cpu,
  Layers,
  Terminal,
  Rocket,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { skillCategories } from '../../data'

const iconMap: Record<string, React.ElementType> = {
  frontend: Monitor,
  backend: Server,
  automation: TestTube2,
  tools: Wrench,
}

const cardThemes: Record<string, {
  gradient: string
  glowColor: string
  particles: string[]
  floatingIcons: React.ElementType[]
}> = {
  frontend: {
    gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    particles: ['#a855f7', '#c084fc', '#e879f9'],
    floatingIcons: [Code2, Layers, Sparkles],
  },
  backend: {
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    particles: ['#22d3ee', '#38bdf8', '#818cf8'],
    floatingIcons: [Database, Server, Terminal],
  },
  automation: {
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    particles: ['#fbbf24', '#fb923c', '#f87171'],
    floatingIcons: [Gauge, Zap, Rocket],
  },
  tools: {
    gradient: 'from-[#800020] via-rose-600 to-pink-500',
    glowColor: 'rgba(128, 0, 32, 0.4)',
    particles: ['#800020', '#e11d48', '#ec4899'],
    floatingIcons: [GitBranch, Wrench, Cpu],
  },
}

const FloatingParticle = ({ color, delay, duration, x, y }: { color: string, delay: number, duration: number, x: string, y: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ backgroundColor: color, left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      x: [0, 10, -10, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
    }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
)

const SkillPill = ({ skill, delay, gradient }: { skill: string; delay: number; gradient: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1, zIndex: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <div
        className={cn(
          'px-3 py-1.5 text-sm font-medium rounded-full cursor-default transition-all duration-300',
          'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md',
          'border border-slate-200/60 dark:border-slate-700/60',
          'shadow-sm hover:shadow-xl',
          isHovered && 'text-white border-transparent'
        )}
      >
        <span className={cn('transition-colors', isHovered ? 'text-white' : 'text-slate-700 dark:text-slate-300')}>
          {skill}
        </span>
      </div>
      {isHovered && (
        <motion.div
          className={cn('absolute inset-0 rounded-full bg-gradient-to-r -z-10 blur-md', gradient)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        />
      )}
    </motion.div>
  )
}

// Large bar chart for QA dashboard background
const DashboardBarChart = () => {
  const bars = [40, 65, 85, 55, 92, 78, 95, 70, 88, 96]
  return (
    <div className="flex items-end gap-1.5 h-24 px-2">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-amber-500/40 via-orange-400/30 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// Larger donut/ring chart showing pass rate
const DashboardDonutChart = () => (
  <div className="relative w-20 h-20">
    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
      {/* Background circle */}
      <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500/10" />
      {/* Progress circle - 98% */}
      <motion.circle
        cx="18" cy="18" r="15" fill="none" strokeWidth="2.5"
        className="text-emerald-500/60"
        stroke="currentColor"
        strokeDasharray="94.2 100"
        strokeLinecap="round"
        initial={{ strokeDasharray: '0 100' }}
        animate={{ strokeDasharray: '98 100' }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-lg font-bold text-emerald-500">98%</span>
      <span className="text-[8px] text-emerald-500/70 uppercase tracking-wider">Pass</span>
    </div>
  </div>
)

// Test results summary bars
const TestResultBars = () => (
  <div className="space-y-2 w-28">
    {/* Passed */}
    <div className="space-y-0.5">
      <div className="flex justify-between text-[9px] text-amber-600/60 dark:text-amber-400/60">
        <span>Passed</span>
        <span>247</span>
      </div>
      <div className="h-2 bg-slate-200/30 dark:bg-slate-700/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400/60 to-orange-500/60 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '94%' }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
    </div>
    {/* Failed */}
    <div className="space-y-0.5">
      <div className="flex justify-between text-[9px] text-amber-600/60 dark:text-amber-400/60">
        <span>Failed</span>
        <span>3</span>
      </div>
      <div className="h-2 bg-slate-200/30 dark:bg-slate-700/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-red-400/50 to-red-500/50 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '6%' }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  </div>
)

// Trend line chart
const TrendLineChart = () => (
  <svg viewBox="0 0 100 40" className="w-32 h-12">
    {/* Grid lines */}
    <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="0.5" className="text-amber-500/10" />
    <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-amber-500/10" />
    <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-amber-500/10" />
    
    {/* Trend line */}
    <motion.path
      d="M0 35 Q15 30, 25 25 T50 20 T75 12 T100 8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="text-amber-500/50"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
    />
    {/* Area fill */}
    <motion.path
      d="M0 35 Q15 30, 25 25 T50 20 T75 12 T100 8 L100 40 L0 40 Z"
      className="fill-amber-500/10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    />
  </svg>
)

const PulsingDot = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="w-1.5 h-1.5 rounded-full bg-amber-400"
    animate={{
      scale: [1, 1.5, 1],
      opacity: [1, 0.5, 1],
    }}
    transition={{ duration: 1.5, repeat: Infinity, delay }}
  />
)

const SkillCard = ({ category }: { category: (typeof skillCategories)[0] }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const Icon = iconMap[category.id] || Monitor
  const theme = cardThemes[category.id] || cardThemes.frontend
  const isQACard = category.id === 'automation'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group h-full"
    >
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-3xl',
          'bg-white dark:bg-slate-800/80',
          'border border-slate-200/80 dark:border-slate-700/80',
          'transition-all duration-500 ease-out',
          'hover:border-transparent',
          isQACard && 'ring-2 ring-amber-500/60 dark:ring-amber-400/40'
        )}
        style={{ boxShadow: isHovered ? `0 25px 50px -12px ${theme.glowColor}` : isQACard ? '0 10px 40px -10px rgba(245, 158, 11, 0.3)' : undefined }}
      >
        {/* Special QA Card Background Effects - Dashboard Style */}
        {isQACard && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
            {/* Bar chart - bottom spanning width */}
            <div className="absolute bottom-0 left-0 right-0 opacity-60">
              <DashboardBarChart />
            </div>
            
            {/* Donut chart - top right */}
            <div className="absolute top-14 right-4 opacity-70">
              <DashboardDonutChart />
            </div>
            
            {/* Test results - middle left */}
            <div className="absolute top-1/3 left-4 opacity-70">
              <TestResultBars />
            </div>
            
            {/* Trend line - bottom right above bar chart */}
            <div className="absolute bottom-28 right-4 opacity-60">
              <TrendLineChart />
            </div>
            
            {/* Pipeline status badge - top */}
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-amber-500/20">
              <PulsingDot delay={0} />
              <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">CI/CD PASSING</span>
            </div>
          </div>
        )}

        {/* Animated border gradient on hover */}
        <motion.div
          className={cn('absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br', theme.gradient)}
          style={{ padding: '2px' }}
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-800" />
        </motion.div>

        {/* Floating particles - hide on QA card hover */}
        {!isQACard && theme.particles.map((color, i) => (
          <FloatingParticle key={i} color={color} delay={i * 0.5} duration={3 + i * 0.5} x={`${20 + i * 25}%`} y={`${15 + i * 20}%`} />
        ))}

        {/* Floating icons - hide on QA card */}
        {!isQACard && theme.floatingIcons.map((FloatIcon, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.06] dark:opacity-[0.04] pointer-events-none"
            style={{ right: `${10 + i * 20}%`, top: `${5 + i * 15}%` }}
            animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
          >
            <FloatIcon className="w-16 h-16 text-slate-900 dark:text-white" strokeWidth={1} />
          </motion.div>
        ))}

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div className="relative" whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 400 }}>
                <motion.div
                  className={cn('absolute inset-0 rounded-2xl bg-gradient-to-br blur-lg', theme.gradient)}
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className={cn('relative p-4 rounded-2xl bg-gradient-to-br shadow-xl', theme.gradient)}
                  animate={isHovered ? { rotate: [0, -5, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-7 h-7 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{category.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <motion.div
                    className={cn('w-2 h-2 rounded-full bg-gradient-to-r', theme.gradient)}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <p className="text-sm text-slate-500 dark:text-slate-400">{category.skills.length} technologies</p>
                </div>
              </div>
            </div>
            
            {category.highlighted && (
              <motion.div className="relative" animate={{ rotate: [0, 3, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <span className={cn(
                  'px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white rounded-xl shadow-lg',
                  isQACard ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500' : 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500'
                )}>
                  {isQACard ? '★ Primary' : '★ Core'}
                </span>
              </motion.div>
            )}
          </div>

          {/* Skills */}
          <div className="flex-1 flex flex-wrap gap-2 content-start">
            {category.skills.map((skill, skillIndex) => (
              <SkillPill key={skill.name} skill={skill.name} delay={0.05 * skillIndex} gradient={theme.gradient} />
            ))}
          </div>

          {/* Bottom accent */}
          <div className="relative mt-6 h-2 rounded-full bg-slate-100 dark:bg-slate-700/50 overflow-hidden">
            <motion.div
              className={cn('absolute inset-y-0 left-0 rounded-full bg-gradient-to-r', theme.gradient)}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
  
  // Order: Automation first, then others
  const orderedCategories = [
    ...skillCategories.filter(c => c.id === 'automation'),
    ...skillCategories.filter(c => c.id !== 'automation'),
  ]
  
  // Auto-slide carousel - moves 1 card at a time
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= orderedCategories.length - 1) {
          return 0
        }
        return prev + 1
      })
    }, 5000)
    
    return () => clearInterval(interval)
  }, [orderedCategories.length])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="relative inline-block mb-6"
          >
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 shadow-2xl flex items-center justify-center">
              <Code2 className="w-10 h-10 text-white dark:text-slate-900" />
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: 'linear' }}
                  style={{ top: '50%', left: '50%', marginTop: '-6px', marginLeft: '-6px', transformOrigin: `${40 + i * 10}px 0px` }}
                />
              ))}
            </div>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">My Tech Stack</h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
            A powerful toolkit built over 6+ years of engineering experience
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-800/50 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <motion.span
              className="text-4xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {totalSkills}+
            </motion.span>
            <span className="text-slate-600 dark:text-slate-400 font-medium text-sm sm:text-base">Technologies & Tools</span>
          </motion.div>
        </motion.div>

        {/* Carousel - 2 cards visible, slides 1 at a time */}
        <div className="relative overflow-hidden px-1">
          <div className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(calc(-${currentIndex} * (50% + 12px)))` }}
          >
            {orderedCategories.map((category) => (
              <div key={category.id} className="w-[calc(50%-12px)] flex-shrink-0">
                <SkillCard category={category} />
              </div>
            ))}
            {/* Duplicate first card for seamless loop */}
            <div className="w-[calc(50%-12px)] flex-shrink-0">
              <SkillCard category={orderedCategories[0]} />
            </div>
          </div>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {orderedCategories.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                'h-3 rounded-full transition-all duration-300',
                currentIndex === idx ? 'w-10 bg-[#800020]' : 'w-3 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
