import { useId, type ReactNode } from 'react'
import { MORE_DIAGRAMS } from './MoreDiagrams'

const ink = '#1c1915'
const navy = '#1a3654'
const seal = '#9c2a2a'
const muted = '#5c574e'

function markerId(raw: string): string {
  return `m${raw.replace(/[^a-zA-Z0-9_-]/g, '')}`
}


function Fig({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <svg
      className={wide ? 'diagram-svg diagram-svg-wide' : 'diagram-svg'}
      viewBox={wide ? '0 0 760 220' : '0 0 420 220'}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

export function EnglishCompareDiagram() {
  return (
    <Fig wide>
      <title>Although 接从句，Despite 接名词短语</title>
      <rect x="8" y="16" width="364" height="188" rx="8" fill="#f8f4ec" stroke="#d8d0c3" />
      <rect x="388" y="16" width="364" height="188" rx="8" fill="#f8f4ec" stroke="#d8d0c3" />
      <text x="190" y="48" textAnchor="middle" fontSize="16" fontWeight="700" fill={navy} fontFamily="inherit">
        Although / Even though
      </text>
      <text x="190" y="76" textAnchor="middle" fontSize="14" fill={muted} fontFamily="inherit">
        后面接完整句子（主语 + 谓语）
      </text>
      <rect x="40" y="100" width="140" height="44" rx="6" fill="#fff" stroke={navy} />
      <text x="110" y="127" textAnchor="middle" fontSize="14" fill={ink} fontFamily="inherit">
        主语
      </text>
      <rect x="200" y="100" width="140" height="44" rx="6" fill="#fff" stroke={navy} />
      <text x="270" y="127" textAnchor="middle" fontSize="14" fill={ink} fontFamily="inherit">
        谓语
      </text>
      <text x="190" y="174" textAnchor="middle" fontSize="13" fill={ink} fontFamily="inherit">
        Although the cost is high, ...
      </text>

      <text x="570" y="48" textAnchor="middle" fontSize="16" fontWeight="700" fill={navy} fontFamily="inherit">
        Despite / In spite of
      </text>
      <text x="570" y="76" textAnchor="middle" fontSize="14" fill={muted} fontFamily="inherit">
        后面接名词、动名词，或 the fact that + 句子
      </text>
      <rect x="430" y="100" width="280" height="44" rx="6" fill="#fff" stroke={navy} />
      <text x="570" y="127" textAnchor="middle" fontSize="14" fill={ink} fontFamily="inherit">
        名词 / 动名词 / the fact that ...
      </text>
      <text x="570" y="174" textAnchor="middle" fontSize="13" fill={ink} fontFamily="inherit">
        Despite the high cost, ...
      </text>
    </Fig>
  )
}

function Resistor({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} fill="#fffdf8" stroke={ink} strokeWidth="2.2" />
}

function Plus({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="20" fontWeight="700" fill={seal} fontFamily="inherit">
      +
    </text>
  )
}

function Minus({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="22" fontWeight="700" fill={seal} fontFamily="inherit">
      −
    </text>
  )
}

/** 关联：电流从左侧 + 端流入，向右流出到 − 端。 */
export function CircuitAssociatedDiagram() {
  const aid = markerId(useId())
  return (
    <Fig>
      <title>电阻的关联参考方向</title>
      <line x1="36" y1="110" x2="130" y2="110" stroke={ink} strokeWidth="2.2" />
      <Resistor x={130} y={86} w={160} h={48} />
      <text x="210" y="117" textAnchor="middle" fontSize="18" fontWeight="700" fill={ink} fontFamily="inherit">
        R
      </text>
      <line x1="290" y1="110" x2="384" y2="110" stroke={ink} strokeWidth="2.2" />
      <Plus x={148} y={78} />
      <Minus x={272} y={80} />
      <text x="210" y="58" textAnchor="middle" fontSize="18" fill={navy} fontFamily="inherit">
        u
      </text>
      <line x1="160" y1="64" x2="260" y2="64" stroke={navy} strokeWidth="1.4" />
      {/* current arrow left to right below */}
      <line x1="150" y1="156" x2="260" y2="156" stroke={ink} strokeWidth="2" markerEnd={`url(#${aid})`} />
      <text x="210" y="180" textAnchor="middle" fontSize="18" fill={ink} fontFamily="inherit">
        i
      </text>
      <text x="210" y="208" textAnchor="middle" fontSize="13" fill={muted} fontFamily="inherit">
        电流从“+”端流入，关联参考方向
      </text>
      <defs>
        <marker id={aid} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={ink} />
        </marker>
      </defs>
    </Fig>
  )
}

/** 非关联：电流仍向右，但左侧为 −、右侧为 +，即电流从 − 端流入。 */
export function CircuitNonAssociatedDiagram() {
  const aid = markerId(useId())
  return (
    <Fig>
      <title>电阻的非关联参考方向</title>
      <line x1="36" y1="110" x2="130" y2="110" stroke={ink} strokeWidth="2.2" />
      <Resistor x={130} y={86} w={160} h={48} />
      <text x="210" y="117" textAnchor="middle" fontSize="18" fontWeight="700" fill={ink} fontFamily="inherit">
        R
      </text>
      <line x1="290" y1="110" x2="384" y2="110" stroke={ink} strokeWidth="2.2" />
      <Minus x={148} y={80} />
      <Plus x={272} y={78} />
      <text x="210" y="58" textAnchor="middle" fontSize="18" fill={navy} fontFamily="inherit">
        u
      </text>
      <line x1="160" y1="64" x2="260" y2="64" stroke={navy} strokeWidth="1.4" />
      <line x1="150" y1="156" x2="260" y2="156" stroke={ink} strokeWidth="2" markerEnd={`url(#${aid})`} />
      <text x="210" y="180" textAnchor="middle" fontSize="18" fill={ink} fontFamily="inherit">
        i
      </text>
      <text x="210" y="208" textAnchor="middle" fontSize="13" fill={muted} fontFamily="inherit">
        电流从“−”端流入，非关联参考方向
      </text>
      <defs>
        <marker id={aid} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={ink} />
        </marker>
      </defs>
    </Fig>
  )
}

/** 单回路：左侧理想电压源上 + 下 −，右侧电阻关联，电流从上端 + 流入。 */
export function CircuitLoopDiagram() {
  const aid = markerId(useId())
  return (
    <svg className="diagram-svg" viewBox="0 0 360 320" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>理想电压源与电阻组成的单回路</title>
      {/* top and bottom wires */}
      <line x1="90" y1="48" x2="250" y2="48" stroke={ink} strokeWidth="2.2" />
      <line x1="90" y1="268" x2="250" y2="268" stroke={ink} strokeWidth="2.2" />
      {/* left verticals into source */}
      <line x1="90" y1="48" x2="90" y2="118" stroke={ink} strokeWidth="2.2" />
      <line x1="90" y1="198" x2="90" y2="268" stroke={ink} strokeWidth="2.2" />
      {/* voltage source circle */}
      <circle cx="90" cy="158" r="40" fill="#fffdf8" stroke={ink} strokeWidth="2.2" />
      <text x="90" y="132" textAnchor="middle" fontSize="20" fontWeight="700" fill={seal} fontFamily="inherit">
        +
      </text>
      <text x="90" y="196" textAnchor="middle" fontSize="22" fontWeight="700" fill={seal} fontFamily="inherit">
        −
      </text>
      <text x="36" y="164" textAnchor="middle" fontSize="16" fill={navy} fontFamily="inherit">
        Us
      </text>
      {/* right resistor vertical */}
      <line x1="250" y1="48" x2="250" y2="96" stroke={ink} strokeWidth="2.2" />
      <rect x="226" y="96" width="48" height="120" fill="#fffdf8" stroke={ink} strokeWidth="2.2" />
      <text x="250" y="164" textAnchor="middle" fontSize="18" fontWeight="700" fill={ink} fontFamily="inherit">
        R
      </text>
      <line x1="250" y1="216" x2="250" y2="268" stroke={ink} strokeWidth="2.2" />
      <text x="282" y="104" fontSize="20" fontWeight="700" fill={seal} fontFamily="inherit">
        +
      </text>
      <text x="282" y="226" fontSize="22" fontWeight="700" fill={seal} fontFamily="inherit">
        −
      </text>
      <text x="304" y="164" fontSize="16" fill={navy} fontFamily="inherit">
        uR
      </text>
      {/* current arrow into top + of resistor */}
      <line x1="198" y1="70" x2="198" y2="130" stroke={ink} strokeWidth="2" markerEnd={`url(#${aid})`} />
      <text x="176" y="108" textAnchor="end" fontSize="16" fill={ink} fontFamily="inherit">
        i
      </text>
      <text x="180" y="304" textAnchor="middle" fontSize="13" fill={muted} fontFamily="inherit">
        电源上正下负；电阻关联，i 从上端流入
      </text>
      <defs>
        <marker id={aid} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={ink} />
        </marker>
      </defs>
    </svg>
  )
}

function ArrowDef({ id }: { id: string }) {
  return (
    <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
      <path d="M0,0 L8,4 L0,8 Z" fill={ink} />
    </marker>
  )
}

export function OpenLoopDiagram() {
  const aid = markerId(useId())
  return (
    <svg className="diagram-svg diagram-svg-wide" viewBox="0 0 780 150" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>开环控制系统结构</title>
      <defs>
        <ArrowDef id={aid} />
      </defs>
      <text x="8" y="78" fontSize="14" fill={muted} fontFamily="inherit">
        给定值
      </text>
      <line x1="68" y1="72" x2="118" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <rect x="122" y="44" width="110" height="56" fill="#fffdf8" stroke={navy} strokeWidth="1.8" />
      <text x="177" y="78" textAnchor="middle" fontSize="15" fill={ink} fontFamily="inherit">
        控制器
      </text>
      <line x1="232" y1="72" x2="278" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <rect x="282" y="44" width="110" height="56" fill="#fffdf8" stroke={navy} strokeWidth="1.8" />
      <text x="337" y="78" textAnchor="middle" fontSize="15" fill={ink} fontFamily="inherit">
        执行器
      </text>
      <line x1="392" y1="72" x2="438" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <rect x="442" y="44" width="120" height="56" fill="#fffdf8" stroke={navy} strokeWidth="1.8" />
      <text x="502" y="78" textAnchor="middle" fontSize="15" fill={ink} fontFamily="inherit">
        被控对象
      </text>
      <line x1="562" y1="72" x2="628" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <text x="636" y="68" fontSize="14" fill={ink} fontFamily="inherit">
        输出（被控量）
      </text>
      <text x="390" y="132" textAnchor="middle" fontSize="13" fill={muted} fontFamily="inherit">
        开环：输出不返回，不形成控制作用
      </text>
    </svg>
  )
}

export function ClosedLoopDiagram() {
  const aid = markerId(useId())
  return (
    <svg className="diagram-svg diagram-svg-wide" viewBox="0 0 780 250" role="img" xmlns="http://www.w3.org/2000/svg">
      <title>闭环控制系统结构</title>
      <defs>
        <ArrowDef id={aid} />
      </defs>
      <text x="4" y="78" fontSize="13" fill={muted} fontFamily="inherit">
        给定值 r
      </text>
      <line x1="78" y1="72" x2="118" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      {/* summer */}
      <circle cx="140" cy="72" r="18" fill="#fffdf8" stroke={ink} strokeWidth="1.8" />
      <text x="132" y="68" fontSize="14" fill={ink} fontFamily="inherit">
        +
      </text>
      <text x="138" y="94" fontSize="16" fill={seal} fontFamily="inherit">
        −
      </text>
      <text x="164" y="58" fontSize="13" fill={navy} fontFamily="inherit">
        e
      </text>
      <line x1="158" y1="72" x2="198" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <rect x="202" y="44" width="100" height="56" fill="#fffdf8" stroke={navy} strokeWidth="1.8" />
      <text x="252" y="78" textAnchor="middle" fontSize="15" fill={ink} fontFamily="inherit">
        控制器
      </text>
      <line x1="302" y1="72" x2="340" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <rect x="344" y="44" width="100" height="56" fill="#fffdf8" stroke={navy} strokeWidth="1.8" />
      <text x="394" y="78" textAnchor="middle" fontSize="15" fill={ink} fontFamily="inherit">
        执行器
      </text>
      <line x1="444" y1="72" x2="482" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <rect x="486" y="44" width="110" height="56" fill="#fffdf8" stroke={navy} strokeWidth="1.8" />
      <text x="541" y="78" textAnchor="middle" fontSize="15" fill={ink} fontFamily="inherit">
        被控对象
      </text>
      <line x1="596" y1="72" x2="680" y2="72" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <text x="688" y="68" fontSize="13" fill={ink} fontFamily="inherit">
        输出 y
      </text>
      {/* feedback path */}
      <line x1="650" y1="72" x2="650" y2="168" stroke={ink} strokeWidth="1.8" />
      <line x1="650" y1="168" x2="140" y2="168" stroke={ink} strokeWidth="1.8" />
      <line x1="140" y1="168" x2="140" y2="90" stroke={ink} strokeWidth="1.8" markerEnd={`url(#${aid})`} />
      <rect x="330" y="142" width="110" height="52" fill="#fffdf8" stroke={navy} strokeWidth="1.8" />
      <text x="385" y="172" textAnchor="middle" fontSize="15" fill={ink} fontFamily="inherit">
        测量元件
      </text>
      <text x="250" y="162" fontSize="13" fill={navy} fontFamily="inherit">
        b
      </text>
      <text x="390" y="226" textAnchor="middle" fontSize="13" fill={muted} fontFamily="inherit">
        闭环负反馈：e = r − b，输出经测量后送回比较环节
      </text>
    </svg>
  )
}

const REGISTRY: Record<string, () => ReactNode> = {
  'english-compare': () => <EnglishCompareDiagram />,
  'circuit-associated': () => <CircuitAssociatedDiagram />,
  'circuit-nonassociated': () => <CircuitNonAssociatedDiagram />,
  'circuit-loop': () => <CircuitLoopDiagram />,
  'control-open': () => <OpenLoopDiagram />,
  'control-closed': () => <ClosedLoopDiagram />,
  ...MORE_DIAGRAMS,
}

export function Diagram({ id, caption }: { id: string; caption?: string }) {
  const render = REGISTRY[id]
  if (!render) return null
  return (
    <figure className="diagram-figure">
      {render()}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
