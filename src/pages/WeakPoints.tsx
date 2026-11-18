import { Link } from 'react-router-dom'
import { SUBJECT_NAME } from '../data/subjects'
import { useStore } from '../state'

const TAG_HELP: Record<string, string> = {
  让步结构: 'Although / Even though 后接完整句子；Despite / In spite of 后接名词、动名词或 the fact that + 句子。不要写 although...but，也不要写 despite of。',
  参考方向: '图上的电流箭头和电压正负是参考方向。结果为正表示与参考方向相同，为负表示相反。列方程必须按所标方向写。',
  欧姆定律: '关联参考方向下 u = Ri；非关联参考方向下 u = -Ri。电阻 R 本身为正，符号出在参考方向上。',
  功率正负: '关联方向下 p = ui，p > 0 为吸收，p < 0 为发出。非关联方向求吸收功率用 p = -ui，或先改成关联方向。电阻吸收功率也可用 p = i²R 或 p = u²/R。',
  开环闭环: '判断标准只有一条：输出有没有被检测回来并用来形成控制作用。有反馈是闭环，没有是开环。',
  系统组成: '先找被控对象和被控量，再找测量元件和执行器。闭环里还有给定、比较环节和控制器。',
  稳准快: '稳是前提，系统要能回到平衡而不是振荡发散；准是稳态误差要小；快是过渡过程短且超调不能过大。三项需要折中。',
}

export function WeakPointsPage() {
  const { state } = useStore()
  const openItems = state.wrongBook.filter((w) => !w.resolved)
  const map = new Map<string, { count: number; subjects: Set<string>; lessons: Set<string> }>()
  for (const item of openItems) {
    for (const tag of item.knowledgePoints) {
      const cur = map.get(tag) ?? { count: 0, subjects: new Set<string>(), lessons: new Set<string>() }
      cur.count += 1
      cur.subjects.add(item.subjectId)
      cur.lessons.add(item.lessonId)
      map.set(tag, cur)
    }
  }
  const rows = [...map.entries()].sort((a, b) => b[1].count - a[1].count)

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">练习记录</p>
        <h1>薄弱点</h1>
        <p className="lede">根据错题本里尚未订正的题目汇总。订正之后，对应知识点的计数会下降。</p>
      </header>
      {rows.length === 0 ? (
        <p className="muted">暂无未订正错题，还不能归纳薄弱点。做完练习若有错误，知识点会显示在这里。</p>
      ) : (
        <ul className="weak-list">
          {rows.map(([tag, info]) => (
            <li key={tag} className="panel">
              <h2>
                {tag}
                <span className="count">{info.count} 题未订正</span>
              </h2>
              <p>{TAG_HELP[tag] ?? '先回到错题本，按解析把这一类题目再做一遍。'}</p>
              <p className="muted">
                涉及科目：{[...info.subjects].map((s) => SUBJECT_NAME[s as keyof typeof SUBJECT_NAME]).join('、')}
              </p>
              <p>
                <Link to="/wrong-book">去错题本订正</Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
