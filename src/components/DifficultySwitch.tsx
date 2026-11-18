import type { Difficulty } from '../types'

export function DifficultySwitch({
  value,
  onChange,
}: {
  value: Difficulty
  onChange: (value: Difficulty) => void
}) {
  return (
    <div className="difficulty-switch" role="group" aria-label="练习难度">
      <span className="difficulty-label">难度</span>
      <button
        type="button"
        className={value === 'basic' ? 'chip active' : 'chip'}
        aria-pressed={value === 'basic'}
        onClick={() => onChange('basic')}
      >
        基础
      </button>
      <button
        type="button"
        className={value === 'advanced' ? 'chip active' : 'chip'}
        aria-pressed={value === 'advanced'}
        onClick={() => onChange('advanced')}
      >
        提高
      </button>
    </div>
  )
}
