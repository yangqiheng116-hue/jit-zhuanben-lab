import type { GradeDetail, LessonContent, Question } from '../types'
import { hasAllGroups, hasAny, normalizeText } from '../lib/text'

function feedbackWrong(where: string, rule: string, example: string, model: string): GradeDetail {
  return {
    correct: false,
    modelAnswer: model,
    explanation: `错在哪里：${where}\n对应规则：${rule}\n再看一个新例子：${example}`,
  }
}

function feedbackRight(model: string, note: string): GradeDetail {
  return { correct: true, modelAnswer: model, explanation: note }
}

function classifyLoop(answer: string, expectClosed: boolean): { ok: boolean; reason: string } {
  const n = normalizeText(answer)
  if (!n) return { ok: false, reason: '未作答。' }
  const closed = hasAny(n, ['闭环', '反馈', '闭还'])
  const open = hasAny(n, ['开环', '开还'])
  if (closed && open) return { ok: false, reason: '同时写了开环和闭环，判断不明确。' }
  if (expectClosed && !closed) return { ok: false, reason: '应判断为闭环。' }
  if (!expectClosed && !open) return { ok: false, reason: '应判断为开环。' }
  const reasonOk = expectClosed
    ? hasAny(n, ['传感', '检测', '测量', '反馈', '测得', '测出', '温度', '比较', '偏差'])
    : hasAny(n, ['不检测', '不测', '没有检测', '未检测', '并不检测', '不反馈', '没有反馈', '无反馈', '按设定', '按程序', '按时间', '定时', '时间一到', '不根据输出', '不看输出'])
  if (!reasonOk) {
    return { ok: false, reason: '判断方向对，但依据没有写清楚。要说明输出有没有被检测回来并用于形成控制作用。' }
  }
  return { ok: true, reason: '' }
}

const q1model = `（1）开环。洗衣机只按设定程序运行，并不检测衣服是否已经干净，输出没有被用来形成控制作用。
（2）闭环。空调根据室内温度传感器测得的温度改变制冷或制热，输出被检测回来并用于控制。
（3）开环。微波炉只按设定时间加热，并不检测食物是否达到目标温度。`

const q2model = `被控对象：水箱。
被控量：水位（液位）。
测量元件：浮球。
执行器：进水阀。
该系统是闭环控制。`

const q3model =
  '“稳”是前提。系统不稳定时，被控量会振荡甚至发散，无法停留在可用的平衡状态，这时再谈稳态误差小（准）或过渡过程短（快）都没有意义。'

const q4model =
  '负反馈用偏差 e = r − b 去纠正控制作用，使实际值偏离给定值时能够自动往回拉，并能抑制扰动。若极性接反变成正反馈，偏差会被越放越大，系统通常无法稳定，可能出现持续振荡或发散。'

