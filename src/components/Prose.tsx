import type { Block } from '../types'
import { Diagram } from './diagrams/Diagrams'
import { Formula, MathText } from './MathText'

export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        switch (block.type) {
          case 'p':
            return (
              <p key={key}>
                <MathText text={block.text} />
              </p>
            )
          case 'ul':
            return (
              <ul key={key}>
                {block.items.map((item, i) => (
                  <li key={i}>
                    <MathText text={item} />
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={key}>
                {block.items.map((item, i) => (
                  <li key={i}>
                    <MathText text={item} />
                  </li>
                ))}
              </ol>
            )
          case 'formula':
            return <Formula key={key} tex={block.tex} />
          case 'diagram':
            return <Diagram key={key} id={block.id} caption={block.caption} />
          case 'callout':
            return (
              <aside key={key} className={`callout callout-${block.tone}`}>
                {block.title ? <div className="callout-title">{block.title}</div> : null}
                <div>
                  <MathText text={block.text} />
                </div>
              </aside>
            )
          case 'compare':
            return (
              <div key={key} className="compare-grid">
                <div className="compare-col">
                  <h4>{block.leftTitle}</h4>
                  <ul>
                    {block.left.map((item, i) => (
                      <li key={i}>
                        <MathText text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="compare-col">
                  <h4>{block.rightTitle}</h4>
                  <ul>
                    {block.right.map((item, i) => (
                      <li key={i}>
                        <MathText text={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
