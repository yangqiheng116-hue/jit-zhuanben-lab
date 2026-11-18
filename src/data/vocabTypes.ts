export interface VocabWordData {
  word: string
  pos: string
  meaning: string
  example: string
  exampleZh: string
  note?: string
  /** 英译中可接受的中文，至少两个说法。 */
  zh: string[]
  /** 中译英可接受的拼写，含词形本身。 */
  en: string[]
}

export interface VocabUnitData {
  number: number
  title: string
  blurb: string
  words: VocabWordData[]
}
