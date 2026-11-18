import { useId, type ReactNode } from 'react'

const ink = '#1c1915'
const navy = '#1a3654'
const seal = '#9c2a2a'
const muted = '#5c574e'

function markerId(raw: string): string {
  return `m${raw.replace(/[^a-zA-Z0-9_-]/g, '')}`
}

function Fig({ children, wide, tall }: { children: ReactNode; wide?: boolean; tall?: boolean }) {
  const viewBox = tall ? '0 0 420 280' : wide ? '0 0 760 240' : '0 0 420 220'
  return (
    <svg className={wide ? 'diagram-svg diagram-svg-wide' : 'diagram-svg'} viewBox={viewBox} role="img">
      {children}
    </svg>
  )
}

function Arrow({ id, x1, y1, x2, y2 }: { id: string; x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth="2" markerEnd={`url(#${id})`} />
}

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill={ink} />
      </marker>
    </defs>
  )
}

function Txt({ x, y, text, size = 14, fill = ink, anchor = 'middle' }: { x: number; y: number; text: string; size?: number; fill?: string; anchor?: 'middle' | 'start' | 'end' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} fontFamily="inherit">
      {text}
    </text>
  )
}

function Kcl() {
  const id = markerId(useId())
  return (
    <Fig>
      <title>基尔霍夫电流定律：节点电流代数和为零</title>
      <circle cx="210" cy="110" r="8" fill={ink} />
      <Arrow id={id} x1={40} y1={110} x2={190} y2={110} />
      <Arrow id={id} x1={230} y1={110} x2={370} y2={70} />
      <Arrow id={id} x1={230} y1={110} x2={370} y2={160} />
      <Txt x={70} y={96} text="i1" />
      <Txt x={330} y={62} text="i2" />
      <Txt x={330} y={182} text="i3" />
      <Txt x={210} y={200} text="流入节点的电流代数和为零" size={13} fill={muted} />
      <Defs id={id} />
    </Fig>
  )
}

function Series() {
  return (
    <Fig>
      <title>电阻串联</title>
      <rect x="40" y="70" width="50" height="70" fill="#fff" stroke={ink} strokeWidth="2" />
      <Txt x={65} y={110} text="Us" />
      <line x1="90" y1="80" x2="150" y2="80" stroke={ink} strokeWidth="2" />
      <rect x="150" y="64" width="70" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={185} y={86} text="R1" />
      <line x1="220" y1="80" x2="270" y2="80" stroke={ink} strokeWidth="2" />
      <rect x="270" y="64" width="70" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={305} y={86} text="R2" />
      <line x1="340" y1="80" x2="380" y2="80" stroke={ink} strokeWidth="2" />
      <line x1="380" y1="80" x2="380" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="380" y1="150" x2="65" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="65" y1="150" x2="65" y2="140" stroke={ink} strokeWidth="2" />
      <Txt x={210} y={190} text="同一电流流过 R1 与 R2" size={13} fill={muted} />
    </Fig>
  )
}

function Divider() {
  return (
    <Fig>
      <title>分压电路</title>
      <rect x="36" y="40" width="46" height="64" fill="#fff" stroke={ink} strokeWidth="2" />
      <Txt x={59} y={76} text="Us" />
      <line x1="82" y1="52" x2="180" y2="52" stroke={ink} strokeWidth="2" />
      <line x1="180" y1="52" x2="180" y2="78" stroke={ink} strokeWidth="2" />
      <rect x="164" y="78" width="32" height="50" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={210} y={108} text="R1" anchor="start" />
      <line x1="180" y1="128" x2="180" y2="150" stroke={ink} strokeWidth="2" />
      <rect x="164" y="150" width="32" height="50" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={210} y={180} text="R2" anchor="start" />
      <line x1="180" y1="200" x2="180" y2="214" stroke={ink} strokeWidth="2" />
      <line x1="59" y1="214" x2="180" y2="214" stroke={ink} strokeWidth="2" />
      <line x1="59" y1="104" x2="59" y2="214" stroke={ink} strokeWidth="2" />
      <Txt x={300} y={120} text="uo 取自 R2" size={14} fill={navy} anchor="start" />
      <Txt x={210} y={48} text="+" fill={seal} />
    </Fig>
  )
}

