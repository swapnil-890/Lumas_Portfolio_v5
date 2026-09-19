export interface Idea {
  readonly id: string
  readonly index: string
  readonly title: string
  readonly status: 'IDEA'
}

export const ideas: readonly Idea[] = [
  { id: 'bio-mimetic-ornithopter', index: '01', title: 'Bio-Mimetic Ornithopter', status: 'IDEA' },
  { id: 'vision-waste-sorter', index: '02', title: 'Vision-Assisted Waste Sorter', status: 'IDEA' },
  { id: 'symbolic-calculator', index: '03', title: 'Symbolic Calculator', status: 'IDEA' },
  { id: 'microclimate-array', index: '04', title: 'Microclimate Sensor Array', status: 'IDEA' },
]
