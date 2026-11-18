import type { GradeDetail, LessonContent, Question } from '../types'
import { hasAny, normalizeText } from '../lib/text'

function matchesAny(answer: string, accepted: string[]): boolean {
  const n = normalizeText(answer)
  return accepted.some((a) => n === normalizeText(a))
}

function structureFlags(answer: string): {
  althoughBut: boolean
  despiteOf: boolean
  althoughClause: boolean
  despitePhrase: boolean
} {
  const n = normalizeText(answer)
  const althoughBut = /\b(although|even though)\b.+\bbut\b/.test(n)
  const despiteOf = /\bdespite of\b/.test(n)
  const althoughClause =
    /\b(although|even though)\b\s+\S+/.test(n) &&
    /\b(although|even though)\b\s+\S+\s+\S+/.test(n)
  const despitePhrase =
    /\b(despite|in spite of)\b\s+(the fact that|being|\S+)/.test(n)
  return { althoughBut, despiteOf, althoughClause, despitePhrase }
}

function translationOk(answer: string, meaningGroups: string[][]): { ok: boolean; reason: string } {
  const n = normalizeText(answer)
  if (!n) return { ok: false, reason: '未作答。' }
  const flags = structureFlags(answer)
  if (flags.althoughBut) {
    return { ok: false, reason: '用了 Although / Even though 就不要再加 but。' }
  }
  if (flags.despiteOf) {
    return { ok: false, reason: '没有 despite of 这种用法，应写成 Despite 或 In spite of。' }
  }
  if (!flags.althoughClause && !flags.despitePhrase) {
    return {
      ok: false,
      reason: '需要使用 Although / Even though + 完整句子，或 Despite / In spite of + 名词、动名词，或 the fact that + 句子。',
    }
  }
  const missing = meaningGroups.filter((g) => !hasAny(n, g))
  if (missing.length > 0) {
    return { ok: false, reason: '让步结构基本对，但句意不完整，核心信息有缺漏或理解有偏差。' }
  }
  return { ok: true, reason: '' }
}

function feedbackWrong(where: string, rule: string, example: string, model: string): GradeDetail {
  return {
    correct: false,
    modelAnswer: model,
    explanation: `错在哪里：${where}\n对应规则：${rule}\n再看一个新例子：${example}`,
  }
}

function feedbackRight(model: string, note: string): GradeDetail {
  return {
    correct: true,
    modelAnswer: model,
    explanation: note,
  }
}

const q1Accepted = [
  'Despite the experiment being carefully designed, the results were inconsistent.',
  'Despite the fact that the experiment was carefully designed, the results were inconsistent.',
  'In spite of the experiment being carefully designed, the results were inconsistent.',
  'In spite of the fact that the experiment was carefully designed, the results were inconsistent.',
  'Although the experiment was carefully designed, the results were inconsistent.',
  'Even though the experiment was carefully designed, the results were inconsistent.',
]

const q2Accepted = [
  'Despite the high cost, many universities still adopt the new system.',
  'In spite of the high cost, many universities still adopt the new system.',
  'Despite the high cost, many universities still adopt the new systems.',
  'Although the cost is high, many universities still adopt the new system.',
  'Although the cost was high, many universities still adopt the new system.',
  'Even though the cost is high, many universities still adopt the new system.',
  'Even though the cost was high, many universities still adopt the new system.',
  'Although the cost is high, many universities still adopted the new system.',
  'Despite its high cost, many universities still adopt the new system.',
  'In spite of its high cost, many universities still adopt the new system.',
]

const q3Accepted = [
  'Although the sample was small, the findings were significant.',
  'Even though the sample was small, the findings were significant.',
  'The sample was small, but the findings were significant.',
  'Despite the small sample, the findings were significant.',
  'Despite the sample being small, the findings were significant.',
  'Despite the fact that the sample was small, the findings were significant.',
  'In spite of the small sample, the findings were significant.',
  'In spite of the sample being small, the findings were significant.',
  'In spite of the fact that the sample was small, the findings were significant.',
]

