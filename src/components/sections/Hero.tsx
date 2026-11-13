import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowDown, Download, Mail, Briefcase, MapPin } from 'lucide-react'
import belayPhoto from '../../assets/belay.jpg'
import { SITE_CONFIG, ROLES, HERO_DESCRIPTION, CTA_LABELS } from '../../data/constants'

// Typewriter effect hook
const useTypewriter = (texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[textIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentText.slice(0, displayText.length - 1))
          } else {
            setIsDeleting(false)
            setTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime])

  return displayText
}

// Subtle QA-themed background elements for Hero
// Shows the JOURNEY of code through quality gates - unique to Hero
const HeroQABackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* The Code Journey - a flowing path from code to production - lg+ only */}
    <div className="hidden lg:block">
      {/* Animated code snippet floating in */}
      <motion.div 
        className="absolute top-28 left-8 opacity-30"
        animate={{ x: [0, 10, 0], opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <div className="font-mono text-[9px] bg-slate-800 dark:bg-slate-800/50 rounded px-2 py-1.5 border border-slate-700 dark:border-slate-700/50 shadow-sm">
          <div className="text-blue-400">function</div>
          <div className="pl-2 text-slate-300">validateUser()</div>
        </div>
      </motion.div>
      
      {/* The shield - representing protection/quality gate */}
      <motion.div 
        className="absolute top-36 left-1/4 opacity-20"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <svg viewBox="0 0 40 48" className="w-8 h-10 text-emerald-500">
          <path 
            d="M20 2 L38 10 L38 22 C38 34 20 46 20 46 C20 46 2 34 2 22 L2 10 Z" 
            fill="currentColor" 
            fillOpacity="0.2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M14 24 L18 28 L26 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
      
      {/* Bug being squashed - playful */}
      <motion.div 
        className="absolute bottom-36 left-16 opacity-20"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.1, 0.2], scale: [1, 0.9, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="relative">
          <span className="text-2xl">🐛</span>
          <motion.span 
            className="absolute -top-1 -right-1 text-red-500 text-lg font-bold"
            animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✕
          </motion.span>
        </div>
      </motion.div>
      
      {/* Rocket launching - shipping to production */}
      <motion.div 
        className="absolute bottom-32 right-16 opacity-20"
        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="text-2xl">🚀</span>
      </motion.div>
      
      {/* Success checkmarks appearing */}
      <motion.div 
        className="absolute top-1/2 right-12 opacity-15 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
      >
        {['Unit Tests', 'Integration', 'E2E'].map((label, i) => (
          <motion.div 
            key={label}
            className="flex items-center gap-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 + i * 0.3 }}
          >
            <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-[9px] text-slate-400 font-medium">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
    
    {/* Subtle terminal output - xl+ only */}
    <div className="hidden xl:block">
      <motion.div 
        className="absolute top-1/3 left-6 opacity-30 font-mono text-[8px] bg-slate-800 dark:bg-slate-900/50 rounded p-2 shadow-sm"
        animate={{ opacity: [0.25, 0.35, 0.25] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="text-emerald-400">✓ All tests passed</div>
        <div className="text-emerald-400">✓ Coverage: 98.2%</div>
        <div className="text-emerald-400">✓ No vulnerabilities</div>
        <div className="text-amber-400">→ Ready to deploy</div>
      </motion.div>
    </div>
    
    {/* Floating metrics - different from About */}
    <div className="hidden lg:block">
      <motion.div 
        className="absolute bottom-20 left-1/3 opacity-15"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-500/50">2,847</div>
          <div className="text-[8px] text-slate-400">bugs prevented</div>
        </div>
      </motion.div>
      
      <motion.div 
        className="absolute top-40 right-1/4 opacity-15"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <div className="text-center">
          <div className="text-xl font-bold text-blue-500/50">99.9%</div>
          <div className="text-[8px] text-slate-400">uptime achieved</div>
        </div>
      </motion.div>
    </div>
  </div>
)

const Hero = () => {
  const typedText = useTypewriter([...ROLES], 80, 40, 2000)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-400/15 to-blue-400/15 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-amber-400/10 to-orange-400/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Three specialization colors - flowing in the background */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-cyan-400/8 blur-3xl"
          animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-violet-400/8 blur-3xl"
          animate={{ x: [20, -20, 20], y: [15, -15, 15] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-400/8 blur-3xl"
          animate={{ x: [30, -30, 30], y: [-15, 25, -15] }}
          transition={{ duration: 11, repeat: Infinity }}
        />
      </div>
      
      {/* Subtle QA-themed background */}
      <HeroQABackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {SITE_CONFIG.availability}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              <span className="text-slate-800 dark:text-white">Hi, I'm </span>
              <span className="text-gradient">{SITE_CONFIG.name}</span>
            </motion.h1>

            {/* Typewriter roles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="h-12 md:h-14 mb-6"
            >
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-[3px] h-6 md:h-8 ml-1 bg-blue-600 dark:bg-blue-400 align-middle"
                />
              </h2>
            </motion.div>

            {/* Description with QA background elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mb-6 max-w-xl mx-auto lg:mx-0"
            >
              {/* QA background elements - positioned far outside the text area */}
              <div className="absolute -inset-8 pointer-events-none overflow-visible">
                {/* Pass/fail bars - far left, won't touch text */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-20 dark:opacity-15 space-y-1.5">
                  <div className="w-6 h-1 bg-emerald-500 rounded-full" />
                  <div className="w-4 h-1 bg-emerald-400 rounded-full" />
                  <div className="w-8 h-1 bg-emerald-500 rounded-full" />
                </div>
                
                {/* Small checkmark - far bottom left */}
                <motion.svg 
                  className="absolute -left-10 -bottom-4 w-4 h-4 text-emerald-500"
                  style={{ opacity: 0.2 }}
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </motion.svg>
                
                {/* Coverage circle - far right */}
                <svg className="absolute -right-10 -top-2 w-8 h-8 opacity-15" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-slate-300 dark:text-slate-600" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="88 100" className="text-cyan-500 dark:text-cyan-400 -rotate-90 origin-center" />
                </svg>
                
                {/* Pipeline dots - far top right */}
                <div className="absolute -right-8 -top-6 flex gap-1 opacity-20">
                  {[1, 2, 3, 4].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-violet-500"
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{ delay: i * 0.2, duration: 1.5, repeat: Infinity }}
                    />
                  ))}
                </div>
              </div>
              
              <p className="relative z-10 text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {HERO_DESCRIPTION.intro} <span className="font-semibold text-slate-800 dark:text-slate-200">{HERO_DESCRIPTION.highlight}</span> {HERO_DESCRIPTION.middle}{' '}
                <span className="text-cyan-700 dark:text-cyan-400 font-medium">{HERO_DESCRIPTION.specializations[0].text}</span>, 
                <span className="text-violet-700 dark:text-violet-400 font-medium"> {HERO_DESCRIPTION.specializations[1].text}</span>, and 
                <span className="text-amber-700 dark:text-amber-400 font-medium"> {HERO_DESCRIPTION.specializations[2].text}</span>.
              </p>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 dark:text-slate-400 mb-8"
            >
              <MapPin className="w-4 h-4" />
              <span>{SITE_CONFIG.location}</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                {CTA_LABELS.getInTouch}
              </motion.a>
              <motion.a
                href="#timeline"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-full border border-slate-200 dark:border-slate-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Briefcase className="w-5 h-5" />
                {CTA_LABELS.viewWork}
              </motion.a>
              <motion.a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                {CTA_LABELS.resume}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Photo container */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img 
                  src={belayPhoto} 
                  alt={SITE_CONFIG.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              {/* Glow effect behind photo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl -z-10 scale-110" />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-medium">{CTA_LABELS.scrollToExplore}</span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
