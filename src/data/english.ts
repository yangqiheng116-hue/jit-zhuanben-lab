import type { GradeDetail, LessonContent, Question } from '../types'
import { hasAny, normalizeText } from '../lib/text'
import { ABCD, choiceQuestion } from './author'

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
  choiceQuestion({
    id: 'en1-b6',
    kp: ['阅读'],
    stem: '根据本节短文，这篇文章主要讲什么？',
    options: ABCD([
      'Lin 如何在英语基础较弱时仍坚持用完整句子练习让步结构。',
      '金陵科技学院如何公布新的招生政策。',
      '实验室如何更换全部测量仪器。',
      '老师为什么取消了晚间英语课。',
    ]),
    answer: 'A',
    model: 'A。短文围绕 Lin 的阅读和造句习惯，重点是让步结构的两条规则。',
    rule: '主旨题要覆盖全文，不要被某一句细节带走。',
    example: 'The passage is about a student who keeps practicing complete sentences.',
  }),
  choiceQuestion({
    id: 'en1-b7',
    kp: ['阅读'],
    stem: '根据本节短文，那份实验报告的问题是什么？',
    options: ABCD([
      '样本很小，而且有两个结果不一致。',
      '报告没有写任何结论。',
      '测量方法完全不能使用。',
      'Lin 没有读这篇报告。',
    ]),
    answer: 'A',
    model: 'A。文中写 sample was small，并且 two results were inconsistent。',
    rule: '细节题要回到原文用词，不要自行加码。',
    example: 'Although the method was accurate, the sample was small.',
  }),
  choiceQuestion({
    id: 'en1-b8',
    kp: ['阅读'],
    stem: '根据本节短文，可以推断出哪一项？',
    options: ABCD([
      'Lin 认为能用出来的句子比背一长串词更有用。',
      'Lin 已经不再需要看英语短文。',
      '报告中的数据已经覆盖全校。',
      '老师要求学生背下整篇报告。',
    ]),
    answer: 'A',
    model: 'A。文末说 a careful sentence is more worthwhile than a long list of words she cannot use。',
    rule: '推断要能在文中找到依据，不能选与原文相反的选项。',
    example: 'A careful sentence is more useful than words she never uses.',
  }),
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
  choiceQuestion({
    id: 'en1-a3',
    kp: ['阅读', '让步结构'],
    stem: '根据本节短文，Lin 把哪一条规则写在桌前的卡片上？',
    options: ABCD([
      'Although 和 but 可以同时使用。',
      '不要在 Although 后再加 but，也不要写 despite of。',
      'Despite 后面必须直接接一个完整句子。',
      '阅读时应该先抄下报告的结论。',
    ]),
    answer: 'B',
    model: 'B。短文写明老师要求避免 Although 与 but 同句，也不要写 despite of。',
    rule: 'Although 已经表示让步，不能再加 but；正确形式是 Despite 或 In spite of，没有 despite of。',
    example: 'Although the card is small, it reminds her of the rule.',
  }),
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
    {
      title: '必会词汇',
      blocks: [
        {
          type: 'p',
          text: '这一节不只记 Although 和 Despite 两个词。下面 12 个词都要能放进句子。原有练习题的编号没有改，读完短文后再做新增的阅读题。',
        },
        {
          type: 'vocab',
          items: [
            { word: 'although', pos: 'conj.', meaning: '虽然，尽管', example: 'Although the lab was noisy, Lin finished the passage.', exampleZh: '虽然实验室很吵，Lin 还是读完了短文。', note: '后接完整句子，不要再加 but。' },
            { word: 'even though', pos: 'conj.', meaning: '即使，尽管', example: 'Even though the method takes time, it is accurate.', exampleZh: '即使这个方法费时，它也更准确。' },
            { word: 'despite', pos: 'prep.', meaning: '尽管', example: 'Despite the limited sample, the warning is useful.', exampleZh: '尽管样本有限，这个提醒仍然有用。', note: '后接名词或动名词，没有 despite of。' },
            { word: 'in spite of', pos: 'prep.', meaning: '尽管', example: 'In spite of the noise, she kept writing.', exampleZh: '尽管有噪音，她还是继续写。' },
            { word: 'worthwhile', pos: 'adj.', meaning: '值得的', example: 'A careful sentence is worthwhile.', exampleZh: '一个认真写完的句子是值得的。' },
            { word: 'inconsistent', pos: 'adj.', meaning: '不一致的', example: 'Two results were inconsistent.', exampleZh: '两个结果互相不一致。' },
            { word: 'significant', pos: 'adj.', meaning: '显著的；重要的', example: 'The teacher said the mistake was significant.', exampleZh: '老师说这个错误很要紧。' },
            { word: 'limited', pos: 'adj.', meaning: '有限的', example: 'The sample was limited.', exampleZh: '样本是有限的。' },
            { word: 'accurate', pos: 'adj.', meaning: '准确的', example: 'The new method is more accurate.', exampleZh: '新方法更准确。' },
            { word: 'conclusion', pos: 'n.', meaning: '结论', example: 'She did not copy the conclusion.', exampleZh: '她没有照抄结论。' },
            { word: 'sample', pos: 'n.', meaning: '样本', example: 'The sample came from only one lab.', exampleZh: '样本只来自一个实验室。' },
            { word: 'reliable', pos: 'adj.', meaning: '可靠的', example: 'She wanted a reliable habit, not a long unused list.', exampleZh: '她想要一个可靠的习惯，而不是一长串用不上的词。' },
          ],
        },
      ],
    },
    {
      title: '短篇阅读',
      blocks: [
        {
          type: 'p',
          text: '先通读，再找主旨、细节和推断。阅读题在当堂练习的后几题，原有改错题和翻译题仍在前面。',
        },
        {
          type: 'passage',
          title: 'A card above the desk',
          text: 'Lin Yue studies at a vocational college in Nanjing and hopes to transfer to Jinling Institute of Technology. Her English class meets three evenings a week. Although her foundation is weak, she still opens the reading passage before she looks at the word list. She writes one sentence for each new word and checks that the sentence has a subject and a verb.\n\nLast month the class read a short report about a student lab. The report said the new measurement method was accurate. However, the sample was small, and two results were inconsistent. Lin did not copy the conclusion. She wrote, "Despite the limited sample, the report still gives a useful warning." She also noted that the method was time-consuming. Even though it took more time, it helped her see which numbers were reliable.\n\nHer teacher asked the students to avoid two common mistakes. They should not write Although and but in the same sentence. They should not write despite of. Lin keeps these rules on a card above her desk. The card is simple, but it makes her writing clearer. She now treats a careful sentence as more worthwhile than a long list of words she cannot use. A reliable habit, she says, is built one sentence at a time.',
        },
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