function SourceEquiv() {
  return (
    <Fig wide>
      <title>电压源与电流源的等效变换</title>
      <rect x="30" y="70" width="48" height="70" fill="#fff" stroke={ink} strokeWidth="2" />
      <Txt x={54} y={110} text="Us" />
      <line x1="78" y1="80" x2="150" y2="80" stroke={ink} strokeWidth="2" />
      <rect x="150" y="64" width="64" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={182} y={86} text="Rs" />
      <line x1="214" y1="80" x2="250" y2="80" stroke={ink} strokeWidth="2" />
      <line x1="250" y1="80" x2="250" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="54" y1="150" x2="250" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="54" y1="140" x2="54" y2="150" stroke={ink} strokeWidth="2" />
      <Txt x={140} y={190} text="实际电压源" size={13} fill={muted} />
      <circle cx="470" cy="110" r="28" fill="#fff" stroke={ink} strokeWidth="2" />
      <Txt x={470} y={115} text="Is" />
      <line x1="498" y1="110" x2="560" y2="110" stroke={ink} strokeWidth="2" />
      <rect x="560" y="86" width="28" height="48" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={610} y={114} text="Rs" anchor="start" />
      <line x1="574" y1="86" x2="574" y2="70" stroke={ink} strokeWidth="2" />
      <line x1="574" y1="70" x2="640" y2="70" stroke={ink} strokeWidth="2" />
      <line x1="640" y1="70" x2="640" y2="160" stroke={ink} strokeWidth="2" />
      <line x1="470" y1="138" x2="470" y2="160" stroke={ink} strokeWidth="2" />
      <line x1="470" y1="160" x2="640" y2="160" stroke={ink} strokeWidth="2" />
      <Txt x={540} y={200} text="实际电流源，Is = Us / Rs" size={13} fill={muted} />
      <Txt x={360} y={110} text="⇔" size={22} fill={navy} />
    </Fig>
  )
}

function Mesh() {
  return (
    <Fig>
      <title>两个网孔</title>
      <rect x="70" y="40" width="280" height="140" fill="none" stroke={ink} strokeWidth="2" />
      <line x1="210" y1="40" x2="210" y2="180" stroke={ink} strokeWidth="2" />
      <rect x="120" y="24" width="50" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={145} y={46} text="R1" />
      <rect x="250" y="24" width="50" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={275} y={46} text="R2" />
      <rect x="194" y="90" width="32" height="40" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={250} y={114} text="R3" anchor="start" />
      <Txt x={140} y={120} text="i1" fill={navy} />
      <Txt x={280} y={120} text="i2" fill={navy} />
      <Txt x={210} y={210} text="公共支路电流为 i1 − i2" size={13} fill={muted} />
    </Fig>
  )
}

function NodeFig() {
  return (
    <Fig>
      <title>两个独立节点</title>
      <line x1="40" y1="70" x2="380" y2="70" stroke={ink} strokeWidth="2.4" />
      <line x1="40" y1="170" x2="380" y2="170" stroke={ink} strokeWidth="2.4" />
      <Txt x={60} y={58} text="节点 1" anchor="start" fill={navy} />
      <Txt x={300} y={58} text="节点 2" anchor="start" fill={navy} />
      <Txt x={160} y={200} text="参考节点" fill={muted} />
      <rect x="90" y="90" width="36" height="50" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <line x1="108" y1="70" x2="108" y2="90" stroke={ink} strokeWidth="2" />
      <line x1="108" y1="140" x2="108" y2="170" stroke={ink} strokeWidth="2" />
      <rect x="250" y="90" width="36" height="50" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <line x1="268" y1="70" x2="268" y2="90" stroke={ink} strokeWidth="2" />
      <line x1="268" y1="140" x2="268" y2="170" stroke={ink} strokeWidth="2" />
      <Txt x={150} y={120} text="G1" anchor="start" />
      <Txt x={300} y={120} text="G2" anchor="start" />
    </Fig>
  )
}

