import { motion, useInView } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { Bot, Cog, Shield, ArrowRight, Sparkles, Layers, Eye } from 'lucide-react'
import { cn } from '../../lib/utils'
import { projects, type Project } from '../../data'

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5"} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const categoryIcons: Record<string, React.ElementType> = {
  ai: Bot,
  automation: Cog,
  web: Layers,
  tool: Shield,
}

const categoryThemes: Record<string, { gradient: string; bg: string; text: string; glow: string }> = {
  ai: {
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  automation: {
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
  web: {
    gradient: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  tool: {
    gradient: 'from-[#800020] to-rose-600',
    bg: 'bg-rose-500/10',
    text: 'text-rose-600 dark:text-rose-400',
    glow: 'rgba(128, 0, 32, 0.15)',
  },
}

// Project-specific backgrounds that reflect what each project does

// AI PR Reviewer - shows code review: diff lines, comments, approvals
const PRReviewerBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Gradient glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-400/15 to-transparent rounded-full blur-2xl" />
    
    {/* Code diff lines - green (added) and red (removed) */}
    <div className="absolute top-10 left-3 space-y-1.5 w-28">
      <div className="flex items-center gap-1">
        <span className="text-[8px] text-red-400/70 font-mono">-</span>
        <div className="h-1.5 w-20 bg-red-400/30 rounded" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[8px] text-emerald-400/70 font-mono">+</span>
        <div className="h-1.5 w-24 bg-emerald-400/40 rounded" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[8px] text-emerald-400/70 font-mono">+</span>
        <div className="h-1.5 w-16 bg-emerald-400/40 rounded" />
      </div>
    </div>
    
    {/* Review comment bubble */}
    <motion.div 
      className="absolute top-1/2 left-4 bg-violet-500/10 border border-violet-400/20 rounded-lg px-2 py-1"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <span className="text-[8px] text-violet-500/70 font-mono">// Consider refactoring</span>
    </motion.div>
    
    {/* Approval checkmark */}
    <motion.div 
      className="absolute bottom-8 left-4 flex items-center gap-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
        <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-[9px] text-emerald-500/70 font-medium">Approved</span>
    </motion.div>
    
    {/* PR Status badge */}
    <div className="absolute bottom-4 right-4 px-2 py-1 bg-violet-500/10 rounded border border-violet-400/20">
      <span className="text-[10px] font-mono text-violet-500/60">PR #247 Reviewed</span>
    </div>
  </div>
)

// Enterprise Automation - shows test execution: pass/fail bars, coverage
const AutomationFrameworkBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Gradient glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/15 to-transparent rounded-full blur-2xl" />
    
    {/* Test execution bar chart */}
    <div className="absolute top-10 left-3 flex items-end gap-1 h-16">
      {[85, 92, 78, 95, 88, 100, 90].map((height, i) => (
        <motion.div
          key={i}
          className="w-3 rounded-t bg-gradient-to-t from-emerald-500/50 to-emerald-400/30"
          initial={{ height: 0 }}
          animate={{ height: `${height}%` }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}
    </div>
    
    {/* Test results summary */}
    <div className="absolute top-1/2 left-3 space-y-1.5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
        <span className="text-[9px] text-slate-500/80 dark:text-slate-400/80">Passed: 156</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500/60" />
        <span className="text-[9px] text-slate-500/80 dark:text-slate-400/80">Failed: 2</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-500/60" />
        <span className="text-[9px] text-slate-500/80 dark:text-slate-400/80">Skipped: 4</span>
      </div>
    </div>
    
    {/* Coverage donut */}
    <div className="absolute bottom-8 left-4">
      <div className="relative w-12 h-12">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-200/30 dark:text-slate-700/30" />
          <motion.circle
            cx="18" cy="18" r="14" fill="none" strokeWidth="3"
            className="text-emerald-500/60"
            stroke="currentColor"
            strokeLinecap="round"
            initial={{ strokeDasharray: '0 100' }}
            animate={{ strokeDasharray: '96 100' }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-emerald-500/80">96%</span>
      </div>
    </div>
    
    {/* Status badge */}
    <div className="absolute bottom-4 right-4 px-2 py-1 bg-emerald-500/10 rounded border border-emerald-400/20">
      <span className="text-[10px] font-mono text-emerald-500/60">All Tests Passing</span>
    </div>
  </div>
)

// Code Quality Maintenance - shows quality metrics: lint score, standards, issues
const CodeQualityBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Gradient glow */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-400/15 to-transparent rounded-full blur-2xl" />
    
    {/* Quality score - large A grade */}
    <motion.div 
      className="absolute top-8 left-4"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
        <span className="text-2xl font-bold text-emerald-500/80">A</span>
      </div>
      <span className="text-[8px] text-emerald-500/60 mt-1 block text-center">Quality</span>
    </motion.div>
    
    {/* Lint/Standards checks */}
    <div className="absolute top-10 left-24 space-y-2">
      {[
        { label: 'Lint', value: 98, color: 'emerald' },
        { label: 'Types', value: 100, color: 'emerald' },
        { label: 'Style', value: 95, color: 'emerald' },
      ].map((item, i) => (
        <div key={i} className="space-y-0.5">
          <div className="flex justify-between text-[8px] text-slate-500/70 dark:text-slate-400/70 w-16">
            <span>{item.label}</span>
            <span className="text-emerald-500/80">{item.value}%</span>
          </div>
          <div className="h-1 bg-slate-200/30 dark:bg-slate-700/30 rounded-full w-16 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-400/50 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${item.value}%` }}
              transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
            />
          </div>
        </div>
      ))}
    </div>
    
    {/* Issues fixed counter */}
    <motion.div 
      className="absolute bottom-12 left-4 flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex items-center gap-1">
        <svg className="w-3 h-3 text-emerald-500/70" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-[9px] text-slate-500/80 dark:text-slate-400/80">47 issues fixed</span>
      </div>
    </motion.div>
    
    {/* Code smell indicator - showing reduction */}
    <div className="absolute bottom-4 left-4 flex items-center gap-1">
      <svg className="w-3 h-3 text-emerald-500/70" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
      <span className="text-[9px] text-emerald-500/70">Tech debt ↓32%</span>
    </div>
    
    {/* Status badge */}
    <div className="absolute bottom-4 right-4 px-2 py-1 bg-emerald-500/10 rounded border border-emerald-400/20">
      <span className="text-[10px] font-mono text-emerald-500/60">Standards Met</span>
    </div>
  </div>
)

// Map project IDs to their specific backgrounds
const projectBackgrounds: Record<string, React.FC> = {
  'ai-pr-reviewer': PRReviewerBackground,
  'enterprise-automation': AutomationFrameworkBackground,
  'code-quality-agent': CodeQualityBackground,
}

// Fallback backgrounds by category
const categoryBackgrounds: Record<string, React.FC> = {
  ai: PRReviewerBackground,
  automation: AutomationFrameworkBackground,
  web: PRReviewerBackground,
  tool: CodeQualityBackground,
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [isHovered, setIsHovered] = useState(false)
  
  const Icon = categoryIcons[project.category] || Cog
  const theme = categoryThemes[project.category] || categoryThemes.automation
  // Use project-specific background if available, otherwise fall back to category
  const Background = projectBackgrounds[project.id] || categoryBackgrounds[project.category] || AutomationFrameworkBackground

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group h-full"
    >
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-2xl',
          'bg-white dark:bg-slate-800',
          'border border-slate-200 dark:border-slate-700',
          'transition-all duration-300',
          'hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-600',
          project.featured && 'ring-2 ring-amber-400/50'
        )}
        style={{
          boxShadow: isHovered ? `0 20px 40px -12px ${theme.glow}` : undefined,
        }}
      >
        {/* Creative category-specific background */}
        <Background />

        {/* Top gradient bar */}
        <div className={cn('h-1.5 bg-gradient-to-r relative z-10', theme.gradient)} />

        {/* Decorative icon in corner */}
        <div className="absolute top-4 right-4">
          <motion.div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center',
              'bg-gradient-to-br shadow-lg text-white',
              theme.gradient
            )}
            animate={isHovered ? { rotate: 12, scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
          
          {/* Floating sparkle */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
          </motion.div>
        </div>

        <div className="p-6 pr-20 relative z-10">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={cn(
              'px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full',
              theme.bg, theme.text
            )}>
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-500 text-white">
                ★ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#800020] dark:group-hover:text-rose-400 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GitHubIcon className="w-4 h-4" />
                Code
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium',
                  'bg-gradient-to-r', theme.gradient
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                Demo
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 bg-slate-50 dark:bg-slate-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-4">
            <Sparkles className="w-4 h-4" />
            Featured Projects
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            What I've Built
          </h2>
          
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A showcase of AI-powered tools, automation frameworks, and engineering solutions
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all projects button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href={import.meta.env.VITE_GITHUB_URL || ''}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <GitHubIcon className="w-5 h-5" />
            View All on GitHub
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
