import { Link } from 'react-router-dom'
import { SUBJECTS, SUBJECT_NAME } from '../data/subjects'
import { formatDateTime } from '../lib/text'
import { studyPath } from '../lib/paths'
import { useStore } from '../state'

export function HomePage() {
  const { state } = useStore()
  const subjectLessonIds = new Set(SUBJECTS.flatMap((s) => s.lessons.map((l) => l.id)))
  const practicedLessons = Object.entries(state.lessonStatus).filter(
    ([id, status]) => status.practiced && subjectLessonIds.has(id),
  ).length
  const openTotal = SUBJECTS.reduce((n, s) => n + s.lessons.filter((l) => l.available).length, 0)
  const vocabPracticed = Object.entries(state.lessonStatus).filter(
    ([id, status]) => status.practiced && id.startsWith('vocab-'),
  ).length
  const unresolved = state.wrongBook.filter((w) => !w.resolved)
  const weakMap = new Map<string, number>()
  for (const item of unresolved) {
    for (const tag of item.knowledgePoints) {
      weakMap.set(tag, (weakMap.get(tag) ?? 0) + 1)
    }
  }
  const weaks = [...weakMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)
  const recent = state.scores.slice(0, 5)
  const hasData = state.scores.length > 0 || state.wrongBook.length > 0

  let diagnosis = '尚未开始练习。可以从英语、电路或自控任一节开始，也可以先做必会词汇第 1 单元。做完当堂练习后再回来看诊断。'
  if (hasData) {
    const parts: string[] = []
    parts.push(`已有 ${state.scores.length} 次练习记录，三科课程已练习 ${practicedLessons} / ${openTotal} 节，必会词汇已练习 ${vocabPracticed} / 20 单元。`)
    if (weaks.length > 0) {
      parts.push(`未订正错题主要集中在：${weaks.map(([k, n]) => `${k}（${n}）`).join('、')}。建议先到错题本把这些题目再做一遍。`)
    } else if (unresolved.length === 0 && state.wrongBook.length > 0) {
      parts.push('错题本中的题目都已订正。可以换一节继续做提高练习，或进入必会词汇下一单元。')
    } else if (unresolved.length === 0) {
      parts.push('目前没有未订正错题。')
    }
    diagnosis = parts.join('')
  }

  return (
    <div className="page home-page">
      <header className="page-hero">
        <p className="eyebrow">江苏五年一贯制高职专转本 · 个人备考</p>
        <h1>三科课程已全部开放</h1>
        <p className="lede">
          英语 18 节、电路分析 14 节、自动控制原理 15 节都按「今日目标 → 图文讲解 → 示范例题 → 当堂练习」来安排。英语每一节都有词汇、句型、短篇阅读和造句。另有专转本必会词汇 20 个单元。练习提交前不显示答案，提交后批改并记入错题本。
        </p>
      </header>

      <section className="subject-grid" aria-label="三科入口">
        {SUBJECTS.map((s) => {
          const available = s.lessons.filter((l) => l.available)
          const practiced = available.filter((l) => state.lessonStatus[l.id]?.practiced).length
          const first = available[0]
          return (
            <article key={s.id} className="subject-card">
              <h2>{s.name}</h2>
              <p>{s.summary}</p>
              <p className="progress-line">
                已练习 {practiced} / {s.plannedLessons} 节
                <span className="progress-hint">（{s.plannedLessons} 节均已开放）</span>
              </p>
              <div className="progress-track" aria-hidden="true">
                <span style={{ width: `${(practiced / s.plannedLessons) * 100}%` }} />
              </div>
              <div className="card-actions">
                <Link className="btn-primary" to={`/subject/${s.id}`}>
                  进入{s.name}
                </Link>
                {first ? (
                  <Link className="btn-text" to={`/lesson/${first.id}`}>
                    从第 1 节开始
                  </Link>
                ) : null}
              </div>
            </article>
          )
        })}
      </section>

      <section className="panel">
        <h2>专转本必会词汇</h2>
        <p>
          第一批 20 个单元、400 个核心词，面向英语二级到三级的阅读和造句。每个词有词性、中文、原创例句，单元里有英译中、中译英和选词填空。这不是全部大纲词汇。
        </p>
        <p className="progress-line">已练习 {vocabPracticed} / 20 单元</p>
        <div className="card-actions">
          <Link className="btn-primary" to="/vocab">
            进入必会词汇
          </Link>
          <Link className="btn-text" to="/lesson/vocab-1">
            从第 1 单元开始
          </Link>
        </div>
      </section>

      <section className="panel">
        <h2>学习概况</h2>
        <p className="diagnosis">{diagnosis}</p>
        <div className="overview-grid">
          <div>
            <h3>最近成绩</h3>
            {recent.length === 0 ? (
              <p className="muted">尚无成绩记录。</p>
            ) : (
              <ul className="plain-list">
                {recent.map((r) => (
                  <li key={r.id}>
                    <Link to={studyPath(r.lessonId)}>
                      {SUBJECT_NAME[r.subjectId]} · {r.lessonTitle}
                    </Link>
                    <span>
                      {r.score}/{r.total} · {r.difficulty === 'basic' ? '基础' : '提高'} · {formatDateTime(r.date)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p>
              <Link to="/scores">查看全部成绩记录</Link>
            </p>
          </div>
          <div>
            <h3>薄弱点</h3>
            {weaks.length === 0 ? (
              <p className="muted">暂无未订正错题，还不能归纳薄弱点。</p>
            ) : (
              <ul className="tag-list">
                {weaks.map(([tag, n]) => (
                  <li key={tag}>
                    {tag} <span>{n}</span>
                  </li>
                ))}
              </ul>
            )}
            <p>
              <Link to="/weak-points">查看薄弱点说明</Link>
              {' · '}
              <Link to="/wrong-book">打开错题本</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