function Superposition() {
  return (
    <Fig wide>
      <title>叠加定理：一次只保留一个独立源</title>
      <rect x="24" y="50" width="210" height="130" fill="#f8f4ec" stroke="#d8d0c3" />
      <rect x="260" y="50" width="210" height="130" fill="#f8f4ec" stroke="#d8d0c3" />
      <rect x="500" y="50" width="230" height="130" fill="#f8f4ec" stroke="#d8d0c3" />
      <Txt x={129} y={90} text="Us 作用" fill={navy} />
      <Txt x={129} y={120} text="Is 置零（开路）" size={13} />
      <Txt x={365} y={90} text="Is 作用" fill={navy} />
      <Txt x={365} y={120} text="Us 置零（短路）" size={13} />
      <Txt x={615} y={90} text="响应相加" fill={navy} />
      <Txt x={615} y={120} text="i = i′ + i″" size={16} />
      <Txt x={380} y={214} text="受控源保留，不要置零" size={13} fill={seal} />
    </Fig>
  )
}

function Thevenin() {
  return (
    <Fig wide>
      <title>戴维南等效</title>
      <rect x="30" y="46" width="250" height="140" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="6 4" />
      <Txt x={155} y={120} text="含源二端网络" />
      <Txt x={155} y={210} text="端口 a、b" size={13} fill={muted} />
      <Txt x={360} y={120} text="=" size={28} fill={navy} />
      <rect x="430" y="70" width="46" height="64" fill="#fff" stroke={ink} strokeWidth="2" />
      <Txt x={453} y={108} text="Uoc" size={13} />
      <line x1="476" y1="86" x2="540" y2="86" stroke={ink} strokeWidth="2" />
      <rect x="540" y="70" width="70" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={575} y={92} text="Req" />
      <line x1="610" y1="86" x2="680" y2="86" stroke={ink} strokeWidth="2" />
      <line x1="680" y1="86" x2="680" y2="160" stroke={ink} strokeWidth="2" />
      <line x1="453" y1="160" x2="680" y2="160" stroke={ink} strokeWidth="2" />
      <line x1="453" y1="134" x2="453" y2="160" stroke={ink} strokeWidth="2" />
    </Fig>
  )
}

function MaxPower() {
  return (
    <Fig>
      <title>最大功率传输</title>
      <rect x="40" y="60" width="46" height="64" fill="#fff" stroke={ink} strokeWidth="2" />
      <Txt x={63} y={98} text="Uoc" size={12} />
      <line x1="86" y1="76" x2="150" y2="76" stroke={ink} strokeWidth="2" />
      <rect x="150" y="60" width="64" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={182} y={82} text="Req" size={13} />
      <line x1="214" y1="76" x2="280" y2="76" stroke={ink} strokeWidth="2" />
      <rect x="280" y="60" width="64" height="32" fill="#fff" stroke={seal} strokeWidth="2" />
      <Txt x={312} y={82} text="RL" fill={seal} />
      <line x1="344" y1="76" x2="370" y2="76" stroke={ink} strokeWidth="2" />
      <line x1="370" y1="76" x2="370" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="63" y1="150" x2="370" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="63" y1="124" x2="63" y2="150" stroke={ink} strokeWidth="2" />
      <Txt x={210} y={190} text="RL = Req 时负载获得最大功率" size={13} fill={muted} />
    </Fig>
  )
}

function Elements() {
  return (
    <Fig wide>
      <title>电阻、电容、电感</title>
      <rect x="70" y="70" width="80" height="36" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={110} y={94} text="R" />
      <Txt x={110} y={140} text="电阻" fill={muted} />
      <line x1="300" y1="70" x2="300" y2="110" stroke={ink} strokeWidth="2" />
      <line x1="270" y1="110" x2="330" y2="110" stroke={ink} strokeWidth="2" />
      <line x1="270" y1="124" x2="330" y2="124" stroke={ink} strokeWidth="2" />
      <line x1="300" y1="124" x2="300" y2="160" stroke={ink} strokeWidth="2" />
      <Txt x={300} y={190} text="电容 C" fill={muted} />
      <path d="M560 150 C 540 130, 540 90, 560 70 C 580 90, 580 130, 560 150" fill="none" stroke={ink} strokeWidth="2" />
      <path d="M590 150 C 570 130, 570 90, 590 70 C 610 90, 610 130, 590 150" fill="none" stroke={ink} strokeWidth="2" />
      <path d="M620 150 C 600 130, 600 90, 620 70 C 640 90, 640 130, 620 150" fill="none" stroke={ink} strokeWidth="2" />
      <Txt x={600} y={190} text="电感 L" fill={muted} />
    </Fig>
  )
}

