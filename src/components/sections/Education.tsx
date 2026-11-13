import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Award, BookOpen, Lightbulb, Calendar, MapPin } from 'lucide-react'
import { cn } from '../../lib/utils'
import { education } from '../../data'
import { experiences } from '../../data'

// Get education experiences from experiences data (like Microverse program)
const educationExperiences = experiences.filter(exp => exp.type === 'education')

// Combined education timeline item type
interface EducationTimelineItem {
  id: string
  type: 'formal' | 'program'
  institution: string
  title: string
  subtitle?: string
  startDate: string
  endDate: string
  location?: string
  gpa?: string
  description?: string
  thesis?: { title: string; areas: string[] }
  capstone?: { title: string; areas: string[] }
  technologies?: string[]
  achievements?: string[]
}

// Build combined timeline
const buildEducationTimeline = (): EducationTimelineItem[] => {
  const items: EducationTimelineItem[] = []
  
  // Add formal education
  education.forEach(edu => {
    items.push({
      id: edu.id,
      type: 'formal',
      institution: edu.institution,
      title: edu.degree,
      subtitle: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      gpa: edu.gpa,
      thesis: edu.thesis,
      capstone: edu.capstone,
    })
  })
  
  // Add education experiences (like Microverse program)
  educationExperiences.forEach(exp => {
    items.push({
      id: exp.id,
      type: 'program',
      institution: exp.company,
      title: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate,
      location: exp.location,
      description: exp.description,
      technologies: exp.technologies,
      achievements: exp.achievements,
    })
  })
  
  // Sort by end date (most recent first)
  return items.sort((a, b) => {
    const dateA = new Date(a.endDate === 'Present' ? Date.now() : a.endDate)
    const dateB = new Date(b.endDate === 'Present' ? Date.now() : b.endDate)
    return dateB.getTime() - dateA.getTime()
  })
}

const educationTimeline = buildEducationTimeline()

const TimelineItem = ({
  item,
  index,
  isLast,
}: {
  item: EducationTimelineItem
  index: number
  isLast: boolean
}) => {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: true, margin: '-50px' })

  const getIcon = () => {
    return GraduationCap
  }

  const Icon = getIcon()

  const getGradient = () => {
    if (item.type === 'formal') return 'from-purple-500 to-indigo-600'
    return 'from-blue-500 to-cyan-600'
  }

  const getTypeLabel = () => {
    if (item.type === 'formal') return 'Degree'
    return 'Program'
  }

  return (
    <motion.div
      ref={itemRef}
      className="relative flex gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Timeline line and node */}
      <div className="flex flex-col items-center">
        {/* Node */}
        <motion.div
          className={cn(
            'relative z-10 flex items-center justify-center w-12 h-12 rounded-xl shadow-lg bg-gradient-to-br',
            getGradient()
          )}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.1, type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
        
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-0.5 flex-1 mt-4 bg-gradient-to-b from-slate-300 to-slate-200 dark:from-slate-600 dark:to-slate-700 min-h-[40px]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            style={{ transformOrigin: 'top' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <motion.div
          className={cn(
            'p-5 rounded-xl',
            'bg-white dark:bg-slate-800',
            'border border-slate-200 dark:border-slate-700',
            'shadow-sm hover:shadow-md transition-shadow'
          )}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {/* Type badge */}
          <span className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 mb-3 text-[10px] font-bold uppercase tracking-wider rounded-full text-white',
            item.type === 'formal' && 'bg-gradient-to-r from-purple-500 to-indigo-500',
            item.type === 'program' && 'bg-gradient-to-r from-blue-500 to-cyan-500'
          )}>
            <Icon className="w-2.5 h-2.5" />
            {getTypeLabel()}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
              {item.subtitle}
            </p>
          )}
          
          {/* Institution */}
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {item.institution}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {item.startDate} – {item.endDate}
            </span>
            {item.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {item.location}
              </span>
            )}
            {item.gpa && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 rounded text-amber-700 dark:text-amber-400 font-semibold">
                <Award className="w-3 h-3" />
                GPA: {item.gpa}
              </span>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              {item.description}
            </p>
          )}

          {/* Thesis/Capstone */}
          {(item.thesis || item.capstone) && (
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                  {item.thesis ? 'Thesis' : 'Capstone Project'}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">
                {item.thesis?.title || item.capstone?.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(item.thesis?.areas || item.capstone?.areas)?.map((area) => (
                  <span
                    key={area}
                    className="px-2 py-0.5 text-[10px] font-medium rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-medium rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Achievements */}
          {item.achievements && item.achievements.length > 0 && (
            <div className="space-y-1">
              {item.achievements.slice(0, 3).map((achievement, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Award className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </div>
              ))}
              {item.achievements.length > 3 && (
                <span className="text-xs text-slate-400 ml-5">
                  +{item.achievements.length - 3} more
                </span>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

const Education = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-12 md:py-20 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg mb-5"
          >
            <GraduationCap className="w-7 h-7 text-white" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Education & Training
          </h2>
          
          <p className="text-slate-600 dark:text-slate-400">
            Academic foundation and professional development
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {educationTimeline.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === educationTimeline.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