const basic: Question[] = [
  {
    id: 'ctl1-b1',
    knowledgePoints: ['开环闭环'],
    promptBlocks: [
      { type: 'p', text: '判断开环还是闭环，并各写一句依据。' },
      {
        type: 'ol',
        items: [
          '洗衣机按设定程序加水、洗涤、脱水，过程中并不检测衣服是否已经干净。',
          '空调根据室内温度传感器测得的温度，自动改变制冷或制热。',
          '微波炉按设定时间加热，时间一到就停机，并不检测食物是否达到目标温度。',
        ],
      },
    ],
    fields: [
      { id: 'p1', label: '（1）洗衣机', type: 'textarea', placeholder: '开环或闭环，并写一句依据' },
      { id: 'p2', label: '（2）空调', type: 'textarea', placeholder: '开环或闭环，并写一句依据' },
      { id: 'p3', label: '（3）微波炉', type: 'textarea', placeholder: '开环或闭环，并写一句依据' },
    ],
    grade: (a) => {
      const r1 = classifyLoop(a.p1 ?? '', false)
      const r2 = classifyLoop(a.p2 ?? '', true)
      const r3 = classifyLoop(a.p3 ?? '', false)
      const partResults = [
        { id: 'p1', label: '（1）洗衣机', correct: r1.ok, expected: '开环，且说明不检测衣物是否干净／不反馈输出' },
        { id: 'p2', label: '（2）空调', correct: r2.ok, expected: '闭环，且说明用温度传感器检测并据此控制' },
        { id: 'p3', label: '（3）微波炉', correct: r3.ok, expected: '开环，且说明不检测食物温度／只按时间' },
      ]
      const correct = partResults.every((p) => p.correct)
      if (correct) {
        return {
          correct: true,
          partResults,
          modelAnswer: q1model,
          explanation: '判断标准只有一条：输出有没有被检测回来，并用来形成控制作用。有反馈就是闭环，没有就是开环。',
        }
      }
      const reasons = [r1, r2, r3].filter((r) => !r.ok).map((r) => r.reason)
      return {
        correct: false,
        partResults,
        modelAnswer: q1model,
        explanation: `错在哪里：${reasons.join(' ')}
对应规则：判断开环还是闭环，只看输出有没有被检测回来并用于形成控制作用。按预定程序或预定时间运行、不检测实际输出，就是开环。
再看一个新例子：电烤箱只按设定时间加热、不测食物温度，是开环；带箱内温度传感器、到达设定温度就停止加热的烤箱，是闭环。`,
      }
    },
  },
  {
    id: 'ctl1-b2',
    knowledgePoints: ['系统组成', '开环闭环'],
    promptBlocks: [
      {
        type: 'p',
        text: '某水箱水位控制系统：希望液位等于给定值。浮球测出实际液位，与给定值比较后，控制器带动进水阀，改变进水量。请写出：被控对象、被控量、测量元件、执行器各是什么？该系统是开环还是闭环？',
      },
      { type: 'diagram', id: 'control-closed', caption: '本题是典型的闭环液位控制，可对照图中各框来命名。' },
    ],
    fields: [
      { id: 'plant', label: '被控对象', type: 'text', placeholder: '要控制的设备或过程' },
      { id: 'output', label: '被控量', type: 'text', placeholder: '希望保持或按规律变化的那个量' },
      { id: 'sensor', label: '测量元件', type: 'text' },
      { id: 'actuator', label: '执行器', type: 'text' },
      {
        id: 'loop',
        label: '开环还是闭环',
        type: 'select',
        options: [
          { value: 'open', label: '开环' },
          { value: 'closed', label: '闭环' },
        ],
      },
    ],
    grade: (a) => {
      const plant = normalizeText(a.plant ?? '')
      const output = normalizeText(a.output ?? '')
      const sensor = normalizeText(a.sensor ?? '')
      const actuator = normalizeText(a.actuator ?? '')
      const plantOk = hasAny(plant, ['水箱', '水槽', '储水', '液位系统', '水位系统'])
      const outputOk = hasAny(output, ['水位', '液位', '液面', '高度', '水位高度'])
      const sensorOk = hasAny(sensor, ['浮球', '浮子', '液位计', '水位计', '传感器'])
      const actuatorOk = hasAny(actuator, ['进水阀', '阀门', '阀', '进水阀门', '调节阀'])
      const loopOk = (a.loop ?? '').trim() === 'closed'
      const partResults = [
        { id: 'plant', label: '被控对象', correct: plantOk, expected: '水箱' },
        { id: 'output', label: '被控量', correct: outputOk, expected: '水位（液位）' },
        { id: 'sensor', label: '测量元件', correct: sensorOk, expected: '浮球' },
        { id: 'actuator', label: '执行器', correct: actuatorOk, expected: '进水阀' },
        { id: 'loop', label: '开环或闭环', correct: loopOk, expected: '闭环' },
      ]
      const correct = partResults.every((p) => p.correct)
      if (correct) {
        return {
          correct: true,
          partResults,
          modelAnswer: q2model,
          explanation: '先找被控对象和被控量，再找“谁在测量、谁在执行”。有浮球把液位测回来与给定值比较，所以是闭环。',
        }
      }
      return {
        correct: false,
        partResults,
        modelAnswer: q2model,
        explanation: `错在哪里：名称或开闭环判断有误。${partResults.filter((p) => !p.correct).map((p) => p.label + '应为' + p.expected).join('；')}。
对应规则：被控对象是要控制的设备或过程，被控量是希望保持的那个物理量（系统输出），测量元件负责检测被控量，执行器把控制信号变成实际操作。输出被测回来参与控制，就是闭环。
再看一个新例子：室温控制里，被控对象是房间，被控量是室温，测量元件是温度传感器，执行器常常是压缩机或电热丝，有传感器反馈就是闭环。`,
      }
    },
  },
  {
    id: 'ctl1-b3',
    knowledgePoints: ['稳准快'],
    promptBlocks: [
      {
        type: 'p',
        text: '为什么说“稳”是控制系统的首要要求？如果系统不稳定，再谈“准”和“快”会有什么问题？',
      },
    ],
    fields: [{ id: 'answer', label: '简答', type: 'textarea', placeholder: '先写稳为什么是前提，再写不稳时准和快为什么谈不上' }],
    grade: (a) => {
      const n = normalizeText(a.answer ?? '')
      const first = hasAny(n, ['前提', '首要', '首先', '第一', '先要', '基础', '先决'])
      const unstable = hasAny(n, ['不稳定', '不稳', '振荡', '震荡', '发散', '无法平衡', '不能平衡', '不能稳定', '达不到平衡'])
      const meaningless = hasAny(n, ['没有意义', '无意义', '谈不上', '无法谈', '不能谈', '无从谈', '没有用', '无从谈起', '无法讨论', '无法保证', '不能保证', '做不到'])
      if (n && first && unstable && meaningless) {
        return feedbackRight(q3model, '要点正确：稳是前提；系统若振荡或发散，准和快都失去意义。')
      }
      if (n && unstable && (first || meaningless || hasAny(n, ['准', '快', '误差', '超调']))) {
        // slightly soft: if they clearly mention instability consequences and 准/快
        if (hasAny(n, ['前提', '首要', '首先', '没有意义', '无意义', '谈不上', '无从谈'])) {
          return feedbackRight(q3model, '要点正确：稳是前提；系统不稳定时，准和快都谈不上。')
        }
      }
      return feedbackWrong(
        n ? '没有同时说清“稳是前提”以及“不稳定时准和快失去意义”。' : '未作答。',
        '对控制系统的基本要求是稳、准、快。稳是前提：受到扰动或给定变化后，被控量最终要能回到平衡状态，而不是振荡发散。系统不稳，准确性（稳态误差）和快速性都没有意义。',
        '转速控制系统如果持续振荡，指针一直来回摆，这时既谈不上转速是否对准给定值，也谈不上调节有多快。',
        q3model,
      )
    },
  },
  {
    id: 'ctl1-b4',
    knowledgePoints: ['开环闭环', '稳准快'],
    promptBlocks: [
      {
        type: 'p',
        text: '负反馈的作用是什么？如果误把反馈极性接反，变成正反馈，系统可能出现什么现象？',
      },
    ],
    fields: [{ id: 'answer', label: '简答', type: 'textarea' }],
    grade: (a) => {
      const n = normalizeText(a.answer ?? '')
      const role = hasAllGroups(n, [
        ['负反馈', '反馈', '偏差', 'e = r', 'r-b', 'r − b', '纠正', '减小误差', '抑制扰动', '稳定', '比较'],
      ]) && hasAny(n, ['偏差', '纠正', '减小误差', '减少误差', '抑制扰动', '自动调节', '拉回', '纠正控制', '根据偏差', '用偏差'])
      const danger = hasAny(n, ['正反馈', '接反', '极性']) && hasAny(n, ['振荡', '震荡', '发散', '不稳定', '放大偏差', '越来越大', '无法稳定', '不能稳定'])
      // allow without explicitly saying 正反馈 if they describe the result
      const danger2 = hasAny(n, ['振荡', '震荡', '发散', '不稳定', '放大偏差', '越来越大', '无法稳定'])
      if (n && role && (danger || danger2)) {
        return feedbackRight(q4model, '要点正确：负反馈按偏差纠正控制作用；接成正反馈后偏差会被放大，系统通常不能稳定。')
      }
      return feedbackWrong(
        n ? '负反馈的作用或正反馈的后果没有说全。' : '未作答。',
        '负反馈时偏差为 $e = r - b$，控制器根据偏差工作：实际值偏低就加强控制，偏高就减弱控制，从而抑制扰动、减小误差。正反馈会把偏差越放越大，系统通常无法稳定工作。专转本里讨论的反馈，默认是负反馈。',
        '水位控制若把浮球信号接反，水位已经偏高还继续开大进水阀，液位会越来越高，这就是正反馈。',
        q4model,
      )
    },
  },
]

