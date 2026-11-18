import type { Block, GradeDetail, LessonContent, Question, SubjectId, VocabRow } from '../types'
import { hasAllGroups, nearlyEqual, normalizeText, parseNumber } from '../lib/text'

export function explainWrong(where: string, rule: string, example: string, model: string): GradeDetail {
  return {
    correct: false,
    modelAnswer: model,
    explanation: `错在哪里：${where}\n对应规则：${rule}\n再看一个新例子：${example}`,
  }
}

export function explainRight(model: string, note: string): GradeDetail {
  return { correct: true, modelAnswer: model, explanation: note }
}

export function choiceQuestion(spec: {
  id: string
  kp: string[]
  stem: string
  extra?: Block[]
  options: { value: string; label: string }[]
  answer: string
  model: string
  rule: string
  example: string
}): Question {
  const correctLabel = spec.options.find((o) => o.value === spec.answer)?.label ?? spec.answer
  return {
    id: spec.id,
    knowledgePoints: spec.kp,
    promptBlocks: [{ type: 'p', text: spec.stem }, ...(spec.extra ?? [])],
    fields: [{ id: 'answer', label: '选择', type: 'select', options: spec.options }],
    grade: (a) => {
      const got = (a.answer ?? '').trim()
      if (!got) return explainWrong('未作答。', spec.rule, spec.example, spec.model)
      if (got === spec.answer) return explainRight(spec.model, `选择正确。${spec.rule}`)
      const picked = spec.options.find((o) => o.value === got)?.label ?? got
      return explainWrong(`选成了「${picked}」，正确项是「${correctLabel}」。`, spec.rule, spec.example, spec.model)
    },
  }
}

export function meaningQuestion(spec: {
  id: string
  kp: string[]
  prompt: string
  extra?: Block[]
  groups: string[][]
  model: string
  rule: string
  example: string
  placeholder?: string
  label?: string
  forbid?: { pattern: RegExp; where: string }[]
}): Question {
  return {
    id: spec.id,
    knowledgePoints: spec.kp,
    promptBlocks: [{ type: 'p', text: spec.prompt }, ...(spec.extra ?? [])],
    fields: [
      {
        id: 'answer',
        label: spec.label ?? '英文句子',
        type: 'textarea',
        placeholder: spec.placeholder ?? '写出完整英文句子',
      },
    ],
    grade: (a) => {
      const raw = a.answer ?? ''
      const n = normalizeText(raw)
      if (!n) return explainWrong('未作答。', spec.rule, spec.example, spec.model)
      for (const ban of spec.forbid ?? []) {
        if (ban.pattern.test(n)) return explainWrong(ban.where, spec.rule, spec.example, spec.model)
      }
      if (!hasAllGroups(n, spec.groups)) {
        return explainWrong(
          '句子里缺少题目要求的关键信息，或用词没有覆盖句意。',
          spec.rule,
          spec.example,
          spec.model,
        )
      }
      if (n.split(' ').length < 4) {
        return explainWrong('只写了零散单词，还不是完整句子。', spec.rule, spec.example, spec.model)
      }
      return explainRight(spec.model, '句意和结构都可以接受。不同说法只要信息完整、语法成立即可。')
    },
  }
}

export function keywordQuestion(spec: {
  id: string
  kp: string[]
  prompt: Block[]
  fields: {
    id: string
    label: string
    groups: string[][]
    placeholder?: string
    textarea?: boolean
  }[]
  model: string
  rule: string
  example: string
}): Question {
  return {
    id: spec.id,
    knowledgePoints: spec.kp,
    promptBlocks: spec.prompt,
    fields: spec.fields.map((f) => ({
      id: f.id,
      label: f.label,
      type: f.textarea === false ? 'text' : 'textarea',
      placeholder: f.placeholder,
    })),
    grade: (answers) => {
      const partResults = spec.fields.map((f) => {
        const n = normalizeText(answers[f.id] ?? '')
        const correct = n.length > 0 && hasAllGroups(n, f.groups)
        return { id: f.id, label: f.label, correct, expected: '需包含关键信息' }
      })
      if (partResults.every((p) => p.correct)) {
        return { correct: true, partResults, modelAnswer: spec.model, explanation: `回答正确。${spec.rule}` }
      }
      const missed = partResults.filter((p) => !p.correct).map((p) => p.label)
      return {
        correct: false,
        partResults,
        modelAnswer: spec.model,
        explanation: `错在哪里：${missed.join('、')}没有写清，或缺少必要信息。\n对应规则：${spec.rule}\n再看一个新例子：${spec.example}`,
      }
    },
  }
}

