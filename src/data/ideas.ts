export interface Idea {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly status: 'IDEA'
}

export const ideas: readonly Idea[] = [
  { id: 'bio-inspired-ornithopter', index: '01', title: 'Bio-Inspired Ornithopter', status: 'IDEA' },
  { id: 'offline-crop-disease-detection', index: '02', title: 'Offline Crop-Disease Detection', status: 'IDEA' },
  { id: 'river-water-level-early-warning', index: '03', title: 'River Water-Level Early Warning', status: 'IDEA' },
  { id: 'orbital-mechanics-simulator', index: '04', title: 'Orbital Mechanics Simulator', status: 'IDEA' },
]