const q6Accepted = [
  'Despite the limited sample size, the researchers still drew a reliable conclusion.',
  'Despite the limited sample size, the researchers still reached a reliable conclusion.',
  'In spite of the limited sample size, the researchers still drew a reliable conclusion.',
  'In spite of the limited sample size, the researchers still reached a reliable conclusion.',
  'Despite the fact that the sample size was limited, the researchers still drew a reliable conclusion.',
  'Although the sample size was limited, the researchers still drew a reliable conclusion.',
  'Even though the sample size was limited, the researchers still drew a reliable conclusion.',
  'Although the sample size was limited, the researchers still reached a reliable conclusion.',
]

const q7Accepted = [
  'Although the new method is more accurate, it requires more time.',
  'Even though the new method is more accurate, it requires more time.',
  'Although the new method is more accurate, it takes more time.',
  'Even though the new method is more accurate, it takes more time.',
  'The new method is more accurate, but it requires more time.',
  'Despite being more accurate, the new method requires more time.',
  'In spite of being more accurate, the new method requires more time.',
  'Despite the new method being more accurate, it requires more time.',
]

const model4 =
  'Despite the limited data, the study still reached a clear conclusion.\n也可以：Although the data was limited, the study still reached a clear conclusion.'
const model5 =
  'Although this method is time-consuming, it is more accurate than the traditional method.\n也可以：Despite being time-consuming, this method is more accurate than the traditional method.'

function gradeCorrection(
  answer: string,
  accepted: string[],
  model: string,
  wrongHint: { despiteClause?: boolean; althoughNoun?: boolean; althoughBut?: boolean; despiteOf?: boolean },
): GradeDetail {
  if (!answer.trim()) {
    return feedbackWrong('未作答。', '先按规则改出完整句子再提交。', 'Although the cost is high, the project is still worthwhile.', model)
  }
  if (matchesAny(answer, accepted)) {
    return feedbackRight(model, '改法正确。注意 Although / Even though 后接完整句子，Despite / In spite of 后接名词、动名词或 the fact that + 句子；Although 不再加 but，也没有 despite of。')
  }
  const flags = structureFlags(answer)
  if (wrongHint.despiteOf || flags.despiteOf) {
    return feedbackWrong(
      '写成了 despite of。',
      '没有 despite of 这种用法，应写 Despite 或 In spite of。',
      'Despite the high cost, the project is still worthwhile.',
      model,
    )
  }
  if (wrongHint.althoughBut || flags.althoughBut) {
    return feedbackWrong(
      'Although / Even though 后面又用了 but。',
      'Although 已经表示让步，不能再加 but。需要转折时，只保留其中一个。',
      'Although the sample was small, the findings were significant.',
      model,
    )
  }
  if (wrongHint.despiteClause && /\bdespite\b.+\b(was|were|is|are)\b/.test(normalizeText(answer)) && !/\bdespite the fact that\b/.test(normalizeText(answer)) && !/\bdespite\b.+\bbeing\b/.test(normalizeText(answer))) {
    return feedbackWrong(
      'Despite 后面直接接了完整句子。',
      'Despite / In spite of 后面接名词、动名词，或 the fact that + 句子，不能直接接主语 + 谓语。',
      'Despite the fact that the experiment was carefully designed, the results were inconsistent.',
      model,
    )
  }
  if (wrongHint.althoughNoun && /\b(although|even though)\b\s+the\s+\w+(\s+\w+)?,/.test(normalizeText(answer)) && !/\b(although|even though)\b\s+\S+\s+(is|was|are|were|has|had|do|does|did|can|could|will|would)\b/.test(normalizeText(answer))) {
    return feedbackWrong(
      'Although 后面只接了名词短语，没有完整句子。',
      'Although / Even though 后面必须接主语 + 谓语。若只想用名词短语，应改用 Despite / In spite of。',
      'Despite the high cost, many universities still adopt the new system.',
      model,
    )
  }
  return feedbackWrong(
    '句子尚未改到可接受的正确形式。',
    'Although / Even though + 完整句子；Despite / In spite of + 名词、动名词或 the fact that + 句子。Although 不能再加 but，也没有 despite of。',
    'Despite being expensive, the method is widely used.',
    model,
  )
}