function Rc() {
  return (
    <Fig>
      <title>直流一阶 RC 电路</title>
      <rect x="40" y="50" width="44" height="60" fill="#fff" stroke={ink} strokeWidth="2" />
      <Txt x={62} y={86} text="Us" />
      <line x1="84" y1="64" x2="140" y2="64" stroke={ink} strokeWidth="2" />
      <line x1="140" y1="56" x2="160" y2="64" stroke={ink} strokeWidth="2" />
      <line x1="160" y1="56" x2="180" y2="64" stroke={ink} strokeWidth="2" />
      <Txt x={160} y={48} text="t=0" size={12} fill={navy} />
      <line x1="180" y1="64" x2="230" y2="64" stroke={ink} strokeWidth="2" />
      <rect x="230" y="48" width="60" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={260} y={70} text="R" />
      <line x1="290" y1="64" x2="330" y2="64" stroke={ink} strokeWidth="2" />
      <line x1="330" y1="48" x2="330" y2="80" stroke={ink} strokeWidth="2" />
      <line x1="348" y1="48" x2="348" y2="80" stroke={ink} strokeWidth="2" />
      <Txt x={360} y={40} text="C" anchor="start" fill={navy} />
      <line x1="339" y1="80" x2="339" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="62" y1="150" x2="339" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="62" y1="110" x2="62" y2="150" stroke={ink} strokeWidth="2" />
      <Txt x={200} y={190} text="换路后用三要素法求 uC(t)" size={13} fill={muted} />
    </Fig>
  )
}

function Phasor() {
  return (
    <Fig>
      <title>正弦量与相量</title>
      <line x1="40" y1="120" x2="200" y2="120" stroke={muted} strokeWidth="1.4" />
      <path d="M40 120 Q 80 40, 120 120 T 200 120" fill="none" stroke={navy} strokeWidth="2" />
      <Txt x={120} y={180} text="u = Um sin(ωt+φ)" size={13} />
      <line x1="280" y1="150" x2="280" y2="50" stroke={muted} strokeWidth="1.2" />
      <line x1="250" y1="130" x2="380" y2="130" stroke={muted} strokeWidth="1.2" />
      <line x1="280" y1="130" x2="360" y2="70" stroke={seal} strokeWidth="2.4" />
      <Txt x={370} y={66} text="U̇" fill={seal} />
      <Txt x={320} y={190} text="相量图" size={13} fill={muted} />
    </Fig>
  )
}

function Impedance() {
  return (
    <Fig>
      <title>串联阻抗</title>
      <rect x="70" y="70" width="70" height="32" fill="#fffdf8" stroke={ink} strokeWidth="2" />
      <Txt x={105} y={92} text="R" />
      <line x1="140" y1="86" x2="190" y2="86" stroke={ink} strokeWidth="2" />
      <path d="M190 110 C 175 95, 175 70, 195 60 C 210 72, 210 100, 200 110" fill="none" stroke={ink} strokeWidth="2" />
      <path d="M210 110 C 195 95, 195 70, 215 60 C 230 72, 230 100, 220 110" fill="none" stroke={ink} strokeWidth="2" />
      <Txt x={250} y={80} text="jωL" anchor="start" fill={navy} />
      <Txt x={180} y={170} text="Z = R + jωL" size={16} fill={navy} />
    </Fig>
  )
}

function PowerFactor() {
  return (
    <Fig>
      <title>功率三角形</title>
      <line x1="80" y1="160" x2="300" y2="160" stroke={ink} strokeWidth="2" />
      <line x1="300" y1="160" x2="300" y2="70" stroke={ink} strokeWidth="2" />
      <line x1="80" y1="160" x2="300" y2="70" stroke={seal} strokeWidth="2" />
      <Txt x={180} y={184} text="P" />
      <Txt x={318} y={120} text="Q" anchor="start" />
      <Txt x={170} y={100} text="S" fill={seal} />
      <Txt x={120} y={140} text="φ" fill={navy} />
      <Txt x={190} y={210} text="cos φ = P / S" size={14} fill={navy} />
    </Fig>
  )
}

