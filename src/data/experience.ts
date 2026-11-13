export interface Experience {
  id: string
  company: string
  role: string
  type: 'work' | 'education' | 'volunteer'
  location: string
  remote: boolean
  startDate: string
  endDate: string
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements: string[]
  isHighlighted?: boolean
}

/**
 * Parses a date string like "July 2025" or "Present" into a Date object
 */
const parseExperienceDate = (dateStr: string): Date => {
  if (dateStr === 'Present') {
    return new Date()
  }
  const [month, year] = dateStr.split(' ')
  const monthIndex = new Date(`${month} 1, 2000`).getMonth()
  return new Date(parseInt(year), monthIndex, 1)
}

/**
 * Calculates human-readable duration between two date strings
 */
export const calculateDuration = (startDate: string, endDate: string): string => {
  const start = parseExperienceDate(startDate)
  const end = parseExperienceDate(endDate)

  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())

  // Include partial month if we're in "Present" (current month counts)
  if (endDate === 'Present') {
    months += 1
  }

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) {
    return remainingMonths === 1 ? '1 month' : `${remainingMonths} months`
  }
  if (remainingMonths === 0) {
    return years === 1 ? '1 year' : `${years} years`
  }
  const yearStr = years === 1 ? '1 year' : `${years} years`
  const monthStr = remainingMonths === 1 ? '1 month' : `${remainingMonths} months`
  return `${yearStr}, ${monthStr}`
}

/**
 * Calculates total years of experience from the earliest start date to now
 */
export const calculateTotalExperience = (experiences: Experience[]): number => {
  const workExperiences = experiences.filter(exp => exp.type === 'work')
  if (workExperiences.length === 0) return 0

  const earliestStart = workExperiences.reduce((earliest, exp) => {
    const expDate = parseExperienceDate(exp.startDate)
    return expDate < earliest ? expDate : earliest
  }, parseExperienceDate(workExperiences[0].startDate))

  const now = new Date()
  const years = (now.getFullYear() - earliestStart.getFullYear()) +
    (now.getMonth() - earliestStart.getMonth()) / 12

  return Math.floor(years)
}