const basic: Question[] = [
  {
    id: 'en1-b1',
    knowledgePoints: ['让步结构'],
    promptBlocks: [
      { type: 'p', text: '改错：Despite the experiment was carefully designed, the results were inconsistent.' },
    ],
    fields: [{ id: 'answer', label: '改正后的句子', type: 'textarea', placeholder: '用英文写出改正后的句子' }],
    grade: (a) =>
      gradeCorrection(
        a.answer ?? '',
        q1Accepted,
        'Despite the experiment being carefully designed, the results were inconsistent.\n也可以：Despite the fact that the experiment was carefully designed, the results were inconsistent.\n或：Although the experiment was carefully designed, the results were inconsistent.',
        { despiteClause: true },
      ),
  },
  {
    id: 'en1-b2',
    knowledgePoints: ['让步结构'],
    promptBlocks: [
      { type: 'p', text: '改错：Although the high cost, many universities still adopt the new system.' },
    ],
    fields: [{ id: 'answer', label: '改正后的句子', type: 'textarea', placeholder: '用英文写出改正后的句子' }],
    grade: (a) =>
      gradeCorrection(
        a.answer ?? '',
        q2Accepted,
        'Despite the high cost, many universities still adopt the new system.\n也可以：Although the cost is high, many universities still adopt the new system.',
        { althoughNoun: true },
      ),
  },
  {
    id: 'en1-b3',
    knowledgePoints: ['让步结构'],
    promptBlocks: [
      { type: 'p', text: '改错：Although the sample was small, but the findings were significant.' },
    ],
    fields: [{ id: 'answer', label: '改正后的句子', type: 'textarea', placeholder: '用英文写出改正后的句子' }],
    grade: (a) =>
      gradeCorrection(
        a.answer ?? '',
        q3Accepted,
        'Although the sample was small, the findings were significant.',
        { althoughBut: true },
      ),
  },
  {
    id: 'en1-b4',
    knowledgePoints: ['让步结构'],
    promptBlocks: [{ type: 'p', text: '中译英：尽管数据有限，该研究仍然得出了明确结论。' }],
    fields: [{ id: 'answer', label: '英文译文', type: 'textarea', placeholder: '用 Although 或 Despite / In spite of 翻译' }],
    grade: (a) => {
      const model = model4
      const r = translationOk(a.answer ?? '', [
        ['data', 'datum'],
        ['limit', 'limited', 'insufficient', 'not enough', 'few'],
        ['study', 'research', 'paper', 'experiment'],
        ['clear', 'definite', 'explicit', 'firm', 'solid'],
        ['conclusion', 'conclusions', 'result', 'results'],
      ])
      if (r.ok) {
        return feedbackRight(model, '结构与句意都成立。让步部分用 Although / Even though + 句子，或 Despite / In spite of + 名词短语即可。')
      }
      return feedbackWrong(
        r.reason,
        'Although / Even though 后接完整句子；Despite / In spite of 后接名词、动名词或 the fact that + 句子。句意需包含“数据有限”和“研究得出明确结论”。',
        'Despite limited evidence, the team still reached a clear conclusion.',
        model,
      )
    },
  },
  {
    id: 'en1-b5',
    knowledgePoints: ['让步结构'],
    promptBlocks: [{ type: 'p', text: '中译英：虽然这种方法耗时，它比传统方法更准确。' }],
    fields: [{ id: 'answer', label: '英文译文', type: 'textarea', placeholder: '用 Although 或 Despite / In spite of 翻译' }],
    grade: (a) => {
      const model = model5
      const r = translationOk(a.answer ?? '', [
        ['method', 'approach', 'technique', 'way'],
        ['time-consuming', 'time consuming', 'takes time', 'take time', 'took time', 'consumes time', 'consume time', 'costly in time'],
        ['accurate', 'accuracy', 'precise', 'precision'],
        ['traditional', 'conventional', 'old', 'original'],
      ])
      if (r.ok) {
        return feedbackRight(model, '结构与句意都成立。注意不要写成 Although ..., but ...。')
      }
      return feedbackWrong(
        r.reason,
        'Although / Even though 后接完整句子；Despite / In spite of 后接名词或动名词。句意需包含“这种方法耗时”和“比传统方法更准确”。',
        'Although the process is time-consuming, it is more accurate than the old method.',
        model,
      )
    },
  },
]

