import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="page narrow">
      <h1>没有这一页</h1>
      <p>链接可能写错了，或这节课尚未更新。</p>
      <p>
        <Link to="/">返回首页</Link>
      </p>
    </div>
  )
}
