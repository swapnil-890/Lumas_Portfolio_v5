// src/data/graph.ts
// Derived relationship indexes linking systems, stack, and lab entities
import { systems } from './systems';
import { stack, type StackId } from './stack';

export const systemsUsing = (id: StackId) =>
  systems.filter((s) => (s.stackIds as readonly string[]).includes(id));

export const stackFor = (systemId: string) => {
  const s = systems.find((x) => x.id === systemId);
  return s ? stack.filter((i) => (s.stackIds as readonly string[]).includes(i.id)) : [];
};