function BlockRow({ labels }: { labels: string[] }) {
  const id = markerId(useId())
  const w = 100
  return (
    <Fig wide>
      <title>{labels.join(' ')}</title>
      {labels.map((label, i) => {
        const x = 30 + i * 150
        return (
          <g key={label}>
            <rect x={x} y={80} width={w} height={48} rx="6" fill="#fff" stroke={navy} strokeWidth="2" />
            <Txt x={x + w / 2} y={110} text={label} />
            {i < labels.length - 1 ? <Arrow id={id} x1={x + w} y1={104} x2={x + 148} y2={104} /> : null}
          </g>
        )
      })}
      <Defs id={id} />
    </Fig>
  )
}

function Transfer() {
  return (
    <Fig wide>
      <title>微分方程到传递函数</title>
      <rect x="20" y="60" width="280" height="100" fill="#f8f4ec" stroke="#d8d0c3" />
      <Txt x={160} y={100} text="时域微分方程" fill={navy} />
      <Txt x={160} y={130} text="零初始条件" size={13} />
      <Txt x={360} y={116} text="ℒ →" size={20} fill={seal} />
      <rect x="430" y="60" width="300" height="100" fill="#f8f4ec" stroke="#d8d0c3" />
      <Txt x={580} y={100} text="G(s) = C(s) / R(s)" fill={navy} />
      <Txt x={580} y={130} text="传递函数" size={13} />
    </Fig>
  )
}

function Reduce() {
  const id = markerId(useId())
  return (
    <Fig wide>
      <title>串联与反馈化简</title>
      <rect x="40" y="70" width="80" height="40" fill="#fff" stroke={navy} strokeWidth="2" />
      <Txt x={80} y={96} text="G1" />
      <Arrow id={id} x1={120} y1={90} x2={170} y2={90} />
      <rect x="170" y="70" width="80" height="40" fill="#fff" stroke={navy} strokeWidth="2" />
      <Txt x={210} y={96} text="G2" />
      <Txt x={150} y={150} text="串联 G1G2" size={13} fill={muted} />
      <rect x="470" y="60" width="90" height="40" fill="#fff" stroke={navy} strokeWidth="2" />
      <Txt x={515} y={86} text="G" />
      <line x1="560" y1="80" x2="640" y2="80" stroke={ink} strokeWidth="2" />
      <line x1="640" y1="80" x2="640" y2="150" stroke={ink} strokeWidth="2" />
      <line x1="430" y1="150" x2="640" y2="150" stroke={ink} strokeWidth="2" />
      <rect x="500" y="132" width="70" height="32" fill="#fff" stroke={seal} strokeWidth="2" />
      <Txt x={535} y={154} text="H" fill={seal} />
      <Txt x={535} y={200} text="闭环 G/(1+GH)" size={13} fill={muted} />
      <Defs id={id} />
    </Fig>
  )
}

function StepCurve() {
  return (
    <Fig>
      <title>单位阶跃响应</title>
      <line x1="50" y1="180" x2="380" y2="180" stroke={ink} strokeWidth="1.6" />
      <line x1="50" y1="180" x2="50" y2="30" stroke={ink} strokeWidth="1.6" />
      <path d="M50 180 C 90 180, 110 70, 160 60 C 190 54, 200 90, 230 78 C 270 62, 300 70, 360 68" fill="none" stroke={navy} strokeWidth="2.2" />
      <line x1="50" y1="68" x2="370" y2="68" stroke={muted} strokeDasharray="4 4" />
      <Txt x={300} y={54} text="稳态值" size={13} fill={muted} />
      <Txt x={360} y={200} text="t" />
      <Txt x={30} y={40} text="c" />
    </Fig>
  )
}

function Routh() {
  return (
    <Fig>
      <title>劳斯表</title>
      <Txt x={210} y={36} text="s^3 + a s^2 + b s + c = 0" size={14} fill={navy} />
      {[
        ['s3', '1', 'b'],
        ['s2', 'a', 'c'],
        ['s1', '(ab−c)/a', '0'],
        ['s0', 'c', ''],
      ].map((row, i) => (
        <g key={row[0]}>
          <Txt x={90} y={70 + i * 32} text={row[0]} anchor="start" fill={seal} />
          <Txt x={180} y={70 + i * 32} text={row[1]} />
          <Txt x={280} y={70 + i * 32} text={row[2]} />
        </g>
      ))}
      <Txt x={210} y={205} text="第一列全同号则稳定" size={13} fill={muted} />
    </Fig>
  )
}

