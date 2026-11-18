import { Link } from 'react-router-dom'
import { DISCLAIMER } from '../data/subjects'

export function AboutPage() {
  return (
    <div className="page narrow">
      <header className="page-head">
        <p className="eyebrow">说明</p>
        <h1>关于本站</h1>
      </header>
      <p>
        这是给一名集成电路专业高职生准备的个人学习站，目标院校是金陵科技学院，考试方向是江苏五年一贯制高职专转本。内容按节编写，目前开放三科第 1 节。
      </p>
      <p>{DISCLAIMER}</p>
      <h2>本站能做什么</h2>
      <ul>
        <li>课程讲解与图示（电路和控制系统用页内 SVG 图，公式用 KaTeX 渲染）。</li>
        <li>示范例题可以看到完整解答；当堂练习必须先作答，提交后才显示批改和解析。</li>
        <li>错题自动进入错题本，并可按知识点汇总薄弱点；成绩按日期、科目、课时、得分和难度记录。</li>
        <li>难度分为基础和提高，选择会记住。</li>
        <li>全部在浏览器中运行，不设账号，也不把进度传到服务器。可用成绩记录页的导出／导入做备份。</li>
      </ul>
      <p>
        源代码基于官方 Vite + React + TypeScript 模板，许可证说明见仓库中的 README 与 LICENSE。
      </p>
      <p>
        <Link to="/">返回首页</Link>
      </p>
    </div>
  )
}
