// src/data/lab.ts
// Hardware, robotics, and physical systems engineering
import type { LabEntry } from './types';

export const labEntries: readonly LabEntry[] = [
  {
    id: 'steel-raven',
    code: 'LAB-01',
    name: 'Steel Raven',
    category: 'ROBOTICS · AERODYNAMICS',
    status: 'PROTOTYPE', // Verified state per operator decision D4
    caseStudySlug: '/work/steel-raven',
    summary:
      'Biomimetic autonomous UAV airframe and control architecture. Investigates mechanical efficiency, wing articulation kinematics, and composite material load bearing to bridge computational navigation with physical aeronautics.',
    currentWork: [
      'Wing articulation mechanical linkage optimization',
      'Carbon-fiber reinforced polymer (CFRP) structural rigidity testing',
      'Parametric generative airframe brackets in Fusion 360',
      'Low-latency onboard sensor telemetry integration',
    ],
  },
];
