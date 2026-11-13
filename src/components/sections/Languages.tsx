import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Globe, MessageCircle } from 'lucide-react'
import { cn } from '../../lib/utils'
import { languages } from '../../data'

const levelColors: Record<string, { bg: string; text: string; progress: number }> = {
  Native: {
    bg: 'bg-green-500/10',
    text: 'text-green-600 dark:text-green-400',
    progress: 100,
  },
  Fluent: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    progress: 90,
  },
  Intermediate: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    progress: 60,
  },
}

const LanguageCard = ({
  language,
  index,
}: {
  language: (typeof languages)[0]
  index: number
}) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const level = levelColors[language.level] || levelColors.Intermediate

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        'relative p-6 rounded-2xl border',
        'bg-white dark:bg-slate-800/80',
        'border-slate-200 dark:border-slate-700',
        'hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300'
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-blue-500/10">
          <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{language.name}</h3>
          <span className={cn('text-sm font-medium', level.text)}>{language.level}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', level.bg.replace('/10', ''))}
          style={{ backgroundColor: level.text.includes('green') ? '#22c55e' : level.text.includes('blue') ? '#3b82f6' : '#f59e0b' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level.progress}%` } : {}}
          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
        />
      </div>
    </motion.div>
  )
}

const LanguagesSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <Globe className="w-4 h-4" />
            Languages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Languages I Speak
          </h2>
        </motion.div>

        {/* Language cards */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {languages.map((language, index) => (
            <LanguageCard key={language.name} language={language} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default LanguagesSection
