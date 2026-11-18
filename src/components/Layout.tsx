import { NavLink, Outlet } from 'react-router-dom'
import { DISCLAIMER } from '../data/subjects'

const links = [
  { to: '/', label: '首页', end: true },
  { to: '/vocab', label: '必会词汇', end: false },
  { to: '/wrong-book', label: '错题本', end: false },
  { to: '/weak-points', label: '薄弱点', end: false },
  { to: '/scores', label: '成绩记录', end: false },
]

export function Layout() {
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        跳到正文
      </a>
      <header className="site-header no-print">
        <div className="header-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">
              金
            </span>
            <span className="brand-text">
              <span className="brand-title">金陵科技学院专转本三科学习站</span>
              <span className="brand-sub">英语 · 电路分析 · 自动控制原理</span>
            </span>
          </NavLink>
          <nav className="site-nav" aria-label="站点">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p className="disclaimer">{DISCLAIMER}</p>
        <p className="footer-meta">
          <NavLink to="/about">关于本站</NavLink>
          <span>进度保存在本机浏览器中，不上传服务器。</span>
        </p>
      </footer>
    </div>
  )
}
