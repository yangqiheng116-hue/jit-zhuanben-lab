import type { LessonContent, LessonMeta, Question, SubjectId } from '../types'
import { circuitLesson1 } from './circuit'
import { circuitRest } from './circuitRest'
import { controlLesson1 } from './control'
import { controlRest } from './controlRest'
import { englishLesson1 } from './english'
import { englishLessonsA } from './englishLessonsA'
import { englishLessonsB } from './englishLessonsB'
import { vocabLessons } from './vocabLessons'

const subjectLessons: LessonContent[] = [
  englishLesson1,
  ...englishLessonsA,
  ...englishLessonsB,
  circuitLesson1,
  ...circuitRest,
  controlLesson1,
  ...controlRest,
].sort((a, b) => a.subjectId.localeCompare(b.subjectId) || a.number - b.number)

export const LESSONS: LessonContent[] = [...subjectLessons, ...vocabLessons]

export function subjectLessonList(subjectId: SubjectId): LessonMeta[] {
  return subjectLessons
    .filter((lesson) => lesson.subjectId === subjectId)
    .map((lesson) => ({
      id: lesson.lessonId,
      number: lesson.number,
      title: lesson.title,
      available: true,
    }))
}

export function getLesson(lessonId: string): LessonContent | undefined {
  return LESSONS.find((lesson) => lesson.lessonId === lessonId)
}

export function allQuestions(lesson: LessonContent): Question[] {
  return [...lesson.exercises.basic, ...lesson.exercises.advanced]
}

export function findQuestion(questionId: string): Question | undefined {
  for (const lesson of LESSONS) {
    const found = allQuestions(lesson).find((question) => question.id === questionId)
    if (found) return found
  }
  return undefined
}

export function getQuestionLesson(questionId: string): LessonContent | undefined {
  return LESSONS.find((lesson) => allQuestions(lesson).some((question) => question.id === questionId))
}
