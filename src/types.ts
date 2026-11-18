export type SubjectId = 'english' | 'circuit' | 'control'
export type Difficulty = 'basic' | 'advanced'

export const SUBJECT_IDS: SubjectId[] = ['english', 'circuit', 'control']

export interface LessonMeta {
  id: string
  number: number
  title: string
  available: boolean
}

export interface SubjectMeta {
  id: SubjectId
  name: string
  plannedLessons: number
  summary: string
  lessons: LessonMeta[]
}

export interface ScoreRecord {
  id: string
  date: string
  subjectId: SubjectId
  lessonId: string
  lessonTitle: string
  score: number
  total: number
  difficulty: Difficulty
}

export interface WrongItem {
  id: string
  subjectId: SubjectId
  lessonId: string
  lessonTitle: string
  questionId: string
  knowledgePoints: string[]
  promptText: string
  userAnswer: string
  modelAnswer: string
  explanation: string
  addedAt: string
  resolved: boolean
}

export interface LessonStatus {
  practiced: boolean
  lastScore?: number
  lastTotal?: number
  lastDate?: string
  lastDifficulty?: Difficulty
}

export interface AppState {
  version: 1
  difficulty: Difficulty
  scores: ScoreRecord[]
  wrongBook: WrongItem[]
  lessonStatus: Record<string, LessonStatus>
}

export interface VocabRow {
  word: string
  pos: string
  meaning: string
  example: string
  exampleZh?: string
  note?: string
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'formula'; tex: string }
  | { type: 'diagram'; id: string; caption?: string }
  | { type: 'callout'; tone: 'note' | 'warn' | 'rule'; title?: string; text: string }
  | { type: 'compare'; leftTitle: string; left: string[]; rightTitle: string; right: string[] }
  | { type: 'vocab'; items: VocabRow[] }
  | { type: 'passage'; title?: string; text: string }

export interface FieldOption {
  value: string
  label: string
}

export interface Field {
  id: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'select'
  options?: FieldOption[]
  unit?: string
  placeholder?: string
}

export interface PartResult {
  id: string
  label: string
  correct: boolean
  expected: string
}

export interface GradeDetail {
  correct: boolean
  partResults?: PartResult[]
  modelAnswer: string
  explanation: string
}

export interface Question {
  id: string
  knowledgePoints: string[]
  promptBlocks: Block[]
  fields: Field[]
  grade: (answers: Record<string, string>) => GradeDetail
}

export interface WorkedExample {
  title: string
  body: Block[]
  solution: Block[]
}

export interface LessonContent {
  subjectId: SubjectId
  lessonId: string
  number: number
  title: string
  goals: string[]
  sections: { title: string; blocks: Block[] }[]
  workedExamples: WorkedExample[]
  exercises: {
    basic: Question[]
    advanced: Question[]
  }
}

export interface BackupFile {
  version: 1
  exportedAt: string
  app: 'jit-zhuanben-lab'
  state: AppState
}
