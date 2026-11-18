import katex from 'katex'
import { Fragment, type ReactNode } from 'react'

function renderKatex(tex: string, display: boolean): string {
  return katex.renderToString(tex, {
    displayMode: display,
    throwOnError: false,
    strict: 'ignore',
  })
}

export function Formula({ tex }: { tex: string }) {
  return (
    <div
      className="formula"
      dangerouslySetInnerHTML={{ __html: renderKatex(tex, true) }}
    />
  )
}

/** 解析 **粗体** 与 $...$ / $$...$$ 数学。 */
export function MathText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$|\*\*([^*]+)\*\*/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>)
    }
    if (match[1] !== undefined) {
      nodes.push(
        <span
          key={key++}
          className="math-block"
          dangerouslySetInnerHTML={{ __html: renderKatex(match[1], true) }}
        />,
      )
    } else if (match[2] !== undefined) {
      nodes.push(
        <span
          key={key++}
          className="math-inline"
          dangerouslySetInnerHTML={{ __html: renderKatex(match[2], false) }}
        />,
      )
    } else if (match[3] !== undefined) {
      nodes.push(<strong key={key++}>{match[3]}</strong>)
    }
    last = match.index + match[0].length
  }
  if (last < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>)
  }
  return <>{nodes}</>
}
