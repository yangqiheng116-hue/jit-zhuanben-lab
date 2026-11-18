import type { AppState, BackupFile, Difficulty } from './types'

export const STORAGE_KEY = 'jit-zhuanben-lab:v1'

export function defaultState(): AppState {
  return {
    version: 1,
    difficulty: 'basic',
    scores: [],
    wrongBook: [],
    lessonStatus: {},
  }
}

function isDifficulty(value: unknown): value is Difficulty {
  return value === 'basic' || value === 'advanced'
}

function isAppState(value: unknown): value is AppState {
  if (!value || typeof value !== 'object') return false
  const v = value as Partial<AppState>
  return (
    v.version === 1 &&
    isDifficulty(v.difficulty) &&
    Array.isArray(v.scores) &&
    Array.isArray(v.wrongBook) &&
    typeof v.lessonStatus === 'object' &&
    v.lessonStatus !== null
  )
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed: unknown = JSON.parse(raw)
    if (!isAppState(parsed)) return defaultState()
    return parsed
  } catch {
    return defaultState()
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function exportState(state: AppState): string {
  const backup: BackupFile = {
    version: 1,
    exportedAt: new Date().toISOString(),
    app: 'jit-zhuanben-lab',
    state,
  }
  return JSON.stringify(backup, null, 2)
}

export function importState(json: string): AppState {
  const parsed: unknown = JSON.parse(json)
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('备份文件格式不正确。')
  }
  const obj = parsed as Partial<BackupFile> & Partial<AppState>
  if (obj.app === 'jit-zhuanben-lab' && obj.state && isAppState(obj.state)) {
    return obj.state
  }
  if (isAppState(obj)) return obj
  throw new Error('备份文件格式不正确。')
}