const advanced: Question[] = [
  {
    id: 'ctl1-a1',
    knowledgePoints: ['开环闭环', '系统组成'],
    promptBlocks: [
      {
        type: 'p',
        text: '比较下面两种直流电动机调速方案，分别判断开环还是闭环，并指出第（2）种里的测量元件和被控量。',
      },
      {
        type: 'ol',
        items: [
          '用给定电压直接驱动电动机，不检测实际转速。',
          '用测速发电机（或编码器）测出转速，与给定转速比较后，再调节电枢电压。',
        ],
      },
    ],
    fields: [
      { id: 's1', label: '（1）给定电压直接驱动', type: 'textarea', placeholder: '开环或闭环，并写一句依据' },
      { id: 's2', label: '（2）带测速反馈', type: 'textarea', placeholder: '开环或闭环，并写一句依据' },
      { id: 'sensor', label: '方案（2）的测量元件', type: 'text' },
      { id: 'output', label: '方案（2）的被控量', type: 'text' },
    ],
    grade: (a) => {
      const r1 = classifyLoop(a.s1 ?? '', false)
      const r2 = classifyLoop(a.s2 ?? '', true)
      const sensor = normalizeText(a.sensor ?? '')
      const output = normalizeText(a.output ?? '')
      const sensorOk = hasAny(sensor, ['测速发电机', '测速机', '编码器', '转速传感器', '测速'])
      const outputOk = hasAny(output, ['转速', '速度', '角速度'])
      const partResults = [
        { id: 's1', label: '方案（1）', correct: r1.ok, expected: '开环，不检测实际转速' },
        { id: 's2', label: '方案（2）', correct: r2.ok, expected: '闭环，测速后与给定比较再调节' },
        { id: 'sensor', label: '测量元件', correct: sensorOk, expected: '测速发电机（或编码器）' },
        { id: 'output', label: '被控量', correct: outputOk, expected: '转速' },
      ]
      const model =
        '（1）开环。只按给定电压驱动，不检测实际转速。\n（2）闭环。测速发电机或编码器把转速测回来，与给定转速比较后再调节。\n测量元件：测速发电机（或编码器）。被控量：转速。'
      const correct = partResults.every((p) => p.correct)
      if (correct) {
        return {
          correct: true,
          partResults,
          modelAnswer: model,
          explanation: '有没有把转速测回来用于调节，是开环与闭环的分界。被控量是转速，测量元件是测速发电机或编码器。',
        }
      }
      return {
        correct: false,
        partResults,
        modelAnswer: model,
        explanation: `错在哪里：${partResults.filter((p) => !p.correct).map((p) => p.label + '应改为：' + p.expected).join('；')}。
对应规则：输出被检测回来并用来形成控制作用，就是闭环；否则是开环。测量元件负责检测被控量。
再看一个新例子：只用旋钮设定电风扇档位、不测风速，是开环；若用传感器测转速并自动调压，就是闭环。`,
      }
    },
  },
]

