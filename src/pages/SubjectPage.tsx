import { Link, Navigate, useParams } from 'react-router-dom'
import { SUBJECTS } from '../data/subjects'
import { formatDateTime } from '../lib/text'
import { useStore } from '../state'
import type { SubjectId } from '../types'

function isSubjectId(value: string | undefined): value is SubjectId {
  return value === 'english' || value === 'circuit' || value === 'control'
}

export function SubjectPage() {
  const { subjectId } = useParams()
  const { state } = useStore()
  if (!isSubjectId(subjectId)) return <Navigate to="/" replace />
  const subject = SUBJECTS.find((s) => s.id === subjectId)
  if (!subject) return <Navigate to="/" replace />

  const upcoming = Math.max(0, subject.plannedLessons - subject.lessons.length)

  return (
    <div className="page">
      <nav className="crumb no-print">
        <Link to="/">首页</Link>
        <span> / </span>
        <span>{subject.name}</span>
      </nav>
      <header className="page-head">
        <p className="eyebrow">科目</p>
        <h1>{subject.name}</h1>
        <p className="lede">{subject.summary}</p>
        {subject.id === 'english' ? (
          <p>
            <Link to="/vocab">进入专转本必会词汇（20 个单元，400 词，不计入这 18 节）</Link>
          </p>
        ) : null}
      </header>
      <ol className="lesson-list">
        {subject.lessons.map((lesson) => {
          const status = state.lessonStatus[lesson.id]
          return (
            <li key={lesson.id} className="lesson-row">
              <div>
                <p className="lesson-num">第 {lesson.number} 节</p>
                <h2>{lesson.title}</h2>
                {status?.practiced ? (
                  <p className="muted">
                    上次练习 {status.lastScore}/{status.lastTotal}（{status.lastDifficulty === 'advanced' ? '提高' : '基础'}
                    {status.lastDate ? `，${formatDateTime(status.lastDate)}` : ''}）
                  </p>
                ) : (
                  <p className="muted">尚未开始练习</p>
                )}
              </div>
              {lesson.available ? (
                <Link className="btn-primary" to={`/lesson/${lesson.id}`}>
                  {status?.practiced ? '继续学习' : '开始学习'}
                </Link>
              ) : (
                <span className="badge">即将更新</span>
              )}
            </li>
          )
        })}
        {upcoming > 0 ? (
          <li className="lesson-row is-upcoming">
            <div>
              <p className="lesson-num">
                第 {subject.lessons.length + 1}–{subject.plannedLessons} 节
              </p>
              <h2>即将更新</h2>
              <p className="muted">
                本版先开放第 1 节，后续课程按同一结构补入。本科目计划约 {subject.plannedLessons} 节，其余 {upcoming} 节尚未发布。
              </p>
            </div>
            <span className="badge">即将更新</span>
          </li>
        ) : null}
      </ol>
    </div>
  )
}
