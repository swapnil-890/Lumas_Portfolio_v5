export interface Interest {
  readonly label: string
  readonly wiki: string
}

export interface ProfileImage {
  readonly src: string
  readonly alt: string
}

export interface ContactChannel {
  readonly id: string
  readonly label: string
  readonly value: string
  readonly actionHref: string
  readonly type: 'email' | 'phone' | 'whatsapp'
  readonly isPrimary: boolean
}

export interface PersonalData {
  readonly name: string
  readonly legalName: string
  readonly dob: string
  readonly age: number
  readonly gender: string
  readonly timezone: string
  readonly role: string
  readonly mindset: string
  /**
   * Profile images placed in /public/images/pfp/.
   * If empty, renders 'AWAITING INPUT' disc placeholder.
   */
  readonly profileImages: readonly ProfileImage[]
  readonly contact: {
    readonly emails: readonly ContactChannel[]
    readonly phones: readonly ContactChannel[]
    readonly whatsapps: readonly ContactChannel[]
  }
  readonly interests: readonly Interest[]
  readonly likes: readonly string[]
  readonly games: readonly string[]
  readonly dislikes: readonly string[]
  readonly focusAreas: readonly string[]
  readonly programming: readonly string[]
  readonly ecosystem: readonly string[]
}

/**
 * Calculates age dynamically from a YYYY-MM-DD date string.
 */
export function calculateAge(dob: string): number {
  const [year, month, day] = dob.split('-').map(Number)
  const birthDate = new Date(year, month - 1, day)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const personal: PersonalData = {
  name: 'Lumas',
  legalName: 'Swapnil Roy',
  dob: '2006-11-20',
  get age(): number {
    return calculateAge('2006-11-20')
  },
  gender: 'Male',
  timezone: 'IST (UTC+5:30)',
  role: 'AI & Data Science Student',
  mindset: 'Focused on understanding systems deeply rather than blindly copying tutorials.',
  profileImages: [
    { src: '/images/pfp/main-01.jpg', alt: 'Lumas — profile image 1' },
    { src: '/images/pfp/main-02.jpg', alt: 'Lumas — profile image 2' },
  ],
  contact: {
    emails: [
      {
        id: 'email-primary',
        label: 'Primary Gmail',
        value: 'swapnilroymldt@gmail.com',
        actionHref: 'mailto:swapnilroymldt@gmail.com',
        type: 'email',
        isPrimary: true,
      },
      {
        id: 'email-alt',
        label: 'Alternative Gmail',
        value: 'swapnilroy344@gmail.com',
        actionHref: 'mailto:swapnilroy344@gmail.com',
        type: 'email',
        isPrimary: false,
      },
    ],
    phones: [
      {
        id: 'phone-primary',
        label: 'Phone 1',
        value: '+91 9242233053',
        actionHref: 'tel:+919242233053',
        type: 'phone',
        isPrimary: true,
      },
      {
        id: 'phone-alt',
        label: 'Phone 2',
        value: '+91 7501946000',
        actionHref: 'tel:+917501946000',
        type: 'phone',
        isPrimary: false,
      },
    ],
    whatsapps: [
      {
        id: 'wa-primary',
        label: 'WhatsApp (Primary)',
        value: '+91 9242233053',
        actionHref: 'https://wa.me/919242233053',
        type: 'whatsapp',
        isPrimary: true,
      },
      {
        id: 'wa-alt',
        label: 'WhatsApp (Alt)',
        value: '+91 7501946000',
        actionHref: 'https://wa.me/917501946000',
        type: 'whatsapp',
        isPrimary: false,
      },
    ],
  },
  interests: [
    {
      label: 'Artificial Intelligence',
      wiki: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
    },
    {
      label: 'Machine Learning',
      wiki: 'https://en.wikipedia.org/wiki/Machine_learning',
    },
    {
      label: 'Data Science',
      wiki: 'https://en.wikipedia.org/wiki/Data_science',
    },
    {
      label: 'Programming',
      wiki: 'https://en.wikipedia.org/wiki/Computer_programming',
    },
    {
      label: 'Scientific Computing',
      wiki: 'https://en.wikipedia.org/wiki/Computational_science',
    },
    {
      label: 'Linux',
      wiki: 'https://en.wikipedia.org/wiki/Linux',
    },
    {
      label: 'Robotics',
      wiki: 'https://en.wikipedia.org/wiki/Robotics',
    },
    {
      label: 'Aerospace',
      wiki: 'https://en.wikipedia.org/wiki/Aerospace',
    },
    {
      label: 'Quantum Physics',
      wiki: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
    },
    {
      label: 'Cosmology',
      wiki: 'https://en.wikipedia.org/wiki/Physical_cosmology',
    },
  ],
  likes: [
    'Science & technology',
    'Space exploration',
    'Documentaries',
    'Gaming',
    'Robotics',
    'Coffee',
    'Meaningful conversations',
  ],
  games: ['Valorant', 'Minecraft', 'Genshin Impact'],
  dislikes: [
    'Unnecessary drama',
    'Misinformation',
    'Abandoning projects halfway',
    'Pointless / dry conversations',
  ],
  focusAreas: ['AI / ML', 'Scientific Computing', 'Robotics', 'Aerospace'],
  programming: ['C', 'C++', 'Python', 'SQL'],
  ecosystem: [
    'Linux / Kali',
    'Docker',
    'Git / GitHub',
    'VS Code',
    'Android Studio',
    'Python',
    'PyTorch',
    'Ollama',
    'Anaconda',
    'ADB',
    'PowerShell',
  ],
}
