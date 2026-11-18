import { Link } from 'react-router-dom'
import { vocabLessons } from '../data/vocabLessons'
import { formatDateTime } from '../lib/text'
import { useStore } from '../state'

export function VocabIndexPage() {
  const { state } = useStore()
  const done = vocabLessons.filter((unit) => state.lessonStatus[unit.lessonId]?.practiced).length

  return (
    <div className="page">
      <nav className="crumb no-print">
        <Link to="/">首页</Link>
        <span> / </span>
        <span>必会词汇</span>
      </nav>
      <header className="page-head">
        <p className="eyebrow">英语 · 第一批核心词</p>
        <h1>专转本必会词汇</h1>
        <p className="lede">
          20 个单元，每单元 20 个词，共 400 个词。面向英语二级到三级，用来支撑阅读和造句。这是第一批核心词，不是 3000–3500 的全部大纲词汇。进度另计，不计入英语 18 节课。
        </p>
        <p className="muted">已练习 {done} / 20 单元。自测提交后计入成绩和错题本。</p>
      </header>
      <ol className="lesson-list">
        {vocabLessons.map((unit) => {
          const status = state.lessonStatus[unit.lessonId]
          return (
            <li key={unit.lessonId} className="lesson-row">
              <div>
                <p className="lesson-num">第 {unit.number} 单元</p>
                <h2>{unit.title}</h2>
                {status?.practiced ? (
                  <p className="muted">
                    上次自测 {status.lastScore}/{status.lastTotal}（{status.lastDifficulty === 'advanced' ? '提高' : '基础'}
                    {status.lastDate ? `，${formatDateTime(status.lastDate)}` : ''}）
                  </p>
                ) : (
                  <p className="muted">20 个词 · 尚未自测</p>
                )}
              </div>
              <Link className="btn-primary" to={`/vocab/${unit.lessonId}`}>
                {status?.practiced ? '继续' : '学习'}
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
