import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExerciseSet, type QuestionResult } from '../components/ExerciseSet'
import { SUBJECT_NAME } from '../data/subjects'
import { findQuestion, getQuestionLesson } from '../data/lessons'
import { formatDateTime } from '../lib/text'
import { useStore } from '../state'
import { MathText } from '../components/MathText'

export function WrongBookPage() {
  const { state, recordAttempt, resolveWrong } = useStore()
  const [filter, setFilter] = useState<'open' | 'all'>('open')
  const [retryId, setRetryId] = useState<string | null>(null)

  const items = useMemo(() => {
    const list = filter === 'open' ? state.wrongBook.filter((w) => !w.resolved) : state.wrongBook
    return list
  }, [filter, state.wrongBook])

  const retryItem = state.wrongBook.find((w) => w.id === retryId)
  const retryQuestion = retryItem ? findQuestion(retryItem.questionId) : undefined
  const retryLesson = retryItem ? getQuestionLesson(retryItem.questionId) : undefined

  function onRetry(results: QuestionResult[]) {
    if (!retryItem || !retryLesson || !retryQuestion) return
    const result = results[0]
    if (!result) return
    if (result.grade.correct) {
      resolveWrong(retryItem.id)
    } else {
      recordAttempt({
        subjectId: retryLesson.subjectId,
        lessonId: retryLesson.lessonId,
        lessonTitle: `第${retryLesson.number}节 ${retryLesson.title}（错题订正）`,
        score: 0,
        total: 1,
        difficulty: state.difficulty,
        misses: [
          {
            subjectId: retryLesson.subjectId,
            lessonId: retryLesson.lessonId,
            lessonTitle: retryLesson.title,
            questionId: retryQuestion.id,
            knowledgePoints: retryQuestion.knowledgePoints,
            promptText: retryItem.promptText,
            userAnswer: result.answers
              ? Object.values(result.answers).join('；')
              : '',
            modelAnswer: result.grade.modelAnswer,
            explanation: result.grade.explanation,
          },
        ],
        correctQuestionIds: [],
        touchLessonStatus: false,
      })
    }
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">练习记录</p>
        <h1>错题本</h1>
        <p className="lede">提交练习后，答错的题目会自动收录。订正正确后标记为已订正，仍可在“全部”里查看。</p>
      </header>

      <div className="toolbar no-print">
        <div className="difficulty-switch" role="group" aria-label="筛选">
          <button
            type="button"
            className={filter === 'open' ? 'chip active' : 'chip'}
            onClick={() => setFilter('open')}
          >
            未订正（{state.wrongBook.filter((w) => !w.resolved).length}）
          </button>
          <button
            type="button"
            className={filter === 'all' ? 'chip active' : 'chip'}
            onClick={() => setFilter('all')}
          >
            全部（{state.wrongBook.length}）
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="muted">{filter === 'open' ? '目前没有未订正的错题。' : '错题本还是空的。做完练习并出现错误后，题目会出现在这里。'}</p>
      ) : (
        <ul className="record-list">
          {items.map((item) => (
            <li key={item.id} className="record-card">
              <div className="record-meta">
                <span>
                  {SUBJECT_NAME[item.subjectId]} · {item.lessonTitle}
                </span>
                <span>{item.resolved ? '已订正' : '未订正'}</span>
                <span>{formatDateTime(item.addedAt)}</span>
              </div>
              <div className="tag-list compact">
                {item.knowledgePoints.map((t) => (
                  <span key={t} className="mini-tag">
                    {t}
                  </span>
                ))}
              </div>
              <p className="prompt-preview">
                <MathText text={item.promptText} />
              </p>
              <p>
                <strong>当时作答：</strong>
                {item.userAnswer}
              </p>
              <div className="record-actions no-print">
                <Link to={`/lesson/${item.lessonId}`}>回到该节</Link>
                {!item.resolved && findQuestion(item.questionId) ? (
                  <button type="button" className="btn-secondary" onClick={() => setRetryId(item.id)}>
                    重新作答
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}

      {retryItem && retryQuestion ? (
        <div className="retry-panel">
          <h2>重新作答</h2>
          <p className="muted">
            {SUBJECT_NAME[retryItem.subjectId]} · {retryItem.lessonTitle} · {retryItem.knowledgePoints.join('、')}
          </p>
          <ExerciseSet
            key={retryItem.id}
            questions={[retryQuestion]}
            difficulty={state.difficulty}
            onSubmitted={(results) => onRetry(results)}
          />
          <button type="button" className="btn-text" onClick={() => setRetryId(null)}>
            关闭
          </button>
        </div>
      ) : null}
    </div>
  )
}