export function numericQuestion(spec: {
  id: string
  kp: string[]
  prompt: Block[]
  numbers?: { id: string; label: string; expected: number; unit?: string; tol?: number }[]
  selects?: { id: string; label: string; options: { value: string; label: string }[]; expected: string }[]
  model: string
  rule: string
  example: string
}): Question {
  const numbers = spec.numbers ?? []
  const selects = spec.selects ?? []
  return {
    id: spec.id,
    knowledgePoints: spec.kp,
    promptBlocks: spec.prompt,
    fields: [
      ...numbers.map((f) => ({
        id: f.id,
        label: f.label,
        type: 'number' as const,
        unit: f.unit,
        placeholder: '写出数值',
      })),
      ...selects.map((f) => ({
        id: f.id,
        label: f.label,
        type: 'select' as const,
        options: f.options,
      })),
    ],
    grade: (answers) => {
      const partResults = [
        ...numbers.map((f) => {
          const n = parseNumber(answers[f.id] ?? '')
          const correct = n !== null && nearlyEqual(n, f.expected, f.tol ?? 0.05)
          return { id: f.id, label: f.label, correct, expected: String(f.expected) }
        }),
        ...selects.map((f) => {
          const correct = (answers[f.id] ?? '').trim() === f.expected
          const label = f.options.find((o) => o.value === f.expected)?.label ?? f.expected
          return { id: f.id, label: f.label, correct, expected: label }
        }),
      ]
      if (partResults.every((p) => p.correct)) {
        return { correct: true, partResults, modelAnswer: spec.model, explanation: `计算正确。${spec.rule}` }
      }
      const detail = partResults
        .filter((p) => !p.correct)
        .map((p) => `${p.label}应为 ${p.expected}`)
        .join('；')
      return {
        correct: false,
        partResults,
        modelAnswer: spec.model,
        explanation: `错在哪里：${detail}。\n对应规则／公式：${spec.rule}\n再看一个新例子：${spec.example}`,
      }
    },
  }
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function englishLesson(spec: {
  number: number
  title: string
  goals: string[]
  intro: string
  vocab: VocabRow[]
  structure: Block[]
  passageTitle: string
  passage: string
  passageGuide: string
  extra?: { title: string; blocks: Block[] }[]
  examples: { title: string; body: string[]; solution: string[] }[]
  basic: Question[]
  advanced: Question[]
}): LessonContent {
  if (spec.vocab.length < 10 || spec.vocab.length > 15) {
    throw new Error(`英语第 ${spec.number} 节词汇应有 10–15 个，实际 ${spec.vocab.length} 个。`)
  }
  const words = wordCount(spec.passage)
  if (words < 150 || words > 220) {
    throw new Error(`英语第 ${spec.number} 节阅读有 ${words} 词，需要 150–220 词。`)
  }
  const translations = [...spec.basic, ...spec.advanced].filter((q) =>
    q.knowledgePoints.some((k) => k.includes('翻译') || k.includes('造句') || k.includes('组句')),
  )
  if (translations.length < 4) {
    throw new Error(`英语第 ${spec.number} 节汉译英／组句不足 4 题。`)
  }
  return {
    subjectId: 'english',
    lessonId: `english-${spec.number}`,
    number: spec.number,
    title: spec.title,
    goals: spec.goals,
    sections: [
      { title: '今日目标', blocks: [{ type: 'p', text: spec.intro }] },
      {
        title: '必会词汇',
        blocks: [
          {
            type: 'p',
            text: '下面这些词和词组要能在句子里用出来，而不是只认中文。例句都是本节原创，用来演示搭配。',
          },
          { type: 'vocab', items: spec.vocab },
        ],
      },
      { title: '句型结构', blocks: spec.structure },
      {
        title: '短篇阅读',
        blocks: [
          { type: 'p', text: spec.passageGuide },
          { type: 'passage', title: spec.passageTitle, text: spec.passage },
          {
            type: 'callout',
            tone: 'note',
            title: '阅读题在当堂练习里',
            text: '先自己读完上面的短文，再做练习中的主旨、细节和推断题。提交前不显示答案。',
          },
        ],
      },
      ...(spec.extra ?? []),
    ],
    workedExamples: spec.examples.map((ex) => ({
      title: ex.title,
      body: ex.body.map((text) => ({ type: 'p' as const, text })),
      solution: ex.solution.map((text) => ({ type: 'p' as const, text })),
    })),
    exercises: { basic: spec.basic, advanced: spec.advanced },
  }
}

export function stemLesson(spec: {
  subjectId: SubjectId
  number: number
  title: string
  goals: string[]
  sections: { title: string; blocks: Block[] }[]
  examples: { title: string; body: Block[]; solution: Block[] }[]
  basic: Question[]
  advanced: Question[]
}): LessonContent {
  const prefix = spec.subjectId === 'circuit' ? 'circuit' : 'control'
  return {
    subjectId: spec.subjectId,
    lessonId: `${prefix}-${spec.number}`,
    number: spec.number,
    title: spec.title,
    goals: spec.goals,
    sections: spec.sections,
    workedExamples: spec.examples,
    exercises: { basic: spec.basic, advanced: spec.advanced },
  }
}

export const ABCD = (texts: [string, string, string, string]) =>
  (['A', 'B', 'C', 'D'] as const).map((value, i) => ({ value, label: `${value}. ${texts[i]}` }))
