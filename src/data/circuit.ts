import type { GradeDetail, LessonContent, Question } from '../types'
import { nearlyEqual, parseNumber } from '../lib/text'

const absorbOptions = [
  { value: 'absorb', label: '吸收功率' },
  { value: 'generate', label: '发出功率' },
]

function numOk(raw: string | undefined, expected: number): boolean {
  const n = parseNumber(raw ?? '')
  return n !== null && nearlyEqual(n, expected)
}

function selectOk(raw: string | undefined, expected: string): boolean {
  return (raw ?? '').trim() === expected
}

function partsExplain(parts: { label: string; correct: boolean; expected: string }[]): string {
  return parts
    .map((p) => (p.correct ? `${p.label}正确。` : `${p.label}应为 ${p.expected}。`))
    .join(' ')
}

function gradeNumeric(
  answers: Record<string, string>,
  fields: { id: string; label: string; expected: number | string }[],
  model: string,
  correctNote: string,
  wrongWhere: string,
  rule: string,
  example: string,
): GradeDetail {
  const partResults = fields.map((f) => {
    const correct =
      typeof f.expected === 'number' ? numOk(answers[f.id], f.expected) : selectOk(answers[f.id], f.expected)
    const expected = typeof f.expected === 'number' ? String(f.expected) : f.expected === 'absorb' ? '吸收功率' : f.expected === 'generate' ? '发出功率' : f.expected === 'yes' ? '相等' : f.expected === 'no' ? '不相等' : String(f.expected)
    return { id: f.id, label: f.label, correct, expected }
  })
  const correct = partResults.every((p) => p.correct)
  if (correct) {
    return { correct: true, partResults, modelAnswer: model, explanation: correctNote }
  }
  return {
    correct: false,
    partResults,
    modelAnswer: model,
    explanation: `错在哪里：${wrongWhere}${partsExplain(partResults)}\n对应规则／公式：${rule}\n再看一个新例子：${example}`,
  }
}

