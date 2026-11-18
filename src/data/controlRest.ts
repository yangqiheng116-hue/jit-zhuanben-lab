import type { LessonContent } from '../types'
import { ABCD, choiceQuestion, keywordQuestion, numericQuestion, stemLesson } from './author'

export const controlRest: LessonContent[] = [
  stemLesson({
    subjectId: 'control',
    number: 2,
    title: '控制系统分类与方框图',
    goals: [
      '能按有没有反馈、是否线性、信号是否连续来给系统分类。',
      '会在方框图里指出给定、控制器、被控对象和输出。',
      '会写单位负反馈下偏差 e = r − y 的含义。',
    ],
    sections: [
      {
        title: '先看系统属于哪一类',
        blocks: [
          {
            type: 'p',
            text: '分类是为了选用后面的工具。传递函数、劳斯判据和伯德图都默认系统是线性、时不变的。分类时一次只看一个标准，不要把“闭环”和“线性”当成互斥的两种系统。',
          },
          { type: 'diagram', id: 'control-classify', caption: '方框图从左到右：给定、控制器、被控对象、输出。反馈还没有画进这张简图。' },
          {
            type: 'compare',
            leftTitle: '开环',
            left: ['输出不被测量回来', '按事先给定的程序动作', '结构简单，抗扰动能力弱'],
            rightTitle: '闭环',
            right: ['输出被测量并与给定比较', '用偏差纠正控制作用', '能抑制扰动，但可能振荡'],
          },
          {
            type: 'ul',
            items: [
              '线性：满足叠加原理和均匀性。含有饱和、死区、库仑摩擦时，一般是非线性。',
              '连续与离散：信号对时间连续，还是只在采样时刻更新。',
              '单变量与多变量：一套输入输出，还是多套互相耦合的输入输出。',
            ],
          },
        ],
      },
      {
        title: '方框图里的信号和环节',
        blocks: [
          {
            type: 'p',
            text: '方框代表一个环节对信号做的运算，箭头代表信号方向，不是电路里的电流。相加点把几路信号按正负号合成，引出点把同一信号分到几条路上，引出本身不改变信号大小。',
          },
          { type: 'formula', tex: 'e = r - y' },
          {
            type: 'p',
            text: '单位负反馈时，偏差等于给定减去输出。负号是闭环能“纠偏”的原因：输出偏大，偏差变负，控制作用往回拉。若反馈极性接反，偏差会被越放越大。',
          },
          {
            type: 'callout',
            tone: 'rule',
            title: '判断闭环只看一件事',
            text: '输出有没有被检测回来，并用来形成控制作用。按时间程序动作、不看实际输出，就是开环，即使执行器很复杂。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：同一个加热任务的两种做法',
        body: [
          { type: 'p', text: '方案甲：电炉按设定时间加热，到点就停，不测炉温。方案乙：热电偶测到炉温后与设定温度比较，偏差再去调节功率。' },
        ],
        solution: [
          { type: 'p', text: '方案甲是开环。时间程序是给定，输出温度没有参加比较。' },
          { type: 'p', text: '方案乙是闭环。被控量是炉温，测量元件是热电偶，控制器按偏差调节功率。炉门被打开这类扰动，可以由偏差自动补偿一部分。' },
        ],
      },
      {
        title: '示范 2：计算单位负反馈的偏差',
        body: [{ type: 'p', text: '单位负反馈系统某一时刻给定 r = 12，输出 y = 9。求偏差，并说明控制作用应把输出往哪边调。' }],
        solution: [
          { type: 'p', text: 'e = 12 − 9 = 3。偏差为正，表示输出还低于给定。' },
          { type: 'p', text: '负反馈应使控制作用增大输出。若 y 已经是 15，则 e = −3，控制作用应把输出拉低。' },
        ],
      },
    ],
    basic: [
      choiceQuestion({
        id: 'ctl2-b1',
        kp: ['开环闭环'],
        stem: '下面哪一个系统是闭环？',
        options: ABCD([
          '洗衣机按设定程序洗涤，不检测衣服是否洗净',
          '恒温箱用温度传感器的测量值与设定值比较后再加热',
          '微波炉只按设定时间加热',
          '交通灯按固定秒数切换',
        ]),
        answer: 'B',
        model: 'B。恒温箱把温度测回来并用于比较，是闭环。',
        rule: '闭环的标志是输出被测量，并参与形成控制作用。',
        example: '带室内温度传感器的空调是闭环；只定时运行的风扇是开环。',
      }),
      numericQuestion({
        id: 'ctl2-b2',
        kp: ['偏差'],
        prompt: [{ type: 'p', text: '单位负反馈。给定 r = 20，输出 y = 14。求偏差 e。' }],
        numbers: [{ id: 'e', label: '偏差 e', expected: 6 }],
        model: 'e = 6。',
        rule: '单位负反馈 e = r − y。',
        example: 'r = 12、y = 9 时，e = 3。',
      }),
      choiceQuestion({
        id: 'ctl2-b3',
        kp: ['系统分类'],
        stem: '只有一个给定和一个被控输出的系统，应称为什么？',
        options: ABCD(['单输入单输出', '多输入多输出', '一定是开环', '一定是离散系统']),
        answer: 'A',
        model: 'A。一个输入、一个输出，是单输入单输出系统。',
        rule: '单变量或多变量看输入输出的套数，与开环闭环是不同的分类标准。',
        example: '室温控制系统若只调节加热量、只关心室温，就是单输入单输出。',
      }),
      keywordQuestion({
        id: 'ctl2-b4',
        kp: ['开环闭环'],
        prompt: [{ type: 'p', text: '用一句话说明：怎样判断一个系统是闭环，判断时要看输出发生了什么。' }],
        fields: [
          {
            id: 'ans',
            label: '判断依据',
            textarea: true,
            groups: [
              ['闭环', '反馈'],
              ['测量', '检测', '送回', '比较', '反馈'],
            ],
          },
        ],
        model: '输出被测量并送回去与给定比较，用来形成控制作用，这就是闭环。',
        rule: '闭环看的是反馈是否存在，不是看设备复杂不复杂。',
        example: '水位被浮球测到并用来开关进水阀，就是闭环。',
      }),
    ],
    advanced: [
      choiceQuestion({
        id: 'ctl2-a1',
        kp: ['系统分类'],
        stem: '方框图中的箭头表示什么？',
        options: ABCD(['信号及其传递方向', '电路中的电流', '能量一定从左流到右', '只能表示电压']),
        answer: 'A',
        model: 'A。箭头是信号方向，不是电路电流。',
        rule: '方框图描述信号运算关系。引出点复制信号，相加点按符号把信号相加。',
        example: '从输出引一条线回到比较点，表示测量信号被送去比较，并不表示有电流流回去。',
      }),
      numericQuestion({
        id: 'ctl2-a2',
        kp: ['偏差'],
        prompt: [
          { type: 'p', text: '单位负反馈。某一时刻 y = 18，希望 r = 15。求偏差 e，并选择此时偏差的符号含义。' },
        ],
        numbers: [{ id: 'e', label: '偏差 e', expected: -3 }],
        selects: [
          {
            id: 'dir',
            label: '负反馈应使输出',
            options: [
              { value: 'down', label: '往下调' },
              { value: 'up', label: '往上调' },
            ],
            expected: 'down',
          },
        ],
        model: 'e = −3，输出已经高于给定，应往下调。',
        rule: 'e = r − y。e < 0 表示输出偏高，负反馈把输出往回拉。',
        example: 'r = 10、y = 12 时，e = −2，应减小输出。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 3,
    title: '微分方程与传递函数',
    goals: [
      '能把线性常系数微分方程改写成传递函数。',
      '知道传递函数对应零初始条件，只描述输入输出关系。',
      '会从传递函数读出直流增益，并认出二阶系统的 ωn 与 ζ。',
    ],
    sections: [
      {
        title: '从微分方程到传递函数',
        blocks: [
          {
            type: 'p',
            text: '线性定常系统在时域里是常系数线性微分方程。两边做拉普拉斯变换，并把初始条件取为零，输入输出的象函数就可以写成一个关于 s 的分式。这个分式就是传递函数。',
          },
          { type: 'diagram', id: 'control-tf', caption: '零初始条件下，微分方程经拉普拉斯变换变成 G(s) = C(s) / R(s)。' },
          { type: 'formula', tex: 'G(s) = \\frac{C(s)}{R(s)}' },
          {
            type: 'ul',
            items: [
              '输出导数变成 s 的正次幂，阶数变成 s 的次数。',
              '等式右边输入的系数放进分子。',
              '初始条件必须为零。非零初始状态要单独用状态方程或拉普拉斯变换的初值项处理，不能塞进 G(s)。',
            ],
          },
        ],
      },
      {
        title: '直流增益和标准二阶',
        blocks: [
          {
            type: 'p',
            text: '稳定系统的直流增益是 s → 0 时的 G(s)，也就是常值输入下输出稳态与输入的比值。二阶分母常写成 s^2 + 2ζωn s + ωn^2：ωn 是无阻尼自然频率，ζ 是阻尼比。',
          },
          { type: 'formula', tex: 'G(0) = \\left.G(s)\\right|_{s=0}, \\qquad 2\\zeta\\omega_n = \\text{一次项系数}' },
          {
            type: 'callout',
            tone: 'warn',
            title: '传递函数不是完整的内部描述',
            text: '传递函数只保证输入到输出的关系。中间状态怎么选，传递函数看不出来；不稳定的零极点相消还会把内部的不稳定藏起来。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：二阶微分方程',
        body: [{ type: 'p', text: '零初始条件下，$\\ddot{y} + 3\\dot{y} + 2y = 4u$。求传递函数和直流增益。' }],
        solution: [
          { type: 'p', text: '左端变成 $(s^2 + 3s + 2) Y(s)$，右端是 $4 U(s)$。' },
          { type: 'p', text: '$G(s) = 4 / (s^2 + 3s + 2)$。直流增益 $G(0) = 4 / 2 = 2$。' },
          { type: 'p', text: '分母可分解为 $(s+1)(s+2)$，两个极点都在左半平面。' },
        ],
      },
      {
        title: '示范 2：写成惯性环节',
        body: [{ type: 'p', text: '$2\\dot{y} + y = 6u$，零初始条件。求 G(s)，并写成 K / (Ts + 1)。' }],
        solution: [
          { type: 'p', text: '$G(s) = 6 / (2s + 1)$。' },
          { type: 'p', text: '这已经是标准惯性环节：增益 K = 6，时间常数 T = 2。直流增益也是 6。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl3-b1',
        kp: ['传递函数', '直流增益'],
        prompt: [{ type: 'p', text: '零初始条件下 $\\dot{y} + 4y = 8u$。求分子系数、分母中的常数项，以及直流增益。' }],
        numbers: [
          { id: 'num', label: '分子系数', expected: 8 },
          { id: 'den', label: '分母常数项', expected: 4 },
          { id: 'k', label: '直流增益', expected: 2 },
        ],
        model: 'G(s) = 8 / (s + 4)，直流增益为 2。',
        rule: '导数对应 s 的幂。直流增益是分子常数除以分母常数。',
        example: 'ẏ + y = 3u 的传递函数是 3 / (s + 1)，直流增益是 3。',
      }),
      choiceQuestion({
        id: 'ctl3-b2',
        kp: ['传递函数'],
        stem: '传递函数 G(s) = C(s) / R(s) 成立，需要哪一个前提？',
        options: ABCD([
          '零初始条件，且系统线性定常',
          '初始条件可以任意，只要输入是阶跃',
          '只适用于开环，不适用于闭环',
          '必须没有分母',
        ]),
        answer: 'A',
        model: 'A。传递函数对应线性定常系统和零初始条件。',
        rule: '非零初始状态会产生额外的象函数项，不能并进 G(s)。非线性系统没有统一的传递函数。',
        example: '电容已有初始电压时，RC 电路的全响应不等于“传递函数乘输入”这一项。',
      }),
      numericQuestion({
        id: 'ctl3-b3',
        kp: ['直流增益'],
        prompt: [{ type: 'p', text: '$G(s) = 10 / (s + 5)$，系统稳定。求直流增益。' }],
        numbers: [{ id: 'k', label: '直流增益', expected: 2 }],
        model: '直流增益为 2。',
        rule: '稳定系统的直流增益等于 G(0)。',
        example: '4 / (s^2 + 3s + 2) 的直流增益是 4 / 2 = 2。',
      }),
      keywordQuestion({
        id: 'ctl3-b4',
        kp: ['传递函数'],
        prompt: [{ type: 'p', text: '用一句话定义传递函数：它是哪两个量的比，前提是什么。' }],
        fields: [
          {
            id: 'def',
            label: '定义',
            textarea: true,
            groups: [
              ['输出'],
              ['输入'],
              ['零初始', '零状态', '初始为零', '初值为零', '初始条件为零'],
            ],
          },
        ],
        model: '传递函数是零初始条件下，输出象函数与输入象函数之比。',
        rule: 'G(s) = C(s) / R(s)，且初始条件为零。',
        example: '同一个微分方程，若初始输出不为零，总的输出象函数还要加上初值贡献。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl3-a1',
        kp: ['自然频率', '阻尼比'],
        prompt: [{ type: 'p', text: '零初始条件下 $\\ddot{y} + 4\\dot{y} + 4y = u$。求无阻尼自然频率 ωn 和阻尼比 ζ。' }],
        numbers: [
          { id: 'wn', label: 'ωn', expected: 2 },
          { id: 'zeta', label: 'ζ', expected: 1 },
        ],
        model: 'ωn = 2，ζ = 1，是临界阻尼。',
        rule: '分母 s^2 + 2ζωn s + ωn^2。这里 ωn^2 = 4，2ζωn = 4，故 ζ = 1。',
        example: 's^2 + 6s + 9 对应 ωn = 3，ζ = 1。',
      }),
      numericQuestion({
        id: 'ctl3-a2',
        kp: ['自然频率', '阻尼比'],
        prompt: [{ type: 'p', text: '$G(s) = 16 / (s^2 + 6s + 16)$。求 ωn、ζ 和单位阶跃下的稳态输出。' }],
        numbers: [
          { id: 'wn', label: 'ωn', expected: 4, tol: 0.02 },
          { id: 'zeta', label: 'ζ', expected: 0.75, tol: 0.02 },
          { id: 'yss', label: '稳态输出', expected: 1 },
        ],
        model: 'ωn = 4，ζ = 0.75，单位阶跃稳态输出为 1。',
        rule: 'ωn^2 = 16，2ζωn = 6。稳态输出等于直流增益 16/16 = 1。',
        example: '16 / (s^2 + 4s + 16) 的 ωn = 4，ζ = 0.5，直流增益也是 1。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 4,
    title: '拉普拉斯变换常用性质',
    goals: [
      '记住阶跃、斜坡和指数函数的拉普拉斯变换。',
      '会用微分性质把微分方程变成代数方程。',
      '会在满足稳定条件时使用初值定理和终值定理。',
    ],
    sections: [
      {
        title: '常用变换对',
        blocks: [
          {
            type: 'p',
            text: '拉普拉斯变换把时间函数变成 s 的函数，微分变成乘 s，积分变成除以 s。控制系统里最常用的是下面几对，时间函数都理解为 t ≥ 0。',
          },
          { type: 'diagram', id: 'control-laplace', caption: '时域函数 f(t) 经拉普拉斯变换得到象函数 F(s)。' },
          { type: 'formula', tex: '\\mathcal{L}\\{1\\}=\\frac{1}{s},\\quad \\mathcal{L}\\{t\\}=\\frac{1}{s^2},\\quad \\mathcal{L}\\{e^{-at}\\}=\\frac{1}{s+a}' },
          {
            type: 'ul',
            items: [
              '单位脉冲的象函数是 1。',
              '正弦 $\\sin\\omega t$ 的象函数是 $\\omega/(s^2+\\omega^2)$，余弦是 $s/(s^2+\\omega^2)$。',
              '微分：$\\mathcal{L}\\{\\dot{f}\\}=sF(s)-f(0-)$。零初始时，导数就对应乘 s。',
            ],
          },
        ],
      },
      {
        title: '初值、终值和部分分式',
        blocks: [
          { type: 'formula', tex: 'f(0+)=\\lim_{s\\to\\infty}sF(s),\\qquad f(\\infty)=\\lim_{s\\to 0}sF(s)' },
          {
            type: 'p',
            text: '终值定理只有在 sF(s) 的极点都在左半平面时才能用。虚轴上有极点（例如 1/s^2 或无阻尼振荡）或右半平面有极点时，极限即使算出来也不代表真实稳态。',
          },
          {
            type: 'callout',
            tone: 'note',
            title: '部分分式是为了变回时间函数',
            text: '把真分式拆成常数、一阶和二阶几项，再逐项查变换表。分子的次数不低于分母时，先做多项式除法。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：拆开一个常见分式',
        body: [{ type: 'p', text: '$F(s) = 6 / [s(s+2)]$。求 f(t)，并用终值定理核对。' }],
        solution: [
          { type: 'p', text: '设 $6 / [s(s+2)] = A/s + B/(s+2)$。s = 0 得 A = 3；s = −2 得 B = −3。' },
          { type: 'p', text: '$f(t) = 3 - 3e^{-2t}$。终值定理：$sF(s) = 6/(s+2) \\to 3$，与 f(∞) 一致。初值为 0。' },
        ],
      },
      {
        title: '示范 2：同时看初值和终值',
        body: [{ type: 'p', text: '$F(s) = (s+2) / [s(s+1)]$。求 f(t)、f(0+) 和 f(∞)。' }],
        solution: [
          { type: 'p', text: '拆成 $2/s - 1/(s+1)$，所以 $f(t) = 2 - e^{-t}$。' },
          { type: 'p', text: 'f(0+) = 1，f(∞) = 2。用定理：$sF(s)=(s+2)/(s+1)$，s → ∞ 得 1，s → 0 得 2。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl4-b1',
        kp: ['拉普拉斯变换'],
        prompt: [{ type: 'p', text: '$e^{-3t}$ 的象函数是 1 / (s+a)。求 a。' }],
        numbers: [{ id: 'a', label: 'a', expected: 3 }],
        model: 'a = 3，象函数为 1 / (s+3)。',
        rule: '$\\mathcal{L}\\{e^{-at}\\}=1/(s+a)$。',
        example: 'e^{-2t} 的象函数是 1 / (s+2)。',
      }),
      numericQuestion({
        id: 'ctl4-b2',
        kp: ['终值定理'],
        prompt: [{ type: 'p', text: '$F(s) = 8 / [s(s+4)]$，极点都在左半平面或原点（sF 的极点在左半平面）。求 f(∞)。' }],
        numbers: [{ id: 'finf', label: 'f(∞)', expected: 2 }],
        model: 'f(∞) = 2。',
        rule: '终值等于 sF(s) 在 s → 0 的极限：8 / (s+4) → 2。',
        example: '6 / [s(s+2)] 的终值是 3。',
      }),
      choiceQuestion({
        id: 'ctl4-b3',
        kp: ['微分性质'],
        stem: '零初始条件下，对 f(t) 求一次导数，在象函数域相当于什么？',
        options: ABCD(['F(s) 乘以 s', 'F(s) 除以 s', 'F(s) 加上 f(0)', 'F(s) 对 s 求导']),
        answer: 'A',
        model: 'A。零初始时，微分对应乘 s。',
        rule: '一般情况还要减去 f(0−)。初始条件为零时这一项消失。',
        example: 'ẏ + 2y = u 在零初始下变成 (s+2)Y = U。',
      }),
      keywordQuestion({
        id: 'ctl4-b4',
        kp: ['终值定理'],
        prompt: [{ type: 'p', text: '使用终值定理之前，对象函数有什么稳定性要求？用一句话说明。' }],
        fields: [
          {
            id: 'cond',
            label: '使用条件',
            textarea: true,
            groups: [
              ['稳定', '左半'],
              ['右半', '虚轴', '不稳'],
            ],
          },
        ],
        model: 'sF(s) 的极点必须都在左半平面；右半平面或虚轴上有极点时不能用终值定理。',
        rule: '终值定理不能用于不稳定或不衰减振荡的象函数。',
        example: '1/s^2 对应斜坡，会无限增长，不能因为它在 s→0 的形式硬算一个终值。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl4-a1',
        kp: ['初值定理'],
        prompt: [{ type: 'p', text: '$F(s) = 3 / (s+3)$。求 f(0+)。' }],
        numbers: [{ id: 'f0', label: 'f(0+)', expected: 3 }],
        model: 'f(0+) = 3，时间函数是 3e^{-3t}。',
        rule: '初值定理：sF(s) = 3s/(s+3) → 3。指数函数在 0+ 的值就是它的系数。',
        example: '5 / (s+1) 的初值是 5。',
      }),
      numericQuestion({
        id: 'ctl4-a2',
        kp: ['初值定理', '终值定理'],
        prompt: [{ type: 'p', text: '$F(s) = (s+3) / [s(s+1)]$。求 f(0+) 和 f(∞)。' }],
        numbers: [
          { id: 'f0', label: 'f(0+)', expected: 1 },
          { id: 'finf', label: 'f(∞)', expected: 3 },
        ],
        model: 'f(0+) = 1，f(∞) = 3。时间函数是 3 − 2e^{-t}。',
        rule: 'sF(s) = (s+3)/(s+1)。s → ∞ 得初值 1，s → 0 得终值 3。',
        example: '(s+2)/[s(s+1)] 的初值是 1，终值是 2。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 5,
    title: '典型环节：比例、积分、微分、惯性、振荡',
    goals: [
      '能写出比例、积分、微分、惯性和振荡环节的传递函数。',
      '会从 K / (Ts + 1) 读出增益和时间常数。',
      '会用阻尼比区分过阻尼、临界阻尼和欠阻尼。',
    ],
    sections: [
      {
        title: '五个最常用的环节',
        blocks: [
          {
            type: 'p',
            text: '复杂的传递函数常能拆成少数几种环节相乘。先把这五种认熟，后面化简方框图和画伯德图都是在和它们打交道。',
          },
          { type: 'diagram', id: 'control-typical', caption: '四个常见环节：比例 K、积分 1/s、微分 s、惯性 1/(Ts+1)。振荡环节是二阶的。' },
          { type: 'formula', tex: 'K,\\quad \\frac{K}{s},\\quad Ks,\\quad \\frac{K}{Ts+1},\\quad \\frac{\\omega_n^2}{s^2+2\\zeta\\omega_n s+\\omega_n^2}' },
          {
            type: 'ul',
            items: [
              '比例：立刻放大 K 倍，不改变波形形状，也不提供相位。',
              '积分：输出是输入的积累。单位阶跃输入下，输出以恒定斜率增长，极点在原点。',
              '微分：输出正比于输入的变化率，对噪声敏感。理想微分在高频的增益无限大，实际电路只能近似。',
              '惯性：一阶滞后。阶跃响应是 K(1 − e^{−t/T})，大约在 t = T 时到达稳态值的 63%。',
            ],
          },
        ],
      },
      {
        title: '振荡环节看阻尼比',
        blocks: [
          {
            type: 'p',
            text: '标准振荡环节的直流增益是 1。ζ > 1 时两个实极点，响应单调，称为过阻尼；ζ = 1 为临界阻尼；0 < ζ < 1 为一对共轭复极点，响应振荡衰减，称为欠阻尼；ζ = 0 时等幅振荡。',
          },
          {
            type: 'callout',
            tone: 'rule',
            title: '时间常数和自然频率不是同一个数',
            text: '惯性环节的 T 在分母 Ts + 1 里，转折发生在 1/T。振荡环节的快慢先看 ωn，衰减快慢还要再看 ζωn。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：认出惯性环节',
        body: [{ type: 'p', text: '$G(s) = 6 / (3s + 1)$。求 K、T，以及单位阶跃下的稳态输出。' }],
        solution: [
          { type: 'p', text: '对照 K / (Ts + 1)：K = 6，T = 3。' },
          { type: 'p', text: '单位阶跃的稳态输出等于直流增益 6。大约在 3 秒时，输出升到 6 的 63% 左右。' },
        ],
      },
      {
        title: '示范 2：由分母读阻尼',
        body: [{ type: 'p', text: '分母为 $s^2 + 6s + 25$。求 ωn、ζ，并判断是不是欠阻尼。' }],
        solution: [
          { type: 'p', text: 'ωn^2 = 25，ωn = 5。2ζωn = 6，所以 ζ = 6 / 10 = 0.6。' },
          { type: 'p', text: '0.6 小于 1，是欠阻尼，阶跃响应会振荡着趋向稳态。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl5-b1',
        kp: ['惯性环节'],
        prompt: [{ type: 'p', text: '$G(s) = 10 / (2s + 1)$。求增益 K 和时间常数 T。' }],
        numbers: [
          { id: 'k', label: 'K', expected: 10 },
          { id: 't', label: 'T', expected: 2 },
        ],
        model: 'K = 10，T = 2。',
        rule: '写成 K / (Ts + 1) 后，分子是 K，s 的系数是 T。',
        example: '6 / (3s + 1) 的 K = 6，T = 3。',
      }),
      choiceQuestion({
        id: 'ctl5-b2',
        kp: ['积分环节'],
        stem: '积分环节 K/s 的极点在哪里？',
        options: ABCD(['在原点', '一定在左半平面且不在原点', '一定是一对共轭复极点', '没有极点']),
        answer: 'A',
        model: 'A。积分环节有一个位于原点的极点。',
        rule: '原点极点使系统型别增加，也决定它对斜坡等输入的稳态误差。',
        example: '1/s^2 有两重原点极点，是两个积分环节串联。',
      }),
      choiceQuestion({
        id: 'ctl5-b3',
        kp: ['阻尼比'],
        stem: '阻尼比 ζ = 1 的二阶环节属于哪一种？',
        options: ABCD(['临界阻尼', '欠阻尼', '无阻尼等幅振荡', '不稳定发散']),
        answer: 'A',
        model: 'A。ζ = 1 是临界阻尼。',
        rule: 'ζ > 1 过阻尼，ζ = 1 临界阻尼，0 < ζ < 1 欠阻尼，ζ = 0 无阻尼。',
        example: 'ζ = 0.6 小于 1，阶跃响应会出现超调。',
      }),
      keywordQuestion({
        id: 'ctl5-b4',
        kp: ['惯性环节'],
        prompt: [{ type: 'p', text: '惯性环节的阶跃响应大约在哪个时刻到达稳态值的 63%？用时间常数来回答。' }],
        fields: [
          {
            id: 'ans',
            label: '到达约 63% 的时刻',
            textarea: false,
            groups: [['时间常数', 'T', '一个 T', '1 倍']],
          },
        ],
        model: '大约在一个时间常数 T 的时刻，输出到达稳态值的 63%。',
        rule: '1 − e^{−1} ≈ 0.632，所以 t = T 是惯性环节的特征时刻。',
        example: 'T = 3 s 时，大约 3 秒到达稳态值的 63%。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl5-a1',
        kp: ['振荡环节'],
        prompt: [{ type: 'p', text: '分母为 $s^2 + 6s + 25$。求 ωn 和 ζ。' }],
        numbers: [
          { id: 'wn', label: 'ωn', expected: 5 },
          { id: 'zeta', label: 'ζ', expected: 0.6, tol: 0.02 },
        ],
        model: 'ωn = 5，ζ = 0.6。',
        rule: 'ωn = √25 = 5，ζ = 6 / (2 × 5) = 0.6。',
        example: 's^2 + 4s + 16 给出 ωn = 4，ζ = 0.5。',
      }),
      numericQuestion({
        id: 'ctl5-a2',
        kp: ['微分环节'],
        prompt: [{ type: 'p', text: '理想微分环节的增益 Kd = 2，输入误差的变化率是 3（每秒）。求该环节的输出。' }],
        numbers: [{ id: 'u', label: '微分输出', expected: 6 }],
        model: '输出为 6。',
        rule: '微分环节输出等于 Kd 乘输入的导数。',
        example: 'Kd = 0.5、变化率为 4 时，输出是 2。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 6,
    title: '方框图等效变换',
    goals: [
      '会把串联环节相乘、并联环节相加。',
      '会化简负反馈，写出 G / (1 + GH)。',
      '知道正反馈的分母是 1 − GH，反馈极性不能看错。',
    ],
    sections: [
      {
        title: '三种基本连接',
        blocks: [
          {
            type: 'p',
            text: '方框图化简的目标，是在不改变外部输入输出关系的前提下，把许多方框收成一个。先处理最里面的闭环或并联，再向外合并。',
          },
          { type: 'diagram', id: 'control-reduce', caption: '左边串联后传递函数为 G1G2；右边负反馈闭环为 G / (1 + GH)。' },
          { type: 'formula', tex: 'G_{\\text{串}}=G_1G_2,\\qquad \\Phi=\\frac{G}{1+GH}' },
          {
            type: 'ul',
            items: [
              '串联：前一个的输出是后一个的输入，总传递函数相乘。',
              '并联：同一输入分到几条路，输出相加，总传递函数相加。',
              '负反馈：前向是 G，反馈通道是 H，闭环是 G / (1 + GH)。单位负反馈时 H = 1。',
              '正反馈把分母改成 1 − GH。比较点的符号看错，结果会完全不同。',
            ],
          },
        ],
      },
      {
        title: '比较点和引出点不要随意搬家',
        blocks: [
          {
            type: 'p',
            text: '引出点往后越过一个方框，分出的信号被多乘了这个方框，要在支路上补一个倒数才能保持原信号。比较点前后移动也要补乘或补除。拿不准时，就对同一输入写两条路的表达式，化简前后必须相等。',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '先看清反馈是正还是负',
            text: '负反馈的闭环分母是 1 + GH，不是 1 + G + H，也不是 G + H。GH 是绕回路一圈的开环传递函数。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：两个方框串联',
        body: [{ type: 'p', text: 'G1 = 2，G2 = 5，按信号方向串联。求总传递函数。' }],
        solution: [
          { type: 'p', text: '串联相乘：G = 2 × 5 = 10。' },
          { type: 'p', text: '若输入是 1，第一个方框输出 2，第二个再乘 5，输出 10，与总增益一致。' },
        ],
      },
      {
        title: '示范 2：负反馈闭环',
        body: [{ type: 'p', text: '前向通路是 10，反馈通路是 0.1，负反馈。求闭环传递函数的值。' }],
        solution: [
          { type: 'p', text: '回路增益 GH = 10 × 0.1 = 1。' },
          { type: 'p', text: '闭环 Φ = 10 / (1 + 1) = 5。' },
          { type: 'p', text: '若误写成正反馈，分母变成 1 − 1 = 0，两个结果完全不同，所以符号要先核对。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl6-b1',
        kp: ['串联'],
        prompt: [{ type: 'p', text: 'G1 = 3，G2 = 4，串联。求总增益。' }],
        numbers: [{ id: 'g', label: '总增益', expected: 12 }],
        model: '总增益为 12。',
        rule: '串联传递函数相乘。',
        example: '2 与 5 串联，总增益是 10。',
      }),
      numericQuestion({
        id: 'ctl6-b2',
        kp: ['并联'],
        prompt: [{ type: 'p', text: 'G1 = 2 与 G2 = 5 并联，输出相加。求总增益。' }],
        numbers: [{ id: 'g', label: '总增益', expected: 7 }],
        model: '总增益为 7。',
        rule: '并联传递函数相加。',
        example: '4 与 1 并联，总增益是 5。',
      }),
      choiceQuestion({
        id: 'ctl6-b3',
        kp: ['负反馈'],
        stem: '前向 G、反馈 H 的负反馈闭环，传递函数是哪一个？',
        options: ABCD(['G / (1 + GH)', 'G / (1 − GH)', 'G + H', '(G + H) / (1 + GH)']),
        answer: 'A',
        model: 'A。负反馈闭环是 G / (1 + GH)。',
        rule: '正反馈才把分母写成 1 − GH。单位负反馈时 H = 1，分母是 1 + G。',
        example: 'G = 10、H = 0.1 的负反馈，闭环是 10 / 2 = 5。',
      }),
      numericQuestion({
        id: 'ctl6-b4',
        kp: ['负反馈'],
        prompt: [{ type: 'p', text: '前向 G = 4，单位负反馈。求闭环增益。' }],
        numbers: [{ id: 'phi', label: '闭环增益', expected: 0.8, tol: 0.02 }],
        model: '闭环增益为 0.8。',
        rule: 'H = 1 时，Φ = G / (1 + G) = 4 / 5 = 0.8。',
        example: 'G = 3 的单位负反馈，闭环是 3 / 4 = 0.75。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl6-a1',
        kp: ['串联', '负反馈'],
        prompt: [{ type: 'p', text: 'G1 = 5 与 G2 = 2 串联成前向通路，负反馈 H = 0.4。求前向增益和闭环增益。' }],
        numbers: [
          { id: 'g', label: '前向增益', expected: 10 },
          { id: 'phi', label: '闭环增益', expected: 2 },
        ],
        model: '前向增益 10，闭环增益 2。',
        rule: '先串联相乘，再算 GH = 10 × 0.4 = 4，闭环为 10 / (1 + 4) = 2。',
        example: '前向 10、H = 0.1 的负反馈，闭环是 5。',
      }),
      numericQuestion({
        id: 'ctl6-a2',
        kp: ['负反馈'],
        prompt: [{ type: 'p', text: 'G = 6，H = 0.5，比较点是负反馈。求 GH 和闭环增益。' }],
        numbers: [
          { id: 'gh', label: 'GH', expected: 3 },
          { id: 'phi', label: '闭环增益', expected: 1.5, tol: 0.02 },
        ],
        model: 'GH = 3，闭环增益 1.5。',
        rule: 'Φ = G / (1 + GH) = 6 / 4 = 1.5。',
        example: '若改成正反馈且 GH = 0.5，闭环才是 G / (1 − 0.5)。本题是负反馈。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 7,
    title: '时域响应与典型外作用',
    goals: [
      '记住脉冲、阶跃、斜坡三种典型输入的时间函数和象函数。',
      '会求稳定系统在阶跃输入下的稳态输出。',
      '会用 ζωn 估算二阶系统的调节时间。',
    ],
    sections: [
      {
        title: '三种用来考试的输入',
        blocks: [
          {
            type: 'p',
            text: '系统好不好，要在同一种输入下比。最常用的是单位脉冲、单位阶跃和单位斜坡。它们的象函数依次是 1、1/s 和 1/s^2，正好一个比一个多一个积分。',
          },
          { type: 'diagram', id: 'control-step', caption: '一条从 0 出发、逐渐靠近虚线稳态值的阶跃响应。' },
          { type: 'formula', tex: '\\mathcal{L}\\{\\delta(t)\\}=1,\\quad \\mathcal{L}\\{1(t)\\}=\\frac{1}{s},\\quad \\mathcal{L}\\{t\\}=\\frac{1}{s^2}' },
          {
            type: 'p',
            text: '惯性环节 K / (Ts + 1) 的单位阶跃响应是 K(1 − e^{−t/T})。稳态值是 K，前提是环节本身稳定。二阶系统若直流增益为 1，单位阶跃的稳态值就是 1。',
          },
        ],
      },
      {
        title: '从响应曲线上读指标',
        blocks: [
          {
            type: 'ul',
            items: [
              '上升时间：输出第一次到达稳态值附近所用的时间，定义在不同教材里有 10%–90% 或 0–100% 两种，做题时要看清。',
              '超调量：峰值超出稳态值的部分占稳态值的比例。欠阻尼二阶系统 $\\sigma = \\mathrm{e}^{-\\zeta\\pi/\\sqrt{1-\\zeta^2}}$。',
              '调节时间：输出进入并保持在稳态值附近一个误差带里。二阶欠阻尼系统，2% 误差带常用 $4/(\\zeta\\omega_n)$，5% 误差带常用 $3/(\\zeta\\omega_n)$。',
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: '稳态值先看极点',
            text: '只有稳定系统才有有限的稳态输出。计算稳态前先看分母极点是否都在左半平面，再用终值定理。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：一阶环节的阶跃稳态',
        body: [{ type: 'p', text: '$G(s) = 5 / (s + 1)$，输入单位阶跃。求稳态输出，并指出时间常数。' }],
        solution: [
          { type: 'p', text: '可写成 5 / (s + 1)，时间常数 T = 1，增益 K = 5。' },
          { type: 'p', text: '稳态输出等于直流增益 5。响应是 $5(1 - e^{-t})$。' },
        ],
      },
      {
        title: '示范 2：用阻尼估算调节时间',
        body: [{ type: 'p', text: '$G(s) = 16 / (s^2 + 4s + 16)$，单位阶跃。求 ωn、ζ，以及按 2% 误差带估算的调节时间。' }],
        solution: [
          { type: 'p', text: 'ωn^2 = 16，ωn = 4。2ζωn = 4，ζ = 0.5。直流增益为 1，稳态输出是 1。' },
          { type: 'p', text: 'ζωn = 2。2% 调节时间约为 4 / 2 = 2 s。' },
        ],
      },
    ],
    basic: [
      choiceQuestion({
        id: 'ctl7-b1',
        kp: ['典型输入'],
        stem: '单位阶跃 1(t) 的拉普拉斯变换是什么？',
        options: ABCD(['1/s', '1', '1/s^2', 's']),
        answer: 'A',
        model: 'A。单位阶跃的象函数是 1/s。',
        rule: '脉冲对应 1，阶跃对应 1/s，斜坡对应 1/s^2。',
        example: '单位斜坡 t 的象函数是 1/s^2。',
      }),
      numericQuestion({
        id: 'ctl7-b2',
        kp: ['阶跃响应', '惯性环节'],
        prompt: [{ type: 'p', text: '$G(s) = 2 / (3s + 1)$，输入单位阶跃。求稳态输出和时间常数。' }],
        numbers: [
          { id: 'yss', label: '稳态输出', expected: 2 },
          { id: 't', label: '时间常数', expected: 3 },
        ],
        model: '稳态输出为 2，时间常数为 3。',
        rule: 'K / (Ts + 1) 的阶跃稳态值是 K。',
        example: '5 / (s + 1) 的阶跃稳态值是 5，时间常数是 1。',
      }),
      choiceQuestion({
        id: 'ctl7-b3',
        kp: ['典型输入'],
        stem: '单位斜坡输入的时间函数和象函数分别是什么？',
        options: ABCD(['t 与 1/s^2', '1(t) 与 1/s', 'δ(t) 与 1', 't^2 与 1/s^3']),
        answer: 'A',
        model: 'A。单位斜坡是 t，象函数是 1/s^2。',
        rule: '斜坡是阶跃的积分，象函数就在阶跃的 1/s 上再除以一个 s。',
        example: '加速度输入 t^2/2 的象函数才是 1/s^3。',
      }),
      keywordQuestion({
        id: 'ctl7-b4',
        kp: ['动态指标'],
        prompt: [{ type: 'p', text: '说出欠阻尼阶跃响应上两个常用的动态指标名称：一个描述超出稳态的程度，一个描述进入误差带的时间。' }],
        fields: [
          {
            id: 'over',
            label: '超出稳态的指标',
            textarea: false,
            groups: [['超调']],
          },
          {
            id: 'settle',
            label: '进入误差带的指标',
            textarea: false,
            groups: [['调节时间', '调整时间', '过渡时间']],
          },
        ],
        model: '超调量描述超出稳态的程度，调节时间描述进入并保持在误差带内的时间。',
        rule: '动态指标要在同一种输入、同一个误差带定义下比较。',
        example: '2% 调节时间常用 4/(ζωn) 估算。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl7-a1',
        kp: ['惯性环节', '阶跃响应'],
        prompt: [{ type: 'p', text: '$G(s) = 3 / (4s + 1)$。求单位阶跃的稳态输出，以及输出大约升到稳态值 63% 的时刻。' }],
        numbers: [
          { id: 'yss', label: '稳态输出', expected: 3 },
          { id: 't63', label: '约 63% 的时刻', expected: 4, unit: 's' },
        ],
        model: '稳态输出为 3，大约在 4 s 时到达稳态的 63%。',
        rule: '该时刻就是时间常数 T。',
        example: 'T = 2 s、K = 6 时，稳态是 6，约 2 s 到达 63%。',
      }),
      numericQuestion({
        id: 'ctl7-a2',
        kp: ['调节时间'],
        prompt: [{ type: 'p', text: '某欠阻尼二阶系统 ωn = 4，ζ = 0.5。按 2% 误差带，求 ζωn 和估算的调节时间。' }],
        numbers: [
          { id: 'swn', label: 'ζωn', expected: 2 },
          { id: 'ts', label: '调节时间', expected: 2, unit: 's' },
        ],
        model: 'ζωn = 2，2% 调节时间约为 2 s。',
        rule: '2% 误差带的估算式是 4 / (ζωn)。5% 误差带则用 3 / (ζωn)。',
        example: 'ζωn = 1 时，2% 调节时间约为 4 s。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 8,
    title: '稳定性与劳斯判据',
    goals: [
      '知道线性系统稳定的含义是全部极点在左半平面。',
      '会列三阶劳斯表，并根据第一列是否同号判断稳定性。',
      '知道第一列符号改变的次数等于右半平面极点数。',
    ],
    sections: [
      {
        title: '稳定指的是自由运动会消失',
        blocks: [
          {
            type: 'p',
            text: '线性定常系统的稳定，指零输入时任何有限初始状态引起的运动都趋于零。传递函数的全部极点都在开左半平面时，系统渐近稳定。只要有一个极点在右半平面，自由运动就会发散；极点在虚轴上则是临界情形，不算渐近稳定。',
          },
          { type: 'diagram', id: 'control-routh', caption: '三阶劳斯表。图中的稳定条件是第一列全同号，也就是 a、c 以及 (ab − c)/a 都为正（首项系数为 1 时）。' },
          { type: 'formula', tex: 's^3+as^2+bs+c=0,\\qquad \\frac{ab-c}{a}>0' },
          {
            type: 'p',
            text: '系数全部同号并且没有缺项，是稳定的必要条件，但三阶及以上还不够。劳斯表把这个必要条件和额外的判别补齐。',
          },
        ],
      },
      {
        title: '怎样列第一列',
        blocks: [
          {
            type: 'ol',
            items: [
              '按 s 的降幂写出特征多项式。缺的幂次系数写 0，这一步本身通常已经说明不稳定。',
              '第一行放 s^n 的系数和隔一个的系数，第二行放剩下的系数。',
              '下面每一行的第一列，用上面两行组成的行列式来算。三阶且首项为 1 时，s^1 行第一列就是 (ab − c) / a。',
              '第一列没有零、符号完全相同，系统稳定。符号改变几次，就有几个右半平面极点。',
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '第一列出现零要单独处理',
            text: '只有第一列元素为 0、这一行还有别的非零元时，用一个很小的正数代替再继续看符号。整行都是 0 时，用上一行构成辅助多项式，求导后用导函数的系数替换这一行。这两种情况都不按普通除法硬算。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：第一列全为正',
        body: [{ type: 'p', text: '特征多项式 $s^3 + 6s^2 + 11s + 6$。判断稳定性，并算出 s^1 行的第一列元素。' }],
        solution: [
          { type: 'p', text: '对照 a = 6，b = 11，c = 6。s^1 元素 (ab − c) / a = (66 − 6) / 6 = 10。' },
          { type: 'p', text: '第一列为 1、6、10、6，全为正，没有符号变化。系统稳定。这个多项式就是 (s+1)(s+2)(s+3)。' },
        ],
      },
      {
        title: '示范 2：第一列变号',
        body: [{ type: 'p', text: '特征多项式 $s^3 + s^2 + 2s + 8$。用劳斯表判断右半平面极点的个数。' }],
        solution: [
          { type: 'p', text: 'a = 1，b = 2，c = 8。s^1 元素 (2 − 8) / 1 = −6。' },
          { type: 'p', text: '第一列是 1、1、−6、8。从 1 到 −6 变一次，从 −6 到 8 再变一次，共两次。有两个右半平面极点，系统不稳定。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl8-b1',
        kp: ['劳斯判据'],
        prompt: [
          { type: 'p', text: '特征多项式 $s^3 + 4s^2 + 6s + 4$。求劳斯表中 s^1 行的第一列元素，并判断是否渐近稳定。' },
        ],
        numbers: [{ id: 's1', label: 's^1 行第一列', expected: 5 }],
        selects: [
          {
            id: 'stable',
            label: '是否渐近稳定',
            options: [
              { value: 'yes', label: '稳定' },
              { value: 'no', label: '不稳定' },
            ],
            expected: 'yes',
          },
        ],
        model: 's^1 元素为 5，第一列全为正，系统稳定。',
        rule: '(ab − c) / a = (4×6 − 4) / 4 = 5。首项、a、c 和该元素都为正。',
        example: 's^3 + 6s^2 + 11s + 6 的 s^1 元素是 10，同样稳定。',
      }),
      choiceQuestion({
        id: 'ctl8-b2',
        kp: ['劳斯判据'],
        stem: '劳斯表第一列的符号改变次数表示什么？',
        options: ABCD([
          '右半平面极点的个数',
          '左半平面极点的个数',
          '系统的型别',
          '超调量的百分数',
        ]),
        answer: 'A',
        model: 'A。变号次数等于右半平面极点数。',
        rule: '第一列同号且没有零，才是渐近稳定。变号只统计正负交替，不统计数值大小。',
        example: '第一列 1、1、−6、8 变号两次，就有两个右半平面极点。',
      }),
      choiceQuestion({
        id: 'ctl8-b3',
        kp: ['稳定性'],
        stem: '首项系数为正的特征多项式，稳定的必要条件是什么？',
        options: ABCD([
          '所有系数存在、同号，且没有缺项',
          '只要常数项为正',
          '只要有一个系数为负',
          '系数必须全是 1',
        ]),
        answer: 'A',
        model: 'A。系数必须齐全并且同号。三阶以上这还不够。',
        rule: '缺项或系数变号可以直接判定不稳定；系数都为正时，还要用劳斯表继续查。',
        example: 's^3 + 2s + 1 缺了 s^2 项，不满足必要条件。',
      }),
      keywordQuestion({
        id: 'ctl8-b4',
        kp: ['劳斯判据'],
        prompt: [{ type: 'p', text: '劳斯判据最后看表中的哪一列？这一列怎样才说明系统稳定？' }],
        fields: [
          {
            id: 'ans',
            label: '判据要点',
            textarea: true,
            groups: [
              ['第一列', '首列'],
              ['同号', '相同', '全正', '都为正', '都为正数'],
            ],
          },
        ],
        model: '看第一列。第一列没有零并且符号全部相同，系统渐近稳定。',
        rule: '符号改变的次数等于右半平面极点数。',
        example: '第一列 1、6、10、6 同号，对应的三阶系统稳定。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl8-a1',
        kp: ['劳斯判据'],
        prompt: [
          {
            type: 'p',
            text: '特征多项式 $s^3 + 3s^2 + 2s + K$，K > 0。求使系统处于稳定边界的那个 K，并求 K = 3 时 s^1 行第一列元素。',
          },
        ],
        numbers: [
          { id: 'k', label: '临界 K', expected: 6 },
          { id: 's1', label: 'K=3 时的 s^1 元素', expected: 1 },
        ],
        model: '临界 K = 6。K = 3 时 s^1 元素为 1，系统稳定。稳定范围是 0 < K < 6。',
        rule: 's^1 元素 (6 − K) / 3。它为正要求 K < 6；K = 6 时出现零，特征根到达虚轴。',
        example: 's^3 + 6s^2 + 11s + 6 没有待定增益，s^1 元素直接是 10。',
      }),
      numericQuestion({
        id: 'ctl8-a2',
        kp: ['劳斯判据'],
        prompt: [{ type: 'p', text: '特征多项式 $s^3 + s^2 + 2s + 8$。求第一列的符号改变次数。' }],
        numbers: [{ id: 'n', label: '变号次数', expected: 2 }],
        model: '变号 2 次，有两个右半平面极点。',
        rule: 's^1 元素是 (1×2 − 8)/1 = −6。第一列 1、1、−6、8，变号两次。',
        example: '第一列 1、4、5、4 没有变号，右半平面极点数是 0。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 9,
    title: '稳态误差与误差系数',
    goals: [
      '会在单位负反馈下写出误差象函数，并用终值定理求稳态误差。',
      '能根据开环原点极点的个数判断系统型别。',
      '会计算 Kp 或 Kv，并求出阶跃或斜坡输入下的稳态误差。',
    ],
    sections: [
      {
        title: '误差是给定减反馈',
        blocks: [
          {
            type: 'p',
            text: '单位负反馈时，偏差就是给定减去输出。它的象函数是 E(s) = R(s) / (1 + G(s))。稳态误差是 t → ∞ 时 e(t) 的值，稳定系统可以用终值定理：ess = lim s→0 s E(s)。',
          },
          { type: 'diagram', id: 'control-error', caption: '单位负反馈：E(s) = R(s) − C(s)，前向是 G(s)。' },
          { type: 'formula', tex: 'e_{ss}=\\lim_{s\\to 0}\\frac{sR(s)}{1+G(s)}' },
          {
            type: 'p',
            text: '系统型别是开环传递函数中原点极点的个数。型别越高，能无差跟踪的输入多项式次数越高。这个结论针对单位负反馈，并且闭环必须稳定；不稳定系统没有有限稳态误差。',
          },
        ],
      },
      {
        title: '三种静态误差系数',
        blocks: [
          { type: 'formula', tex: 'K_p=\\lim_{s\\to 0}G(s),\\quad K_v=\\lim_{s\\to 0}sG(s),\\quad e_{ss,\\text{step}}=\\frac{1}{1+K_p}' },
          {
            type: 'ul',
            items: [
              '0 型：Kp 有限。单位阶跃误差是 1/(1+Kp)，单位斜坡误差是无穷大。',
              '1 型：Kp 无穷大，阶跃误差为 0。Kv 有限，单位斜坡误差是 1/Kv。',
              '2 型：阶跃和斜坡的稳态误差都是 0，抛物线输入才留下有限误差 1/Ka。',
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '先确认闭环稳定',
            text: '误差系数只对稳定的闭环有意义。增益大到使劳斯表变号以后，再谈“稳态误差更小”没有意义，因为输出不会停在稳态上。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：0 型系统的阶跃误差',
        body: [{ type: 'p', text: '单位负反馈，开环 G(s) = 4 / (s + 1)，闭环稳定。求 Kp 和单位阶跃稳态误差。' }],
        solution: [
          { type: 'p', text: '没有原点极点，是 0 型。Kp = G(0) = 4。' },
          { type: 'p', text: 'ess = 1 / (1 + 4) = 0.2。单位斜坡会一直跟不上，误差趋于无穷。' },
        ],
      },
      {
        title: '示范 2：1 型系统的斜坡误差',
        body: [{ type: 'p', text: '单位负反馈，G(s) = 10 / [s(s + 2)]，闭环稳定。求单位阶跃和单位斜坡的稳态误差。' }],
        solution: [
          { type: 'p', text: '有一个原点极点，是 1 型。阶跃误差为 0。' },
          { type: 'p', text: 'Kv = lim s→0 s · 10 / [s(s+2)] = 10 / 2 = 5。斜坡误差 ess = 1 / 5 = 0.2。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl9-b1',
        kp: ['稳态误差', '位置误差系数'],
        prompt: [{ type: 'p', text: '单位负反馈，G(s) = 9 / (s + 3)，闭环稳定。求 Kp 和单位阶跃稳态误差。' }],
        numbers: [
          { id: 'kp', label: 'Kp', expected: 3 },
          { id: 'ess', label: '阶跃稳态误差', expected: 0.25, tol: 0.02 },
        ],
        model: 'Kp = 3，阶跃稳态误差 0.25。',
        rule: '0 型系统 Kp = G(0)，ess = 1 / (1 + Kp)。',
        example: 'G = 4 / (s + 1) 时，Kp = 4，ess = 0.2。',
      }),
      numericQuestion({
        id: 'ctl9-b2',
        kp: ['稳态误差', '速度误差系数'],
        prompt: [{ type: 'p', text: '单位负反馈，G(s) = 4 / [s(s + 2)]，闭环稳定。求 Kv、单位斜坡稳态误差，以及单位阶跃稳态误差。' }],
        numbers: [
          { id: 'kv', label: 'Kv', expected: 2 },
          { id: 'ess', label: '斜坡稳态误差', expected: 0.5, tol: 0.02 },
          { id: 'step', label: '阶跃稳态误差', expected: 0 },
        ],
        model: 'Kv = 2，斜坡误差 0.5，阶跃误差 0。',
        rule: '1 型系统阶跃无静差。Kv = lim sG(s)，斜坡误差是 1/Kv。',
        example: '10 / [s(s+2)] 的 Kv = 5，斜坡误差是 0.2。',
      }),
      choiceQuestion({
        id: 'ctl9-b3',
        kp: ['系统型别'],
        stem: '稳定的单位负反馈、1 型开环系统，对单位阶跃的稳态误差是多少？',
        options: ABCD(['0', '1', '无穷大', '等于开环增益']),
        answer: 'A',
        model: 'A。1 型系统可以无差跟踪阶跃。',
        rule: '型别不低于输入极点重数时，对应的稳态误差为零。阶跃的象函数有一重 1/s，1 型已经够了。',
        example: '1 型系统跟踪斜坡仍有有限误差 1/Kv，不是零。',
      }),
      keywordQuestion({
        id: 'ctl9-b4',
        kp: ['位置误差系数'],
        prompt: [{ type: 'p', text: '位置误差系数 Kp 是怎样从开环 G(s) 算出来的？' }],
        fields: [
          {
            id: 'ans',
            label: 'Kp 的算法',
            textarea: true,
            groups: [
              ['极限', 's=0', 's→0', 's->0', '直流'],
              ['G'],
            ],
          },
        ],
        model: 'Kp 等于 G(s) 在 s 趋于 0 时的极限，也就是开环直流增益。',
        rule: 'Kv 则是 sG(s) 在 s→0 的极限，Ka 是 s^2 G(s) 的同一极限。',
        example: 'G = 9 / (s+3) 时，Kp = 9/3 = 3。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl9-a1',
        kp: ['速度误差系数'],
        prompt: [{ type: 'p', text: '单位负反馈，G(s) = 20 / [s(s+4)(s+5)]，闭环稳定。求 Kv 和单位斜坡稳态误差。' }],
        numbers: [
          { id: 'kv', label: 'Kv', expected: 1 },
          { id: 'ess', label: '斜坡稳态误差', expected: 1 },
        ],
        model: 'Kv = 1，斜坡稳态误差为 1。',
        rule: 'Kv = 20 / (4×5) = 1，ess = 1/Kv。',
        example: '4 / [s(s+2)] 的 Kv = 2，斜坡误差是 0.5。',
      }),
      numericQuestion({
        id: 'ctl9-a2',
        kp: ['稳态误差'],
        prompt: [
          {
            type: 'p',
            text: '单位负反馈，G(s) = K / (s + 5)，闭环稳定。希望单位阶跃稳态误差为 0.1。求 K。',
          },
        ],
        numbers: [{ id: 'k', label: 'K', expected: 45 }],
        model: 'K = 45。',
        rule: 'Kp = K/5，1 / (1 + K/5) = 0.1，所以 1 + K/5 = 10，K = 45。',
        example: 'G = K / (s+1)，若要求阶跃误差 0.2，则 K = 4。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 10,
    title: '根轨迹的基本规则',
    goals: [
      '知道根轨迹从开环极点出发，终止于开环零点或无穷远。',
      '会判断实轴上哪一段属于根轨迹，并计算渐近线重心。',
      '会用 dK/ds = 0 求两个实极点之间的分离点。',
    ],
    sections: [
      {
        title: '增益从 0 变到无穷时，闭环极点走出的路线',
        blocks: [
          {
            type: 'p',
            text: '把开环写成 K 乘一个首项为 1 的有理分式。闭环特征方程是 1 + G(s) = 0。K 从 0 连续增到无穷大时，闭环极点在 s 平面上走出的曲线就是根轨迹。下面的规则针对常见的正增益、180° 相角条件。',
          },
          { type: 'diagram', id: 'control-locus', caption: '轨迹从开环极点出发。图中空心点表示开环零点，轨迹也可以伸向无穷远。' },
          { type: 'formula', tex: '\\sigma_a=\\frac{\\sum p-\\sum z}{n-m}' },
          {
            type: 'ul',
            items: [
              '分支条数等于开环极点数 n。K = 0 时闭环极点就是开环极点，所以轨迹从极点出发。',
              'K → ∞ 时，m 条分支进入开环零点，其余 n − m 条沿渐近线走向无穷远。',
              '渐近线与实轴的交点是重心 σa。渐近线角度是 (2q+1)×180° / (n − m)。',
              '实轴上某点属于轨迹，当且仅当它右侧的实轴开环极点与零点个数之和为奇数。',
            ],
          },
        ],
      },
      {
        title: '分离点',
        blocks: [
          {
            type: 'p',
            text: '两条分支在实轴上相遇后离开实轴的点，满足 dK/ds = 0。由特征方程把 K 解成 s 的函数，再对 s 求导。求出的点还要代回 K，只有 K ≥ 0 的点才留在正增益轨迹上。',
          },
          {
            type: 'callout',
            tone: 'note',
            title: '先画实轴，再补渐近线',
            text: '实轴规则和起点、终点通常就能确定草图。重心和分离点用来把曲线放准，不必一开始就算离开角。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：两个极点',
        body: [{ type: 'p', text: '开环 G(s) = K / [s(s+2)]。说明实轴上的轨迹、渐近线重心和分离点。' }],
        solution: [
          { type: 'p', text: '极点在 0 和 −2，没有有限零点。实轴上 (−2, 0) 这段的右侧实奇点个数为 1，属于轨迹。' },
          { type: 'p', text: 'n − m = 2，重心 σa = (0 − 2) / 2 = −1。两条渐近线是 ±90°。' },
          { type: 'p', text: 'K = −s(s+2)。dK/ds = 0 给出 s = −1，对应 K = 1。分离点就在重心上。' },
        ],
      },
      {
        title: '示范 2：三条渐近线',
        body: [{ type: 'p', text: '开环极点在 0、−3、−6，没有有限零点。求分支数和渐近线重心。' }],
        solution: [
          { type: 'p', text: '分支数 n = 3。n − m = 3。' },
          { type: 'p', text: 'σa = (0 − 3 − 6) / 3 = −3。三条渐近线的角度是 60°、180° 和 300°。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl10-b1',
        kp: ['根轨迹'],
        prompt: [{ type: 'p', text: '开环有 3 个极点、没有零点。根轨迹有几条分支？' }],
        numbers: [{ id: 'n', label: '分支数', expected: 3 }],
        model: '有 3 条分支。',
        rule: '分支数等于开环极点数。',
        example: '两个开环极点就有两条分支。',
      }),
      numericQuestion({
        id: 'ctl10-b2',
        kp: ['渐近线'],
        prompt: [{ type: 'p', text: '开环极点在 0、−3、−6，没有有限零点。求渐近线重心 σa。' }],
        numbers: [{ id: 'c', label: '重心', expected: -3 }],
        model: '重心为 −3。',
        rule: 'σa = (极点和 − 零点和) / (n − m)。',
        example: '极点 0 与 −2、没有零点时，重心是 −1。',
      }),
      choiceQuestion({
        id: 'ctl10-b3',
        kp: ['根轨迹'],
        stem: 'K 从 0 增到无穷大时，根轨迹的起点和终点是什么？',
        options: ABCD([
          '起于开环极点，终于开环零点或无穷远',
          '起于开环零点，终于开环极点',
          '起于原点，终于无穷远',
          '只在实轴上移动',
        ]),
        answer: 'A',
        model: 'A。K = 0 在开环极点，K → ∞ 走向开环零点或无穷远。',
        rule: '有限零点比极点少时，多出来的分支沿渐近线去无穷远。',
        example: 'G = K / [s(s+2)] 没有有限零点，两条分支最后都走向无穷远。',
      }),
      keywordQuestion({
        id: 'ctl10-b4',
        kp: ['实轴规则'],
        prompt: [{ type: 'p', text: '实轴上的试验点怎样才在正增益根轨迹上？说明要数右侧的哪些点，以及个数满足什么条件。' }],
        fields: [
          {
            id: 'ans',
            label: '实轴规则',
            textarea: true,
            groups: [
              ['右侧', '右边'],
              ['奇数'],
              ['极点', '零点'],
            ],
          },
        ],
        model: '实轴试验点右侧的开环实极点与实零点个数之和为奇数时，该点在根轨迹上。',
        rule: '只数实轴上的开环零极点，不把复数零极点算进这个个数。',
        example: '极点在 0 和 −2 时，两点之间的实轴段在轨迹上。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl10-a1',
        kp: ['分离点'],
        prompt: [{ type: 'p', text: '开环极点在 −1 和 −3，没有有限零点。求实轴分离点的位置，以及该点对应的 K。' }],
        numbers: [
          { id: 's', label: '分离点', expected: -2 },
          { id: 'k', label: 'K', expected: 1 },
        ],
        model: '分离点在 −2，对应 K = 1。',
        rule: 'K = −(s+1)(s+3)。令 dK/ds = 0 得 s = −2，代回得 K = 1。',
        example: '极点 0 与 −2 的分离点在 −1，K = 1。',
      }),
      numericQuestion({
        id: 'ctl10-a2',
        kp: ['渐近线'],
        prompt: [{ type: 'p', text: '开环有 3 个极点、1 个有限零点。求渐近线的条数。' }],
        numbers: [{ id: 'nm', label: '渐近线条数', expected: 2 }],
        model: '渐近线有 2 条。',
        rule: '走向无穷远的分支数是 n − m。',
        example: '3 个极点、没有零点时，渐近线有 3 条。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 11,
    title: '伯德图',
    goals: [
      '会把幅值化成分贝，并记住 20 lg 的几个整值。',
      '知道每个极点使高频渐近线斜率减少 20 dB/dec，每个零点增加 20 dB/dec。',
      '会确定一阶环节 1/(Ts+1) 的转折频率。',
    ],
    sections: [
      {
        title: '用对数把相乘变成相加',
        blocks: [
          {
            type: 'p',
            text: '伯德图分成幅频和相频两条曲线，横轴都是角频率的对数刻度。幅值用分贝：L = 20 lg |G(jω)|。串联环节的分贝数直接相加，所以可以先画每个典型环节，再叠加。',
          },
          { type: 'diagram', id: 'control-bode', caption: '幅频渐近线在转折频率处改变斜率。' },
          { type: 'formula', tex: 'L(\\omega)=20\\lg|G(j\\omega)|' },
          {
            type: 'ul',
            items: [
              '比例 K：一条水平线，高度 20 lg K。K = 10 是 20 dB，K = 100 是 40 dB。',
              '原点处的一个极点（积分 1/s）：斜率全程 −20 dB/dec，相角 −90°。',
              '惯性环节 1/(Ts+1)：转折频率 1/T。低于转折频率按 0 dB，高于转折频率按 −20 dB/dec。相角从 0° 变到 −90°，转折频率处约 −45°。',
              '一阶零点 (Ts+1) 与惯性环节相反：斜率增加 20 dB/dec，相角走向 +90°。',
            ],
          },
        ],
      },
      {
        title: '渐近线和精确曲线',
        blocks: [
          {
            type: 'p',
            text: '手绘时先用渐近线。一阶环节在转折频率处，精确幅值与渐近线相差约 3 dB；两个转折频率离得远时，可以把它们分段处理。相频曲线变化比幅频平缓，一个极点的相位大约从 0.1/T 开始明显下降，到 10/T 接近 −90°。',
          },
          {
            type: 'callout',
            tone: 'rule',
            title: '斜率按“每十倍频程”累计',
            text: '每经过一个实极点，高频渐近斜率减少 20 dB/dec；每经过一个实零点，增加 20 dB/dec。二重极点就是 −40 dB/dec。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：一个惯性和一个增益',
        body: [{ type: 'p', text: 'G(s) = 10 / (s + 1)。求低频渐近分贝、转折频率，以及 ω = 10 处的渐近分贝。' }],
        solution: [
          { type: 'p', text: '低频 |G| ≈ 10，L = 20 lg 10 = 20 dB。转折频率是 1 rad/s。' },
          { type: 'p', text: '过了转折频率，斜率 −20 dB/dec。从 1 到 10 是一个十倍频程，渐近值降到 0 dB。' },
        ],
      },
      {
        title: '示范 2：两个转折频率',
        body: [{ type: 'p', text: 'G(s) = 100 / [(s+1)(s+10)]。求低频分贝，以及按渐近线估计 ω = 10 处的分贝。' }],
        solution: [
          { type: 'p', text: '低频增益 100，对应 40 dB。转折频率在 1 和 10。' },
          { type: 'p', text: '1 到 10 之间只有一个极点起作用，斜率 −20 dB/dec，所以 ω = 10 的渐近值是 40 − 20 = 20 dB。再往高频变成 −40 dB/dec。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl11-b1',
        kp: ['伯德图'],
        prompt: [{ type: 'p', text: '比例环节 K = 100。求它的幅值分贝。' }],
        numbers: [{ id: 'l', label: 'L', expected: 40, unit: 'dB' }],
        model: '40 dB。',
        rule: '20 lg 100 = 40。',
        example: 'K = 10 对应 20 dB。',
      }),
      numericQuestion({
        id: 'ctl11-b2',
        kp: ['伯德图'],
        prompt: [{ type: 'p', text: 'K = 10。求 20 lg K。' }],
        numbers: [{ id: 'l', label: '分贝', expected: 20, unit: 'dB' }],
        model: '20 dB。',
        rule: 'lg 10 = 1，所以 20 lg 10 = 20。',
        example: 'K = 100 时是 40 dB。',
      }),
      numericQuestion({
        id: 'ctl11-b3',
        kp: ['转折频率'],
        prompt: [{ type: 'p', text: '环节 1 / (0.1s + 1)。求转折频率。' }],
        numbers: [{ id: 'w', label: '转折频率', expected: 10, unit: 'rad/s' }],
        model: '转折频率为 10 rad/s。',
        rule: '1/(Ts+1) 的转折频率是 1/T。这里 T = 0.1。',
        example: '1/(s+1) 的转折频率是 1 rad/s。',
      }),
      choiceQuestion({
        id: 'ctl11-b4',
        kp: ['伯德图'],
        stem: '每增加一个远离原点的实极点，高频渐近线的斜率怎样变化？',
        options: ABCD(['减少 20 dB/dec', '增加 20 dB/dec', '减少 40 dB/dec', '斜率不变，只改变相位']),
        answer: 'A',
        model: 'A。一个实极点贡献 −20 dB/dec。',
        rule: '实零点贡献 +20 dB/dec。原点处的极点从最低频率开始就提供 −20 dB/dec。',
        example: '两个实极点都过了转折频率以后，斜率是 −40 dB/dec。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl11-a1',
        kp: ['伯德图'],
        prompt: [
          {
            type: 'p',
            text: 'G(s) = 100 / [(s+1)(s+10)]。求低频渐近分贝，以及 ω = 10 处的渐近分贝。',
          },
        ],
        numbers: [
          { id: 'low', label: '低频分贝', expected: 40, unit: 'dB' },
          { id: 'mid', label: 'ω=10 的渐近分贝', expected: 20, unit: 'dB' },
        ],
        model: '低频 40 dB，ω = 10 处的渐近值是 20 dB。',
        rule: '两个转折频率之间只有一段 −20 dB/dec，一个十倍频程下降 20 dB。',
        example: '10 / (s+1) 从 20 dB 起，在 ω = 10 的渐近值是 0 dB。',
      }),
      numericQuestion({
        id: 'ctl11-a2',
        kp: ['伯德图'],
        prompt: [{ type: 'p', text: 'G(s) = 10 / s^2。求幅频渐近线的斜率，以及 ω = 1 时的分贝。' }],
        numbers: [
          { id: 'slope', label: '斜率', expected: -40, unit: 'dB/dec' },
          { id: 'l', label: 'ω=1 的分贝', expected: 20, unit: 'dB' },
        ],
        model: '斜率 −40 dB/dec，ω = 1 时为 20 dB。',
        rule: '两个原点极点给出 −40 dB/dec。|G(j1)| = 10，分贝是 20 lg 10。',
        example: '1/s 的斜率是 −20 dB/dec。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 12,
    title: '奈奎斯特稳定判据与稳定裕度',
    goals: [
      '知道临界点是 (−1, j0)，并会用包围圈数判断闭环右半平面极点。',
      '会由相角穿越处的幅值计算增益裕度。',
      '会由幅值穿越处的相角计算相角裕度。',
    ],
    sections: [
      {
        title: '看开环曲线怎样绕过 −1',
        blocks: [
          {
            type: 'p',
            text: '奈奎斯特图把 G(jω) 在 ω 从 −∞ 到 +∞ 的值画在复平面上。闭环是否稳定，取决于这条曲线怎样包围临界点 (−1, j0)，以及开环自己在右半平面有多少极点。',
          },
          { type: 'diagram', id: 'control-nyquist', caption: '临界点标在 (−1, j0)。曲线是否包围它，决定闭环右半平面极点的个数。' },
          { type: 'formula', tex: 'Z = P + N' },
          {
            type: 'ul',
            items: [
              'P：开环传递函数在右半平面的极点数。',
              'N：奈奎斯特曲线顺时针包围 (−1, j0) 的圈数。逆时针包围记为负的圈数。',
              'Z：闭环在右半平面的极点数。Z = 0 闭环才稳定。',
              '开环稳定时 P = 0。只要曲线不包围临界点，闭环就稳定。',
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: '圈数的方向要写清楚',
            text: '有的书写成“逆时针圈数”，公式里的符号会相反。本课固定用顺时针的 N，所以是 Z = P + N。两种说法算出来的 Z 应当相同。',
          },
        ],
      },
      {
        title: '两个裕度',
        blocks: [
          { type: 'formula', tex: 'K_g=\\frac{1}{|G(j\\omega_g)|},\\qquad \\gamma=180^\\circ+\\angle G(j\\omega_c)' },
          {
            type: 'p',
            text: '相角穿越频率 ωg 是相角等于 −180° 的频率，增益裕度 Kg 是该处幅值的倒数。它表示增益再乘多大才会碰到临界点。幅值穿越频率 ωc 是 |G| = 1 的频率，相角裕度是此时的相角距离 −180° 还差多少。',
          },
          {
            type: 'p',
            text: '对开环稳定的最小相位系统，两个裕度都为正，表示闭环稳定并且离开临界点还有余量。裕度越大，通常越能忍受参数变化，但过大也可能使响应变慢。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：由一个点算出两个裕度',
        body: [
          {
            type: 'p',
            text: '开环稳定。相角为 −180° 时 |G| = 0.25；幅值为 1 时相角为 −120°。求增益裕度和相角裕度。',
          },
        ],
        solution: [
          { type: 'p', text: 'Kg = 1 / 0.25 = 4。增益还可以放大到 4 倍，才会在相角穿越处碰到临界点。' },
          { type: 'p', text: '相角裕度 γ = 180° + (−120°) = 60°。' },
        ],
      },
      {
        title: '示范 2：开环稳定但包围了临界点',
        body: [{ type: 'p', text: '开环没有右半平面极点，奈奎斯特曲线顺时针包围 (−1, j0) 一圈。闭环稳定吗？' }],
        solution: [
          { type: 'p', text: 'P = 0，N = 1，Z = 1。' },
          { type: 'p', text: '闭环有一个右半平面极点，不稳定。开环稳定并不能代替闭环稳定。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl12-b1',
        kp: ['增益裕度'],
        prompt: [{ type: 'p', text: '相角穿越频率处 |G| = 0.2。求增益裕度 Kg（用倍数，不写成贝）。' }],
        numbers: [{ id: 'gm', label: '增益裕度', expected: 5 }],
        model: 'Kg = 5。',
        rule: 'Kg = 1 / |G(jωg)|。',
        example: '|G| = 0.25 时，增益裕度是 4。',
      }),
      numericQuestion({
        id: 'ctl12-b2',
        kp: ['相角裕度'],
        prompt: [{ type: 'p', text: '幅值穿越频率处，G 的相角是 −150°。求相角裕度。' }],
        numbers: [{ id: 'pm', label: '相角裕度', expected: 30, unit: '°' }],
        model: '相角裕度为 30°。',
        rule: 'γ = 180° + ∠G(jωc)。',
        example: '相角 −120° 时，相角裕度是 60°。',
      }),
      choiceQuestion({
        id: 'ctl12-b3',
        kp: ['奈奎斯特'],
        stem: '奈奎斯特判据里的临界点是哪一个？',
        options: ABCD(['(−1, j0)', '(0, j0)', '(1, j0)', '原点']),
        answer: 'A',
        model: 'A。临界点是 (−1, j0)。',
        rule: '闭环特征方程 1 + G = 0 对应 G = −1。',
        example: '曲线从临界点右侧穿过负实轴且不包围它时，开环稳定系统的闭环通常仍稳定。',
      }),
      choiceQuestion({
        id: 'ctl12-b4',
        kp: ['奈奎斯特'],
        stem: '开环稳定，奈奎斯特曲线顺时针包围临界点一圈。闭环怎样？',
        options: ABCD(['不稳定，有一个右半平面极点', '稳定', '有一个左半平面极点所以稳定', '临界点与稳定性无关']),
        answer: 'A',
        model: 'A。P = 0，N = 1，Z = 1，闭环不稳定。',
        rule: 'Z = P + N，N 按顺时针包围圈数计算。',
        example: '开环稳定且不包围临界点时，Z = 0，闭环稳定。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl12-a1',
        kp: ['增益裕度'],
        prompt: [
          {
            type: 'p',
            text: '当前在相角穿越处 |G| = 0.5。若把开环增益提高到原来的 2 倍，穿越处的相角不变。求原来的增益裕度和提高后的增益裕度。',
          },
        ],
        numbers: [
          { id: 'gm', label: '原来的 Kg', expected: 2 },
          { id: 'gm2', label: '提高后的 Kg', expected: 1 },
        ],
        model: '原来 Kg = 2，提高后 Kg = 1，系统到达稳定边界。',
        rule: '增益加倍使 |G| 加倍。新的 |G| = 1，Kg = 1。',
        example: '|G| = 0.25、增益裕度 4 时，若增益乘 4，裕度变为 1。',
      }),
      keywordQuestion({
        id: 'ctl12-a2',
        kp: ['相角裕度'],
        prompt: [{ type: 'p', text: '相角裕度在哪个频率上定义？它比较的是实际相角和哪一个角度？' }],
        fields: [
          {
            id: 'ans',
            label: '相角裕度',
            textarea: true,
            groups: [
              ['幅值穿越', '剪切', '|G|=1', '模为 1', '等于 1'],
              ['180', '-180', '−180'],
            ],
          },
        ],
        model: '相角裕度在幅值穿越频率上定义，等于实际相角比 −180° 高出的角度。',
        rule: 'γ = 180° + ∠G(jωc)，其中 |G(jωc)| = 1。',
        example: '相角 −150° 时，相角裕度是 30°。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 13,
    title: '超前、滞后校正',
    goals: [
      '会用 α < 1 和 α > 1 区分超前校正与滞后校正。',
      '会计算超前环节的最大超前角及其频率。',
      '知道超前主要改善动态，滞后主要改善稳态。',
    ],
    sections: [
      {
        title: '同一个分式，α 决定用途',
        blocks: [
          {
            type: 'p',
            text: '串联校正写成 Gc(s) = (Ts + 1) / (αTs + 1)。α < 1 时，零点比极点更靠近原点，环节在一段频率上提供正相角，这是超前校正。α > 1 时，极点比零点更靠近原点，高频幅值降到低频的 1/α，这是滞后校正。',
          },
          { type: 'diagram', id: 'control-leadlag', caption: '超前校正提供正相角；滞后校正压低高频增益，用来配合提高稳态精度。' },
          { type: 'formula', tex: '\\sin\\varphi_m=\\frac{1-\\alpha}{1+\\alpha},\\qquad \\omega_m=\\frac{1}{T\\sqrt{\\alpha}}' },
          {
            type: 'p',
            text: '最大超前角 φm 只由 α 决定，发生在两个转折频率的几何中心 ωm。α = 1/3 时，(1 − α)/(1 + α) = 1/2，最大超前角是 30°。',
          },
        ],
      },
      {
        title: '两种校正各解决什么问题',
        blocks: [
          {
            type: 'compare',
            leftTitle: '超前',
            left: ['提供正相角，增大相角裕度', '穿越频率通常提高，响应变快', '高频增益上升，噪声更明显'],
            rightTitle: '滞后',
            right: ['环节本身在转折区提供负相角', '把中高频增益压低', '便于把低频增益做高，从而减小稳态误差'],
          },
          {
            type: 'p',
            text: '滞后校正不是靠自己的负相角去“改善”裕度。设计时把两个转折频率放在新的穿越频率左边约一个十倍频程以外，使它在穿越频率附近的负相角已经很小；同时利用高频衰减，让串联增益可以提高。提高后的增益留在低频段，稳态误差减小，穿越频率附近的幅值仍保持在设计位置。',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '不要把两种网络的相位记反',
            text: '超前网络的零点频率低于极点频率，相位为正。滞后网络的极点频率低于零点频率，相位为负。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：α = 1/3 的超前角',
        body: [{ type: 'p', text: 'Gc(s) = (s + 1) / (s/3 + 1)，也就是 T = 1、α = 1/3。求最大超前角和它所在的频率。' }],
        solution: [
          { type: 'p', text: 'sin φm = (1 − 1/3) / (1 + 1/3) = 0.5，所以 φm = 30°。' },
          { type: 'p', text: 'ωm = 1 / √(1/3) = √3 ≈ 1.73 rad/s。它正是转折频率 1 和 3 的几何平均。' },
        ],
      },
      {
        title: '示范 2：滞后环节的高频衰减',
        body: [{ type: 'p', text: '滞后校正 α = 10、T = 1。零点和极点在哪？高频幅值是低频的多少倍？' }],
        solution: [
          { type: 'p', text: '零点转折频率 1/T = 1，极点转折频率 1/(αT) = 0.1。极点更靠近原点。' },
          { type: 'p', text: '高频幅值约为低频的 1/α = 0.1。设计时可以再把串联增益提高约 10 倍，用来减小稳态误差，同时把穿越频率附近的幅值拉回原设计。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl13-b1',
        kp: ['超前校正'],
        prompt: [{ type: 'p', text: '希望最大超前角的正弦等于 0.5，也就是 φm = 30°。求 α。' }],
        numbers: [{ id: 'alpha', label: 'α', expected: 0.333, tol: 0.02 }],
        model: 'α = 1/3 ≈ 0.333。',
        rule: '(1 − α)/(1 + α) = 0.5，解得 α = 1/3。',
        example: 'α = 0.5 时，(1−0.5)/(1+0.5) = 1/3，最大超前角小于 30°。',
      }),
      choiceQuestion({
        id: 'ctl13-b2',
        kp: ['超前校正'],
        stem: '超前校正在两个转折频率之间主要提供什么？',
        options: ABCD(['正相角', '负相角', '一个原点极点', '稳态误差的积分']),
        answer: 'A',
        model: 'A。超前校正提供正相角。',
        rule: 'α < 1 时零点频率低于极点频率，相位贡献为正，用来提高相角裕度。',
        example: 'α = 1/3 时最大正相角是 30°。',
      }),
      choiceQuestion({
        id: 'ctl13-b3',
        kp: ['滞后校正'],
        stem: '滞后校正在设计里最主要用来改善什么？',
        options: ABCD([
          '提高低频增益，从而改善稳态误差',
          '在穿越频率处提供很大的正相角',
          '去掉所有极点',
          '使系统一定变成 2 型',
        ]),
        answer: 'A',
        model: 'A。滞后校正用来提高低频段增益、减小稳态误差。',
        rule: '滞后网络本身的相位是负的，所以要放在穿越频率左侧较远的地方。稳态精度来自提高后的低频增益。',
        example: 'α = 10 的滞后环节把高频幅值降到约 1/10，串联增益就可以再提高。',
      }),
      keywordQuestion({
        id: 'ctl13-b4',
        kp: ['超前校正', '滞后校正'],
        prompt: [{ type: 'p', text: 'α < 1 和 α > 1 分别对应哪一种校正？' }],
        fields: [
          {
            id: 'lead',
            label: 'α < 1',
            textarea: false,
            groups: [['超前']],
          },
          {
            id: 'lag',
            label: 'α > 1',
            textarea: false,
            groups: [['滞后']],
          },
        ],
        model: 'α < 1 是超前校正，α > 1 是滞后校正。',
        rule: '超前：零点比极点靠近原点。滞后：极点比零点靠近原点。',
        example: 'T = 1、α = 1/3 时，零点在 1、极点在 3，是超前。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl13-a1',
        kp: ['超前校正'],
        prompt: [{ type: 'p', text: '超前环节的零点转折频率为 2，极点转折频率为 6。求 α 和最大超前角（度）。' }],
        numbers: [
          { id: 'alpha', label: 'α', expected: 0.333, tol: 0.02 },
          { id: 'phi', label: '最大超前角', expected: 30, unit: '°' },
        ],
        model: 'α = 1/3 ≈ 0.333，最大超前角 30°。',
        rule: '极点频率 / 零点频率 = 6/2 = 3 = 1/α，所以 α = 1/3。sin φm = 0.5。',
        example: '零点频率 1、极点频率 3 时，α 同样是 1/3，ωm = √3。',
      }),
      numericQuestion({
        id: 'ctl13-a2',
        kp: ['超前校正'],
        prompt: [{ type: 'p', text: 'T = 1，α = 1/3。求最大超前角出现的频率 ωm。' }],
        numbers: [{ id: 'wm', label: 'ωm', expected: 1.73, tol: 0.03, unit: 'rad/s' }],
        model: 'ωm = √3 ≈ 1.73 rad/s。',
        rule: 'ωm = 1 / (T √α)，也是两个转折频率的几何平均。',
        example: '转折频率 2 与 6 的几何平均是 √12 ≈ 3.46 rad/s。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 14,
    title: 'PID 控制与校正综合',
    goals: [
      '会写 PID 的时域式和传递函数，并在两种参数形式之间换算。',
      '能说明比例、积分、微分各自对稳态和动态的主要影响。',
      '会用阶跃稳态误差反求一个简单对象所需要的比例增益。',
    ],
    sections: [
      {
        title: '三项分别看现在、过去和变化',
        blocks: [
          {
            type: 'p',
            text: 'PID 是把偏差按三种方式加工后再相加。比例看当前偏差，积分看偏差累计了多少，微分看偏差正在变快还是变慢。并联形式可以直接写成三个方框。',
          },
          { type: 'diagram', id: 'control-pid', caption: '偏差 e 同时进入 P、I、D 三条通路，输出相加成为控制量 u。' },
          { type: 'formula', tex: 'G_c(s)=K_p+\\frac{K_i}{s}+K_d s=K_p\\left(1+\\frac{1}{T_i s}+T_d s\\right)' },
          {
            type: 'ul',
            items: [
              '比例：加大 Kp 通常使响应变快，0 型系统的阶跃误差变小，但不能单靠比例把误差变成零。Kp 过大时阻尼变差。',
              '积分：开环增加一个原点极点，型别提高，阶跃稳态误差可以消掉。积分过强会增加超调，甚至使系统不稳定。',
              '微分：提供超前相位，增加阻尼，超调下降。理想微分会放大高频噪声，实际使用时常再串一个小惯性。',
            ],
          },
        ],
      },
      {
        title: '参数的两种写法',
        blocks: [
          {
            type: 'p',
            text: '时间常数形式里，Ki = Kp / Ti，Kd = Kp Td。Ti 叫积分时间，Td 叫微分时间。只使用其中两项时，就得到 PI 或 PD。PI 适合稳态精度不够、而噪声又比较大的场合；PD 适合需要阻尼、而稳态误差已经由对象自己的积分解决的场合。',
          },
          {
            type: 'callout',
            tone: 'rule',
            title: '校正要同时看稳态和裕度',
            text: '先用积分或增大低频增益满足误差，再用微分或超前网络把相角裕度拉回来。只加大一个参数，通常会把另一项指标变坏。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：用阶跃误差确定比例增益',
        body: [
          {
            type: 'p',
            text: '对象是 1 / (s + 1)，控制器只有比例 K，单位负反馈，闭环稳定。要求单位阶跃稳态误差为 0.2。求 K。',
          },
        ],
        solution: [
          { type: 'p', text: '开环 G = K / (s + 1)，是 0 型。Kp = K。' },
          { type: 'p', text: '1 / (1 + K) = 0.2，所以 1 + K = 5，K = 4。' },
          { type: 'p', text: '若改成 PI，开环变成 1 型，阶跃稳态误差可以降到 0，但要重新检查稳定性和超调。' },
        ],
      },
      {
        title: '示范 2：积分时间换成 Ki',
        body: [{ type: 'p', text: 'Kp = 3，Ti = 2。求并联形式里的 Ki。若 Kd = 2，且偏差的变化率是 3，求微分项的输出。' }],
        solution: [
          { type: 'p', text: 'Ki = Kp / Ti = 3 / 2 = 1.5。' },
          { type: 'p', text: '微分项输出 Kd · de/dt = 2 × 3 = 6。偏差变大得越快，微分项把控制量加得越多。' },
        ],
      },
    ],
    basic: [
      choiceQuestion({
        id: 'ctl14-b1',
        kp: ['积分'],
        stem: '在比例控制之外加入积分，对单位阶跃稳态误差的典型作用是什么？',
        options: ABCD([
          '把原来的有限误差消掉',
          '一定使误差变成无穷大',
          '只改变超调，不改变稳态误差',
          '使对象的直流增益变成零',
        ]),
        answer: 'A',
        model: 'A。积分提高型别，阶跃稳态误差变为零。',
        rule: '积分的代价是可能降低稳定裕度、加大超调。闭环必须仍然稳定，这个“误差为零”才有意义。',
        example: '0 型对象加 PI 以后变成 1 型，稳定时阶跃无静差。',
      }),
      numericQuestion({
        id: 'ctl14-b2',
        kp: ['比例', '稳态误差'],
        prompt: [
          {
            type: 'p',
            text: '对象 1 / (s + 1)，单位负反馈，只用比例 K，闭环稳定。单位阶跃稳态误差要求为 0.2。求 K。',
          },
        ],
        numbers: [{ id: 'k', label: 'K', expected: 4 }],
        model: 'K = 4。',
        rule: 'ess = 1 / (1 + K) = 0.2。',
        example: '若对象是 Kc / (s + 5)，误差要求 0.1，则 Kc = 45。',
      }),
      numericQuestion({
        id: 'ctl14-b3',
        kp: ['微分'],
        prompt: [{ type: 'p', text: 'Kd = 2，偏差每秒增大 3。求微分项这一时刻的输出。' }],
        numbers: [{ id: 'ud', label: '微分输出', expected: 6 }],
        model: '微分输出为 6。',
        rule: '理想微分输出是 Kd 乘偏差的导数。',
        example: 'Kd = 0.5、变化率为 4 时，输出是 2。',
      }),
      keywordQuestion({
        id: 'ctl14-b4',
        kp: ['比例', '积分', '微分'],
        prompt: [{ type: 'p', text: '分别用很短的话说明比例、积分、微分主要针对偏差的哪一种信息。' }],
        fields: [
          {
            id: 'p',
            label: '比例',
            textarea: false,
            groups: [['当前', '现在', '大小', '成正比']],
          },
          {
            id: 'i',
            label: '积分',
            textarea: false,
            groups: [['积累', '累计', '过去', '积分', '稳态']],
          },
          {
            id: 'd',
            label: '微分',
            textarea: false,
            groups: [['变化', '趋势', '导数', '快慢', '超前']],
          },
        ],
        model: '比例看当前偏差的大小，积分看偏差的累计，微分看偏差的变化趋势。',
        rule: '三项可以单独使用，也可以组成 PI、PD 或 PID。',
        example: '偏差不变时微分项是 0；偏差长期存在时积分项会继续增大。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl14-a1',
        kp: ['PID 参数'],
        prompt: [{ type: 'p', text: 'Kp = 3，积分时间 Ti = 2，微分时间 Td = 0.5。求 Ki 和 Kd。' }],
        numbers: [
          { id: 'ki', label: 'Ki', expected: 1.5, tol: 0.02 },
          { id: 'kd', label: 'Kd', expected: 1.5, tol: 0.02 },
        ],
        model: 'Ki = 1.5，Kd = 1.5。',
        rule: 'Ki = Kp / Ti，Kd = Kp Td。',
        example: 'Kp = 4、Ti = 4 时，Ki = 1。',
      }),
      numericQuestion({
        id: 'ctl14-a2',
        kp: ['比例', '稳态误差'],
        prompt: [
          {
            type: 'p',
            text: '对象为 Kc / (s + 2)，单位负反馈，只用比例控制，闭环稳定。要求单位阶跃稳态误差为 0.1。求 Kc。',
          },
        ],
        numbers: [{ id: 'kc', label: 'Kc', expected: 18 }],
        model: 'Kc = 18。',
        rule: '开环直流增益 Kc / 2。1 / (1 + Kc/2) = 0.1，故 Kc/2 = 9。',
        example: '对象 K / (s+1)、误差 0.2 时，K = 4。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'control',
    number: 15,
    title: '状态空间基本概念',
    goals: [
      '会写状态方程和输出方程，并说出矩阵的尺寸。',
      '能把一个二阶微分方程写成相变量状态方程。',
      '知道传递函数的极点是系统矩阵的特征值，稳态可由 ẋ = 0 求出。',
    ],
    sections: [
      {
        title: '用一组一阶方程代替一个高阶方程',
        blocks: [
          {
            type: 'p',
            text: '状态变量是一组数目最少的内部变量，只要知道它们现在的值和以后的输入，以后的输出就确定了。n 阶系统需要 n 个状态。把每个状态的导数写成状态和输入的线性组合，就是状态方程。',
          },
          { type: 'diagram', id: 'control-state', caption: '输入经 B 进入，状态经 A 反馈，积分后得到状态 x。图下的公式是状态方程。' },
          { type: 'formula', tex: '\\dot{x}=Ax+Bu,\\qquad y=Cx+Du' },
          {
            type: 'ul',
            items: [
              'A 是 n×n 的系统矩阵，B 是 n×r 的输入矩阵，C 是 m×n 的输出矩阵，D 是 m×r 的直接传递矩阵。',
              '单输入单输出且分子次数低于分母时，通常 D = 0。',
              '同一次输入输出关系可以有很多种状态选法。外部传递函数相同，A、B、C 可以不同。',
            ],
          },
        ],
      },
      {
        title: '相变量、极点和稳态',
        blocks: [
          {
            type: 'p',
            text: '对 $\\ddot{y}+a_1\\dot{y}+a_0 y=b_0 u$，取 x1 = y，x2 = ẏ。则 ẋ1 = x2，ẋ2 = −a0 x1 − a1 x2 + b0 u。输出 y = x1。',
          },
          { type: 'formula', tex: 'A=\\begin{bmatrix}0&1\\\\-a_0&-a_1\\end{bmatrix},\\quad B=\\begin{bmatrix}0\\\\b_0\\end{bmatrix},\\quad C=\\begin{bmatrix}1&0\\end{bmatrix}' },
          {
            type: 'p',
            text: '传递函数的极点是 A 的特征值，也就是 det(sI − A) = 0 的根。常值输入下的平衡状态满足 Ax + Bu = 0。能控是指存在输入，能在有限时间把任意初态驱到任意目标状态；单输入时，矩阵 [B AB … A^{n−1}B] 满秩即可。能观是指有限时间内的输入和输出足以唯一确定初态。',
          },
          {
            type: 'callout',
            tone: 'note',
            title: '状态方程保留了内部',
            text: '传递函数做零极点相消时，可能把不能控或不能观的部分藏起来。状态方程把这部分留在 A、B、C 里，所以它比传递函数更完整。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：二阶方程的相变量形式',
        body: [{ type: 'p', text: '$\\ddot{y}+3\\dot{y}+2y=u$。写出 A、B、C，并求 u = 1 时的稳态输出。' }],
        solution: [
          { type: 'p', text: 'x1 = y，x2 = ẏ。A 的第一行是 [0 1]，第二行是 [−2 −3]。B = [0 1]^T，C = [1 0]，D = 0。' },
          { type: 'p', text: '稳态时 x2 = 0，第二行 −2 x1 + 1 = 0，所以 y = x1 = 0.5。这与传递函数 1/(s^2+3s+2) 的直流增益 1/2 相同。' },
        ],
      },
      {
        title: '示范 2：输入系数不在最高阶为 1',
        body: [{ type: 'p', text: '$\\ddot{y}+5\\dot{y}+6y=2u$。求 A 的第二行和 B 中的非零元素，并求 u = 1 的稳态输出。' }],
        solution: [
          { type: 'p', text: '第二行是 [−6 −5]，B 的第二个元素是 2。' },
          { type: 'p', text: '稳态 x2 = 0，−6 x1 + 2 = 0，y = 1/3。直流增益 2/6 = 1/3，二者一致。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'ctl15-b1',
        kp: ['状态变量'],
        prompt: [{ type: 'p', text: '一个三阶线性系统，状态变量最少要有几个？系统矩阵 A 是几阶方阵？两个数相同，分别填入。' }],
        numbers: [
          { id: 'n', label: '状态个数', expected: 3 },
          { id: 'a', label: 'A 的阶数', expected: 3 },
        ],
        model: '状态有 3 个，A 是 3×3。',
        rule: 'n 阶系统有 n 个状态，A 为 n×n。',
        example: '二阶系统的 A 是 2×2。',
      }),
      numericQuestion({
        id: 'ctl15-b2',
        kp: ['相变量'],
        prompt: [{ type: 'p', text: '$\\ddot{y}+3\\dot{y}+2y=u$，按 x1 = y、x2 = ẏ。求 A 的第二行两个元素 a21 和 a22。' }],
        numbers: [
          { id: 'a21', label: 'a21', expected: -2 },
          { id: 'a22', label: 'a22', expected: -3 },
        ],
        model: 'a21 = −2，a22 = −3。',
        rule: '第二行是 [−a0 −a1]，a0 是 y 的系数，a1 是 ẏ 的系数。',
        example: 'ÿ + 5ẏ + 6y = 2u 的第二行是 [−6 −5]。',
      }),
      choiceQuestion({
        id: 'ctl15-b3',
        kp: ['状态方程'],
        stem: '状态方程 ẋ = Ax + Bu 是一组什么样的方程？',
        options: ABCD([
          '关于状态向量的一阶微分方程',
          '只能是一个高阶代数方程',
          '输出等于输入，与状态无关',
          '只在非线性系统中使用',
        ]),
        answer: 'A',
        model: 'A。它是状态向量的一阶向量微分方程。',
        rule: '输出再由 y = Cx + Du 单独写出。线性定常系统的 A、B、C、D 是常数矩阵。',
        example: '二阶方程可以改成两个一阶方程，未知量就是两个状态。',
      }),
      keywordQuestion({
        id: 'ctl15-b4',
        kp: ['输出方程'],
        prompt: [{ type: 'p', text: '写出输出方程的形式，并说明 D 在什么时候常常是零。' }],
        fields: [
          {
            id: 'ans',
            label: '输出方程',
            textarea: true,
            groups: [
              ['Cx', 'C x', 'C*x'],
              ['Du', 'D u', 'D*u', '直接'],
            ],
          },
        ],
        model: 'y = Cx + Du。分子次数低于分母的单输入单输出系统，D 通常为 0。',
        rule: 'C 把状态组合成输出，D 表示输入不经过状态直接到达输出的部分。',
        example: '相变量形式里若 y = x1，则 C = [1 0]，D = 0。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'ctl15-a1',
        kp: ['相变量'],
        prompt: [{ type: 'p', text: '$\\ddot{y}+5\\dot{y}+6y=2u$。求 A 第二行第一列的元素，以及 B 的非零元素。' }],
        numbers: [
          { id: 'a21', label: 'a21', expected: -6 },
          { id: 'b', label: 'B 的非零元素', expected: 2 },
        ],
        model: 'a21 = −6，B 的非零元素是 2。',
        rule: 'a21 = −a0 = −6，输入系数 b0 = 2 放在 B 的第二行。',
        example: 'ÿ + 3ẏ + 2y = u 时，a21 = −2，B 的非零元素是 1。',
      }),
      numericQuestion({
        id: 'ctl15-a2',
        kp: ['稳态', '特征值'],
        prompt: [
          {
            type: 'p',
            text: '上题的系统输入恒为 u = 1。求 A 的行列式，以及稳态输出。稳态输出填小数时保留三位（1/3 写成 0.333）。',
          },
        ],
        numbers: [
          { id: 'det', label: 'det(A)', expected: 6 },
          { id: 'y', label: '稳态输出', expected: 0.333, tol: 0.01 },
        ],
        model: 'det(A) = 6，稳态输出为 1/3 ≈ 0.333。',
        rule: 'A = [[0, 1], [−6, −5]]，行列式为 6。稳态 −6y + 2 = 0。',
        example: 'ÿ + 3ẏ + 2y = u 在 u = 1 时的稳态输出是 0.5。',
      }),
    ],
  }),
]