const advanced: Question[] = [
  {
    id: 'en1-a1',
    knowledgePoints: ['让步结构'],
    promptBlocks: [
      {
        type: 'p',
        text: '改错：Despite of the limited sample size, the researchers still drew a reliable conclusion.',
      },
    ],
    fields: [{ id: 'answer', label: '改正后的句子', type: 'textarea', placeholder: '用英文写出改正后的句子' }],
    grade: (a) =>
      gradeCorrection(
        a.answer ?? '',
        q6Accepted,
        'Despite the limited sample size, the researchers still drew a reliable conclusion.',
        { despiteOf: true },
      ),
  },
  {
    id: 'en1-a2',
    knowledgePoints: ['让步结构'],
    promptBlocks: [
      {
        type: 'p',
        text: '改错：Although the new method is more accurate, but it requires more time.',
      },
    ],
    fields: [{ id: 'answer', label: '改正后的句子', type: 'textarea', placeholder: '用英文写出改正后的句子' }],
    grade: (a) =>
      gradeCorrection(
        a.answer ?? '',
        q7Accepted,
        'Although the new method is more accurate, it requires more time.',
        { althoughBut: true },
      ),
  },
]

export const englishLesson1: LessonContent = {
  subjectId: 'english',
  lessonId: 'english-1',
  number: 1,
  title: 'Although 与 Despite',
  goals: [
    '分清 Although / Even though 与 Despite / In spite of 后面该接什么。',
    '能改出把从句和名词短语接错的句子，也能把中文让步句译成英文。',
    '记住两条禁则：Although 不能再加 but；没有 despite of 这种用法。',
  ],
  sections: [
    {
      title: '今日目标',
      blocks: [
        {
          type: 'p',
          text: '专转本英语里，让步结构出现得很密。今天只把 Although 和 Despite 这一组讲清楚：后面接的成分不同，写错就会整句不合格。',
        },
      ],
    },
    {
      title: '规则只有三条',
      blocks: [
        {
          type: 'callout',
          tone: 'rule',
          title: 'Although / Even though',
          text: '后面接**完整句子**（主语 + 谓语）。例如：Although the cost is high, the project is still worthwhile.',
        },
        {
          type: 'callout',
          tone: 'rule',
          title: 'Despite / In spite of',
          text: '后面接**名词、动名词**，或 **the fact that + 句子**。例如：Despite the high cost, the project is still worthwhile. / Despite being expensive, the method is widely used. / Despite the fact that the cost is high, the project is still worthwhile.',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: '两条不要写',
          text: 'Although 不能再加 but。也没有 despite of 这种用法（正确的是 Despite 或 In spite of）。',
        },
        {
          type: 'compare',
          leftTitle: '接完整句子',
          left: [
            'Although the data is limited, the conclusion is clear.',
            'Even though the method takes time, it is more accurate.',
          ],
          rightTitle: '接名词或动名词',
          right: [
            'Despite the limited data, the conclusion is clear.',
            'In spite of being time-consuming, the method is more accurate.',
          ],
        },
        { type: 'diagram', id: 'english-compare', caption: 'Although 接从句，Despite 接名词短语，不要混用。' },
      ],
    },
  ],
  workedExamples: [
    {
      title: '示范 1：把 Despite 后的句子改对',
      body: [
        { type: 'p', text: '原句：Despite the cost is high, the project is still worthwhile.' },
        { type: 'p', text: '问题在于 Despite 后面直接跟了主语 + 谓语。' },
      ],
      solution: [
        {
          type: 'p',
          text: '改法一，把后面改成名词短语：Despite the high cost, the project is still worthwhile.',
        },
        {
          type: 'p',
          text: '改法二，加上 the fact that：Despite the fact that the cost is high, the project is still worthwhile.',
        },
        {
          type: 'p',
          text: '改法三，换成 Although：Although the cost is high, the project is still worthwhile.',
        },
      ],
    },
    {
      title: '示范 2：去掉多余的 but',
      body: [{ type: 'p', text: '原句：Although the sample was small, but the findings were significant.' }],
      solution: [
        {
          type: 'p',
          text: 'Although 已经承担让步，后面不要再写 but。改正：Although the sample was small, the findings were significant.',
        },
        {
          type: 'p',
          text: '如果想保留 but，就不要再用 Although：The sample was small, but the findings were significant.',
        },
      ],
    },
  ],
  exercises: { basic, advanced },
}

export function getEnglishQuestion(id: string): Question | undefined {
  return [...basic, ...advanced].find((q) => q.id === id)
}

// used so formatAnswers is available if later expanded
