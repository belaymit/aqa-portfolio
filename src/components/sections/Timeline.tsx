import { motion, useInView } from 'framer-motion'
import React, { useRef, useState } from 'react'
import {
  Briefcase,
  Calendar,
  MapPin,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  Rocket,
  Code2,
  GraduationCap,
  Target,
  Flame,
  Star,
  Atom,
  Sparkle,
  Crown,
  Gem,
} from 'lucide-react'

// Custom Bolt icon since lucide doesn't have one
const Bolt = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)
import { cn } from '../../lib/utils'
import { experiences } from '../../data'

import computritionLogo from '../../assets/computrition-logo.webp'
import academyLogo from '../../assets/10-academy.jpg'

const companyLogos: Record<string, string> = {
  'Computrition': computritionLogo,
  '10 Academy': academyLogo,
}

// Creative decorative elements for each card
const cardDecorations: Record<string, { icon: React.ReactNode, jumpIcon: React.ReactNode, gradient: string, pattern: string, bgGlow: string }> = {
  'computrition': {
    icon: <Zap className="w-5 h-5" />,
    jumpIcon: <Star className="w-4 h-4" />,
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)',
    bgGlow: 'radial-gradient(ellipse at 80% 20%, rgba(251, 191, 36, 0.2) 0%, rgba(249, 115, 22, 0.1) 30%, transparent 70%)',
  },
  'computrition-junior': {
    icon: <Rocket className="w-5 h-5" />,
    jumpIcon: <Sparkle className="w-4 h-4" />,
    gradient: 'from-orange-400 via-amber-500 to-yellow-500',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(251, 146, 60, 0.15) 0%, transparent 50%)',
    bgGlow: 'radial-gradient(ellipse at 80% 20%, rgba(251, 146, 60, 0.2) 0%, rgba(245, 158, 11, 0.1) 30%, transparent 70%)',
  },
  '10academy-dev': {
    icon: <Rocket className="w-5 h-5" />,
    jumpIcon: <Atom className="w-4 h-4" />,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
    bgGlow: 'radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.2) 0%, rgba(217, 70, 239, 0.1) 30%, transparent 70%)',
  },
  '10academy-intern': {
    icon: <Code2 className="w-5 h-5" />,
    jumpIcon: <Sparkle className="w-4 h-4" />,
    gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)',
    bgGlow: 'radial-gradient(ellipse at 80% 20%, rgba(34, 211, 238, 0.2) 0%, rgba(99, 102, 241, 0.1) 30%, transparent 70%)',
  },
  'microverse-mentor': {
    icon: <GraduationCap className="w-5 h-5" />,
    jumpIcon: <Crown className="w-4 h-4" />,
    gradient: 'from-emerald-400 via-green-500 to-teal-500',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(52, 211, 153, 0.15) 0%, transparent 50%)',
    bgGlow: 'radial-gradient(ellipse at 80% 20%, rgba(52, 211, 153, 0.2) 0%, rgba(20, 184, 166, 0.1) 30%, transparent 70%)',
  },
  'microverse-student': {
    icon: <Target className="w-5 h-5" />,
    jumpIcon: <Bolt className="w-4 h-4" />,
    gradient: 'from-pink-400 via-rose-500 to-red-500',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(244, 114, 182, 0.15) 0%, transparent 50%)',
    bgGlow: 'radial-gradient(ellipse at 80% 20%, rgba(244, 114, 182, 0.2) 0%, rgba(239, 68, 68, 0.1) 30%, transparent 70%)',
  },
  'freelance': {
    icon: <Flame className="w-5 h-5" />,
    jumpIcon: <Gem className="w-4 h-4" />,
    gradient: 'from-yellow-400 via-amber-500 to-orange-500',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(250, 204, 21, 0.15) 0%, transparent 50%)',
    bgGlow: 'radial-gradient(ellipse at 80% 20%, rgba(250, 204, 21, 0.2) 0%, rgba(249, 115, 22, 0.1) 30%, transparent 70%)',
  },
  'haramaya-university': {
    icon: <GraduationCap className="w-5 h-5" />,
    jumpIcon: <Star className="w-4 h-4" />,
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    pattern: 'radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
    bgGlow: 'radial-gradient(ellipse at 80% 20%, rgba(59, 130, 246, 0.2) 0%, rgba(99, 102, 241, 0.1) 30%, transparent 70%)',
  },
}

