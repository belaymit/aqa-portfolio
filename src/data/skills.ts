export interface Skill {
  name: string
  icon?: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: string
  skills: Skill[]
  highlighted?: boolean
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'Monitor',
    skills: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Redux' },
      { name: 'Next.js' },
      { name: 'Vue.js' },
      { name: 'TailwindCSS' },
      { name: 'Ant Design' },
      { name: 'shadcn/ui' },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'Server',
    skills: [
      { name: 'Node.js' },
      { name: '.NET' },
      { name: 'C#' },
      { name: 'Ruby' },
      { name: 'Rails' },
      { name: 'FastAPI' },
      { name: 'NestJS' },
      { name: 'Strapi' },
      { name: 'Prisma' },
      { name: 'GraphQL' },
      { name: 'REST API' },
      { name: 'SQL' },
      { name: 'MySQL' },
      { name: 'Python' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation & Quality Engineering',
    icon: 'TestTube',
    highlighted: true,
    skills: [
      { name: 'Playwright' },
      { name: 'Postman' },
      { name: 'JMeter' },
      { name: 'UI Automation' },
      { name: 'API Automation' },
      { name: 'Performance Testing' },
      { name: 'Regression Testing' },
      { name: 'End-to-End Testing' },
      { name: 'Accessibility Testing' },
      { name: 'CI/CD Quality Gates' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'Wrench',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Azure DevOps' },
      { name: 'AWS' },
      { name: 'Netlify' },
      { name: 'Chrome DevTools' },
      { name: 'Cursor' },
      { name: 'Claude Code' },
      { name: 'Kiro' },
      { name: 'Antigravity' },
      { name: 'ChatGPT' },
      { name: 'GitHub Copilot' },
    ],
  },
]
