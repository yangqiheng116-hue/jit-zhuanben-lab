import { useMemo, useState } from 'react'
import type { Difficulty, GradeDetail, Question } from '../types'
import { formatAnswers } from '../lib/text'
import { Prose } from './Prose'
import { MathText } from './MathText'

export interface QuestionResult {
  question: Question
  answers: Record<string, string>
  grade: GradeDetail
}

export function ExerciseSet({
  questions,
  difficulty,
  disabled,
  onSubmitted,
}: {
  questions: Question[]
  difficulty: Difficulty
  disabled?: boolean
  onSubmitted: (results: QuestionResult[]) => void
}) {
  const initial = useMemo(() => {
    const acc: Record<string, Record<string, string>> = {}
    for (const q of questions) {
      acc[q.id] = Object.fromEntries(q.fields.map((f) => [f.id, '']))
    }
    return acc
  }, [questions])

  const [answers, setAnswers] = useState(initial)
  const [results, setResults] = useState<QuestionResult[] | null>(null)
  const [error, setError] = useState('')

  function setField(qid: string, fid: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qid]: { ...prev[qid], [fid]: value } }))
  }

  function submit() {
    const graded: QuestionResult[] = questions.map((q) => {
      const a = answers[q.id] ?? {}
      return { question: q, answers: a, grade: q.grade(a) }
    })
    setResults(graded)
    setError('')
    onSubmitted(graded)
  }

  function reset() {
    setAnswers(initial)
    setResults(null)
    setError('')
  }

  const submitted = results !== null
  const score = results ? results.filter((r) => r.grade.correct).length : 0

  return (
    <form
      className="exercise-set"
      onSubmit={(e) => {
        e.preventDefault()
        if (submitted || disabled) return
        const empty = questions.every((q) =>
          q.fields.every((f) => !(answers[q.id]?.[f.id] ?? '').trim()),
        )
        if (empty) {
          setError('请先作答再提交。')
          return
        }
        submit()
      }}
    >
      <p className="exercise-note">
        当前为{difficulty === 'basic' ? '基础' : '提高'}练习。先作答，提交后再显示批改和解析。
      </p>
      {questions.map((q, index) => {
        const result = results?.find((r) => r.question.id === q.id)
        return (
          <section
            key={q.id}
            className={`question-card${result ? (result.grade.correct ? ' is-correct' : ' is-wrong') : ''}`}
            aria-labelledby={`${q.id}-title`}
          >
            <header className="question-head">
              <h3 id={`${q.id}-title`}>第 {index + 1} 题</h3>
              {result ? (
                <span className={result.grade.correct ? 'tag tag-ok' : 'tag tag-bad'}>
                  {result.grade.correct ? '正确' : '不正确'}
                </span>
              ) : null}
            </header>
            <Prose blocks={q.promptBlocks} />
            <div className="fields">
              {q.fields.map((f) => {
                const value = answers[q.id]?.[f.id] ?? ''
                const part = result?.grade.partResults?.find((p) => p.id === f.id)
                return (
                  <label key={f.id} className="field">
                    <span className="field-label">
                      {f.label}
                      {part ? (
                        <span className={part.correct ? 'hint-ok' : 'hint-bad'}>
                          {part.correct ? '正确' : `应为 ${part.expected}`}
                        </span>
                      ) : null}
                    </span>
                    {f.type === 'textarea' ? (
                      <textarea
                        value={value}
                        placeholder={f.placeholder}
                        disabled={submitted || disabled}
                        rows={3}
                        onChange={(e) => setField(q.id, f.id, e.target.value)}
                      />
                    ) : f.type === 'select' ? (
                      <select
                        value={value}
                        disabled={submitted || disabled}
                        onChange={(e) => setField(q.id, f.id, e.target.value)}
                      >
                        <option value="">请选择</option>
                        {f.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="field-inline">
                        <input
                          type="text"
                          inputMode={f.type === 'number' ? 'decimal' : 'text'}
                          value={value}
                          placeholder={f.placeholder}
                          disabled={submitted || disabled}
                          onChange={(e) => setField(q.id, f.id, e.target.value)}
                        />
                        {f.unit ? <span className="unit">{f.unit}</span> : null}
                      </span>
                    )}
                  </label>
                )
              })}
            </div>
            {result ? (
              <div className="feedback">
                <div className="feedback-block">
                  <h4>参考答案</h4>
                  <pre className="model-answer">{result.grade.modelAnswer}</pre>
                </div>
                <div className="feedback-block">
                  <h4>解析</h4>
                  <div className="explanation">
                    {result.grade.explanation.split('\n').map((line, i) => (
                      <p key={i}>
                        <MathText text={line} />
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        )
      })}

      {error ? <p className="form-error">{error}</p> : null}

      <div className="exercise-actions no-print">
        {!submitted ? (
          <button type="submit" className="btn-primary" disabled={disabled}>
            提交本套练习
          </button>
        ) : (
          <>
            <p className="score-banner">
              本次得分：{score} / {questions.length}
            </p>
            <button type="button" className="btn-secondary" onClick={reset}>
              再练一次
            </button>
          </>
        )}
      </div>
    </form>
  )
}

export function answersPreview(result: QuestionResult): string {
  return formatAnswers(result.answers, result.question.fields)
}