const basic: Question[] = [
  {
    id: 'cir1-b1',
    knowledgePoints: ['欧姆定律', '功率正负'],
    promptBlocks: [
      {
        type: 'p',
        text: '某电阻 $R = 5\\,\\Omega$，电压、电流取**关联参考方向**。已知 $u = 20\\,\\mathrm{V}$。求电流 $i$，以及该电阻吸收的功率 $p$。',
      },
      { type: 'diagram', id: 'circuit-associated', caption: '本题为关联参考方向：电流从“+”端流入。' },
    ],
    fields: [
      { id: 'i', label: '电流 i', type: 'number', unit: 'A', placeholder: '写出数值' },
      { id: 'p', label: '吸收功率 p', type: 'number', unit: 'W', placeholder: '写出数值' },
    ],
    grade: (a) =>
      gradeNumeric(
        a,
        [
          { id: 'i', label: '电流 i', expected: 4 },
          { id: 'p', label: '吸收功率 p', expected: 80 },
        ],
        'i = 4 A，吸收功率 p = 80 W。',
        '关联方向下 $u = Ri$，故 $i = u/R = 20/5 = 4\\,\\mathrm{A}$。吸收功率 $p = ui = 80\\,\\mathrm{W}$，也可用 $p = i^2 R$ 或 $p = u^2 / R$。',
        '欧姆定律或功率计算有误。',
        '关联参考方向下 $u = Ri$，$p = ui$（电阻吸收功率也可用 $p = i^2 R$ 或 $p = u^2 / R$）。',
        '若 $R = 2\\,\\Omega$、$u = 8\\,\\mathrm{V}$ 且为关联方向，则 $i = 4\\,\\mathrm{A}$，吸收功率 $p = 32\\,\\mathrm{W}$。',
      ),
  },
  {
    id: 'cir1-b2',
    knowledgePoints: ['参考方向', '功率正负'],
    promptBlocks: [
      {
        type: 'p',
        text: '某元件的电压、电流取**关联参考方向**。已知 $u = 10\\,\\mathrm{V}$，$i = -0.4\\,\\mathrm{A}$。',
      },
      { type: 'ol', items: ['计算功率 $p$；', '说明它是吸收功率还是发出功率，功率大小是多少。'] },
    ],
    fields: [
      { id: 'p', label: '功率 p = ui', type: 'number', unit: 'W', placeholder: '带符号' },
      { id: 'kind', label: '该元件', type: 'select', options: absorbOptions },
      { id: 'mag', label: '功率大小', type: 'number', unit: 'W', placeholder: '正值' },
    ],
    grade: (a) =>
      gradeNumeric(
        a,
        [
          { id: 'p', label: '功率 p', expected: -4 },
          { id: 'kind', label: '吸收或发出', expected: 'generate' },
          { id: 'mag', label: '功率大小', expected: 4 },
        ],
        'p = -4 W。该元件发出功率，大小为 4 W。',
        '关联方向下 $p = ui = 10 \\times (-0.4) = -4\\,\\mathrm{W}$。$p < 0$，表示发出 $4\\,\\mathrm{W}$，不是吸收。',
        '符号或“吸收／发出”判断有误。',
        '关联参考方向下 $p = ui$；$p > 0$ 为吸收，$p < 0$ 为发出。发出的功率大小取绝对值。不要把 $u$ 和 $i$ 的数值直接相乘后一律当成吸收功率。',
        '若关联方向下 $u = -6\\,\\mathrm{V}$、$i = 2\\,\\mathrm{A}$，则 $p = -12\\,\\mathrm{W}$，该元件发出 $12\\,\\mathrm{W}$。',
      ),
  },
  {
    id: 'cir1-b3',
    knowledgePoints: ['参考方向', '欧姆定律', '功率正负'],
    promptBlocks: [
      {
        type: 'p',
        text: '某电阻 $R = 4\\,\\Omega$。电压参考方向与电流参考方向为**非关联**：电流 $i$ 从标有“−”的一端流入。已知 $i = 3\\,\\mathrm{A}$。',
      },
      { type: 'ol', items: ['按图中所标参考方向，求电压 $u$；', '求该电阻吸收的功率。'] },
      { type: 'diagram', id: 'circuit-nonassociated', caption: '非关联参考方向：电流从“−”端流入。此时 $u = -Ri$。' },
    ],
    fields: [
      { id: 'u', label: '电压 u（按图中参考方向）', type: 'number', unit: 'V', placeholder: '注意符号' },
      { id: 'p', label: '吸收功率', type: 'number', unit: 'W', placeholder: '写出数值' },
    ],
    grade: (a) =>
      gradeNumeric(
        a,
        [
          { id: 'u', label: '电压 u', expected: -12 },
          { id: 'p', label: '吸收功率', expected: 36 },
        ],
        'u = -12 V，吸收功率为 36 W。',
        '非关联方向下 $u = -Ri = -4 \\times 3 = -12\\,\\mathrm{V}$。电阻吸收功率 $p = i^2 R = 36\\,\\mathrm{W}$；若用所标 $u$、$i$ 计算吸收功率，应取 $p = -ui = -(-12)\\times 3 = 36\\,\\mathrm{W}$。',
        '非关联方向下的符号，或吸收功率的公式用错。',
        '非关联参考方向下 $u = -Ri$（$R$ 本身仍为正）。求吸收功率可用 $p = i^2 R$，或 $p = -ui$（因为所标 $u$、$i$ 非关联）。',
        '若 $R = 2\\,\\Omega$、$i = 4\\,\\mathrm{A}$ 且为非关联方向，则 $u = -8\\,\\mathrm{V}$，吸收功率为 $32\\,\\mathrm{W}$。',
      ),
  },
  {
    id: 'cir1-b4',
    knowledgePoints: ['参考方向', '欧姆定律', '功率正负'],
    promptBlocks: [
      {
        type: 'p',
        text: '理想电压源与电阻接在同一对节点上，组成一个单回路。电压源上端为“+”、下端为“−”，按此参考方向 $U_s = 12\\,\\mathrm{V}$。电阻 $R = 6\\,\\Omega$，其电压、电流取**关联参考方向**：电流 $i$ 从电阻上端流入，电阻上端为“+”。',
      },
      { type: 'diagram', id: 'circuit-loop', caption: '单回路：电源上正下负；电阻关联参考方向，电流从上端“+”流入。' },
      {
        type: 'ol',
        items: [
          '求电流 $i$ 和电阻电压 $u_R$；',
          '分别计算电压源和电阻的功率，并说明各自是吸收还是发出；',
          '发出的总功率与吸收的总功率是否相等？',
        ],
      },
    ],
    fields: [
      { id: 'i', label: '电流 i', type: 'number', unit: 'A' },
      { id: 'ur', label: '电阻电压 u_R', type: 'number', unit: 'V' },
      { id: 'ps', label: '电压源功率大小', type: 'number', unit: 'W' },
      { id: 'skind', label: '电压源', type: 'select', options: absorbOptions },
      { id: 'pr', label: '电阻功率大小', type: 'number', unit: 'W' },
      { id: 'rkind', label: '电阻', type: 'select', options: absorbOptions },
      {
        id: 'balance',
        label: '发出总功率与吸收总功率',
        type: 'select',
        options: [
          { value: 'yes', label: '相等' },
          { value: 'no', label: '不相等' },
        ],
      },
    ],
    grade: (a) =>
      gradeNumeric(
        a,
        [
          { id: 'i', label: '电流 i', expected: 2 },
          { id: 'ur', label: '电阻电压 u_R', expected: 12 },
          { id: 'ps', label: '电压源功率大小', expected: 24 },
          { id: 'skind', label: '电压源是吸收还是发出', expected: 'generate' },
          { id: 'pr', label: '电阻功率大小', expected: 24 },
          { id: 'rkind', label: '电阻是吸收还是发出', expected: 'absorb' },
          { id: 'balance', label: '功率是否平衡', expected: 'yes' },
        ],
        'i = 2 A，u_R = 12 V。电压源发出 24 W，电阻吸收 24 W。发出的总功率与吸收的总功率相等。',
        '电阻两端电压等于 $U_s$，关联方向下 $u_R = 12\\,\\mathrm{V}$，$i = u_R / R = 2\\,\\mathrm{A}$。电阻 $p_R = u_R i = 24\\,\\mathrm{W}$，吸收。电源电流从“+”极流出，发出 $U_s i = 24\\,\\mathrm{W}$。发出与吸收总量相等，功率守恒。',
        '电流、电压、功率正负或功率平衡有一处算错。',
        '电阻用关联方向的欧姆定律 $u = Ri$。电阻吸收 $p = ui$；电源电流从正极流出时发出功率 $U_s i$。一个完整电路里，发出的总功率必然等于吸收的总功率。',
        '若 $U_s = 10\\,\\mathrm{V}$、$R = 5\\,\\Omega$，则 $i = 2\\,\\mathrm{A}$，电阻吸收 $20\\,\\mathrm{W}$，电源发出 $20\\,\\mathrm{W}$，仍然平衡。',
      ),
  },
]

