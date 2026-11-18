import type { SubjectId, SubjectMeta } from '../types'

export const SUBJECTS: SubjectMeta[] = [
  {
    id: 'english',
    name: '英语',
    plannedLessons: 18,
    summary: '先打稳独立组句和连接词，再逐步过渡到阅读与概括。计划约 18 节，第一版先开放第 1 节。',
    lessons: [{ id: 'english-1', number: 1, title: 'Although 与 Despite', available: true }],
  },
  {
    id: 'circuit',
    name: '电路分析',
    plannedLessons: 14,
    summary: '从参考方向、欧姆定律和功率正负入手。计划约 14 节，第一版先开放第 1 节。参考书：邱关源《电路》第 5 版。',
    lessons: [{ id: 'circuit-1', number: 1, title: '参考方向、欧姆定律与功率的正负', available: true }],
  },
  {
    id: 'control',
    name: '自动控制原理',
    plannedLessons: 15,
    summary: '从开环与闭环、系统组成和稳准快入手。计划约 15 节，第一版先开放第 1 节。',
    lessons: [{ id: 'control-1', number: 1, title: '开环与闭环，组成，稳准快', available: true }],
  },
]

export function getSubject(id: SubjectId): SubjectMeta {
  const found = SUBJECTS.find((s) => s.id === id)
  if (!found) throw new Error(`未知科目：${id}`)
  return found
}

export function getSubjectByLessonId(lessonId: string): SubjectMeta | undefined {
  return SUBJECTS.find((s) => s.lessons.some((l) => l.id === lessonId))
}

export const SUBJECT_NAME: Record<SubjectId, string> = {
  english: '英语',
  circuit: '电路分析',
  control: '自动控制原理',
}

export const DISCLAIMER =
  '2028 年招生政策和考试大纲尚未公布；内容按江苏五年一贯制高职专转本方向、对照金陵科技学院 2027 年相关参考书目打基础。电路参考书：邱关源《电路》第5版。自控教材可任选孟华《自动控制原理》（机械工业出版社，第3版）或王艳东、程鹏《自动控制原理》（高等教育出版社，第3版）。'
