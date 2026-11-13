export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
  thesis?: {
    title: string
    areas: string[]
  }
  capstone?: {
    title: string
    areas: string[]
  }
}

export const education: Education[] = [
  {
    id: 'msc',
    institution: 'Adama Science and Technology University',
    degree: 'Master of Science (MSc)',
    field: 'Computer Science and Engineering',
    startDate: 'October 2021',
    endDate: 'June 2023',
    gpa: '3.81 / 4.0',
    thesis: {
      title: 'Sentiment Analysis on Social Media in Afaan Oromo Using Multilingual BERT',
      areas: [
        'Natural Language Processing',
        'Multilingual Language Models',
        'Sentiment Analysis',
        'Data Cleaning',
        'Data Annotation',
        'Social Media Analysis',
      ],
    },
  },
  {
    id: 'bsc',
    institution: 'Mekelle Institute of Technology',
    degree: 'Bachelor of Science (BSc)',
    field: 'Computer Science and Engineering',
    startDate: 'October 2014',
    endDate: 'June 2018',
    gpa: '3.83 / 4.0',
    capstone: {
      title:
        'Detection and Classification of Agricultural Plant Leaf Diseases Using ConvNet and Image Processing',
      areas: [
        'Machine Learning',
        'Computer Vision',
        'Convolutional Neural Networks',
        'Image Processing',
        'Classification Algorithms',
      ],
    },
  },
]

export interface Language {
  name: string
  level: string
  flag?: string
}

export const languages: Language[] = [
  { name: 'English', level: 'Fluent' },
  { name: 'Amharic', level: 'Native' },
  { name: 'Afaan Oromo', level: 'Native' },
]