const advanced: Question[] = [
  {
    id: 'cir1-a1',
    knowledgePoints: ['参考方向', '欧姆定律', '功率正负'],
    promptBlocks: [
      {
        type: 'p',
        text: '某电阻 $R = 10\\,\\Omega$，图中所标电压、电流为**非关联参考方向**（电流从“−”端流入）。已知按图中参考方向 $u = 20\\,\\mathrm{V}$。',
      },
      { type: 'diagram', id: 'circuit-nonassociated', caption: '非关联参考方向。本题已知的是所标电压 $u$，求所标电流 $i$。' },
      { type: 'ol', items: ['按图中所标参考方向求电流 $i$；', '求该电阻吸收的功率，并说明它是吸收还是发出。'] },
    ],
    fields: [
      { id: 'i', label: '电流 i（按图中参考方向）', type: 'number', unit: 'A', placeholder: '注意符号' },
      { id: 'p', label: '吸收功率', type: 'number', unit: 'W' },
      { id: 'kind', label: '该电阻', type: 'select', options: absorbOptions },
    ],
    grade: (a) =>
      gradeNumeric(
        a,
        [
          { id: 'i', label: '电流 i', expected: -2 },
          { id: 'p', label: '吸收功率', expected: 40 },
          { id: 'kind', label: '吸收或发出', expected: 'absorb' },
        ],
        'i = -2 A。吸收功率为 40 W，该电阻吸收功率。',
        '非关联方向下 $u = -Ri$，故 $i = -u/R = -20/10 = -2\\,\\mathrm{A}$。$i < 0$ 表示实际电流与参考方向相反，也就是实际从“+”端流入。吸收功率 $p = i^2 R = 40\\,\\mathrm{W}$，或 $p = -ui = -20\\times(-2) = 40\\,\\mathrm{W}$。电阻总是吸收功率。',
        '非关联公式中的负号用错，或把功率正负判断反了。',
        '非关联时 $u = -Ri$，$R$ 本身为正。吸收功率用 $p = i^2 R$，或对所标 $u$、$i$ 用 $p = -ui$。线性电阻吸收的功率为正。',
        '若非关联方向下 $u = 8\\,\\mathrm{V}$、$R = 4\\,\\Omega$，则 $i = -2\\,\\mathrm{A}$，吸收功率为 $16\\,\\mathrm{W}$。',
      ),
  },
]

