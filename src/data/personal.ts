export type ProfileImagePath = string | null

export interface PersonalData {
  readonly name: string
  readonly age: number
  readonly gender: string
  readonly timezone: string
  readonly role: string
  /**
   * Leave null until a real photo exists.
   * Set a path like "/profile.jpg" (placed in /public) to render an image.
   */
  readonly profileImage: ProfileImagePath
  readonly interests: readonly string[]
  readonly likes: readonly string[]
  readonly games: readonly string[]
  readonly dislikes: readonly string[]
  readonly focusAreas: readonly string[]
  readonly programming: readonly string[]
  readonly ecosystem: readonly string[]
}

export const personal: PersonalData = {
  name: 'Lumas',
  age: 19,
  gender: 'Male',
  timezone: 'IST (UTC+5:30)',
  role: 'AI & Data Science Student',
  profileImage: null,
  interests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Programming',
    'Scientific Computing',
    'Linux',
    'Robotics',
    'Aerospace',
    'Quantum Physics',
    'Cosmology',
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
    'Linux',
    'Kali Linux',
    'Docker',
    'Git',
    'GitHub',
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