export const controlLesson1: LessonContent = {
  subjectId: 'control',
  lessonId: 'control-1',
  number: 1,
  title: '开环与闭环，组成，稳准快',
  goals: [
    '分清开环控制和闭环控制。',
    '能指出闭环系统各部分的名称。',
    '记住对控制系统的三项基本要求：稳、准、快，并理解稳是前提。',
  ],
  sections: [
    {
      title: '今日目标',
      blocks: [
        {
          type: 'p',
          text: '教材可任选孟华主编《自动控制原理》（机械工业出版社，第 3 版）或王艳东、程鹏主编《自动控制原理》（高等教育出版社，第 3 版）。两本书第 1 章都从基本概念讲起。今天先把开环与闭环、系统组成和稳准快讲清楚。',
        },
      ],
    },
    {
      title: '一、什么是自动控制',
      blocks: [
        {
          type: 'p',
          text: '**自动控制**：在没有人直接参与的情况下，利用控制装置使被控对象的某个物理量（被控量）按照预定规律变化。',
        },
        {
          type: 'ul',
          items: [
            '**被控对象**：要控制的设备或过程，例如水箱、电动机、加热炉。',
            '**被控量**：希望保持或按规律变化的那个量，例如液位、转速、温度。它就是系统的输出。',
            '**给定值**（参考输入）：希望被控量达到的目标值。',
          ],
        },
      ],
    },
    {
      title: '二、开环控制与闭环控制',
      blocks: [
        {
          type: 'callout',
          tone: 'rule',
          title: '判断标准只有一条',
          text: '输出有没有被检测回来，并用来形成控制作用。',
        },
        {
          type: 'p',
          text: '**开环控制**：只根据给定值发出控制命令，不检测实际输出。结构简单，但出现扰动（电压波动、负载变化、漏水等）时，系统自己不知道，也就无法自动纠正。',
        },
        { type: 'diagram', id: 'control-open', caption: '开环控制：给定值一路向前，输出不返回。' },
        {
          type: 'p',
          text: '**闭环控制**（反馈控制）：把输出检测回来，与给定值比较，用偏差去纠正控制作用。能抑制扰动，但若参数不合适，也可能振荡。',
        },
        { type: 'diagram', id: 'control-closed', caption: '闭环控制：测量元件把输出送回比较环节，形成负反馈。' },
        { type: 'p', text: '负反馈时，偏差可以写成：' },
        { type: 'formula', tex: 'e = r - b' },
        {
          type: 'p',
          text: '其中 $r$ 是给定值，$b$ 是反馈量（由测量元件得到），$e$ 是偏差。控制器根据 $e$ 工作：实际值偏低就加强控制，偏高就减弱控制。',
        },
        {
          type: 'callout',
          tone: 'warn',
          title: '正反馈',
          text: '正反馈会把偏差越放越大，系统通常无法稳定工作。专转本里讨论的反馈，默认是负反馈。',
        },
      ],
    },
    {
      title: '三、闭环系统的基本组成',
      blocks: [
        {
          type: 'ol',
          items: [
            '给定元件：提供给定值',
            '比较环节：算出偏差 $e = r - b$',
            '控制器（调节器）：按偏差产生控制信号',
            '执行器：把控制信号变成实际操作，例如阀门、电动机',
            '被控对象：被控制的设备或过程',
            '测量元件（传感器）：检测被控量并送回比较环节',
          ],
        },
        {
          type: 'p',
          text: '分析一道题时，先找被控对象和被控量，再找“谁在测量、谁在执行”，开环还是闭环就清楚了。',
        },
      ],
    },
    {
      title: '四、对控制系统的基本要求：稳、准、快',
      blocks: [
        {
          type: 'ul',
          items: [
            '**稳**（稳定性）：受到扰动或给定变化后，被控量最终能回到一个新的平衡状态，而不是振荡发散。这是前提。系统不稳，后面两项没有意义。',
            '**准**（准确性）：稳态时，被控量与给定值的差别要小，也就是稳态误差要小。',
            '**快**（快速性）：过渡过程要尽量短；同时超调不能过大。',
          ],
        },
        {
          type: 'p',
          text: '这三项常常互相矛盾：追得太快，容易超调甚至不稳定；保稳又往往变慢、误差变大。设计时要折中，而不是只追求其中一项。',
        },
      ],
    },
  ],
  workedExamples: [
    {
      title: '示范：先找“谁在测量”',
      body: [
        {
          type: 'p',
          text: '家用冰箱设定一个温度后自动运行。箱内有温度传感器，温度偏高就开压缩机，够冷了就停机。这是开环还是闭环？被控量是什么？',
        },
      ],
      solution: [
        {
          type: 'p',
          text: '这是闭环。箱内温度被传感器检测回来，与设定温度比较后再决定压缩机是否工作。被控对象是冷藏室（或箱内空间），被控量是箱内温度，测量元件是温度传感器，执行器是压缩机。',
        },
      ],
    },
  ],
  exercises: { basic, advanced },
}

export function getControlQuestion(id: string): Question | undefined {
  return [...basic, ...advanced].find((q) => q.id === id)
}