const workExperiences = experiences.filter(exp => exp.type === 'work' || exp.type === 'volunteer')

const TimelineCard = ({ exp, index }: { exp: typeof workExperiences[0], index: number }) => {
  const [expanded, setExpanded] = useState(false)
  const logo = companyLogos[exp.company]
  const isVolunteer = exp.type === 'volunteer'
  const decoration = cardDecorations[exp.id] || cardDecorations['freelance']

  return (
    <div className="relative flex gap-3 sm:gap-6">
      {/* Timeline line and node */}
      <div className="flex flex-col items-center">
        <div 
          className={cn(
            'w-3 h-3 sm:w-4 sm:h-4 rounded-full z-10 flex-shrink-0',
            exp.isHighlighted 
              ? 'bg-amber-500 ring-2 sm:ring-4 ring-amber-100 dark:ring-amber-900'
              : 'bg-[#800020]'
          )}
        />
        {index < workExperiences.length - 1 && (
          <div className="w-0.5 flex-1 bg-[#800020]/30 min-h-[20px]" />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-6 sm:pb-8 min-w-0">
        <div 
          className={cn(
            'rounded-lg sm:rounded-xl overflow-hidden cursor-pointer relative',
            'bg-white dark:bg-slate-800',
            'border border-slate-200 dark:border-slate-700',
            'shadow-sm hover:shadow-md transition-shadow',
            exp.isHighlighted && 'ring-2 ring-amber-400/50'
          )}
          onClick={() => setExpanded(!expanded)}
        >
          {/* Dizzy background glow effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: decoration.bgGlow }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Senior QA Mindset - The real questions we ask */}
          {exp.isHighlighted && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Floating QA questions - scattered around the card */}
              
              {/* Top area - between logo and corner */}
              <motion.div 
                className="absolute top-3 left-28 sm:left-36 text-[9px] font-mono text-rose-400/60 dark:text-rose-400/40"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Why did it happen?
              </motion.div>

              <motion.div 
                className="absolute top-8 left-24 sm:left-32 text-[8px] font-mono text-amber-500/50 dark:text-amber-400/40"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                Why was it missed?
              </motion.div>

              {/* Right side area */}
              <motion.div 
                className="absolute top-14 right-14 text-[8px] font-mono text-purple-500/50 dark:text-purple-400/40"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: 0.3 }}
              >
                Impact?
              </motion.div>

              <motion.div 
                className="absolute top-[4.5rem] right-16 text-[7px] font-mono text-cyan-500/50 dark:text-cyan-400/40"
                animate={{ opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: 0.7 }}
              >
                Reproducible?
              </motion.div>

              {/* Bottom right */}
              <motion.div 
                className="absolute bottom-3 right-4 text-[8px] font-mono text-teal-500/50 dark:text-teal-400/40"
                animate={{ opacity: [0.3, 0.55, 0.3] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: 0.2 }}
              >
                Edge cases?
              </motion.div>

              {/* Bottom left */}
              <motion.div 
                className="absolute bottom-3 left-4 text-[8px] font-mono text-indigo-500/50 dark:text-indigo-400/40"
                animate={{ opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
              >
                Dependencies?
              </motion.div>

              {/* Center-ish bottom */}
              <motion.div 
                className="absolute bottom-8 left-1/3 text-[9px] font-mono text-emerald-500/50 dark:text-emerald-400/40"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2.7, repeat: Infinity, delay: 0.6 }}
              >
                How to prevent?
              </motion.div>
            </div>
          )}

          {/* Jumping icon from bottom left to top right corner icon */}
          <motion.div
            className={cn(
              'absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white/70 z-20',
              'bg-gradient-to-br opacity-40',
              decoration.gradient
            )}
            animate={{
              left: ['10%', '50%', '85%'],
              top: ['70%', '30%', '12px'],
              opacity: [0, 0.5, 0.6, 0],
              scale: [0.4, 0.8, 0.6],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 3,
              delay: index * 0.5,
              ease: 'easeInOut',
            }}
          >
            {decoration.jumpIcon}
          </motion.div>

          {/* Creative corner decoration */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
              className={cn(
                'w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg',
                'bg-gradient-to-br',
                decoration.gradient
              )}
            >
              <span className="scale-75 sm:scale-100">{decoration.icon}</span>
            </motion.div>
            {/* Floating dots - hidden on small mobile */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              className={cn(
                'hidden sm:block absolute -top-1 -right-1 w-2 h-2 rounded-full',
                'bg-gradient-to-br',
                decoration.gradient
              )}
            />
            <motion.div
              animate={{ 
                y: [0, -3, 0],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 + 0.5 }}
              className={cn(
                'hidden sm:block absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full',
                'bg-gradient-to-br',
                decoration.gradient
              )}
            />
          </div>

          {/* Top bar */}
          <div className={cn(
            'h-1',
            exp.isHighlighted 
              ? 'bg-amber-500'
              : 'bg-slate-200 dark:bg-slate-700'
          )} />

          <div className="p-3 sm:p-5">
            {/* Header */}
            <div className="flex items-start gap-2 sm:gap-4 pr-10 sm:pr-14">
              {/* Logo */}
              {logo ? (
                <div className={cn(
                  'h-10 sm:h-14 flex items-center bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 flex-shrink-0 overflow-hidden',
                  exp.company === 'Computrition' ? 'w-10 sm:w-12' : 'px-2 sm:px-3'
                )}>
                  <img 
                    src={logo} 
                    alt={exp.company} 
                    className={cn(
                      exp.company === 'Computrition' ? 'h-7 sm:h-9 w-auto max-w-none ml-0.5 sm:ml-1' : 'h-7 sm:h-9 w-auto object-contain'
                    )}
                  />
                </div>
              ) : (
                <div className={cn(
                  'w-10 h-10 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center flex-shrink-0',
                  isVolunteer ? 'bg-rose-500' : 'bg-[#800020]'
                )}>
                  {isVolunteer ? <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-white" /> : <Briefcase className="w-5 h-5 sm:w-7 sm:h-7 text-white" />}
                </div>
              )}

              {/* Title area */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                  <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {exp.role}
                  </h3>
                  {exp.isHighlighted && (
                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase bg-amber-500 text-white rounded-full">
                      <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Current
                    </span>
                  )}
                  {isVolunteer && (
                    <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase bg-rose-500 text-white rounded-full">
                      <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Volunteer
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base font-medium text-[#800020] dark:text-rose-400">
                  {exp.company}
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-1 sm:gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 sm:mt-2">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {exp.startDate} – {exp.endDate}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {exp.location}{exp.remote && ' • Remote'}
                  </span>
                </div>
              </div>

              {/* Expand button */}
              <button className="p-1 sm:p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex-shrink-0">
                {expanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>

            {/* Expandable content */}
            {expanded && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200 dark:border-slate-700">
                {exp.description && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3 sm:mb-4">
                    {exp.description}
                  </p>
                )}

                {exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.technologies.map(tech => (
                      <span 
                        key={tech}
                        className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Timeline = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-4">
            Work Experience
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-400">
            6+ years building software and automation systems
          </p>
        </motion.div>

        {/* Timeline */}
        <div>
          {workExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              <TimelineCard exp={exp} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Timeline
