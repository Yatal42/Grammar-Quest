import type { Question } from '../topics'
import { grade10, grade11 } from './grade10'
import { grade6 } from './grade6'
import { grade7 } from './grade7'
import { grade8 } from './grade8'
import { grade9 } from './grade9'

export const GENERATORS: Record<string, () => Question[]> = {
  ...grade6,
  ...grade7,
  ...grade8,
  ...grade9,
  ...grade10,
  ...grade11,
}
