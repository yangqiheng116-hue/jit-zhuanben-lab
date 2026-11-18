import type { LessonContent } from '../types'
import { circuitLesson1, getCircuitQuestion } from './circuit'
import { controlLesson1, getControlQuestion } from './control'
import { englishLesson1, getEnglishQuestion } from './english'

export const LESSONS: LessonContent[] = [englishLesson1, circuitLesson1, controlLesson1]

export function getLesson(lessonId: string): LessonContent | undefined {
  return LESSONS.find((l) => l.lessonId === lessonId)
}

export function findQuestion(questionId: string) {
  return getEnglishQuestion(questionId) ?? getCircuitQuestion(questionId) ?? getControlQuestion(questionId)
}

export function getQuestionLesson(questionId: string): LessonContent | undefined {
  return LESSONS.find((l) => {
    const all = [...l.exercises.basic, ...l.exercises.advanced]
    return all.some((q) => q.id === questionId)
  })
}
