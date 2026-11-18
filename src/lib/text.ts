/** 把学生输入规范成便于比对的英文或中文文本。 */
export function normalizeText(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[，]/g, ',')
    .replace(/[。]/g, '.')
    .replace(/[；]/g, ';')
    .replace(/[：]/g, ':')
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .replace(/\bit's\b/g, 'it is')
    .replace(/\bisn't\b/g, 'is not')
    .replace(/\baren't\b/g, 'are not')
    .replace(/\bwasn't\b/g, 'was not')
    .replace(/\bweren't\b/g, 'were not')
    .replace(/\bdoesn't\b/g, 'does not')
    .replace(/\bdon't\b/g, 'do not')
    .replace(/\bcan't\b/g, 'cannot')
    .replace(/\bwon't\b/g, 'will not')
    .replace(/\bthat's\b/g, 'that is')
    .replace(/['"]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/[,.;:]+$/g, '')
    .trim()
}

export function hasAny(text: string, needles: string[]): boolean {
  return needles.some((n) => text.includes(n.toLowerCase()))
}

export function hasAllGroups(text: string, groups: string[][]): boolean {
  return groups.every((group) => hasAny(text, group))
}

const FULLWIDTH_DIGITS = '０１２３４５６７８９'
const HALFWIDTH_DIGITS = '0123456789'

export function parseNumber(input: string): number | null {
  let s = input.trim()
  if (!s) return null
  s = s.replace(/[０-９]/g, (ch) => HALFWIDTH_DIGITS[FULLWIDTH_DIGITS.indexOf(ch)] ?? ch)
  s = s.replace(/，/g, '.')
  s = s.replace(/[－−–—]/g, '-')
  s = s.replace(/\s/g, '')
  s = s.replace(
    /(va|vac|vdc|volts?|amps?|amperes?|watts?|ohm|ohms|ω|Ω|kw|mw|v|a|w|伏|伏特|安|安培|瓦|瓦特|欧|欧姆)$/i,
    '',
  )
  if (s === '' || s === '-' || s === '+' || s === '.' || s === '+.' || s === '-.') return null
  const n = Number(s)
  return Number.isFinite(n) ? n : null
}

export function nearlyEqual(actual: number, expected: number, absTol = 0.02): boolean {
  const rel = Math.abs(expected) * 1e-4
  return Math.abs(actual - expected) <= Math.max(absTol, rel)
}

export function formatAnswers(answers: Record<string, string>, fields: { id: string; label: string }[]): string {
  return fields
    .map((f) => `${f.label}：${answers[f.id]?.trim() ? answers[f.id].trim() : '（未作答）'}`)
    .join('\n')
}

export function nowIso(): string {
  return new Date().toISOString()
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(d)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}（UTC+8）`
}

export function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
