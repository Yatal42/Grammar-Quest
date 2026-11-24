import { wordLevel, LEVEL_LABEL, VOCAB_LEVELS, type VocabCategory, type Word } from './vocab/base'
import { body, clothes, describing, family, feelings, friends, jobs, phrases } from './vocab/people'
import { actions, colorsShapes, food, fruitsVeg, home, kitchen, school, shopping, time } from './vocab/daily'
import { games, hobbies, holidays, musicMovies, sports, tech } from './vocab/fun'
import { animals, city, countries, environment, safety, space, travel, weather } from './vocab/world'
import { historyCivics, personality, scienceInquiry, societyPlanet, subjectsAdvanced } from './vocab/higher'
import {
  abstractIdeas,
  academicCore,
  academicReading,
  academicVerbs,
  dataMath,
  healthAdvanced,
  higherEducation,
  linkingWords,
  mediaPublic,
} from './vocab/academic'
import { argumentCraft, lifeScience, literatureCraft, physicalScience } from './vocab/upper'
import { academicPlus, civicEconomy, earthPolicy, healthScience, languageStudy, researchData } from './vocab/upper-more'

export type { VocabCategory, Word, VocabLevel } from './vocab/base'
export { wordLevel, LEVEL_LABEL, VOCAB_LEVELS }

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
  subjectsAdvanced,
  scienceInquiry,
  historyCivics,
  personality,
  societyPlanet,
  academicVerbs,
  linkingWords,
  abstractIdeas,
  academicReading,
  higherEducation,
  healthAdvanced,
  mediaPublic,
  dataMath,
  academicCore,
  literatureCraft,
  argumentCraft,
  lifeScience,
  physicalScience,
  earthPolicy,
  civicEconomy,
  healthScience,
  researchData,
  languageStudy,
  academicPlus,
]

export const wordKey = (categoryId: string, word: Word) => `${categoryId}:${word.en}`
