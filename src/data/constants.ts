// Site and Personal Constants
// All hardcoded values should be defined here for easy maintenance

export const SITE_CONFIG = {
  name: 'Belay',
  fullName: 'Belay Birhanu',
  title: 'Senior QA Automation Engineer',
  tagline: 'Building intelligent automation systems that enable teams to ship reliable software faster.',
  location: 'Remote • Available Worldwide',
  availability: 'Available for opportunities',
  availabilityStatus: 'Available for new opportunities',
} as const

export const ROLES = [
  'Senior QA Automation Engineer',
  'AI Automation Engineer',
  'Quality Gate Specialist',
] as const

export const HERO_DESCRIPTION = {
  intro: 'I build',
  highlight: 'intelligent automation systems',
  middle: 'that enable teams to ship reliable software faster. Specializing in',
  specializations: [
    { text: 'enterprise test automation', color: 'cyan' },
    { text: 'AI-powered engineering agents', color: 'violet' },
    { text: 'quality engineering', color: 'amber' },
  ],
} as const

export const ABOUT_DESCRIPTION = {
  intro: "I'm a",
  title: 'Senior QA Automation Engineer',
  passion: 'passionate about building',
  highlight: 'intelligent automation systems',
  rest: ', improving engineering quality, and creating tools that empower developers and QA teams.',
  secondParagraph: 'With expertise spanning enterprise test automation, AI engineering agents, and modern frontend development, I build systems that go beyond testing—systems that improve engineering processes, automate reviews, maintain code quality, and accelerate delivery.',
  quote: "I don't only test software. I build systems that make software better.",
} as const

export const STATS = [
  { value: '6+', label: 'Years Experience' },
  { value: '25+', label: 'Components Built' },
  { value: '1300+', label: 'Training Hours' },
] as const

export const FOOTER_DESCRIPTION = 'Senior QA Automation Engineer building intelligent automation systems that enable teams to ship reliable software faster.' as const

export const SECTION_HEADERS = {
  about: {
    badge: 'About Me',
    title: 'Who I Am',
  },
  contact: {
    badge: 'Get In Touch',
    title: "Let's Work Together",
    description: "Have a project in mind or want to discuss opportunities? I'd love to hear from you.",
  },
} as const

export const CTA_LABELS = {
  getInTouch: 'Get In Touch',
  viewWork: 'View My Work',
  resume: 'Resume',
  contactMe: 'Contact Me',
  scrollToExplore: 'Scroll to explore',
  backToTop: 'Back to top',
  sendMessage: 'Send Message',
  messageSent: 'Message Sent!',
} as const

export const FORM_LABELS = {
  yourName: 'Your Name',
  emailAddress: 'Email Address',
  message: 'Message',
  namePlaceholder: 'John Doe',
  emailPlaceholder: 'john@example.com',
  messagePlaceholder: 'Tell me about your project or opportunity...',
} as const

export const CONTACT_INFO = {
  emailLabel: 'Email',
  locationLabel: 'Location',
  connectLabel: 'Connect with me',
} as const
