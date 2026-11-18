import type { SubjectId, SubjectMeta } from '../types'
import { subjectLessonList } from './lessons'

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'english',
    name: '英语',
    plannedLessons: 18,
    summary:
      '按专转本卷面训练阅读、词汇语法、完形、翻译和写作。18 节都已开放。英语基础较弱时，先把每节的词汇、句型和造句做完，再做短篇阅读。必会词汇 20 个单元另计，不占这 18 节。',
    lessons: subjectLessonList('english'),
  },
  {
    id: 'circuit',
    name: '电路分析',
    plannedLessons: 14,
    summary:
      '从参考方向和欧姆定律讲到交流功率。14 节都已开放。参考书：邱关源《电路》第 5 版。讲解、例题和练习均为原创，用来打专转本基础。',
    lessons: subjectLessonList('circuit'),
  },
  {
    id: 'control',
    name: '自动控制原理',
    plannedLessons: 15,
    summary:
      '从开环闭环讲到校正和状态空间。15 节都已开放。教材可对照孟华《自动控制原理》第 3 版或王艳东、程鹏《自动控制原理》第 3 版。',
    lessons: subjectLessonList('control'),
  },
]

export function getSubject(id: SubjectId): SubjectMeta {
  const found = SUBJECTS.find((subject) => subject.id === id)
  if (!found) throw new Error(`未知科目：${id}`)
  return found
}

export function getSubjectByLessonId(lessonId: string): SubjectMeta | undefined {
  return SUBJECTS.find((subject) => subject.lessons.some((lesson) => lesson.id === lessonId))
}

export const SUBJECT_NAME: Record<SubjectId, string> = {
  english: '英语',
  circuit: '电路分析',
  control: '自动控制原理',
}

export const DISCLAIMER =
  '2028 年招生政策和考试大纲尚未公布；内容按江苏五年一贯制高职专转本方向、对照金陵科技学院 2027 年相关参考书目打基础。电路参考书：邱关源《电路》第5版。自控教材可任选孟华《自动控制原理》（机械工业出版社，第3版）或王艳东、程鹏《自动控制原理》（高等教育出版社，第3版）。英语词汇专区是第一批核心词，不是全部大纲词汇。'
