import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { loadState, saveState } from './storage'
import type { AppState, Difficulty, LessonStatus, ScoreRecord, WrongItem } from './types'

interface Store {
  state: AppState
  setDifficulty: (value: Difficulty) => void
  recordAttempt: (input: {
    subjectId: ScoreRecord['subjectId']
    lessonId: string
    lessonTitle: string
    score: number
    total: number
    difficulty: Difficulty
    misses: Omit<WrongItem, 'id' | 'addedAt' | 'resolved'>[]
    correctQuestionIds: string[]
    touchLessonStatus?: boolean
  }) => void
  resolveWrong: (id: string) => void
  replaceState: (next: AppState) => void
}

const StoreContext = createContext<Store | null>(null)

function persist(next: AppState): AppState {
  saveState(next)
  return next
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  const setDifficulty = useCallback((value: Difficulty) => {
    setState((prev) => persist({ ...prev, difficulty: value }))
  }, [])

  const recordAttempt = useCallback<Store['recordAttempt']>((input) => {
    setState((prev) => {
      const record: ScoreRecord = {
        id: `score-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        date: new Date().toISOString(),
        subjectId: input.subjectId,
        lessonId: input.lessonId,
        lessonTitle: input.lessonTitle,
        score: input.score,
        total: input.total,
        difficulty: input.difficulty,
      }
      const shouldTouch = input.touchLessonStatus !== false
      const lessonStatus: LessonStatus = {
        practiced: true,
        lastScore: input.score,
        lastTotal: input.total,
        lastDate: record.date,
        lastDifficulty: input.difficulty,
      }
      const newWrong: WrongItem[] = input.misses.map((m) => ({
        ...m,
        id: `wrong-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        addedAt: record.date,
        resolved: false,
      }))
      // 同一题再次答错时，保留最新一条未订正记录，并去掉旧的未订正重复项。
      const missKeys = new Set(newWrong.map((w) => w.questionId))
      const correctKeys = new Set(input.correctQuestionIds)
      const kept = prev.wrongBook.filter((w) => !(missKeys.has(w.questionId) && !w.resolved))
      const updated = kept.map((w) =>
        !w.resolved && correctKeys.has(w.questionId) ? { ...w, resolved: true } : w,
      )
      const next: AppState = {
        ...prev,
        scores: [record, ...prev.scores],
        lessonStatus: shouldTouch
          ? { ...prev.lessonStatus, [input.lessonId]: lessonStatus }
          : prev.lessonStatus,
        wrongBook: [...newWrong, ...updated],
      }
      return persist(next)
    })
  }, [])

  const resolveWrong = useCallback((id: string) => {
    setState((prev) =>
      persist({
        ...prev,
        wrongBook: prev.wrongBook.map((w) => (w.id === id ? { ...w, resolved: true } : w)),
      }),
    )
  }, [])

  const replaceState = useCallback((next: AppState) => {
    setState(persist(next))
  }, [])

  const value = useMemo(
    () => ({ state, setDifficulty, recordAttempt, resolveWrong, replaceState }),
    [state, setDifficulty, recordAttempt, resolveWrong, replaceState],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): Store {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore 必须在 StoreProvider 内使用')
  return ctx
}

