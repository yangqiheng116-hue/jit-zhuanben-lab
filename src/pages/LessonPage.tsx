import { Link, Navigate, useParams } from 'react-router-dom'
import { DifficultySwitch } from '../components/DifficultySwitch'
import { answersPreview, ExerciseSet, type QuestionResult } from '../components/ExerciseSet'
import { Prose } from '../components/Prose'
import { SUBJECT_NAME } from '../data/subjects'
import { getLesson } from '../data/lessons'
import { useStore } from '../state'
import { formatDateTime } from '../lib/text'

export function LessonPage() {
  const params = useParams()
  const lessonId = params.lessonId ?? params.unitId
  const { state, setDifficulty, recordAttempt } = useStore()
  const lesson = lessonId ? getLesson(lessonId) : undefined
  if (!lessonId || !lesson) return <Navigate to="/" replace />

  const questions = state.difficulty === 'advanced' ? lesson.exercises.advanced : lesson.exercises.basic
  const status = state.lessonStatus[lesson.lessonId]
  const isVocab = lesson.lessonId.startsWith('vocab-')
  const subjectPath = isVocab ? '/vocab' : `/subject/${lesson.subjectId}`
  const unitLabel = isVocab ? '单元' : '节'

  function handleSubmit(results: QuestionResult[]) {
    const current = lesson
    if (!current) return
    const misses = results
      .filter((r) => !r.grade.correct)
      .map((r) => ({
        subjectId: current.subjectId,
        lessonId: current.lessonId,
        lessonTitle: current.title,
        questionId: r.question.id,
        knowledgePoints: r.question.knowledgePoints,
        promptText: r.question.promptBlocks
          .map((b) => {
            if (b.type === 'p' || b.type === 'callout') return b.text
            if (b.type === 'ul' || b.type === 'ol') return b.items.join(' ')
            if (b.type === 'passage') return b.text
            if (b.type === 'vocab') return b.items.map((item) => item.word).join('、')
            if (b.type === 'formula') return b.tex
            return ''
          })
          .filter(Boolean)
          .join('\n'),
        userAnswer: answersPreview(r),
        modelAnswer: r.grade.modelAnswer,
        explanation: r.grade.explanation,
      }))
    recordAttempt({
      subjectId: current.subjectId,
      lessonId: current.lessonId,
      lessonTitle: isVocab ? `必会词汇 第${current.number}单元 ${current.title}` : `第${current.number}节 ${current.title}`,
      score: results.filter((r) => r.grade.correct).length,
      total: results.length,
      difficulty: state.difficulty,
      misses,
      correctQuestionIds: results.filter((r) => r.grade.correct).map((r) => r.question.id),
    })
  }

  return (
    <article className="page lesson-page">
      <nav className="crumb no-print">
        <Link to="/">首页</Link>
        <span> / </span>
        <Link to={subjectPath}>{isVocab ? '必会词汇' : SUBJECT_NAME[lesson.subjectId]}</Link>
        <span> / </span>
        <span>
          第 {lesson.number} {unitLabel}
        </span>
      </nav>

      <header className="page-head">
        <p className="eyebrow">
          {isVocab ? '必会词汇' : SUBJECT_NAME[lesson.subjectId]} · 第 {lesson.number} {unitLabel}
        </p>
        <h1>{lesson.title}</h1>
        {status?.practiced ? (
          <p className="muted">
            上次练习 {status.lastScore}/{status.lastTotal}（{status.lastDifficulty === 'advanced' ? '提高' : '基础'}
            {status.lastDate ? `，${formatDateTime(status.lastDate)}` : ''}）。可以继续往下看，或直接再做一套练习。
          </p>
        ) : (
          <p className="muted">先看讲解和示范例题，再做当堂练习。提交前不会显示答案。</p>
        )}
      </header>

      <section className="lesson-section" id="goals">
        <h2>今日目标</h2>
        <ul className="goal-list">
          {lesson.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      {lesson.sections
        .filter((s) => s.title !== '今日目标')
        .map((section) => (
          <section key={section.title} className="lesson-section">
            <h2>{section.title}</h2>
            <Prose blocks={section.blocks} />
          </section>
        ))}

      <section className="lesson-section" id="examples">
        <h2>示范例题</h2>
        <p className="section-lead">下面的例题可以先自己想一遍，解答是展开写的，供对照。</p>
        {lesson.workedExamples.map((ex) => (
          <div key={ex.title} className="example-card">
            <h3>{ex.title}</h3>
            <Prose blocks={ex.body} />
            <div className="example-solution">
              <h4>解答</h4>
              <Prose blocks={ex.solution} />
            </div>
          </div>
        ))}
      </section>

      <section className="lesson-section" id="exercises">
        <div className="section-head">
          <h2>当堂练习</h2>
          <DifficultySwitch value={state.difficulty} onChange={setDifficulty} />
        </div>
        <p className="section-lead">
          {state.difficulty === 'basic'
            ? '基础题对应本节必须掌握的规则和计算。'
            : '提高题仍控制在专转本范围内，只是把条件或判断稍微加难一点。'}
          难度选择会记住，下次打开仍是当前档。
        </p>
        <ExerciseSet
          key={`${lesson.lessonId}-${state.difficulty}`}
          questions={questions}
          difficulty={state.difficulty}
          onSubmitted={handleSubmit}
        />
      </section>
    </article>
  )
}
