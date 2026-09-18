export interface Idea {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly status: 'IDEA'
}

export const ideas: readonly Idea[] = [
  { id: 'robotic-bird', index: '01', title: 'Robotic Bird', status: 'IDEA' },
  { id: 'smart-dustbin', index: '02', title: 'Smart Dustbin', status: 'IDEA' },
  { id: 'calculator', index: '03', title: 'Calculator', status: 'IDEA' },
  { id: 'weather-identifier', index: '04', title: 'Weather Identifier', status: 'IDEA' },
]