function ErrorFig() {
  const id = markerId(useId())
  return (
    <Fig>
      <title>单位反馈的误差</title>
      <circle cx="90" cy="90" r="18" fill="#fff" stroke={ink} strokeWidth="2" />
      <Txt x={90} y={95} text="⊗" />
      <Arrow id={id} x1={108} y1={90} x2={160} y2={90} />
      <rect x="160" y="70" width="90" height="40" fill="#fff" stroke={navy} strokeWidth="2" />
      <Txt x={205} y={96} text="G(s)" />
      <Arrow id={id} x1={250} y1={90} x2={340} y2={90} />
      <Txt x={360} y={94} text="C" anchor="start" />
      <Txt x={30} y={94} text="R" anchor="start" />
      <line x1="320" y1="90" x2="320" y2="160" stroke={ink} strokeWidth="2" />
      <line x1="90" y1="160" x2="320" y2="160" stroke={ink} strokeWidth="2" />
      <line x1="90" y1="108" x2="90" y2="160" stroke={ink} strokeWidth="2" />
      <Txt x={200} y={200} text="E(s) = R(s) − C(s)" size={14} fill={navy} />
      <Defs id={id} />
    </Fig>
  )
}

function Locus() {
  return (
    <Fig>
      <title>根轨迹示意</title>
      <line x1="60" y1="160" x2="360" y2="160" stroke={ink} strokeWidth="1.6" />
      <line x1="160" y1="30" x2="160" y2="190" stroke={ink} strokeWidth="1.6" />
      <circle cx="120" cy="160" r="5" fill={seal} />
      <circle cx="210" cy="160" r="5" fill="#fff" stroke={seal} strokeWidth="2" />
      <path d="M120 160 C 140 120, 150 80, 160 40" fill="none" stroke={navy} strokeWidth="2" />
      <path d="M120 160 C 140 200, 150 200, 160 190" fill="none" stroke={navy} strokeWidth="2" />
      <Txt x={100} y={180} text="极点" size={12} fill={muted} />
      <Txt x={230} y={180} text="零点" size={12} fill={muted} />
      <Txt x={250} y={50} text="K 增大" size={13} fill={navy} />
    </Fig>
  )
}

function Bode() {
  return (
    <Fig>
      <title>伯德图幅频渐近线</title>
      <line x1="50" y1="40" x2="50" y2="180" stroke={ink} strokeWidth="1.5" />
      <line x1="50" y1="100" x2="380" y2="100" stroke={muted} strokeWidth="1.2" />
      <polyline points="50,70 180,70 320,170" fill="none" stroke={navy} strokeWidth="2.4" />
      <Txt x={30} y={36} text="L" />
      <Txt x={360} y={196} text="ω" />
      <Txt x={180} y={60} text="转折频率" size={12} fill={seal} />
      <line x1="180" y1="70" x2="180" y2="180" stroke={seal} strokeDasharray="4 3" />
    </Fig>
  )
}

function Nyquist() {
  return (
    <Fig>
      <title>奈奎斯特曲线示意</title>
      <line x1="40" y1="120" x2="390" y2="120" stroke={ink} strokeWidth="1.4" />
      <line x1="220" y1="20" x2="220" y2="200" stroke={ink} strokeWidth="1.4" />
      <circle cx="150" cy="120" r="6" fill={seal} />
      <Txt x={150} y={140} text="−1" size={12} fill={seal} />
      <path d="M360 120 C 300 40, 180 40, 120 110 C 90 150, 140 190, 220 170" fill="none" stroke={navy} strokeWidth="2.2" />
      <Txt x={300} y={50} text="G(jω)" fill={navy} />
    </Fig>
  )
}

function LeadLag() {
  return (
    <Fig wide>
      <title>超前与滞后校正</title>
      <rect x="30" y="50" width="320" height="140" fill="#f8f4ec" stroke="#d8d0c3" />
      <Txt x={190} y={86} text="超前校正" fill={navy} />
      <Txt x={190} y={118} text="提供正相角" size={14} />
      <Txt x={190} y={146} text="改善快速性与稳定裕度" size={13} fill={muted} />
      <rect x="400" y="50" width="320" height="140" fill="#f8f4ec" stroke="#d8d0c3" />
      <Txt x={560} y={86} text="滞后校正" fill={navy} />
      <Txt x={560} y={118} text="压低高频增益" size={14} />
      <Txt x={560} y={146} text="提高稳态精度" size={13} fill={muted} />
    </Fig>
  )
}