export const circuitLesson1: LessonContent = {
  subjectId: 'circuit',
  lessonId: 'circuit-1',
  number: 1,
  title: '参考方向、欧姆定律与功率的正负',
  goals: [
    '能根据图中所标参考方向正确写出欧姆定律。',
    '分清关联参考方向与非关联参考方向。',
    '会用 $p = ui$ 判断元件是吸收功率还是发出功率。',
  ],
  sections: [
    {
      title: '今日目标',
      blocks: [
        {
          type: 'p',
          text: '本节依据金陵科技学院往年《电路分析》大纲第一章，参考书为邱关源《电路》第 5 版。先把参考方向、欧姆定律和功率正负讲清楚，再做当堂练习。',
        },
      ],
    },
    {
      title: '一、参考方向',
      blocks: [
        {
          type: 'p',
          text: '电路图上标出的电流箭头、电压“+ / −”，都是事先假定的**参考方向**，不一定等于实际方向。',
        },
        {
          type: 'ul',
          items: [
            '若 $i > 0$ 或 $u > 0$，实际方向与参考方向相同；',
            '若 $i < 0$ 或 $u < 0$，实际方向与参考方向相反。',
          ],
        },
        {
          type: 'p',
          text: '参考方向可以自行选定，但一旦选定，列方程时必须始终按这个方向写，不能中途改口。',
        },
      ],
    },
    {
      title: '二、关联参考方向与欧姆定律',
      blocks: [
        {
          type: 'p',
          text: '对同一个元件：若电流从电压的“+”端流入、“−”端流出，称为**关联参考方向**；若电流从电压的“−”端流入，称为**非关联参考方向**。',
        },
        { type: 'diagram', id: 'circuit-associated', caption: '关联参考方向：电流从“+”端流入。此时 $u = Ri$。' },
        { type: 'diagram', id: 'circuit-nonassociated', caption: '非关联参考方向：电流从“−”端流入。此时 $u = -Ri$。' },
        {
          type: 'p',
          text: '线性电阻在关联参考方向下：',
        },
        { type: 'formula', tex: 'u = Ri \\quad \\text{或} \\quad i = u / R' },
        { type: 'p', text: '在非关联参考方向下，公式要带负号：' },
        { type: 'formula', tex: 'u = -Ri' },
        {
          type: 'callout',
          tone: 'warn',
          title: '常见错误',
          text: '不要只记“$u = Ri$”而忽略参考方向。电阻的阻值 $R$ 本身为正；符号出在参考方向上，不在 $R$ 上。',
        },
      ],
    },
    {
      title: '三、功率的正负',
      blocks: [
        { type: 'p', text: '在关联参考方向下，功率用：' },
        { type: 'formula', tex: 'p = ui' },
        {
          type: 'ul',
          items: ['$p > 0$：该元件**吸收**功率；', '$p < 0$：该元件**发出**功率。'],
        },
        {
          type: 'p',
          text: '电阻通常吸收功率，吸收功率也可用 $p = i^2 R$ 或 $p = u^2 / R$ 计算，结果为正。电源则既可能发出功率，也可能吸收功率（例如给蓄电池充电）。',
        },
        {
          type: 'p',
          text: '如果题目给的 $u$、$i$ 是非关联参考方向，求该元件**吸收**的功率要用 $p = -ui$，或者先改成关联方向再算 $p = ui$。两种算法应当得到同一个结论。',
        },
      ],
    },
  ],
  workedExamples: [
    {
      title: '示范 1：关联方向下的电阻',
      body: [
        {
          type: 'p',
          text: '某电阻 $R = 8\\,\\Omega$，电压、电流取关联参考方向。已知 $i = 1.5\\,\\mathrm{A}$。求电压 $u$ 和该电阻吸收的功率 $p$。',
        },
        { type: 'diagram', id: 'circuit-associated', caption: '关联参考方向。' },
      ],
      solution: [
        { type: 'p', text: '关联方向，故 $u = Ri = 8 \\times 1.5 = 12\\,\\mathrm{V}$。' },
        {
          type: 'p',
          text: '$p = ui = 12 \\times 1.5 = 18\\,\\mathrm{W}$，也可以用 $p = i^2 R = (1.5)^2 \\times 8 = 18\\,\\mathrm{W}$。该电阻吸收 $18\\,\\mathrm{W}$。',
        },
      ],
    },
    {
      title: '示范 2：功率为负表示发出',
      body: [
        {
          type: 'p',
          text: '某元件取关联参考方向，已知 $u = -6\\,\\mathrm{V}$，$i = 2\\,\\mathrm{A}$。求功率并判断吸收还是发出。',
        },
      ],
      solution: [
        { type: 'p', text: '$p = ui = (-6) \\times 2 = -12\\,\\mathrm{W}$。' },
        {
          type: 'p',
          text: '$p < 0$，说明该元件**发出** $12\\,\\mathrm{W}$，不是吸收 $12\\,\\mathrm{W}$。不要看到有数字 6 和 2 就直接相乘后当成吸收功率。',
        },
      ],
    },
  ],
  exercises: { basic, advanced },
}

export function getCircuitQuestion(id: string): Question | undefined {
  return [...basic, ...advanced].find((q) => q.id === id)
}

