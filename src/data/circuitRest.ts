import type { LessonContent } from '../types'
import { ABCD, choiceQuestion, keywordQuestion, numericQuestion, stemLesson } from './author'

export const circuitRest: LessonContent[] = [
  stemLesson({
    subjectId: 'circuit',
    number: 2,
    title: 'KCL、KVL 与电路基本定律',
    goals: [
      '会按参考方向对节点列写 KCL，并解释电流为负的含义。',
      '会沿闭合路径列写 KVL，把电位升和电位降配平。',
      '能把欧姆定律放进 KCL、KVL，求出支路电流和电压。',
    ],
    sections: [
      {
        title: '节点上的电流：KCL',
        blocks: [
          {
            type: 'p',
            text: '基尔霍夫电流定律（KCL）说的是电荷守恒：在集总电路里，任何时刻流入一个节点的电流，都必须等于流出这个节点的电流。电荷不会在节点上越积越多。',
          },
          { type: 'diagram', id: 'circuit-kcl', caption: 'i1 流入节点，i2 与 i3 流出。按图中箭头：i1 = i2 + i3。' },
          { type: 'formula', tex: '\\sum i = 0' },
          {
            type: 'p',
            text: '“代数和”三个字不能省。先选定正方向，例如规定流出为正、流入为负，再把每条支路电流连同符号加起来，结果才是零。若题目已经画好箭头，就按箭头代入；算出来是负数，只说明实际方向与箭头相反。',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '不要写成“每个电流都是零”',
            text: 'KCL 约束的是同一节点上各电流之间的关系，不是要求每条支路电流单独为零。',
          },
        ],
      },
      {
        title: '回路上的电压：KVL',
        blocks: [
          {
            type: 'p',
            text: '基尔霍夫电压定律（KVL）说的是电位单值：从一点出发，沿任何闭合路径走回原点，电位的升降必须抵消。因此各段电压的代数和为零。',
          },
          { type: 'formula', tex: '\\sum u = 0' },
          {
            type: 'ul',
            items: [
              '先选定绕行方向。顺着绕行方向，从“+”走到“−”记为电位降，从“−”走到“+”记为电位升。',
              '电阻在关联参考方向下 $u = Ri$。把这个电压放进 KVL 时，符号仍由绕行方向决定。',
              '单回路里，电源电压等于各电阻电压之和。这是 KVL 加欧姆定律的直接结果。',
            ],
          },
          {
            type: 'callout',
            tone: 'rule',
            title: '和欧姆定律怎么配合',
            text: 'KCL、KVL 对线性、非线性电路都适用，只要元件是集总的。欧姆定律只负责电阻自己的 $u$ 与 $i$。列方程时先用 KCL、KVL 搭骨架，再把电阻支路换成 $Ri$。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：补出节点上未知的支路电流',
        body: [
          {
            type: 'p',
            text: '某节点上 $i_1 = 8\\,\\mathrm{A}$ 流入，$i_2 = 3\\,\\mathrm{A}$ 流出，$i_3$ 也是流出。求 $i_3$。',
          },
          { type: 'diagram', id: 'circuit-kcl', caption: '流入等于流出。' },
        ],
        solution: [
          { type: 'p', text: '流入只有 $i_1$，流出是 $i_2$ 与 $i_3$，所以 $8 = 3 + i_3$。' },
          { type: 'p', text: '$i_3 = 5\\,\\mathrm{A}$。三个数都是正的，说明实际方向与所标箭头一致。' },
        ],
      },
      {
        title: '示范 2：单回路里核对 KVL',
        body: [
          {
            type: 'p',
            text: '电压源 $U_s = 12\\,\\mathrm{V}$（上正下负）与 $R_1 = 2\\,\\Omega$、$R_2 = 4\\,\\Omega$ 组成单回路，电流沿顺时针。求电流，以及两个电阻上与电流同向的电压，并核对 KVL。',
          },
        ],
        solution: [
          { type: 'p', text: '串联总电阻 $2 + 4 = 6\\,\\Omega$，电流 $I = 12 / 6 = 2\\,\\mathrm{A}$。' },
          { type: 'p', text: '$u_1 = 2 \\times 2 = 4\\,\\mathrm{V}$，$u_2 = 4 \\times 2 = 8\\,\\mathrm{V}$。' },
          { type: 'p', text: '沿电流方向，两段电阻压降之和 $4 + 8 = 12\\,\\mathrm{V}$，正好等于电源电压。写成代数和：$4 + 8 - 12 = 0$。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir2-b1',
        kp: ['KCL'],
        prompt: [
          {
            type: 'p',
            text: '一个节点上，$i_1 = 5\\,\\mathrm{A}$、$i_2 = 2\\,\\mathrm{A}$ 流入，$i_3 = 3\\,\\mathrm{A}$ 流出。求同样流出该节点的 $i_4$。',
          },
        ],
        numbers: [{ id: 'i4', label: 'i4', expected: 4, unit: 'A' }],
        model: 'i4 = 4 A。',
        rule: '流入之和等于流出之和：$5 + 2 = 3 + i_4$。',
        example: '若 6 A 与 1 A 流入、4 A 流出，则另一条流出支路为 3 A。',
      }),
      choiceQuestion({
        id: 'cir2-b2',
        kp: ['KVL'],
        stem: '关于 KVL，哪一种说法是对的？',
        options: ABCD([
          '沿任一闭合路径，各段电压的代数和为零',
          '每个元件的电压都必须为零',
          '只对含有电源的回路成立，电阻回路可以不满足',
          '回路电压之和等于回路电流之和',
        ]),
        answer: 'A',
        model: 'A。KVL：沿闭合路径各段电压代数和为零。',
        rule: 'KVL 是电位单值，不要求每段电压为零，也不要求回路里一定有电源。',
        example: '两个电阻和一个电压源组成的回路里，电阻电压之和等于电源电压，代数和仍是零。',
      }),
      numericQuestion({
        id: 'cir2-b3',
        kp: ['KVL', '欧姆定律'],
        prompt: [
          {
            type: 'p',
            text: '单回路中 $U_s = 18\\,\\mathrm{V}$，$R_1 = 4\\,\\Omega$ 与 $R_2 = 2\\,\\Omega$ 串联。求回路电流 $I$，以及 $R_2$ 上与电流同向的电压 $u_2$。',
          },
        ],
        numbers: [
          { id: 'i', label: '电流 I', expected: 3, unit: 'A' },
          { id: 'u2', label: '电压 u2', expected: 6, unit: 'V' },
        ],
        model: 'I = 3 A，u2 = 6 V。',
        rule: '串联电流 $I = U_s / (R_1 + R_2)$，电阻电压 $u_2 = I R_2$。KVL：$u_1 + u_2 = U_s$。',
        example: '若电源 10 V，两电阻都是 1 Ω，则电流 5 A，每个电阻电压 5 V。',
      }),
      keywordQuestion({
        id: 'cir2-b4',
        kp: ['KCL'],
        prompt: [{ type: 'p', text: '用自己的话写出 KCL。要能看出“谁在做加法”以及“结果是什么”。' }],
        fields: [
          {
            id: 'kcl',
            label: 'KCL 的内容',
            textarea: true,
            groups: [
              ['节点', '支路'],
              ['代数和', '之和', '流入', '流出'],
              ['零', '0', '相等', '等于'],
            ],
          },
        ],
        model: '任一节点上，各支路电流的代数和为零；也就是流入节点的电流之和等于流出的电流之和。',
        rule: 'KCL 是节点上的电流约束：代数和为零，等价于流入等于流出。',
        example: '三条支路汇于一点时，两条流入电流相加，应等于第三条流出的电流。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir2-a1',
        kp: ['KVL'],
        prompt: [
          {
            type: 'p',
            text: '沿某回路顺时针绕行，电源贡献的电位升是 $15\\,\\mathrm{V}$，三段电阻沿同一方向的压降依次为 $6\\,\\mathrm{V}$、$4\\,\\mathrm{V}$ 和 $u_3$。求 $u_3$。',
          },
        ],
        numbers: [{ id: 'u3', label: 'u3', expected: 5, unit: 'V' }],
        model: 'u3 = 5 V。',
        rule: 'KVL：电位升等于电位降之和，$15 = 6 + 4 + u_3$。',
        example: '若电位升为 9 V，已有压降 2 V 与 3 V，则剩下的压降是 4 V。',
      }),
      numericQuestion({
        id: 'cir2-a2',
        kp: ['KCL', '参考方向'],
        prompt: [
          {
            type: 'p',
            text: '规定流入节点为正。已标出 $i_1 = 8\\,\\mathrm{A}$，$i_2 = -3\\,\\mathrm{A}$，$i_3 = -2\\,\\mathrm{A}$。求 $i_4$。',
          },
        ],
        numbers: [{ id: 'i4', label: 'i4（流入为正）', expected: -3, unit: 'A' }],
        model: 'i4 = -3 A。负号表示这 3 A 实际上是流出节点。',
        rule: '按统一的正方向把电流相加：$8 + (-3) + (-2) + i_4 = 0$。',
        example: '流入为正时，若三个电流是 2 A、4 A、−1 A，则第四个电流是 −5 A。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 3,
    title: '电阻串并联、分压与分流',
    goals: [
      '会求串联、并联以及简单混联的等效电阻。',
      '会用分压公式，知道电压按电阻大小分配。',
      '会用分流公式，知道电流按电导大小分配。',
    ],
    sections: [
      {
        title: '串联与分压',
        blocks: [
          {
            type: 'p',
            text: '串联的特征是各元件流过同一个电流。总电压是各段电压相加，所以等效电阻就是各电阻相加。电阻越大，分到的电压越多。',
          },
          { type: 'diagram', id: 'circuit-series', caption: 'R1 与 R2 串联，流过同一个电流。' },
          { type: 'formula', tex: 'R_{\\mathrm{eq}} = R_1 + R_2, \\qquad u_1 = \\frac{R_1}{R_1 + R_2} U_s' },
          {
            type: 'p',
            text: '分压公式要求 $u_1$ 的参考方向与 $U_s$ 一致，并且 $R_1$、$R_2$ 确实是串联分总电压。少接一只电阻，或把输出接到了别的节点，公式里的分母就要改。',
          },
        ],
      },
      {
        title: '并联与分流',
        blocks: [
          {
            type: 'p',
            text: '并联的特征是各支路电压相同。电流按支路分开，电导大的支路分到的电流多。两只电阻并联时，等效电阻比其中任何一只都小。',
          },
          { type: 'diagram', id: 'circuit-divider', caption: '分压电路：输出取自下方 R2，uo = R2 / (R1 + R2) · Us。' },
          { type: 'formula', tex: 'R_{\\mathrm{eq}} = \\frac{R_1 R_2}{R_1 + R_2}, \\qquad i_1 = \\frac{R_2}{R_1 + R_2} I_s' },
          {
            type: 'compare',
            leftTitle: '串联',
            left: ['电流相同', '电压相加', '电阻大的元件电压大', 'Req 等于各电阻之和'],
            rightTitle: '并联',
            right: ['电压相同', '电流相加', '电阻小的支路电流大', '两电阻并联：Req = R1 R2 / (R1 + R2)'],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '分流公式容易记反',
            text: '用电阻来写时，流过 R1 的电流是 $i_1 = \\dfrac{R_2}{R_1 + R_2} I_s$，分子是“对面那一只”。用电导写更稳妥：$i_1 = \\dfrac{G_1}{G_1 + G_2} I_s$，电导大者电流大。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：串联分压',
        body: [
          { type: 'p', text: '$R_1 = 6\\,\\Omega$ 与 $R_2 = 3\\,\\Omega$ 串联，接到 $U_s = 18\\,\\mathrm{V}$。求等效电阻、电流和两段电压。' },
        ],
        solution: [
          { type: 'p', text: '$R_{\\mathrm{eq}} = 6 + 3 = 9\\,\\Omega$，$I = 18 / 9 = 2\\,\\mathrm{A}$。' },
          { type: 'p', text: '$u_1 = 6 / 9 \\times 18 = 12\\,\\mathrm{V}$，$u_2 = 3 / 9 \\times 18 = 6\\,\\mathrm{V}$。两者相加为 18 V。' },
        ],
      },
      {
        title: '示范 2：并联分流',
        body: [
          { type: 'p', text: '$R_1 = 6\\,\\Omega$ 与 $R_2 = 3\\,\\Omega$ 并联，总电流 $I_s = 6\\,\\mathrm{A}$。求等效电阻和两条支路电流。' },
        ],
        solution: [
          { type: 'p', text: '$R_{\\mathrm{eq}} = 6 \\times 3 / 9 = 2\\,\\Omega$。并联电压 $u = 6 \\times 2 = 12\\,\\mathrm{V}$。' },
          { type: 'p', text: '$i_1 = 12 / 6 = 2\\,\\mathrm{A}$，$i_2 = 12 / 3 = 4\\,\\mathrm{A}$。用分流公式：$i_1 = 3 / 9 \\times 6 = 2\\,\\mathrm{A}$，电阻小的 $R_2$ 分到更大的 4 A。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir3-b1',
        kp: ['串联', '分压'],
        prompt: [{ type: 'p', text: '$R_1 = 4\\,\\Omega$ 与 $R_2 = 6\\,\\Omega$ 串联，接到 $20\\,\\mathrm{V}$。求等效电阻，以及 $R_2$ 上的电压。' }],
        numbers: [
          { id: 'req', label: '等效电阻', expected: 10, unit: 'Ω' },
          { id: 'u2', label: 'R2 电压', expected: 12, unit: 'V' },
        ],
        model: '等效电阻 10 Ω，R2 电压 12 V。',
        rule: '串联 $R_{eq} = R_1 + R_2$，$u_2 = R_2 / (R_1 + R_2) \\cdot U_s$。',
        example: '3 Ω 与 1 Ω 串联接到 8 V，等效电阻 4 Ω，1 Ω 上的电压是 2 V。',
      }),
      numericQuestion({
        id: 'cir3-b2',
        kp: ['并联'],
        prompt: [{ type: 'p', text: '$12\\,\\Omega$ 与 $6\\,\\Omega$ 并联。求等效电阻。' }],
        numbers: [{ id: 'req', label: '等效电阻', expected: 4, unit: 'Ω' }],
        model: '等效电阻为 4 Ω。',
        rule: '两电阻并联 $R_{eq} = R_1 R_2 / (R_1 + R_2)$。',
        example: '20 Ω 与 5 Ω 并联，等效电阻是 4 Ω。',
      }),
      choiceQuestion({
        id: 'cir3-b3',
        kp: ['分流'],
        stem: '两只电阻并联，总电流为 Is。流过 R1 的电流应写成哪一个？',
        options: ABCD([
          'R1 / (R1 + R2) · Is',
          'R2 / (R1 + R2) · Is',
          '(R1 + R2) / R1 · Is',
          'R1 · R2 · Is',
        ]),
        answer: 'B',
        model: 'B。i1 = R2 / (R1 + R2) · Is。',
        rule: '并联分流时，某一支路电流的分子是另一只电阻；电阻越小，电流越大。',
        example: 'R1 = 2 Ω，R2 = 6 Ω，总电流 8 A，则 i1 = 6 / 8 · 8 = 6 A。',
      }),
      numericQuestion({
        id: 'cir3-b4',
        kp: ['分流'],
        prompt: [{ type: 'p', text: '$R_1 = 4\\,\\Omega$ 与 $R_2 = 8\\,\\Omega$ 并联，总电流 $9\\,\\mathrm{A}$。求两条支路的电流。' }],
        numbers: [
          { id: 'i1', label: '流过 R1 的电流', expected: 6, unit: 'A' },
          { id: 'i2', label: '流过 R2 的电流', expected: 3, unit: 'A' },
        ],
        model: 'i1 = 6 A，i2 = 3 A。',
        rule: '$i_1 = R_2 / (R_1 + R_2) \\cdot I_s$。两条支路电流之和应等于总电流。',
        example: '2 Ω 与 2 Ω 并联、总电流 4 A 时，每条支路 2 A。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir3-a1',
        kp: ['混联', '功率'],
        prompt: [
          {
            type: 'p',
            text: '$12\\,\\Omega$ 与 $4\\,\\Omega$ 先并联，再与 $3\\,\\Omega$ 串联，接到 $12\\,\\mathrm{V}$。求端口等效电阻、总电流，以及 $3\\,\\Omega$ 吸收的功率。',
          },
        ],
        numbers: [
          { id: 'req', label: '等效电阻', expected: 6, unit: 'Ω' },
          { id: 'i', label: '总电流', expected: 2, unit: 'A' },
          { id: 'p', label: '3 Ω 的功率', expected: 12, unit: 'W' },
        ],
        model: '等效电阻 6 Ω，总电流 2 A，3 Ω 吸收 12 W。',
        rule: '先算并联：$12 \\parallel 4 = 3\\,\\Omega$，再与 3 Ω 串联得 6 Ω。功率 $P = I^2 R$。',
        example: '6 Ω 与 3 Ω 并联得 2 Ω，再串 2 Ω，接到 8 V，总电流为 2 A。',
      }),
      numericQuestion({
        id: 'cir3-a2',
        kp: ['串联', '分压'],
        prompt: [{ type: 'p', text: '$2\\,\\Omega$、$3\\,\\Omega$、$5\\,\\Omega$ 串联后接到 $20\\,\\mathrm{V}$。求电流，以及中间那只 $3\\,\\Omega$ 的电压。' }],
        numbers: [
          { id: 'i', label: '电流', expected: 2, unit: 'A' },
          { id: 'u', label: '3 Ω 的电压', expected: 6, unit: 'V' },
        ],
        model: '电流 2 A，3 Ω 上的电压 6 V。',
        rule: '串联电流由总电阻决定，$u = I R$ 只取该段电阻。',
        example: '1 Ω、2 Ω、1 Ω 串联接到 8 V，电流为 2 A，中间 2 Ω 的电压为 4 V。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 4,
    title: '电源模型与等效变换',
    goals: [
      '分清理想电源和带内阻的实际电源模型。',
      '会在实际电压源与实际电流源之间做端口等效变换。',
      '知道等效只保证端口外特性相同，不保证内部功率相同。',
    ],
    sections: [
      {
        title: '两种实际电源',
        blocks: [
          {
            type: 'p',
            text: '理想电压源的端电压不随电流改变，内阻按零处理。理想电流源的电流不随端电压改变，内阻按无穷大处理。实验室里更常见的是带内阻的模型：电压源 $U_s$ 与 $R_s$ 串联，或电流源 $I_s$ 与 $R_s$ 并联。',
          },
          { type: 'diagram', id: 'circuit-source', caption: '实际电压源与实际电流源的端口等效：Is = Us / Rs，Rs 保持原值。' },
          { type: 'formula', tex: 'U_s = I_s R_s, \\qquad I_s = U_s / R_s' },
          {
            type: 'ul',
            items: [
              '变换时 $R_s$ 的阻值不变，只是从串联位置改到并联位置，或反过来。',
              '电流源的箭头指向原电压源的正极那一端，这样开路电压的极性才一致。',
              '理想电压源与理想电流源不能用这条关系互换，因为缺少有限且非零的 $R_s$。',
            ],
          },
        ],
      },
      {
        title: '等效到底保证了什么',
        blocks: [
          {
            type: 'p',
            text: '所谓等效，是对端口以外的电路而言：换成另一个模型之后，端口上的电压、电流保持不变，因此外面的负载电流、负载电压也不变。电源盒子内部哪一只电阻在发热，可以不一样。',
          },
          {
            type: 'callout',
            tone: 'rule',
            title: '先变换，再算负载',
            text: '负载接在端口上。变换时不要把负载电阻当成内阻 $R_s$。只把电源和它真正的内阻一起改写，负载留在端口外面。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：电压源改写成电流源',
        body: [{ type: 'p', text: '$12\\,\\mathrm{V}$ 的理想电压源与 $4\\,\\Omega$ 串联。把它化成实际电流源。' }],
        solution: [
          { type: 'p', text: '$I_s = 12 / 4 = 3\\,\\mathrm{A}$，并联内阻仍是 $4\\,\\Omega$。' },
          { type: 'p', text: '箭头指向原电压源正极。开路时，电流全部流过 $4\\,\\Omega$，开路电压仍是 $3 \\times 4 = 12\\,\\mathrm{V}$。' },
        ],
      },
      {
        title: '示范 2：变换以后求负载',
        body: [
          {
            type: 'p',
            text: '电流源 $I_s = 2\\,\\mathrm{A}$ 与 $R_s = 5\\,\\Omega$ 并联，端口再接 $R_L = 5\\,\\Omega$。求负载电流和负载电压。',
          },
        ],
        solution: [
          { type: 'p', text: '先化成电压源：$U_s = 2 \\times 5 = 10\\,\\mathrm{V}$，内阻 $5\\,\\Omega$ 与负载串联。' },
          { type: 'p', text: '负载电流 $I_L = 10 / (5 + 5) = 1\\,\\mathrm{A}$，负载电压 $u_L = 1 \\times 5 = 5\\,\\mathrm{V}$。' },
          { type: 'p', text: '不变换也可以：两只 $5\\,\\Omega$ 并联后再乘总电流，$I_L = 5 / 10 \\times 2 = 1\\,\\mathrm{A}$，结果相同。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir4-b1',
        kp: ['电源等效'],
        prompt: [{ type: 'p', text: '$24\\,\\mathrm{V}$ 与 $6\\,\\Omega$ 串联。求等效电流源的电流 $I_s$。' }],
        numbers: [{ id: 'is', label: 'Is', expected: 4, unit: 'A' }],
        model: 'Is = 4 A，并联电阻仍为 6 Ω。',
        rule: '$I_s = U_s / R_s$。内阻数值不变，只改变接法。',
        example: '9 V 与 3 Ω 串联，等效成 3 A 与 3 Ω 并联。',
      }),
      numericQuestion({
        id: 'cir4-b2',
        kp: ['电源等效'],
        prompt: [{ type: 'p', text: '$5\\,\\mathrm{A}$ 与 $2\\,\\Omega$ 并联。求等效电压源的 $U_s$。' }],
        numbers: [{ id: 'us', label: 'Us', expected: 10, unit: 'V' }],
        model: 'Us = 10 V，串联电阻仍为 2 Ω。',
        rule: '$U_s = I_s R_s$，极性与电流源箭头一致：箭头指向正极。',
        example: '1 A 与 8 Ω 并联，等效电压源为 8 V 与 8 Ω 串联。',
      }),
      choiceQuestion({
        id: 'cir4-b3',
        kp: ['电源等效'],
        stem: '把实际电压源化成实际电流源时，电流源箭头应指向哪里？',
        options: ABCD([
          '指向原电压源的正极',
          '指向原电压源的负极',
          '必须指向负载',
          '方向可以随便定，算完再取绝对值',
        ]),
        answer: 'A',
        model: 'A。箭头指向原电压源正极，开路电压极性才不变。',
        rule: '等效要同时保住端口电压的大小和极性。Rs 改为并联，Is = Us / Rs。',
        example: '上正下负的 6 V 与 2 Ω 串联，化成 3 A 的电流源时，箭头应指向上端。',
      }),
      numericQuestion({
        id: 'cir4-b4',
        kp: ['电源等效', '欧姆定律'],
        prompt: [{ type: 'p', text: '$U_s = 10\\,\\mathrm{V}$ 与 $R_s = 2\\,\\Omega$ 串联后接 $R_L = 3\\,\\Omega$。求负载电流和负载电压。' }],
        numbers: [
          { id: 'i', label: '负载电流', expected: 2, unit: 'A' },
          { id: 'u', label: '负载电压', expected: 6, unit: 'V' },
        ],
        model: '负载电流 2 A，负载电压 6 V。',
        rule: '负载在端口之外：$I = U_s / (R_s + R_L)$，$u_L = I R_L$。',
        example: '12 V 内阻 1 Ω，接 2 Ω 负载，电流为 4 A，负载电压为 8 V。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir4-a1',
        kp: ['电源等效'],
        prompt: [
          {
            type: 'p',
            text: '$I_s = 4\\,\\mathrm{A}$ 与 $R_s = 3\\,\\Omega$ 并联，再接 $R_L = 3\\,\\Omega$。先做电源变换，再求负载电流和负载电压。',
          },
        ],
        numbers: [
          { id: 'i', label: '负载电流', expected: 2, unit: 'A' },
          { id: 'u', label: '负载电压', expected: 6, unit: 'V' },
        ],
        model: '负载电流 2 A，负载电压 6 V。',
        rule: '先得 $U_s = I_s R_s = 12\\,\\mathrm{V}$，再按串联电路 $I_L = U_s / (R_s + R_L)$。',
        example: '2 A 与 4 Ω 并联，接 4 Ω 负载时，负载电流是 1 A。',
      }),
      choiceQuestion({
        id: 'cir4-a2',
        kp: ['等效的含义'],
        stem: '电压源模型与电流源模型做了正确的等效变换之后，哪一项一定相同？',
        options: ABCD([
          '端口上的电压、电流，从而负载的电压和电流相同',
          '内阻上消耗的功率一定相同',
          '理想电压源和理想电流源发出的功率一定相同',
          '电源内部每一条支路的电流一定相同',
        ]),
        answer: 'A',
        model: 'A。等效只保证端口外特性相同。',
        rule: '内部电阻从串联改成并联以后，内部电流一般会变，功率可以不同；端口以外的响应不变。',
        example: '同一个负载上测到的电压，在两种等效模型里应当一样；拆开电源盒子看内部发热，可以不一样。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 5,
    title: '网孔电流法',
    goals: [
      '会为平面电路选择网孔电流，并判断公共支路的方向。',
      '会写自阻为正、互阻为负的网孔方程。',
      '能由网孔电流还原支路电流，并用功率核对结果。',
    ],
    sections: [
      {
        title: '网孔电流是一组独立未知量',
        blocks: [
          {
            type: 'p',
            text: '网孔是平面电路里不再套别的回路的那些小回路。给每个网孔设一个电流，支路电流就能用它们相加或相减得到。未知量的个数等于网孔数，通常比支路电流少。',
          },
          { type: 'diagram', id: 'circuit-mesh', caption: '两个网孔电流都取顺时针时，公共支路上的电流是 i1 − i2。' },
          {
            type: 'p',
            text: '本课约定：网孔电流一律顺时针。公共支路上，两个顺时针电流方向相反，所以该支路电流取 $i_1 - i_2$（与 $i_1$ 同向为正）。',
          },
        ],
      },
      {
        title: '自阻、互阻和方程右边',
        blocks: [
          {
            type: 'p',
            text: '沿本网孔电流的方向走一圈，写出 KVL。本网孔电流在自己经过的所有电阻上产生压降，这些电阻之和叫自阻，系数为正。相邻网孔电流在公共电阻上的方向与本网孔相反，互阻取负号。',
          },
          { type: 'formula', tex: '(R_1 + R_3)\\, i_1 - R_3\\, i_2 = U_s' },
          {
            type: 'ul',
            items: [
              '右边是沿网孔方向的电位升。从电源负极走到正极，该电源为正；从正极走到负极，则为负。',
              '没有电源的网孔，右边写 0，不能把互阻项漏掉。',
              '电流源所在支路没有“电阻压降”可写，网孔法要改用超网孔。本节的练习都不用超网孔。',
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '方向必须从头用到尾',
            text: '网孔电流方向一旦选定，自阻、互阻、电源符号和最后还原支路电流，都要沿用这个方向。中途把某一个网孔改成逆时针，互阻的符号会跟着变。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：两个网孔都是 1 Ω',
        body: [
          {
            type: 'p',
            text: '左上网孔电阻 $R_1 = 1\\,\\Omega$，右上 $R_2 = 1\\,\\Omega$，公共支路 $R_3 = 1\\,\\Omega$。只有左网孔有电压源 $U_s = 6\\,\\mathrm{V}$，沿 $i_1$ 为电位升。$i_1$、$i_2$ 都顺时针。求两个网孔电流和公共支路电流。',
          },
        ],
        solution: [
          { type: 'p', text: '方程：$(1+1) i_1 - 1 \\cdot i_2 = 6$，$-1 \\cdot i_1 + (1+1) i_2 = 0$。即 $2 i_1 - i_2 = 6$，$-i_1 + 2 i_2 = 0$。' },
          { type: 'p', text: '由第二式 $i_1 = 2 i_2$，代入第一式 $4 i_2 - i_2 = 6$，$i_2 = 2\\,\\mathrm{A}$，$i_1 = 4\\,\\mathrm{A}$。' },
          { type: 'p', text: '公共支路与 $i_1$ 同向的电流为 $4 - 2 = 2\\,\\mathrm{A}$。电源发出 $6 \\times 4 = 24\\,\\mathrm{W}$；三只电阻吸收 $16 + 4 + 4 = 24\\,\\mathrm{W}$。' },
        ],
      },
      {
        title: '示范 2：公共电阻较大',
        body: [
          {
            type: 'p',
            text: '$R_1 = 2\\,\\Omega$，$R_2 = 3\\,\\Omega$，$R_3 = 6\\,\\Omega$，左网孔电源 $12\\,\\mathrm{V}$，沿顺时针 $i_1$ 为电位升。求 $i_1$、$i_2$。',
          },
        ],
        solution: [
          { type: 'p', text: '$(2+6) i_1 - 6 i_2 = 12$，$-6 i_1 + (3+6) i_2 = 0$。化简得 $4 i_1 - 3 i_2 = 6$，$-2 i_1 + 3 i_2 = 0$。' },
          { type: 'p', text: '两式相加：$2 i_1 = 6$，所以 $i_1 = 3\\,\\mathrm{A}$。再由 $3 i_2 = 2 i_1$ 得 $i_2 = 2\\,\\mathrm{A}$。' },
          { type: 'p', text: '公共支路电流 $3 - 2 = 1\\,\\mathrm{A}$，其电压为 $6 \\times 1 = 6\\,\\mathrm{V}$。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir5-b1',
        kp: ['网孔电流法'],
        prompt: [
          {
            type: 'p',
            text: '两网孔电路：$R_1 = R_2 = R_3 = 2\\,\\Omega$，只有左网孔有 $12\\,\\mathrm{V}$ 电源，沿顺时针 $i_1$ 为电位升。$i_2$ 也取顺时针。求 $i_1$ 和 $i_2$。',
          },
        ],
        numbers: [
          { id: 'i1', label: 'i1', expected: 4, unit: 'A' },
          { id: 'i2', label: 'i2', expected: 2, unit: 'A' },
        ],
        model: 'i1 = 4 A，i2 = 2 A。',
        rule: '$(R_1+R_3)i_1 - R_3 i_2 = U_s$，$-R_3 i_1 + (R_2+R_3)i_2 = 0$。',
        example: '三只电阻都是 1 Ω、左网孔电源 6 V 时，i1 = 4 A，i2 = 2 A。',
      }),
      choiceQuestion({
        id: 'cir5-b2',
        kp: ['网孔电流法'],
        stem: '两个网孔电流都取顺时针时，公共电阻上的互阻系数应取什么符号？',
        options: ABCD(['负号', '正号', '一定是零', '与电阻值是否大于 1 Ω 有关']),
        answer: 'A',
        model: 'A。两个顺时针电流在公共支路上方向相反，互阻为负。',
        rule: '自阻为正。互阻的符号由两个网孔电流在公共支路上是否相反决定。',
        example: '若把右网孔改成逆时针，而左网孔仍顺时针，公共支路上两者同向，互阻就要改成正号。',
      }),
      numericQuestion({
        id: 'cir5-b3',
        kp: ['网孔电流法'],
        prompt: [{ type: 'p', text: '两个网孔电流都是顺时针，$i_1 = 5\\,\\mathrm{A}$，$i_2 = 2\\,\\mathrm{A}$。求公共支路上与 $i_1$ 同向的电流。' }],
        numbers: [{ id: 'i3', label: '公共支路电流', expected: 3, unit: 'A' }],
        model: '公共支路电流为 3 A，方向与 i1 相同。',
        rule: '都顺时针时，与 i1 同向的公共支路电流是 i1 − i2。',
        example: 'i1 = 4 A、i2 = 4 A 时，公共支路电流为 0。',
      }),
      keywordQuestion({
        id: 'cir5-b4',
        kp: ['网孔电流法'],
        prompt: [{ type: 'p', text: '网孔方程里，自阻和互阻（两网孔电流都顺时针）各取什么符号？各用几个字说明。' }],
        fields: [
          {
            id: 'self',
            label: '自阻的符号',
            textarea: false,
            groups: [['正', '加']],
          },
          {
            id: 'mutual',
            label: '互阻的符号',
            textarea: false,
            groups: [['负', '减']],
          },
        ],
        model: '自阻为正，互阻为负。',
        rule: '自阻是本网孔电流经过的电阻之和，写正号；都顺时针时互阻写负号。',
        example: '自阻 4 Ω、互阻 1 Ω 时，左上角系数是 +4，公共电阻对应的系数是 −1。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir5-a1',
        kp: ['网孔电流法'],
        prompt: [
          {
            type: 'p',
            text: '$R_1 = R_2 = R_3 = 2\\,\\Omega$。左网孔电源 $10\\,\\mathrm{V}$、右网孔电源 $4\\,\\mathrm{V}$，二者正极都在上方。$i_1$、$i_2$ 都顺时针，因此两个电源沿各自主网孔方向都是电位升。求 $i_1$、$i_2$。',
          },
        ],
        numbers: [
          { id: 'i1', label: 'i1', expected: 4, unit: 'A' },
          { id: 'i2', label: 'i2', expected: 3, unit: 'A' },
        ],
        model: 'i1 = 4 A，i2 = 3 A。',
        rule: '$4 i_1 - 2 i_2 = 10$，$-2 i_1 + 4 i_2 = 4$。电源沿网孔方向从负极走到正极时，写在右边为正。',
        example: '若右边电源改为 0，方程右边第二式为 0，公共电阻仍以负号进入两个方程。',
      }),
      numericQuestion({
        id: 'cir5-a2',
        kp: ['网孔电流法'],
        prompt: [
          {
            type: 'p',
            text: '$R_1 = 4\\,\\Omega$，$R_2 = 2\\,\\Omega$，$R_3 = 4\\,\\Omega$，只有左网孔有 $16\\,\\mathrm{V}$，沿顺时针 $i_1$ 为电位升。求 $i_1$ 与 $i_2$。',
          },
        ],
        numbers: [
          { id: 'i1', label: 'i1', expected: 3, unit: 'A' },
          { id: 'i2', label: 'i2', expected: 2, unit: 'A' },
        ],
        model: 'i1 = 3 A，i2 = 2 A。公共支路电流为 1 A。',
        rule: '$(4+4)i_1 - 4 i_2 = 16$，$-4 i_1 + (2+4)i_2 = 0$。',
        example: '公共支路电压再用 $R_3(i_1 - i_2)$ 计算，方向与 i1 在该支路上的方向一致。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 6,
    title: '节点电压法',
    goals: [
      '会选定参考节点，并把其余节点电压当作未知量。',
      '会写自导为正、互导为负的节点方程。',
      '会处理“一端接参考节点”的理想电压源。',
    ],
    sections: [
      {
        title: '未知量改成节点电压',
        blocks: [
          {
            type: 'p',
            text: '选一个参考节点，规定它的电位为 0。其他节点相对参考节点的电压，就是节点电压。支路电压等于两端节点电压之差，因此只要节点电压求出来，支路电流可以用欧姆定律写出来。',
          },
          { type: 'diagram', id: 'circuit-node', caption: '上方两个独立节点，下方为参考节点。电导接在节点与参考节点之间。' },
          {
            type: 'p',
            text: '对每个独立节点写 KCL。本课把流入该节点的电流源记在方程右边，经电导离开节点的电流写在左边。',
          },
        ],
      },
      {
        title: '自导和互导',
        blocks: [
          { type: 'formula', tex: '(G_1 + G_{12}) v_1 - G_{12} v_2 = I_{s1}' },
          {
            type: 'ul',
            items: [
              '自导：与该节点相连的所有电导之和，系数为正。',
              '互导：两个节点之间的电导，系数为负。因为相邻节点电压升高时，电流会从本节点流走得少一些。',
              '电导 $G = 1 / R$。方程也可以全部写成电阻形式，但两边要同时处理，不要只把其中一个 $R$ 写成 $G$。',
              '若某节点通过理想电压源接到参考节点，这个节点电压已知，不必再对它列 KCL。',
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: '和网孔法怎么选',
            text: '网孔少就用网孔电流，独立节点少就用节点电压。电流源多的电路，节点法通常更直接，因为电流源正好写在方程右边。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：一个电流源、三只相等电阻',
        body: [
          {
            type: 'p',
            text: '节点 1、节点 2 到参考节点的电阻都是 $2\\,\\Omega$，两节点之间也是 $2\\,\\Omega$。只有 $3\\,\\mathrm{A}$ 电流源流入节点 1。求 $v_1$、$v_2$。',
          },
        ],
        solution: [
          { type: 'p', text: '节点 1：$v_1 / 2 + (v_1 - v_2) / 2 = 3$。节点 2：$v_2 / 2 + (v_2 - v_1) / 2 = 0$。' },
          { type: 'p', text: '同乘 2：$2 v_1 - v_2 = 6$，$-v_1 + 2 v_2 = 0$。于是 $v_1 = 2 v_2$，代入得 $4 v_2 - v_2 = 6$，$v_2 = 2\\,\\mathrm{V}$，$v_1 = 4\\,\\mathrm{V}$。' },
          { type: 'p', text: '核对：离开节点 1 的电流为 $4/2 + (4-2)/2 = 3\\,\\mathrm{A}$，正好等于电流源。' },
        ],
      },
      {
        title: '示范 2：一个节点电压已知',
        body: [
          {
            type: 'p',
            text: '理想电压源把节点 1 固定为 $v_1 = 10\\,\\mathrm{V}$。节点 1 与节点 2 之间为 $2\\,\\Omega$，节点 2 到参考节点为 $3\\,\\Omega$。求 $v_2$，以及从节点 1 流向节点 2 的电流。',
          },
        ],
        solution: [
          { type: 'p', text: '节点 1 不再未知。对节点 2：$(v_2 - 10) / 2 + v_2 / 3 = 0$。' },
          { type: 'p', text: '同乘 6：$3(v_2 - 10) + 2 v_2 = 0$，$5 v_2 = 30$，$v_2 = 6\\,\\mathrm{V}$。' },
          { type: 'p', text: '支路电流 $(10 - 6) / 2 = 2\\,\\mathrm{A}$，方向从节点 1 到节点 2。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir6-b1',
        kp: ['节点电压法'],
        prompt: [
          {
            type: 'p',
            text: '节点 1、节点 2 到参考节点以及两节点之间的电阻都是 $4\\,\\Omega$。$6\\,\\mathrm{A}$ 流入节点 1，节点 2 没有电流源。求 $v_1$、$v_2$。',
          },
        ],
        numbers: [
          { id: 'v1', label: 'v1', expected: 16, unit: 'V' },
          { id: 'v2', label: 'v2', expected: 8, unit: 'V' },
        ],
        model: 'v1 = 16 V，v2 = 8 V。',
        rule: '$v_1/4 + (v_1-v_2)/4 = 6$，另一节点右边为 0。自导为正、互导为负。',
        example: '三只电阻都是 2 Ω、3 A 流入节点 1 时，v1 = 4 V，v2 = 2 V。',
      }),
      choiceQuestion({
        id: 'cir6-b2',
        kp: ['节点电压法'],
        stem: '节点方程按“流出电导的电流写在左边”来列时，右边的电流源怎样取号？',
        options: ABCD([
          '流入该节点为正',
          '流出该节点为正',
          '一律取绝对值',
          '与电导的单位有关',
        ]),
        answer: 'A',
        model: 'A。本课约定：流入节点的电流源写在右边，取正号。',
        rule: '左边是离开节点、经过电导的电流，右边是流入节点的电流源。两边必须用同一套符号约定。',
        example: '2 A 从节点流出而没有别的电流源时，方程右边应写 −2 A。',
      }),
      numericQuestion({
        id: 'cir6-b3',
        kp: ['节点电压法', '欧姆定律'],
        prompt: [{ type: 'p', text: '已求得 $v_1 = 9\\,\\mathrm{V}$，$v_2 = 3\\,\\mathrm{V}$，两节点之间的电阻为 $6\\,\\Omega$。求从节点 1 流向节点 2 的电流。' }],
        numbers: [{ id: 'i', label: '电流', expected: 1, unit: 'A' }],
        model: '电流为 1 A，从节点 1 流向节点 2。',
        rule: '支路电流 $(v_1 - v_2) / R$。',
        example: '两端电压差为 10 V、电阻 5 Ω 时，电流为 2 A。',
      }),
      numericQuestion({
        id: 'cir6-b4',
        kp: ['电导'],
        prompt: [{ type: 'p', text: '电阻 $R = 2\\,\\Omega$。求它的电导 $G$。' }],
        numbers: [{ id: 'g', label: '电导 G', expected: 0.5, unit: 'S' }],
        model: 'G = 0.5 S。',
        rule: '$G = 1 / R$。节点方程中的系数是电导，不是电阻。',
        example: '4 Ω 的电导是 0.25 S。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir6-a1',
        kp: ['节点电压法'],
        prompt: [
          {
            type: 'p',
            text: '三只电阻仍都是 $2\\,\\Omega$。$4\\,\\mathrm{A}$ 流入节点 1，$1\\,\\mathrm{A}$ 流入节点 2。求 $v_1$、$v_2$。',
          },
        ],
        numbers: [
          { id: 'v1', label: 'v1', expected: 6, unit: 'V' },
          { id: 'v2', label: 'v2', expected: 4, unit: 'V' },
        ],
        model: 'v1 = 6 V，v2 = 4 V。',
        rule: '$v_1/2 + (v_1-v_2)/2 = 4$，$v_2/2 + (v_2-v_1)/2 = 1$。',
        example: '若两个电流源相等且电阻对称，两个节点电压也会相等。',
      }),
      numericQuestion({
        id: 'cir6-a2',
        kp: ['节点电压法'],
        prompt: [
          {
            type: 'p',
            text: '理想电压源使 $v_1 = 8\\,\\mathrm{V}$。节点 1 与节点 2 之间、节点 2 与参考节点之间各有 $4\\,\\Omega$。求 $v_2$，以及电压源送出的电流（节点 1 只连接电压源和这只 $4\\,\\Omega$）。',
          },
        ],
        numbers: [
          { id: 'v2', label: 'v2', expected: 4, unit: 'V' },
          { id: 'i', label: '电压源送出的电流', expected: 1, unit: 'A' },
        ],
        model: 'v2 = 4 V，电压源送出 1 A。',
        rule: '对未知节点列 KCL：$(v_2 - 8)/4 + v_2/4 = 0$。电压源电流等于离开节点 1 的电阻电流。',
        example: '若 v1 = 10 V，两只电阻为 2 Ω 与 3 Ω，则 v2 = 6 V。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 7,
    title: '叠加定理',
    goals: [
      '会一次只保留一个独立源，把其余独立源置零。',
      '知道电压源置零是短路，电流源置零是开路。',
      '知道电压、电流可以叠加，功率不能叠加；受控源必须保留。',
    ],
    sections: [
      {
        title: '一次只让一个独立源工作',
        blocks: [
          {
            type: 'p',
            text: '线性电路里，每个独立源都会单独产生一套响应。总响应等于这些响应的代数和。计算某一个独立源的贡献时，其他独立电压源用短路代替，其他独立电流源用开路代替，所有电阻留在原地。',
          },
          { type: 'diagram', id: 'circuit-superposition', caption: 'Us 单独作用时电流源开路；Is 单独作用时电压源短路；最后把响应相加。受控源不要置零。' },
          { type: 'formula', tex: 'u = u\' + u\'\'' },
          {
            type: 'ul',
            items: [
              '短路表示两端电压被强制为 0，导线还在，电流仍可通过。',
              '开路表示该支路电流被强制为 0，不能再把电流源两端用导线连起来。',
              '每个分电路里都要重新规定响应的参考方向，与总电路一致；方向相反的分响应以负号加入。',
            ],
          },
        ],
      },
      {
        title: '什么不能叠加',
        blocks: [
          {
            type: 'compare',
            leftTitle: '可以叠加',
            left: ['支路电压', '支路电流', '节点电压'],
            rightTitle: '不能直接叠加',
            right: ['功率', '能量', '电压或电流的平方'],
          },
          {
            type: 'p',
            text: '功率是电压与电流的乘积，乘积对电源不是线性运算。正确做法是先叠加得到总电压和总电流，再计算功率。',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '受控源不是独立源',
            text: '受控电压源、受控电流源依赖电路里的电压或电流，不能置零，也不能单独当作一个“可叠加的源”。每个分电路里都要保留受控源和它的控制量。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：电压源与电流源方向一致',
        body: [
          {
            type: 'p',
            text: '$U_s = 12\\,\\mathrm{V}$ 与 $R_1 = 4\\,\\Omega$ 串联后接到 $R_2 = 4\\,\\Omega$ 两端。电流源 $I_s = 1\\,\\mathrm{A}$ 与 $R_2$ 并联，箭头指向 $R_2$ 上端。求 $R_2$ 上端相对下端的电压。',
          },
        ],
        solution: [
          { type: 'p', text: '只留电压源，电流源开路：$u\' = 12 \\times 4 / (4 + 4) = 6\\,\\mathrm{V}$。' },
          { type: 'p', text: '只留电流源，电压源短路：$R_1 \\parallel R_2 = 2\\,\\Omega$，$u\'\' = 1 \\times 2 = 2\\,\\mathrm{V}$，极性与 $u\'$ 相同。' },
          { type: 'p', text: '$u = 6 + 2 = 8\\,\\mathrm{V}$。节点方程 $(u - 12)/4 + u/4 = 1$ 也能得到 $u = 8\\,\\mathrm{V}$。' },
        ],
      },
      {
        title: '示范 2：电流源反向',
        body: [
          {
            type: 'p',
            text: '电路与示范 1 相同，只把电流源箭头改成离开 $R_2$ 上端。求 $R_2$ 电压。',
          },
        ],
        solution: [
          { type: 'p', text: '电压源单独作用仍得 $u\' = 6\\,\\mathrm{V}$。电流源单独作用时极性相反，$u\'\' = -2\\,\\mathrm{V}$。' },
          { type: 'p', text: '$u = 6 + (-2) = 4\\,\\mathrm{V}$。叠加时必须带着符号，不能把两个电压的绝对值相加。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir7-b1',
        kp: ['叠加定理'],
        prompt: [
          {
            type: 'p',
            text: '$U_s = 20\\,\\mathrm{V}$ 与 $R_1 = 5\\,\\Omega$ 串联后接到 $R_2 = 5\\,\\Omega$。$I_s = 2\\,\\mathrm{A}$ 与 $R_2$ 并联并指向 $R_2$ 上端。求电压源单独产生的 $u\'$、电流源单独产生的 $u\'\'$，以及总电压 $u$。',
          },
        ],
        numbers: [
          { id: 'up', label: "u'", expected: 10, unit: 'V' },
          { id: 'upp', label: "u''", expected: 5, unit: 'V' },
          { id: 'u', label: '总电压 u', expected: 15, unit: 'V' },
        ],
        model: "u' = 10 V，u'' = 5 V，u = 15 V。",
        rule: '电流源置零是开路，电压源置零是短路。$R_1 \\parallel R_2 = 2.5\\,\\Omega$，$u\'\' = I_s (R_1 \\parallel R_2)$。',
        example: '12 V、两只 4 Ω、1 A 流入上端时，分电压是 6 V 与 2 V，总和 8 V。',
      }),
      choiceQuestion({
        id: 'cir7-b2',
        kp: ['叠加定理', '受控源'],
        stem: '用叠加定理时，电路里的受控源应当怎样处理？',
        options: ABCD([
          '每个分电路都保留',
          '和独立电压源一样用短路代替',
          '和独立电流源一样用开路代替',
          '只在最后一个分电路里保留',
        ]),
        answer: 'A',
        model: 'A。受控源必须保留，置零的只有独立源。',
        rule: '叠加定理针对独立源。受控源依赖电路变量，属于线性电路的一部分。',
        example: '含有 $0.2 u$ 受控源的电路，分成两个独立源分别作用时，受控源两次都要出现。',
      }),
      numericQuestion({
        id: 'cir7-b3',
        kp: ['叠加定理', '功率'],
        prompt: [
          { type: 'p', text: '某支路在两个独立源分别作用下的电流分响应为 $3\\,\\mathrm{A}$ 和 $-1\\,\\mathrm{A}$（参考方向与总电流相同）。' },
        ],
        numbers: [{ id: 'i', label: '总电流', expected: 2, unit: 'A' }],
        selects: [
          {
            id: 'power',
            label: '两个分响应各自的功率能否直接相加得到总功率',
            options: [
              { value: 'no', label: '不能' },
              { value: 'yes', label: '能' },
            ],
            expected: 'no',
          },
        ],
        model: '总电流为 2 A。功率不能把两个分响应的功率直接相加。',
        rule: '电流按代数和叠加。功率是二次量，必须用总电压和总电流计算。',
        example: '分电流 5 A 与 −2 A 的总电流是 3 A；功率要等总电流求出后再算。',
      }),
      choiceQuestion({
        id: 'cir7-b4',
        kp: ['叠加定理'],
        stem: '独立电流源置零时，它所在的位置应变成什么？',
        options: ABCD(['开路', '短路', '一只 1 Ω 电阻', '保持原电流不变']),
        answer: 'A',
        model: 'A。电流源置零意味着该支路电流为 0，所以是开路。',
        rule: '电压源置零是短路；电流源置零是开路。二者不要记反。',
        example: '去掉一个并联在电阻两端的电流源时，是把电流源支路断开，不是把电阻短路。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir7-a1',
        kp: ['叠加定理'],
        prompt: [
          {
            type: 'p',
            text: '仍是 $U_s = 20\\,\\mathrm{V}$、$R_1 = R_2 = 5\\,\\Omega$、$I_s = 2\\,\\mathrm{A}$ 指向上端。取 $R_1$ 中从电源正极流向 $R_2$ 上端为正方向。求电压源单独产生的电流、电流源单独产生的电流，以及总电流。',
          },
        ],
        numbers: [
          { id: 'ip', label: '电压源单独作用的电流', expected: 2, unit: 'A' },
          { id: 'ipp', label: '电流源单独作用的电流', expected: -1, unit: 'A' },
          { id: 'i', label: '总电流', expected: 1, unit: 'A' },
        ],
        model: '分电流为 2 A 和 −1 A，总电流 1 A。',
        rule: '电压源单独作用时两电阻串联，电流为 $U_s/(R_1+R_2)$。电流源单独作用且两电阻相等时，R1 分到一半电流，方向与所取正方向相反。',
        example: '12 V、两只 4 Ω、1 A 指向上端时，R1 的分电流是 1.5 A 与 −0.5 A，总和 1 A。',
      }),
      numericQuestion({
        id: 'cir7-a2',
        kp: ['叠加定理'],
        prompt: [
          {
            type: 'p',
            text: '$U_s = 24\\,\\mathrm{V}$ 与 $R_1 = 6\\,\\Omega$ 串联后接到 $R_2 = 3\\,\\Omega$。$I_s = 2\\,\\mathrm{A}$ 与 $R_2$ 并联并指向上端。求 $R_2$ 的电压，以及向下流过 $R_2$ 的电流。',
          },
        ],
        numbers: [
          { id: 'u', label: 'R2 电压', expected: 12, unit: 'V' },
          { id: 'i', label: 'R2 电流', expected: 4, unit: 'A' },
        ],
        model: 'R2 电压 12 V，电流 4 A。',
        rule: "电压源单独作用：$u' = 24 \\times 3/9 = 8\\,\\mathrm{V}$。电流源单独作用：$6 \\parallel 3 = 2\\,\\Omega$，$u'' = 4\\,\\mathrm{V}$。",
        example: '用节点法核对：$(u-24)/6 + u/3 = 2$，解得 u = 12 V。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 8,
    title: '戴维南定理与诺顿定理',
    goals: [
      '会求含源二端网络的开路电压和等效电阻。',
      '会在戴维南模型和诺顿模型之间换算。',
      '会把等效电路接到负载上，求出负载的电压和电流。',
    ],
    sections: [
      {
        title: '把含源网络收成两只元件',
        blocks: [
          {
            type: 'p',
            text: '对负载来说，一个由独立源和电阻组成的二端网络，可以收成“开路电压 $U_{oc}$ 串联等效电阻 $R_{eq}$”。这就是戴维南等效。也可以收成“短路电流 $I_{sc}$ 并联同一只 $R_{eq}$”，这是诺顿等效。',
          },
          { type: 'diagram', id: 'circuit-thevenin', caption: '端口 a、b 左侧的含源网络，等效成 Uoc 与 Req 串联。' },
          { type: 'formula', tex: 'R_{eq} = U_{oc} / I_{sc}, \\qquad U_{oc} = I_{sc} R_{eq}' },
          {
            type: 'ol',
            items: [
              '开路电压：移走负载，求端口两端电压，极性一起记下。',
              '等效电阻：独立电压源短路、独立电流源开路，再从端口看进去。受控源如果存在，必须保留。',
              '短路电流：把端口短接，求短路线上的电流。它等于诺顿电流。',
            ],
          },
        ],
      },
      {
        title: '等效电阻的两种算法',
        blocks: [
          {
            type: 'p',
            text: '网络里只有独立源和电阻时，置零后往往能直接串并联。网络里还有受控源时，置零独立源之后端口可能既没有独立源、又不能只用串并联，这时用 $R_{eq} = U_{oc} / I_{sc}$，或者在端口外加测试电源。',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '负载不要算进 Req',
            text: '等效电阻是“网络内部”从端口看进去的电阻。负载是接在端口外面的，求 $U_{oc}$ 和 $R_{eq}$ 时都先把负载拿掉。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：开路、短路互相核对',
        body: [
          {
            type: 'p',
            text: '$U_s = 12\\,\\mathrm{V}$ 与 $R_1 = 2\\,\\Omega$ 串联，端口上还跨接着 $R_2 = 2\\,\\Omega$。求戴维南等效，并用短路电流核对 $R_{eq}$。',
          },
        ],
        solution: [
          { type: 'p', text: '端口开路时，电流仍流过 $R_1$ 与 $R_2$：$I = 12 / 4 = 3\\,\\mathrm{A}$，$U_{oc} = 3 \\times 2 = 6\\,\\mathrm{V}$。' },
          { type: 'p', text: '电压源短路后，$R_1 \\parallel R_2 = 1\\,\\Omega$，所以 $R_{eq} = 1\\,\\Omega$。' },
          { type: 'p', text: '端口短路时 $R_2$ 被短接，$I_{sc} = 12 / 2 = 6\\,\\mathrm{A}$。$U_{oc} / I_{sc} = 6 / 6 = 1\\,\\Omega$，与串并联结果一致。' },
        ],
      },
      {
        title: '示范 2：接上负载',
        body: [
          {
            type: 'p',
            text: '$U_s = 24\\,\\mathrm{V}$，$R_1 = 6\\,\\Omega$ 与端口串联，$R_2 = 3\\,\\Omega$ 跨在端口上。先求等效，再接 $R_L = 2\\,\\Omega$，求负载电流和电压。',
          },
        ],
        solution: [
          { type: 'p', text: '$U_{oc} = 24 \\times 3 / 9 = 8\\,\\mathrm{V}$。置零后 $6 \\parallel 3 = 2\\,\\Omega$。$I_{sc} = 24 / 6 = 4\\,\\mathrm{A}$，也可得 $R_{eq} = 8 / 4 = 2\\,\\Omega$。' },
          { type: 'p', text: '接上负载：$I_L = 8 / (2 + 2) = 2\\,\\mathrm{A}$，$u_L = 4\\,\\mathrm{V}$。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir8-b1',
        kp: ['戴维南定理'],
        prompt: [
          {
            type: 'p',
            text: '$18\\,\\mathrm{V}$ 与 $6\\,\\Omega$ 串联，端口跨接 $3\\,\\Omega$。求开路电压 $U_{oc}$ 和等效电阻 $R_{eq}$。',
          },
        ],
        numbers: [
          { id: 'uoc', label: 'Uoc', expected: 6, unit: 'V' },
          { id: 'req', label: 'Req', expected: 2, unit: 'Ω' },
        ],
        model: 'Uoc = 6 V，Req = 2 Ω。',
        rule: '开路电压用分压。Req 在独立源置零后由串并联得到：$6 \\parallel 3 = 2\\,\\Omega$。',
        example: '12 V、两只 2 Ω 按同样接法，Uoc = 6 V，Req = 1 Ω。',
      }),
      numericQuestion({
        id: 'cir8-b2',
        kp: ['戴维南定理'],
        prompt: [{ type: 'p', text: '某个端口的 $U_{oc} = 6\\,\\mathrm{V}$，$R_{eq} = 2\\,\\Omega$。接上 $R_L = 2\\,\\Omega$ 后，求负载电流。' }],
        numbers: [{ id: 'il', label: '负载电流', expected: 1.5, unit: 'A' }],
        model: '负载电流为 1.5 A。',
        rule: '$I_L = U_{oc} / (R_{eq} + R_L)$。',
        example: '开路电压 10 V、等效电阻 5 Ω，接 5 Ω 时电流为 1 A。',
      }),
      choiceQuestion({
        id: 'cir8-b3',
        kp: ['戴维南定理'],
        stem: '求 Req 时，网络内部的独立源和受控源应怎样处理？',
        options: ABCD([
          '独立源置零，受控源保留',
          '独立源和受控源全部置零',
          '只把受控源置零',
          '电源都保留，只拿走电阻',
        ]),
        answer: 'A',
        model: 'A。独立电压源短路、独立电流源开路，受控源保留。',
        rule: 'Req 是无独立源、但从端口看进去的等效电阻。受控源仍会约束端口。',
        example: '含受控源时，若串并联不再适用，可用 Uoc / Isc 求 Req。',
      }),
      numericQuestion({
        id: 'cir8-b4',
        kp: ['诺顿定理'],
        prompt: [{ type: 'p', text: '上一题的网络：$18\\,\\mathrm{V}$ 与 $6\\,\\Omega$ 串联，端口跨接 $3\\,\\Omega$。求端口短路电流，也就是诺顿电流。' }],
        numbers: [{ id: 'isc', label: 'Isc', expected: 3, unit: 'A' }],
        model: 'Isc = 3 A。',
        rule: '端口短路后，跨接的 3 Ω 不起作用，短路电流等于 $U_s / R_1$。也可用 $I_{sc} = U_{oc} / R_{eq}$。',
        example: 'Uoc = 8 V、Req = 2 Ω 时，诺顿电流是 4 A。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir8-a1',
        kp: ['戴维南定理', '功率'],
        prompt: [{ type: 'p', text: '已知 $U_{oc} = 12\\,\\mathrm{V}$，$R_{eq} = 4\\,\\Omega$。求诺顿电流，以及 $R_L = 4\\,\\Omega$ 时负载吸收的功率。' }],
        numbers: [
          { id: 'in', label: '诺顿电流', expected: 3, unit: 'A' },
          { id: 'p', label: '负载功率', expected: 9, unit: 'W' },
        ],
        model: '诺顿电流 3 A，负载功率 9 W。',
        rule: '$I_N = U_{oc}/R_{eq}$。负载电流 $I_L = 12/8 = 1.5\\,\\mathrm{A}$，功率 $I_L^2 R_L$。',
        example: 'Uoc = 10 V、Req = 5 Ω、RL = 5 Ω 时，负载电流 1 A，功率 5 W。',
      }),
      numericQuestion({
        id: 'cir8-a2',
        kp: ['戴维南定理', '诺顿定理'],
        prompt: [{ type: 'p', text: '测得某电阻网络端口开路电压 $10\\,\\mathrm{V}$、短路电流 $2\\,\\mathrm{A}$。求 $R_{eq}$，以及接 $5\\,\\Omega$ 负载时的负载电流。' }],
        numbers: [
          { id: 'req', label: 'Req', expected: 5, unit: 'Ω' },
          { id: 'il', label: '负载电流', expected: 1, unit: 'A' },
        ],
        model: 'Req = 5 Ω，负载电流 1 A。',
        rule: '$R_{eq} = U_{oc} / I_{sc}$，然后 $I_L = U_{oc} / (R_{eq} + R_L)$。',
        example: '开路 6 V、短路 3 A 时，Req = 2 Ω。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 9,
    title: '最大功率传输',
    goals: [
      '知道负载电阻等于戴维南等效电阻时功率最大。',
      '会计算 $P_{\\max} = U_{oc}^2 / (4 R_{eq})$。',
      '能区分“负载可调”和“内阻也可调”这两种不同问题。',
    ],
    sections: [
      {
        title: '负载可变时的最大功率',
        blocks: [
          {
            type: 'p',
            text: '把前面的含源网络已经收成 $U_{oc}$ 串联 $R_{eq}$。负载 $R_L$ 上的电流是 $U_{oc}/(R_{eq}+R_L)$，功率是电流的平方再乘 $R_L$。$R_{eq}$ 固定、只允许调节 $R_L$ 时，功率在 $R_L = R_{eq}$ 处最大。',
          },
          { type: 'diagram', id: 'circuit-maxpower', caption: 'RL 调到与 Req 相等时，负载获得最大功率。' },
          { type: 'formula', tex: 'P_{\\max} = \\frac{U_{oc}^{2}}{4 R_{eq}} = \\frac{I_{sc}^{2} R_{eq}}{4}' },
          {
            type: 'p',
            text: '此时电流为 $U_{oc}/(2 R_{eq})$，负载功率与 $R_{eq}$ 上的功率相等。若只看这个等效电源，$U_{oc}$ 发出的功率有一半交给负载，效率是 50%。这不等于发电厂的效率，因为 $R_{eq}$ 往往是不能拿去“发电”的内阻。',
          },
        ],
      },
      {
        title: '不要和另一种调节方式混在一起',
        blocks: [
          {
            type: 'callout',
            tone: 'note',
            title: '谁是变量',
            text: '最大功率传输定理里，变量是负载。若内阻也能减小，负载拿到的功率还会继续增加，那是另一个问题。做题时先看清“哪一只电阻允许改变”。',
          },
          {
            type: 'p',
            text: '交流电路里若等效阻抗还有电抗，电阻部分仍要等于负载电阻，电抗还要与负载电抗相反，称为共轭匹配。本节先掌握纯电阻情形。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：刚好匹配',
        body: [{ type: 'p', text: '$U_{oc} = 12\\,\\mathrm{V}$，$R_{eq} = 3\\,\\Omega$，负载调到 $3\\,\\Omega$。求负载电流和功率。' }],
        solution: [
          { type: 'p', text: '总电阻 $6\\,\\Omega$，电流 $12 / 6 = 2\\,\\mathrm{A}$。' },
          { type: 'p', text: '功率 $P = 2^2 \\times 3 = 12\\,\\mathrm{W}$。公式 $P_{\\max} = 12^2 / (4 \\times 3) = 144 / 12 = 12\\,\\mathrm{W}$，一致。' },
        ],
      },
      {
        title: '示范 2：负载偏离 Req',
        body: [{ type: 'p', text: '$U_{oc} = 12\\,\\mathrm{V}$，$R_{eq} = 6\\,\\Omega$，实际负载是 $18\\,\\Omega$。求负载功率，并与最大功率比较。' }],
        solution: [
          { type: 'p', text: '电流 $12 / (6 + 18) = 0.5\\,\\mathrm{A}$，功率 $0.5^2 \\times 18 = 4.5\\,\\mathrm{W}$。' },
          { type: 'p', text: '最大功率发生在 $R_L = 6\\,\\Omega$，$P_{\\max} = 144 / 24 = 6\\,\\mathrm{W}$。现在负载偏大，功率只有 4.5 W。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir9-b1',
        kp: ['最大功率传输'],
        prompt: [{ type: 'p', text: '$U_{oc} = 8\\,\\mathrm{V}$，$R_{eq} = 2\\,\\Omega$，负载可调。求获得最大功率时的 $R_L$ 和 $P_{\\max}$。' }],
        numbers: [
          { id: 'rl', label: 'RL', expected: 2, unit: 'Ω' },
          { id: 'p', label: 'Pmax', expected: 8, unit: 'W' },
        ],
        model: 'RL = 2 Ω，Pmax = 8 W。',
        rule: '$R_L = R_{eq}$，$P_{\\max} = U_{oc}^2 / (4 R_{eq})$。',
        example: '开路电压 12 V、内阻 3 Ω 时，最大功率是 12 W。',
      }),
      numericQuestion({
        id: 'cir9-b2',
        kp: ['最大功率传输'],
        prompt: [{ type: 'p', text: '$U_{oc} = 6\\,\\mathrm{V}$，$R_{eq} = 3\\,\\Omega$。求 $P_{\\max}$。' }],
        numbers: [{ id: 'p', label: 'Pmax', expected: 3, unit: 'W' }],
        model: 'Pmax = 3 W。',
        rule: '$P_{\\max} = 6^2 / (4 \\times 3) = 3\\,\\mathrm{W}$。',
        example: 'Uoc = 10 V、Req = 5 Ω 时，Pmax = 5 W。',
      }),
      choiceQuestion({
        id: 'cir9-b3',
        kp: ['最大功率传输'],
        stem: 'Req 固定、只调节负载时，负载获得最大功率的条件是什么？',
        options: ABCD(['RL = Req', 'RL = 0', 'RL 尽量大', 'RL = 2 Req']),
        answer: 'A',
        model: 'A。RL = Req。',
        rule: '纯电阻戴维南电路中，最大功率条件是负载电阻等于等效内阻。',
        example: 'Req = 8 Ω 时，应把 RL 调到 8 Ω，而不是调到 0。RL = 0 时功率也是 0。',
      }),
      numericQuestion({
        id: 'cir9-b4',
        kp: ['最大功率传输'],
        prompt: [
          {
            type: 'p',
            text: '$U_{oc} = 16\\,\\mathrm{V}$，$R_{eq} = 4\\,\\Omega$，负载实际为 $12\\,\\Omega$。求此时负载功率，以及若能把负载改到最佳值时的最大功率。',
          },
        ],
        numbers: [
          { id: 'p', label: '当前功率', expected: 12, unit: 'W' },
          { id: 'pmax', label: '最大功率', expected: 16, unit: 'W' },
        ],
        model: '当前功率 12 W，最大功率 16 W。',
        rule: '当前电流 $U_{oc}/(R_{eq}+R_L)$，功率 $I^2 R_L$。最大功率仍用 $U_{oc}^2/(4 R_{eq})$。',
        example: '12 V 与 6 Ω 给 18 Ω 供电时，功率是 4.5 W，小于最大功率 6 W。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir9-a1',
        kp: ['最大功率传输', '效率'],
        prompt: [
          {
            type: 'p',
            text: '$U_{oc} = 20\\,\\mathrm{V}$，$R_{eq} = 5\\,\\Omega$，负载已调到最大功率点。求负载功率，以及负载功率占 $U_{oc}$ 发出功率的百分数。',
          },
        ],
        numbers: [
          { id: 'p', label: '负载功率', expected: 20, unit: 'W' },
          { id: 'eta', label: '效率', expected: 50, unit: '%' },
        ],
        model: '负载功率 20 W，效率 50%。',
        rule: '匹配时 $I = U_{oc}/(2 R_{eq})$，负载功率等于内阻功率，效率为 50%。',
        example: '匹配时若负载得到 8 W，内阻也消耗 8 W，理想电压源一共发出 16 W。',
      }),
      numericQuestion({
        id: 'cir9-a2',
        kp: ['最大功率传输', '诺顿定理'],
        prompt: [{ type: 'p', text: '诺顿模型给出 $I_{sc} = 4\\,\\mathrm{A}$，$R_{eq} = 2\\,\\Omega$。求对应的 $U_{oc}$ 和 $P_{\\max}$。' }],
        numbers: [
          { id: 'uoc', label: 'Uoc', expected: 8, unit: 'V' },
          { id: 'p', label: 'Pmax', expected: 8, unit: 'W' },
        ],
        model: 'Uoc = 8 V，Pmax = 8 W。',
        rule: '$U_{oc} = I_{sc} R_{eq}$，$P_{\\max} = I_{sc}^2 R_{eq} / 4$。',
        example: '短路电流 2 A、Req = 8 Ω 时，Uoc = 16 V，Pmax = 8 W。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 10,
    title: '电容、电感元件与储能',
    goals: [
      '会写电容、电感在关联方向下的伏安关系。',
      '会计算电容储能和电感储能。',
      '知道直流稳态下电容相当于开路、电感相当于短路。',
    ],
    sections: [
      {
        title: '三种元件各记什么',
        blocks: [
          {
            type: 'p',
            text: '电阻把电能变成热，电压和电流是代数关系。电容和电感则把能量存起来：电容存在电场里，电感存在磁场里。它们的伏安关系里出现的是变化率，所以“变化有多快”和“现在的大小”是两件事。',
          },
          { type: 'diagram', id: 'circuit-elements', caption: '电阻、电容、电感。电容电压、电感电流是状态，不能随意跳变。' },
          { type: 'formula', tex: 'i_C = C \\frac{\\mathrm{d}u_C}{\\mathrm{d}t}, \\qquad u_L = L \\frac{\\mathrm{d}i_L}{\\mathrm{d}t}' },
          {
            type: 'ul',
            items: [
              '以上两式采用关联参考方向。方向相反时要加负号，元件参数 $C$、$L$ 本身仍为正。',
              '电流有限时，电容电压不能跃变；电压有限时，电感电流不能跃变。',
              '直流且各量不再变化时，电容电流为 0，相当于开路；电感电压为 0，相当于短路。',
            ],
          },
        ],
      },
      {
        title: '储存的能量',
        blocks: [
          { type: 'formula', tex: 'w_C = \\frac{1}{2} C u_C^2, \\qquad w_L = \\frac{1}{2} L i_L^2' },
          {
            type: 'p',
            text: '储能只与当前的 $u_C$ 或 $i_L$ 有关，与电压、电流是怎样变到这个值的路径无关。为了把算术写清楚，下面的例题使用整数法的电容、电感；公式与单位为法拉、亨利时完全相同。',
          },
          {
            type: 'callout',
            tone: 'rule',
            title: '电荷和磁链',
            text: '电容电荷 $q = C u$。电压从 $u_1$ 变到 $u_2$ 时，电荷变化 $C(u_2 - u_1)$。电感磁链 $\\psi = L i$，电流变化带来磁链变化。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：电容的电流和储能',
        body: [{ type: 'p', text: '$C = 2\\,\\mathrm{F}$，电压 $u_C = 3t\\,\\mathrm{V}$。求电流；当电压升到 $3\\,\\mathrm{V}$ 时，电容储存多少能量？' }],
        solution: [
          { type: 'p', text: '$\\mathrm{d}u_C/\\mathrm{d}t = 3\\,\\mathrm{V/s}$，所以 $i_C = 2 \\times 3 = 6\\,\\mathrm{A}$。电压均匀上升时，电流是常数。' },
          { type: 'p', text: '$w_C = 0.5 \\times 2 \\times 3^2 = 9\\,\\mathrm{J}$。' },
        ],
      },
      {
        title: '示范 2：电感的电压和储能',
        body: [{ type: 'p', text: '$L = 4\\,\\mathrm{H}$，电流 $i_L = 0.5 t\\,\\mathrm{A}$。求电感电压；电流到达 $2\\,\\mathrm{A}$ 时储存多少能量？' }],
        solution: [
          { type: 'p', text: '$u_L = 4 \\times 0.5 = 2\\,\\mathrm{V}$。' },
          { type: 'p', text: '$w_L = 0.5 \\times 4 \\times 2^2 = 8\\,\\mathrm{J}$。电流到达 2 A 的时刻是 $t = 4\\,\\mathrm{s}$，能量只由电流决定。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir10-b1',
        kp: ['电容储能'],
        prompt: [{ type: 'p', text: '$C = 4\\,\\mathrm{F}$，电压 $5\\,\\mathrm{V}$。求储存的能量。' }],
        numbers: [{ id: 'w', label: '能量', expected: 50, unit: 'J' }],
        model: '能量为 50 J。',
        rule: '$w_C = C u^2 / 2$。',
        example: 'C = 2 F、u = 3 V 时，能量是 9 J。',
      }),
      numericQuestion({
        id: 'cir10-b2',
        kp: ['电感储能'],
        prompt: [{ type: 'p', text: '$L = 2\\,\\mathrm{H}$，电流 $3\\,\\mathrm{A}$。求储存的能量。' }],
        numbers: [{ id: 'w', label: '能量', expected: 9, unit: 'J' }],
        model: '能量为 9 J。',
        rule: '$w_L = L i^2 / 2$。',
        example: 'L = 4 H、i = 2 A 时，能量是 8 J。',
      }),
      numericQuestion({
        id: 'cir10-b3',
        kp: ['电容伏安关系'],
        prompt: [{ type: 'p', text: '$C = 3\\,\\mathrm{F}$，电压以 $2\\,\\mathrm{V/s}$ 的速率上升。求电容电流。' }],
        numbers: [{ id: 'i', label: '电流', expected: 6, unit: 'A' }],
        model: '电流为 6 A。',
        rule: '关联方向下 $i = C \\, \\mathrm{d}u/\\mathrm{d}t$。',
        example: '2 F 的电容若电压变化率为 3 V/s，电流是 6 A。',
      }),
      choiceQuestion({
        id: 'cir10-b4',
        kp: ['电容', '电感'],
        stem: '直流稳态、电压和电流都不再变化时，电容和电感分别相当于什么？',
        options: ABCD(['电容开路，电感短路', '电容短路，电感开路', '两者都开路', '两者都短路']),
        answer: 'A',
        model: 'A。电容电流为零，相当于开路；电感电压为零，相当于短路。',
        rule: '变化率为零时，$i_C = 0$，$u_L = 0$。这只用于稳态，换路瞬间不能这样替换。',
        example: '直流充电结束以后，电容支路不再有电流，电源电压全部留在电容上。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir10-a1',
        kp: ['电感伏安关系', '电感储能'],
        prompt: [{ type: 'p', text: '$L = 0.5\\,\\mathrm{H}$，电流变化率为 $4\\,\\mathrm{A/s}$。求电感电压；当电流为 $8\\,\\mathrm{A}$ 时，求储能。' }],
        numbers: [
          { id: 'u', label: '电压', expected: 2, unit: 'V' },
          { id: 'w', label: '能量', expected: 16, unit: 'J' },
        ],
        model: '电压 2 V，能量 16 J。',
        rule: '$u = L \\, \\mathrm{d}i/\\mathrm{d}t$，$w = L i^2 / 2$。',
        example: 'L = 4 H、di/dt = 0.5 A/s 时，电压是 2 V。',
      }),
      numericQuestion({
        id: 'cir10-a2',
        kp: ['电容', '电荷', '储能'],
        prompt: [{ type: 'p', text: '$C = 5\\,\\mathrm{F}$，电压从 $2\\,\\mathrm{V}$ 升到 $6\\,\\mathrm{V}$。求电荷的增加量，以及储能的增加量。' }],
        numbers: [
          { id: 'q', label: '电荷增加量', expected: 20, unit: 'C' },
          { id: 'w', label: '能量增加量', expected: 80, unit: 'J' },
        ],
        model: '电荷增加 20 C，能量增加 80 J。',
        rule: '$\\Delta q = C \\Delta u$。能量用末状态减初状态：$C(u_2^2 - u_1^2)/2$。',
        example: '2 F 的电容从 0 V 充到 3 V，电荷增加 6 C，能量增加到 9 J。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 11,
    title: '一阶电路与三要素法',
    goals: [
      '会判断换路后的初始值，区分不能跃变的量和可以跃变的量。',
      '会在直流稳态下把电容看成开路、把电感看成短路，求出稳态值。',
      '会用时间常数把初始值和稳态值写成完整响应。',
    ],
    sections: [
      {
        title: '一阶电路只需要三个数',
        blocks: [
          {
            type: 'p',
            text: '只含一只电容或一只电感的线性电路，换路之后的任一电压或电流都可以写成“稳态值加上一条衰减的指数”。直流激励下，把三个数求齐即可，不必每次都从微分方程重推。',
          },
          { type: 'diagram', id: 'circuit-rc', caption: 't = 0 时开关闭合。换路后的 uC 用稳态值、初始值和 τ 来写。' },
          { type: 'formula', tex: 'f(t) = f(\\infty) + \\big[f(0+) - f(\\infty)\\big] e^{-t/\\tau}, \\quad t > 0' },
          {
            type: 'ul',
            items: [
              '初始值 $f(0+)$：电容电压、电感电流与换路前一瞬间相同。其他电压、电流可以跳变，要在 $0+$ 的等效电路里重算。',
              '稳态值 $f(\\infty)$：直流稳态中电容开路、电感短路，再按电阻电路计算。',
              '时间常数：$\\tau = RC$ 或 $\\tau = L/R$。这里的 $R$ 是从储能元件两端看进去、独立源置零以后的等效电阻。',
            ],
          },
        ],
      },
      {
        title: '0−、0 与 0+ ',
        blocks: [
          {
            type: 'p',
            text: '$0-$ 是换路之前的最后一瞬间，$0+$ 是换路之后的最初一瞬间。连续的是状态：$u_C(0+) = u_C(0-)$，$i_L(0+) = i_L(0-)$。电容电流、电感电压、电阻电压都可能在这一瞬间改变。',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: 'τ 用换路后的电路',
            text: '开关动作会改变从电容或电感看进去的电阻。时间常数按换路以后、独立源已经置零的电路来算，不要沿用换路前的电阻。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：从零开始充电',
        body: [
          {
            type: 'p',
            text: '串联的 $R = 2\\,\\Omega$、$C = 3\\,\\mathrm{F}$ 在 $t = 0$ 接到 $10\\,\\mathrm{V}$，电容原先没有电压。求 $\\tau$、$u_C(0+)$、$u_C(\\infty)$ 和 $i(0+)$，并写出 $u_C(t)$。',
          },
        ],
        solution: [
          { type: 'p', text: '$\\tau = RC = 6\\,\\mathrm{s}$。电容电压不跃变，$u_C(0+) = 0$。直流稳态电容开路，$u_C(\\infty) = 10\\,\\mathrm{V}$。' },
          { type: 'p', text: '$t = 0+$ 时电阻承受全部电源电压，$i(0+) = (10 - 0) / 2 = 5\\,\\mathrm{A}$。稳态电流为 0。' },
          { type: 'p', text: '$u_C(t) = 10 + (0 - 10) e^{-t/6} = 10 - 10 e^{-t/6}\\,\\mathrm{V}$。' },
        ],
      },
      {
        title: '示范 2：初始电压高于电源',
        body: [
          {
            type: 'p',
            text: '$u_C(0-) = 8\\,\\mathrm{V}$，$t = 0$ 时与 $R = 4\\,\\Omega$ 一起接到 $2\\,\\mathrm{V}$ 电源上，$C = 2\\,\\mathrm{F}$。求三要素和 $i(0+)$。电流以从电源正极流向电容为正。',
          },
        ],
        solution: [
          { type: 'p', text: '$u_C(0+) = 8\\,\\mathrm{V}$，$u_C(\\infty) = 2\\,\\mathrm{V}$，$\\tau = 4 \\times 2 = 8\\,\\mathrm{s}$。' },
          { type: 'p', text: '$i(0+) = (2 - 8) / 4 = -1.5\\,\\mathrm{A}$。负号表示电容在放电，实际电流流回电源。' },
          { type: 'p', text: '$u_C(t) = 2 + (8 - 2) e^{-t/8} = 2 + 6 e^{-t/8}\\,\\mathrm{V}$。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir11-b1',
        kp: ['时间常数'],
        prompt: [{ type: 'p', text: '换路后，从电容两端看进去的等效电阻为 $5\\,\\Omega$，电容为 $2\\,\\mathrm{F}$。求时间常数。' }],
        numbers: [{ id: 'tau', label: 'τ', expected: 10, unit: 's' }],
        model: 'τ = 10 s。',
        rule: 'RC 电路 $\\tau = RC$。R 是换路后从电容看进去的等效电阻。',
        example: 'R = 2 Ω、C = 3 F 时，τ = 6 s。',
      }),
      numericQuestion({
        id: 'cir11-b2',
        kp: ['初始值', '稳态值'],
        prompt: [
          {
            type: 'p',
            text: '电容在换路前的电压为 $4\\,\\mathrm{V}$。换路后它通过电阻接到 $10\\,\\mathrm{V}$ 直流电源，稳态时电容开路并承受全部电源电压。求 $u_C(0+)$ 和 $u_C(\\infty)$。',
          },
        ],
        numbers: [
          { id: 'u0', label: 'uC(0+)', expected: 4, unit: 'V' },
          { id: 'uinf', label: 'uC(∞)', expected: 10, unit: 'V' },
        ],
        model: 'uC(0+) = 4 V，uC(∞) = 10 V。',
        rule: '电容电压不能跃变。直流稳态下电容开路，其电压等于此时电阻电路给出的开路电压。',
        example: '若 uC(0-) = 0、电源为 10 V，则 uC(0+) = 0，uC(∞) = 10 V。',
      }),
      numericQuestion({
        id: 'cir11-b3',
        kp: ['RL 电路', '三要素法'],
        prompt: [
          {
            type: 'p',
            text: '串联 RL 电路：$U_s = 8\\,\\mathrm{V}$，$R = 2\\,\\Omega$，$L = 6\\,\\mathrm{H}$，电感电流换路前为 0。求 $\\tau$、$i_L(0+)$ 和 $i_L(\\infty)$。',
          },
        ],
        numbers: [
          { id: 'tau', label: 'τ', expected: 3, unit: 's' },
          { id: 'i0', label: 'iL(0+)', expected: 0, unit: 'A' },
          { id: 'iinf', label: 'iL(∞)', expected: 4, unit: 'A' },
        ],
        model: 'τ = 3 s，iL(0+) = 0，iL(∞) = 4 A。',
        rule: '$\\tau = L/R$。电感电流不能跃变。直流稳态电感短路，$i(\\infty) = U_s / R$。',
        example: 'L = 4 H、R = 2 Ω 时，τ = 2 s。',
      }),
      choiceQuestion({
        id: 'cir11-b4',
        kp: ['初始值'],
        stem: '电流保持有限时，换路瞬间哪一个量不能跃变？',
        options: ABCD(['电容电压', '电容电流', '电阻电压', '电感电压']),
        answer: 'A',
        model: 'A。电流有限时电容电压连续。电感电流在电压有限时连续。',
        rule: '不能跃变的是状态量。电容电流、电感电压、电阻上的电压都可以在 0+ 改变。',
        example: 'uC(0-) = 4 V 时，不论开关怎样动作，只要电流有限，就有 uC(0+) = 4 V。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir11-a1',
        kp: ['三要素法'],
        prompt: [
          {
            type: 'p',
            text: '$R = 3\\,\\Omega$ 与 $C = 4\\,\\mathrm{F}$ 串联，在 $t = 0$ 接到 $12\\,\\mathrm{V}$，电容原先电压为 0。求 $\\tau$、$i(0+)$ 和 $u_C(\\infty)$。电流以充电方向为正。',
          },
        ],
        numbers: [
          { id: 'tau', label: 'τ', expected: 12, unit: 's' },
          { id: 'i0', label: 'i(0+)', expected: 4, unit: 'A' },
          { id: 'uinf', label: 'uC(∞)', expected: 12, unit: 'V' },
        ],
        model: 'τ = 12 s，i(0+) = 4 A，uC(∞) = 12 V。',
        rule: '$\\tau = RC$。0+ 时 uC 仍为 0，$i(0+) = U_s / R$。稳态电容开路，uC 等于电源电压。',
        example: 'R = 2 Ω、C = 3 F、Us = 10 V、零初始时，τ = 6 s，i(0+) = 5 A。',
      }),
      numericQuestion({
        id: 'cir11-a2',
        kp: ['三要素法'],
        prompt: [
          {
            type: 'p',
            text: '$u_C(0-) = 9\\,\\mathrm{V}$，$R = 6\\,\\Omega$，$C = 1\\,\\mathrm{F}$，换路后接到 $3\\,\\mathrm{V}$。求 $\\tau$、$i(0+)$ 和 $u_C(\\infty)$。电流以从电源流向电容为正。',
          },
        ],
        numbers: [
          { id: 'tau', label: 'τ', expected: 6, unit: 's' },
          { id: 'i0', label: 'i(0+)', expected: -1, unit: 'A' },
          { id: 'uinf', label: 'uC(∞)', expected: 3, unit: 'V' },
        ],
        model: 'τ = 6 s，i(0+) = −1 A，uC(∞) = 3 V。',
        rule: '$i(0+) = (U_s - u_C(0+)) / R$。稳态电压等于新的电源电压。',
        example: 'uC(0+) = 8 V、电源 2 V、R = 4 Ω 时，i(0+) = −1.5 A。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 12,
    title: '正弦量与相量',
    goals: [
      '会从正弦表达式读出幅值、有效值、角频率和初相。',
      '会把同频率正弦量写成有效值相量，并做加减。',
      '知道不同频率的正弦量不能合成一个相量。',
    ],
    sections: [
      {
        title: '一个正弦量有四个信息',
        blocks: [
          {
            type: 'p',
            text: '正弦电压可以写成 $u(t) = U_m \\sin(\\omega t + \\varphi)$。幅值 $U_m$ 是摆动的最大值，角频率 $\\omega$ 决定变化快慢，初相 $\\varphi$ 决定 $t = 0$ 时波形走到了哪里。电路计算更常用有效值：对正弦量，有效值是幅值除以 $\\sqrt{2}$。',
          },
          { type: 'diagram', id: 'circuit-phasor', caption: '左侧是正弦波形，右侧用一条有长度、有角度的相量表示它。' },
          { type: 'formula', tex: 'U = \\frac{U_m}{\\sqrt{2}}, \\qquad \\dot{U} = U \\angle \\varphi' },
          {
            type: 'p',
            text: '本课的相量用有效值作模、用初相作辐角。同一个电路里，全部正弦量都用 $\\sin$ 或全部都用 $\\cos$，初相才可以互相比较。图中按正弦函数来画。',
          },
        ],
      },
      {
        title: '相量为什么能相加',
        blocks: [
          {
            type: 'p',
            text: '同频率的正弦量相加，结果仍是同一频率的正弦量。相量把这个加法变成复数加法：实部与实部相加，虚部与虚部相加。乘以 $\\mathrm{j}$ 表示逆时针旋转 $90^\\circ$。',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: '频率不同就不能合成一个相量',
            text: '相量图默认所有箭头以同一个 $\\omega$ 旋转。两个频率不同的正弦量之和一般不再是单一正弦量，不能写成一个 $\\dot{U}$。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：从波形式写出相量',
        body: [{ type: 'p', text: '$u = 10\\sqrt{2}\\,\\sin(100 t + 30^\\circ)\\,\\mathrm{V}$。写出有效值、初相和角频率。' }],
        solution: [
          { type: 'p', text: '幅值是 $10\\sqrt{2}\\,\\mathrm{V}$，有效值 $U = 10\\,\\mathrm{V}$，初相 $30^\\circ$，角频率 $\\omega = 100\\,\\mathrm{rad/s}$。' },
          { type: 'p', text: '有效值相量为 $10 \\angle 30^\\circ\\,\\mathrm{V}$。' },
        ],
      },
      {
        title: '示范 2：正交相量相加',
        body: [{ type: 'p', text: '$\\dot{I}_1 = 4 \\angle 0^\\circ\\,\\mathrm{A}$，$\\dot{I}_2 = 3 \\angle 90^\\circ\\,\\mathrm{A}$。求二者之和的模。' }],
        solution: [
          { type: 'p', text: '写成直角坐标：$4 + \\mathrm{j}0$ 与 $0 + \\mathrm{j}3$，和为 $4 + \\mathrm{j}3$。' },
          { type: 'p', text: '模 $\\sqrt{4^2 + 3^2} = 5\\,\\mathrm{A}$。这是 3-4-5 的直角三角形，不必先去算角度。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir12-b1',
        kp: ['有效值'],
        prompt: [{ type: 'p', text: '正弦电压的幅值是 $8\\sqrt{2}\\,\\mathrm{V}$。求有效值。' }],
        numbers: [{ id: 'u', label: '有效值', expected: 8, unit: 'V' }],
        model: '有效值为 8 V。',
        rule: '正弦量的有效值等于幅值除以 $\\sqrt{2}$。',
        example: '幅值 $10\\sqrt{2}$ V 的正弦电压，有效值是 10 V。',
      }),
      numericQuestion({
        id: 'cir12-b2',
        kp: ['相量'],
        prompt: [{ type: 'p', text: '$6 \\angle 0^\\circ$ 与 $8 \\angle 90^\\circ$ 相加。求和的模。' }],
        numbers: [{ id: 'm', label: '和的模', expected: 10 }],
        model: '和的模为 10。',
        rule: '正交相量的模用勾股定理：$\\sqrt{6^2 + 8^2} = 10$。',
        example: '4 与 3 正交相加，模是 5。',
      }),
      numericQuestion({
        id: 'cir12-b3',
        kp: ['周期', '频率'],
        prompt: [{ type: 'p', text: '工频正弦量的频率为 $50\\,\\mathrm{Hz}$。求周期，单位用毫秒。' }],
        numbers: [{ id: 't', label: '周期', expected: 20, unit: 'ms' }],
        model: '周期为 20 ms。',
        rule: '$T = 1/f$。50 Hz 对应 0.02 s，也就是 20 ms。',
        example: '频率 100 Hz 时，周期是 10 ms。',
      }),
      choiceQuestion({
        id: 'cir12-b4',
        kp: ['相量'],
        stem: '下面哪一种运算可以直接在相量图上完成？',
        options: ABCD([
          '两个同频率正弦电流相加',
          '50 Hz 与 150 Hz 的两个电压相加后写成一个相量',
          '把有效值相加来代替正交相量的模',
          '用两个相量的模相乘得到新的频率',
        ]),
        answer: 'A',
        model: 'A。只有同频率正弦量才能合成另一个同频率相量。',
        rule: '相量加法对应同频率正弦量的瞬时值加法。频率不同，或把有效值当成可直接代数相加的标量，都会出错。',
        example: '3 A 与 4 A 若相位差 90°，总电流有效值是 5 A，不是 7 A。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir12-a1',
        kp: ['相量'],
        prompt: [{ type: 'p', text: '$u = 6\\sqrt{2}\\,\\sin(\\omega t - 45^\\circ)\\,\\mathrm{V}$。求有效值相量的模和辐角。' }],
        numbers: [
          { id: 'u', label: '有效值', expected: 6, unit: 'V' },
          { id: 'phi', label: '辐角', expected: -45, unit: '°' },
        ],
        model: '相量为 6∠−45° V。',
        rule: '有效值是幅值除以 $\\sqrt{2}$，辐角就是正弦函数里的初相，负号要保留。',
        example: '$10\\sqrt{2}\\sin(\\omega t + 30^\\circ)$ 对应 $10\\angle 30^\\circ$。',
      }),
      numericQuestion({
        id: 'cir12-a2',
        kp: ['相量'],
        prompt: [{ type: 'p', text: '电流相量为 $3 + \\mathrm{j}4\\,\\mathrm{A}$。求它的虚部和模。' }],
        numbers: [
          { id: 'im', label: '虚部', expected: 4, unit: 'A' },
          { id: 'mag', label: '模', expected: 5, unit: 'A' },
        ],
        model: '虚部为 4 A，模为 5 A。',
        rule: '复数 $a + \\mathrm{j}b$ 的模是 $\\sqrt{a^2 + b^2}$。',
        example: '$4 + \\mathrm{j}3$ 的模也是 5。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 13,
    title: '阻抗、导纳与正弦稳态计算',
    goals: [
      '会写电阻、电感、电容的阻抗，并区分感抗与容抗的符号。',
      '会求串联阻抗的模，并用相量形式的欧姆定律求电流。',
      '会由电流和电阻、电抗算出有功功率与无功功率。',
    ],
    sections: [
      {
        title: '元件在相量电路里变成阻抗',
        blocks: [
          {
            type: 'p',
            text: '正弦稳态且全电路只有一个频率时，电感和电容可以用阻抗表示。电阻的阻抗是实数，电感的阻抗是正虚数，电容的阻抗是负虚数。电压相量等于阻抗乘电流相量。',
          },
          { type: 'diagram', id: 'circuit-impedance', caption: '电阻与电感串联：Z = R + jωL。' },
          { type: 'formula', tex: 'Z_R = R, \\quad Z_L = \\mathrm{j}\\omega L, \\quad Z_C = -\\mathrm{j}\\frac{1}{\\omega C}' },
          {
            type: 'p',
            text: '串联时阻抗直接相加：$Z = R + \\mathrm{j}X$，$X = \\omega L - 1/(\\omega C)$。$X > 0$ 呈感性，电流滞后于电压；$X < 0$ 呈容性，电流超前于电压。模 $|Z| = \\sqrt{R^2 + X^2}$，电流有效值 $I = U / |Z|$。',
          },
        ],
      },
      {
        title: '导纳是阻抗的倒数',
        blocks: [
          { type: 'formula', tex: 'Y = 1/Z = G + \\mathrm{j}B' },
          {
            type: 'p',
            text: '并联支路用导纳更方便，因为同一电压下电流相量等于 $Y\\dot{U}$，总导纳是各支路导纳之和。串联则优先用阻抗。不要在同一步里把阻抗和导纳直接相加。',
          },
          {
            type: 'callout',
            tone: 'rule',
            title: '功率先看电阻和电抗',
            text: '有功功率 $P = I^2 R$，无功功率 $Q = I^2 X$。本课把感性无功取正。视在功率 $S = UI = I^2 |Z|$，并且 $S^2 = P^2 + Q^2$。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：串联 RL',
        body: [{ type: 'p', text: '$R = 3\\,\\Omega$，感抗 $X_L = 4\\,\\Omega$，外加电压有效值 $10\\,\\mathrm{V}$。求阻抗模、电流、有功功率和无功功率。' }],
        solution: [
          { type: 'p', text: '$|Z| = \\sqrt{3^2 + 4^2} = 5\\,\\Omega$，$I = 10 / 5 = 2\\,\\mathrm{A}$。' },
          { type: 'p', text: '$P = 2^2 \\times 3 = 12\\,\\mathrm{W}$，$Q = 2^2 \\times 4 = 16\\,\\mathrm{var}$。$S = 10 \\times 2 = 20\\,\\mathrm{VA}$，且 $12^2 + 16^2 = 20^2$。' },
          { type: 'p', text: '电路呈感性，电流滞后于电压。' },
        ],
      },
      {
        title: '示范 2：串联 RC',
        body: [{ type: 'p', text: '$R = 8\\,\\Omega$，容抗的大小为 $6\\,\\Omega$，电压有效值 $20\\,\\mathrm{V}$。求 $|Z|$、电流和有功功率。' }],
        solution: [
          { type: 'p', text: '写成 $Z = 8 - \\mathrm{j}6$，$|Z| = \\sqrt{8^2 + 6^2} = 10\\,\\Omega$。' },
          { type: 'p', text: '$I = 20 / 10 = 2\\,\\mathrm{A}$，$P = 2^2 \\times 8 = 32\\,\\mathrm{W}$。电流超前于电压。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir13-b1',
        kp: ['阻抗'],
        prompt: [{ type: 'p', text: '串联电路 $R = 6\\,\\Omega$，$X = 8\\,\\Omega$。求阻抗的模。' }],
        numbers: [{ id: 'z', label: '|Z|', expected: 10, unit: 'Ω' }],
        model: '|Z| = 10 Ω。',
        rule: '$|Z| = \\sqrt{R^2 + X^2}$。',
        example: 'R = 3 Ω、X = 4 Ω 时，|Z| = 5 Ω。',
      }),
      numericQuestion({
        id: 'cir13-b2',
        kp: ['欧姆定律', '阻抗'],
        prompt: [{ type: 'p', text: '端口电压有效值 $20\\,\\mathrm{V}$，阻抗模 $10\\,\\Omega$。求电流有效值。' }],
        numbers: [{ id: 'i', label: '电流', expected: 2, unit: 'A' }],
        model: '电流有效值为 2 A。',
        rule: '$I = U / |Z|$。这里用的是有效值，不是幅值。',
        example: '电压 10 V、|Z| = 5 Ω 时，电流是 2 A。',
      }),
      numericQuestion({
        id: 'cir13-b3',
        kp: ['感抗'],
        prompt: [{ type: 'p', text: '$\\omega = 5\\,\\mathrm{rad/s}$，$L = 2\\,\\mathrm{H}$。求感抗 $X_L$。' }],
        numbers: [{ id: 'x', label: 'XL', expected: 10, unit: 'Ω' }],
        model: 'XL = 10 Ω。',
        rule: '$X_L = \\omega L$，在 $Z = R + \\mathrm{j}X$ 里感抗为正。',
        example: 'ω = 100 rad/s、L = 0.1 H 时，感抗是 10 Ω。',
      }),
      choiceQuestion({
        id: 'cir13-b4',
        kp: ['容抗'],
        stem: '采用 Z = R + jX 时，理想电容的电抗 X 是哪一种？',
        options: ABCD(['负实数的虚部，即 X < 0', '与电阻一样是正实数', '一定等于 ωC', '一定是正的，因为电容也“阻碍”电流']),
        answer: 'A',
        model: 'A。电容阻抗是 −j/(ωC)，所以 X 为负。',
        rule: '感抗为正，容抗为负。电流是否超前，由 X 的符号决定。',
        example: 'R = 8 Ω、容抗大小 6 Ω 时，应写成 Z = 8 − j6，而不是 8 + j6。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir13-a1',
        kp: ['阻抗', '功率'],
        prompt: [
          {
            type: 'p',
            text: '串联电路 $R = 5\\,\\Omega$、$X = 12\\,\\Omega$，电压有效值 $13\\,\\mathrm{V}$。求阻抗模、电流、有功功率和无功功率。',
          },
        ],
        numbers: [
          { id: 'z', label: '|Z|', expected: 13, unit: 'Ω' },
          { id: 'i', label: '电流', expected: 1, unit: 'A' },
          { id: 'p', label: '有功功率', expected: 5, unit: 'W' },
          { id: 'q', label: '无功功率', expected: 12, unit: 'var' },
        ],
        model: '|Z| = 13 Ω，电流 1 A，P = 5 W，Q = 12 var。',
        rule: '$|Z| = \\sqrt{5^2+12^2}$，$P = I^2 R$，$Q = I^2 X$。',
        example: '3 Ω 与 4 Ω 串联、电流 2 A 时，P = 12 W，Q = 16 var。',
      }),
      numericQuestion({
        id: 'cir13-a2',
        kp: ['阻抗', '功率'],
        prompt: [{ type: 'p', text: '$R = 6\\,\\Omega$ 与 $X_L = 8\\,\\Omega$ 串联，电压有效值 $10\\,\\mathrm{V}$。求电流、有功功率和视在功率。' }],
        numbers: [
          { id: 'i', label: '电流', expected: 1, unit: 'A' },
          { id: 'p', label: '有功功率', expected: 6, unit: 'W' },
          { id: 's', label: '视在功率', expected: 10, unit: 'VA' },
        ],
        model: '电流 1 A，有功功率 6 W，视在功率 10 VA。',
        rule: '$|Z| = 10\\,\\Omega$，$I = U/|Z|$，$P = I^2 R$，$S = UI$。',
        example: '电压 20 V、|Z| = 10 Ω、R = 8 Ω 时，电流 2 A，有功功率 32 W。',
      }),
    ],
  }),

  stemLesson({
    subjectId: 'circuit',
    number: 14,
    title: '交流功率与功率因数',
    goals: [
      '会由电压、电流和功率因数求有功、无功和视在功率。',
      '会用功率三角形在 P、Q、S 之间换算。',
      '知道并联电容为什么能提高感性负载的功率因数。',
    ],
    sections: [
      {
        title: '三种功率和一个角度',
        blocks: [
          {
            type: 'p',
            text: '交流电路里，电压有效值与电流有效值的乘积是视在功率 $S$，单位伏安。真正变成热或机械功的是有功功率 $P$。在电源和负载之间来回交换的那一部分用无功功率 $Q$ 描述。三者构成直角三角形。',
          },
          { type: 'diagram', id: 'circuit-pf', caption: '功率三角形：水平边是 P，竖直边是 Q，斜边是 S，cos φ = P / S。' },
          { type: 'formula', tex: 'P = UI\\cos\\varphi, \\quad Q = UI\\sin\\varphi, \\quad S = UI, \\quad \\cos\\varphi = P/S' },
          {
            type: 'ul',
            items: [
              '本课约定：电流滞后于电压时 $\\varphi > 0$，$Q > 0$，称为滞后功率因数，电路呈感性。',
              '电流超前时 $Q < 0$，功率因数超前，电路呈容性。',
              '$\\cos\\varphi$ 只给出角度的绝对值倾向，滞后还是超前要另看电路是感性还是容性。',
            ],
          },
        ],
      },
      {
        title: '提高功率因数',
        blocks: [
          {
            type: 'p',
            text: '感性负载的有功功率由它做的功决定，并联一只理想电容不会改变这份 $P$。电容提供负的无功，抵消一部分正无功，使总的 $Q$ 变小、$S$ 变小。在电压不变时，线路电流 $I = S/U$ 下降，线路损耗跟着下降。',
          },
          {
            type: 'callout',
            tone: 'note',
            title: '补偿到 1 不是唯一目标',
            text: '把功率因数补偿到 1，需要的电容最大。工程上常补偿到 0.9 左右，在设备和线路损耗之间折中。计算时先由目标功率因数求出允许留下的 $Q$，再决定电容要提供的无功。',
          },
        ],
      },
    ],
    examples: [
      {
        title: '示范 1：由功率因数求 P 和 Q',
        body: [{ type: 'p', text: '电压 $100\\,\\mathrm{V}$，电流 $2\\,\\mathrm{A}$，功率因数 $0.8$ 滞后。求 $P$、$S$ 和 $Q$。' }],
        solution: [
          { type: 'p', text: '$S = 100 \\times 2 = 200\\,\\mathrm{VA}$，$P = 200 \\times 0.8 = 160\\,\\mathrm{W}$。' },
          { type: 'p', text: '$\\cos\\varphi = 0.8$ 时 $\\sin\\varphi = 0.6$，滞后所以 $Q = 200 \\times 0.6 = 120\\,\\mathrm{var}$。核对：$160^2 + 120^2 = 200^2$。' },
        ],
      },
      {
        title: '示范 2：由 P、Q 反求功率因数',
        body: [{ type: 'p', text: '某负载 $P = 300\\,\\mathrm{W}$，$Q = 400\\,\\mathrm{var}$（感性）。求视在功率和功率因数。' }],
        solution: [
          { type: 'p', text: '$S = \\sqrt{300^2 + 400^2} = 500\\,\\mathrm{VA}$。' },
          { type: 'p', text: '$\\cos\\varphi = 300 / 500 = 0.6$，并且是滞后的。' },
        ],
      },
    ],
    basic: [
      numericQuestion({
        id: 'cir14-b1',
        kp: ['交流功率'],
        prompt: [{ type: 'p', text: '电压 $100\\,\\mathrm{V}$，电流 $5\\,\\mathrm{A}$，功率因数 $0.6$。求有功功率和视在功率。' }],
        numbers: [
          { id: 'p', label: '有功功率', expected: 300, unit: 'W' },
          { id: 's', label: '视在功率', expected: 500, unit: 'VA' },
        ],
        model: '有功功率 300 W，视在功率 500 VA。',
        rule: '$S = UI$，$P = S \\cos\\varphi$。',
        example: '100 V、2 A、功率因数 0.8 时，S = 200 VA，P = 160 W。',
      }),
      numericQuestion({
        id: 'cir14-b2',
        kp: ['功率因数'],
        prompt: [{ type: 'p', text: '有功功率 $30\\,\\mathrm{W}$，视在功率 $50\\,\\mathrm{VA}$。求功率因数。' }],
        numbers: [{ id: 'pf', label: '功率因数', expected: 0.6 }],
        model: '功率因数为 0.6。',
        rule: '$\\cos\\varphi = P / S$。',
        example: 'P = 300 W、S = 500 VA 时，功率因数也是 0.6。',
      }),
      numericQuestion({
        id: 'cir14-b3',
        kp: ['功率三角形'],
        prompt: [{ type: 'p', text: '$P = 8\\,\\mathrm{W}$，$Q = 6\\,\\mathrm{var}$。求视在功率和功率因数。' }],
        numbers: [
          { id: 's', label: '视在功率', expected: 10, unit: 'VA' },
          { id: 'pf', label: '功率因数', expected: 0.8 },
        ],
        model: 'S = 10 VA，功率因数 0.8。',
        rule: '$S = \\sqrt{P^2 + Q^2}$，$\\cos\\varphi = P/S$。',
        example: 'P = 300 W、Q = 400 var 时，S = 500 VA，功率因数 0.6。',
      }),
      choiceQuestion({
        id: 'cir14-b4',
        kp: ['功率因数'],
        stem: '“功率因数滞后”表示什么？',
        options: ABCD([
          '电流滞后于电压，电路呈感性',
          '电流超前于电压，电路呈容性',
          '有功功率为负',
          '视在功率小于有功功率',
        ]),
        answer: 'A',
        model: 'A。滞后指电流落后于电压，无功为正，是感性。',
        rule: '功率因数的数值是 cos φ；“超前 / 滞后”说明 φ 的符号，也就是无功的符号。',
        example: '并联电容以后，感性负载的电流仍可能滞后，只是滞后角度变小。',
      }),
    ],
    advanced: [
      numericQuestion({
        id: 'cir14-a1',
        kp: ['功率因数补偿'],
        prompt: [
          {
            type: 'p',
            text: '感性负载 $P = 400\\,\\mathrm{W}$，$Q = 300\\,\\mathrm{var}$。求现在的视在功率和功率因数；若并联电容把总无功补到 0，求电容提供的无功以及补偿后的视在功率。',
          },
        ],
        numbers: [
          { id: 's', label: '补偿前的 S', expected: 500, unit: 'VA' },
          { id: 'pf', label: '补偿前的功率因数', expected: 0.8 },
          { id: 'qc', label: '电容提供的无功', expected: 300, unit: 'var' },
          { id: 's2', label: '补偿后的 S', expected: 400, unit: 'VA' },
        ],
        model: '补偿前 S = 500 VA、功率因数 0.8。电容提供 300 var 后，S 降为 400 VA。',
        rule: '理想电容不改变 P。补到功率因数为 1 时，电容无功等于原来的正无功，新的 S 等于 P。',
        example: 'P = 300 W、Q = 400 var 时，S = 500 VA；若把无功全部补掉，S 变为 300 VA。',
      }),
      numericQuestion({
        id: 'cir14-a2',
        kp: ['交流功率'],
        prompt: [
          {
            type: 'p',
            text: '单相负载接到 $100\\,\\mathrm{V}$，有功功率 $600\\,\\mathrm{W}$，功率因数 $0.6$ 滞后。求电流、视在功率和无功功率。',
          },
        ],
        numbers: [
          { id: 'i', label: '电流', expected: 10, unit: 'A' },
          { id: 's', label: '视在功率', expected: 1000, unit: 'VA' },
          { id: 'q', label: '无功功率', expected: 800, unit: 'var' },
        ],
        model: '电流 10 A，S = 1000 VA，Q = 800 var。',
        rule: '$S = P / \\cos\\varphi$，$I = S / U$，$Q = \\sqrt{S^2 - P^2}$（滞后取正）。',
        example: '100 V、P = 160 W、功率因数 0.8 时，S = 200 VA，电流 2 A。',
      }),
    ],
  }),
]