function Pid() {
  const id = markerId(useId())
  return (
    <Fig>
      <title>PID 并联结构</title>
      <Txt x={40} y={110} text="e" anchor="start" />
      <line x1="60" y1="104" x2="100" y2="104" stroke={ink} strokeWidth="2" />
      <line x1="100" y1="50" x2="100" y2="170" stroke={ink} strokeWidth="2" />
      {[
        ['P', 46],
        ['I', 100],
        ['D', 154],
      ].map(([label, y]) => (
        <g key={String(label)}>
          <line x1="100" y1={Number(y) + 8} x2="150" y2={Number(y) + 8} stroke={ink} strokeWidth="2" />
          <rect x="150" y={Number(y) - 12} width="70" height="36" fill="#fff" stroke={navy} strokeWidth="2" />
          <Txt x={185} y={Number(y) + 10} text={String(label)} />
          <Arrow id={id} x1={220} y1={Number(y) + 6} x2={280} y2={104} />
        </g>
      ))}
      <Txt x={320} y={100} text="u" anchor="start" fill={seal} />
      <Defs id={id} />
    </Fig>
  )
}

function StateSpace() {
  const id = markerId(useId())
  return (
    <Fig wide>
      <title>状态空间</title>
      <Txt x={40} y={110} text="u" />
      <rect x="80" y="80" width="90" height="48" rx="6" fill="#fff" stroke={navy} strokeWidth="2" />
      <Txt x={125} y={110} text="B" />
      <Arrow id={id} x1={170} y1={104} x2={230} y2={104} />
      <circle cx="250" cy="104" r="14" fill="#fff" stroke={ink} />
      <Txt x={250} y={109} text="+" />
      <Arrow id={id} x1={264} y1={104} x2={320} y2={104} />
      <rect x="320" y="80" width="100" height="48" rx="6" fill="#fff" stroke={navy} strokeWidth="2" />
      <Txt x={370} y={110} text="∫ / s" />
      <Arrow id={id} x1={420} y1={104} x2={500} y2={104} />
      <Txt x={530} y={110} text="x" />
      <line x1="500" y1="104" x2="500" y2="180" stroke={ink} strokeWidth="2" />
      <line x1="250" y1="180" x2="500" y2="180" stroke={ink} strokeWidth="2" />
      <rect x="330" y="160" width="70" height="36" fill="#fff" stroke={seal} strokeWidth="2" />
      <Txt x={365} y={184} text="A" fill={seal} />
      <line x1="250" y1="118" x2="250" y2="180" stroke={ink} strokeWidth="2" />
      <Txt x={200} y={210} text="ẋ = Ax + Bu" size={14} fill={navy} />
      <Defs id={id} />
    </Fig>
  )
}

export const MORE_DIAGRAMS: Record<string, () => ReactNode> = {
  'circuit-kcl': () => <Kcl />,
  'circuit-series': () => <Series />,
  'circuit-divider': () => <Divider />,
  'circuit-source': () => <SourceEquiv />,
  'circuit-mesh': () => <Mesh />,
  'circuit-node': () => <NodeFig />,
  'circuit-superposition': () => <Superposition />,
  'circuit-thevenin': () => <Thevenin />,
  'circuit-maxpower': () => <MaxPower />,
  'circuit-elements': () => <Elements />,
  'circuit-rc': () => <Rc />,
  'circuit-phasor': () => <Phasor />,
  'circuit-impedance': () => <Impedance />,
  'circuit-pf': () => <PowerFactor />,
  'control-classify': () => <BlockRow labels={['给定', '控制器', '对象', '输出']} />,
  'control-tf': () => <Transfer />,
  'control-laplace': () => <BlockRow labels={['f(t)', 'ℒ', 'F(s)']} />,
  'control-typical': () => <BlockRow labels={['K', '1/s', 's', '1/(Ts+1)']} />,
  'control-reduce': () => <Reduce />,
  'control-step': () => <StepCurve />,
  'control-routh': () => <Routh />,
  'control-error': () => <ErrorFig />,
  'control-locus': () => <Locus />,
  'control-bode': () => <Bode />,
  'control-nyquist': () => <Nyquist />,
  'control-leadlag': () => <LeadLag />,
  'control-pid': () => <Pid />,
  'control-state': () => <StateSpace />,
}
