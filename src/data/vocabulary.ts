import type { VocabCategory, Word } from './vocab/base'
import { body, clothes, describing, family, feelings, friends, jobs, phrases } from './vocab/people'
import { actions, colorsShapes, food, fruitsVeg, home, kitchen, school, shopping, time } from './vocab/daily'
import { games, hobbies, holidays, musicMovies, sports, tech } from './vocab/fun'
import { animals, city, countries, environment, safety, space, travel, weather } from './vocab/world'

export type { VocabCategory, Word }

export const VOCABULARY: VocabCategory[] = [
  family,
  friends,
  describing,
  feelings,
  body,
  clothes,
  home,
  kitchen,
  food,
  fruitsVeg,
  school,
  actions,
  hobbies,
  sports,
  games,
  musicMovies,
  tech,
  holidays,
  animals,
  weather,
  environment,
  space,
  city,
  travel,
  shopping,
  jobs,
  time,
  colorsShapes,
  countries,
  safety,
  phrases,
]

export const wordKey = (categoryId: string, word: Word) => `${categoryId}:${word.en}`
