import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { SUBJECT_NAME } from '../data/subjects'
import { studyPath } from '../lib/paths'
import { formatDateTime } from '../lib/text'
import { exportState, importState } from '../storage'
import { useStore } from '../state'

export function ScoresPage() {
  const { state, replaceState } = useStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  function download() {
    const blob = new Blob([exportState(state)], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `专转本学习进度-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('已导出备份文件。请把它保存在你能找到的地方。')
  }

  function onFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const next = importState(String(reader.result))
        replaceState(next)
        setMessage('已导入备份，当前进度已替换为备份中的内容。')
      } catch (err) {
        setMessage(err instanceof Error ? err.message : '导入失败。')
      }
    }
    reader.readAsText(file, 'utf-8')
  }

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">练习记录</p>
        <h1>成绩记录</h1>
        <p className="lede">每次提交当堂练习都会留下一条记录。进度只保存在本机浏览器里，可用下面的按钮导出或导入 JSON 备份。</p>
      </header>

      <div className="toolbar no-print">
        <button type="button" className="btn-secondary" onClick={download}>
          导出进度备份
        </button>
        <button type="button" className="btn-secondary" onClick={() => fileRef.current?.click()}>
          导入进度备份
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          hidden
          onChange={(e) => onFile(e.target.files?.[0])}
        />
      </div>
      {message ? <p className="form-note">{message}</p> : null}

      {state.scores.length === 0 ? (
        <p className="muted">尚无成绩记录。</p>
      ) : (
        <div className="table-wrap">
          <table className="score-table">
            <thead>
              <tr>
                <th>时间</th>
                <th>科目</th>
                <th>课程</th>
                <th>得分</th>
                <th>难度</th>
              </tr>
            </thead>
            <tbody>
              {state.scores.map((r) => (
                <tr key={r.id}>
                  <td>{formatDateTime(r.date)}</td>
                  <td>{SUBJECT_NAME[r.subjectId]}</td>
                  <td>
                    <Link to={studyPath(r.lessonId)}>{r.lessonTitle}</Link>
                  </td>
                  <td>
                    {r.score} / {r.total}
                  </td>
                  <td>{r.difficulty === 'basic' ? '基础' : '提高'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
