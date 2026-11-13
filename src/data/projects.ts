export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  category: 'ai' | 'automation' | 'web' | 'tool'
  featured: boolean
  image?: string
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'ai-pr-reviewer',
    title: 'AI PR Reviewer Agent',
    description:
      'An AI-powered pull request review system that analyzes code changes, identifies issues, provides feedback, and improves engineering quality.',
    longDescription:
      'Built an intelligent agent that automatically reviews pull requests, analyzing code for potential bugs, security vulnerabilities, performance issues, and coding standard violations. The system integrates seamlessly with CI/CD pipelines and provides actionable feedback to developers.',
    technologies: ['AI Agents', 'TypeScript', 'CI/CD', 'Code Analysis', 'Azure DevOps'],
    category: 'ai',
    featured: true,
  },
  {
    id: 'enterprise-automation',
    title: 'Enterprise Automation Framework',
    description:
      'A scalable automation framework supporting UI, API, and regression testing for enterprise applications.',
    longDescription:
      'Designed and implemented a comprehensive automation framework that handles complex enterprise workflows, supports both modern React applications and legacy systems, and integrates with quality gates for release management.',
    technologies: ['Playwright', 'TypeScript', 'API Testing', 'CI/CD', 'Azure DevOps'],
    category: 'automation',
    featured: true,
  },
  {
    id: 'code-quality-agent',
    title: 'Code Quality Maintenance Agent',
    description:
      'An intelligent agent designed to maintain coding standards, detect issues, and improve developer workflows.',
    longDescription:
      'Developed an AI-powered system that continuously monitors code quality, enforces coding standards, and provides automated suggestions for improvements. The agent learns from team preferences and adapts its recommendations accordingly.',
    technologies: ['AI Agents', 'TypeScript', 'Static Analysis', 'Git Hooks'],
    category: 'ai',
    featured: true,
  },
]