export const experiences: Experience[] = [
  {
    id: 'computrition',
    company: 'Computrition',
    role: 'Senior QA Automation Engineer',
    type: 'work',
    location: 'Boston, USA',
    remote: true,
    startDate: 'April 2026',
    endDate: 'Present',
    description:
      'Leading enterprise automation initiatives, building AI-powered engineering agents, and driving quality improvements across the organization.',
    responsibilities: [
      'Lead enterprise UI and API automation architecture',
      'Develop AI-powered engineering agents including PR Reviewer Agent and Code Quality Maintenance Agent',
      'Design and implement performance testing strategies',
      'Build release quality gates and CI/CD automation pipelines',
      'Mentor junior engineers and conduct code reviews',
      'Drive automation strategy across modern React applications and legacy enterprise systems',
      'Integrate AI into engineering workflows',
      'Improve software reliability and testing practices',
    ],
    technologies: [
      'Playwright',
      'TypeScript',
      'Node.js',
      'Azure DevOps',
      'Postman',
      'JMeter',
      'REST APIs',
      'Git',
      'CI/CD',
      'AI Agents',
    ],
    achievements: [
      'Built AI-powered PR review automation',
      'Developed enterprise-wide API automation frameworks',
      'Created quality gate solutions improving release reliability',
      'Led automation architecture decisions',
      'Mentored team on automation best practices',
    ],
    isHighlighted: true,
  },
  {
    id: 'computrition-junior',
    company: 'Computrition',
    role: 'Junior QA Automation Engineer',
    type: 'work',
    location: 'Boston, USA',
    remote: true,
    startDate: 'July 2025',
    endDate: 'April 2026',
    description:
      'Built enterprise automation solutions, improved release quality, and supported QA and development teams.',
    responsibilities: [
      'Design and maintain enterprise UI automation frameworks',
      'Develop API automation solutions',
      'Build performance testing solutions',
      'Maintain regression automation',
      'Modernize automation frameworks for modern and legacy systems',
      'Support CI/CD automation pipelines',
      'Collaborate with developers and support QA engineers',
    ],
    technologies: [
      'Playwright',
      'TypeScript',
      'Node.js',
      'Azure DevOps',
      'Postman',
      'JMeter',
      'REST APIs',
      'Git',
      'CI/CD',
    ],
    achievements: [
      'Automated enterprise UI workflows',
      'Developed API automation frameworks',
      'Improved testing reliability',
      'Supported QA automation strategy',
      'Worked across modern React applications and legacy enterprise systems',
    ],
    isHighlighted: false,
  },
  {
    id: '10academy-dev',
    company: '10 Academy',
    role: 'Frontend Developer',
    type: 'work',
    location: 'Santa Clara, USA',
    remote: true,
    startDate: 'September 2023',
    endDate: 'June 2025',
    description:
      'Built scalable, high-performance frontend applications focusing on performance, accessibility, maintainability, and modern frontend architecture.',
    responsibilities: [
      'Developed modern frontend applications',
      'Built reusable UI components',
      'Integrated APIs',
      'Implemented responsive designs',
      'Applied React optimization techniques',
      'Improved Progressive Web Application performance',
      'Optimized GraphQL data fetching',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Redux',
      'GraphQL',
      'TanStack Query',
      'Ant Design',
      'TailwindCSS',
      'WebSockets',
      'PWA',
      'Git',
    ],
    achievements: [
      'Improved application performance by identifying and eliminating rendering bottlenecks through React optimization techniques',
      'Applied memoization, lazy rendering, component splitting, and rendering optimization strategies',
      'Improved Progressive Web Application performance through dynamic imports, code splitting, asset optimization, and service worker caching',
      'Optimized GraphQL data fetching by improving queries and implementing intelligent caching strategies using TanStack Query',
      'Built 25+ reusable Ant Design components to improve UI consistency and development efficiency',
      'Implemented dynamic filtering systems with synchronized application state',
      'Developed real-time AI interview features using WebSockets',
      'Improved accessibility by following WCAG guidelines and applying strong TypeScript practices',
      'Improved development workflow using ESLint and Prettier standards',
      'Reduced unnecessary review cycles through better coding standards and maintainability',
    ],
    isHighlighted: false,
  },
  {
    id: '10academy-intern',
    company: '10 Academy',
    role: 'Frontend Developer Intern',
    type: 'work',
    location: 'Santa Clara, USA',
    remote: true,
    startDate: 'June 2023',
    endDate: 'September 2023',
    description: 'Developed modern frontend applications with focus on building reusable components.',
    responsibilities: [
      'Developed modern frontend applications',
      'Built reusable UI components',
      'Integrated APIs',
      'Implemented responsive designs',
    ],
    technologies: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'REST APIs'],
    achievements: [],
    isHighlighted: false,
  },
  {
    id: 'microverse-mentor',
    company: 'Microverse',
    role: 'Volunteer Mentor',
    type: 'volunteer',
    location: 'Remote',
    remote: true,
    startDate: 'October 2022',
    endDate: 'June 2023',
    description: 'Mentored software developers and conducted code reviews.',
    responsibilities: [
      'Mentored software developers',
      'Conducted code reviews',
      'Helped developers debug complex issues',
      'Supported software engineering best practices',
      'Guided developers through professional workflows',
    ],
    technologies: ['Ruby', 'Rails', 'JavaScript', 'React', 'Redux', 'Git', 'GitHub'],
    achievements: [
      'Supported developers in becoming industry-ready engineers',
      'Improved collaboration and engineering practices',
    ],
    isHighlighted: false,
  },
  {
    id: 'microverse-student',
    company: 'Microverse',
    role: 'Full Stack Web Development Program',
    type: 'education',
    location: 'Remote',
    remote: true,
    startDate: 'October 2022',
    endDate: 'June 2023',
    description: 'Completed an intensive full-stack engineering program.',
    responsibilities: [],
    technologies: ['Ruby', 'Rails', 'JavaScript', 'React', 'Redux', 'Git', 'GitHub'],
    achievements: [
      'Completed 1300+ hours of software engineering training',
      'Mastered algorithms, data structures, and full-stack development',
      'Built applications using Ruby, Rails, JavaScript, React, and Redux',
      'Practiced professional remote pair programming',
      'Worked using GitHub workflows, Agile methodologies, and daily standups',
      'Collaborated with international software developers',
    ],
    isHighlighted: false,
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Web Developer',
    type: 'work',
    location: 'Hybrid',
    remote: false,
    startDate: 'January 2019',
    endDate: 'January 2021',
    description: 'Built custom websites and web applications for clients.',
    responsibilities: [
      'Built custom websites and web applications for clients',
      'Developed responsive user interfaces',
      'Delivered complete frontend and backend solutions',
      'Managed projects independently from development to deployment',
    ],
    technologies: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Node.js'],
    achievements: [
      'Delivered production-ready applications',
      'Built experience in client communication and software delivery',
    ],
    isHighlighted: false,
  },
  {
    id: 'haramaya-university',
    company: 'Haramaya University',
    role: 'Assistant Lecturer',
    type: 'work',
    location: 'Oromia, Ethiopia',
    remote: false,
    startDate: 'October 2019',
    endDate: 'September 2021',
    description:
      'Taught foundational computer science courses including C++, Database Management, and Computer Applications while mentoring students on their final-year projects.',
    responsibilities: [
      'Delivered engaging lectures on C++ programming and object-oriented concepts',
      'Taught Database Management Systems covering SQL, normalization, and relational design',
      'Instructed Computer Applications courses bridging theory with real-world use cases',
      'Mentored students on final-year capstone projects from ideation to implementation',
      'Provided personalized guidance to help students overcome technical challenges',
      'Designed practical assignments and assessments to reinforce learning',
      'Fostered a collaborative learning environment encouraging peer programming',
    ],
    technologies: ['C++', 'SQL', 'Database Design', 'Microsoft Office', 'Teaching', 'Mentorship'],
    achievements: [
      'Successfully mentored multiple student groups through their final-year projects',
      'Developed comprehensive course materials for C++ and Database courses',
      'Improved student engagement through hands-on practical sessions',
      'Built strong foundations in programming for hundreds of students',
    ],
    isHighlighted: false,
  },
]
