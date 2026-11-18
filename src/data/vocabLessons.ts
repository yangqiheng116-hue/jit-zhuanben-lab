import type { LessonContent, Question } from '../types'
import { explainRight, explainWrong } from './author'
import { normalizeText } from '../lib/text'
import { VOCAB_UNIT_DATA } from './vocabData'
import type { VocabWordData } from './vocabTypes'

function zhHit(answer: string, accepted: string[]): boolean {
  const n = normalizeText(answer)
  if (!n) return false
  return accepted.some((item) => {
    const needle = normalizeText(item)
    return needle.length >= 2 && (n === needle || n.includes(needle))
  })
}

function enHit(answer: string, accepted: string[]): boolean {
  const n = normalizeText(answer)
  return accepted.some((item) => normalizeText(item) === n)
}

function blank(example: string, word: string): string {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(escaped, 'i')
  if (!re.test(example)) return `Choose the word that means the idea in this sentence: ______ . (${example})`
  return example.replace(re, '______')
}

function cloze(unitNumber: number, index: number, word: VocabWordData, pool: VocabWordData[]): Question {
  const distractors = pool.filter((item) => item.word !== word.word).slice(0, 3)
  const options = [word, ...distractors]
    .map((item) => item.word)
    .sort((a, b) => a.localeCompare(b))
  return {
    id: `vocab-${unitNumber}-c${index}`,
    knowledgePoints: ['必会词汇', '选词填空'],
    promptBlocks: [
      { type: 'p', text: `选词填空：${blank(word.example, word.word)}` },
      { type: 'p', text: `中文提示：${word.exampleZh}` },
    ],
    fields: [
      {
        id: 'answer',
        label: '选择单词',
        type: 'select',
        options: options.map((value) => ({ value, label: value })),
      },
    ],
    grade: (answers) => {
      const got = (answers.answer ?? '').trim()
      const model = `${word.word}\n${word.example}`
      if (got.toLowerCase() === word.word.toLowerCase()) {
        return explainRight(model, `选对了。${word.word} 是${word.pos}${word.meaning}。`)
      }
      return explainWrong(
        got ? `选成了 ${got}。` : '未作答。',
        `${word.word}（${word.pos}）表示“${word.meaning}”。要看句子里的搭配，不要只看词形长短。`,
        word.example,
        model,
      )
    },
  }
}

function enToZh(unitNumber: number, index: number, word: VocabWordData): Question {
  return {
    id: `vocab-${unitNumber}-z${index}`,
    knowledgePoints: ['必会词汇', '英译中'],
    promptBlocks: [
      { type: 'p', text: `写出“${word.word}”的中文释义。` },
      { type: 'p', text: `例句：${word.example}` },
    ],
    fields: [{ id: 'answer', label: '中文释义', type: 'text', placeholder: '写出意思，不必整句翻译' }],
    grade: (answers) => {
      const model = word.zh.join(' / ')
      if (zhHit(answers.answer ?? '', word.zh)) {
        return explainRight(model, `意思正确。${word.word}：${word.meaning}。`)
      }
      return explainWrong(
        '释义没有对上，或写得太偏。',
        `${word.word} 在本单元的意思是“${word.meaning}”。${word.note ?? '看例句里它和谁搭配。'}`,
        word.exampleZh,
        model,
      )
    },
  }
}

function zhToEn(unitNumber: number, index: number, word: VocabWordData): Question {
  return {
    id: `vocab-${unitNumber}-e${index}`,
    knowledgePoints: ['必会词汇', '中译英'],
    promptBlocks: [{ type: 'p', text: `把“${word.meaning.split('；')[0]}”写成英文单词或词组。` }],
    fields: [{ id: 'answer', label: '英文', type: 'text', placeholder: '写出单词，注意拼写' }],
    grade: (answers) => {
      const model = word.en.join(' / ')
      if (enHit(answers.answer ?? '', word.en)) {
        return explainRight(`${model}\n${word.example}`, '拼写可以接受。')
      }
      return explainWrong(
        '拼写不对，或写成了另一个词。',
        `这里要写 ${word.word}。例句：${word.example}`,
        word.example,
        model,
      )
    },
  }
}

function unitLesson(unit: (typeof VOCAB_UNIT_DATA)[number]): LessonContent {
  const words = unit.words
  const basic = [
    ...words.slice(0, 4).map((word, i) => enToZh(unit.number, i + 1, word)),
    ...words.slice(4, 8).map((word, i) => zhToEn(unit.number, i + 1, word)),
  ]
  const advanced = words.slice(8, 12).map((word, i) => cloze(unit.number, i + 1, word, words))
  return {
    subjectId: 'english',
    lessonId: `vocab-${unit.number}`,
    number: unit.number,
    title: unit.title,
    goals: [
      `认识本单元 20 个词的词性和中文意思。`,
      '能根据中文写出单词，也能在句子里选出合适的词。',
      '记住：这是第一批核心词，不是全部考试大纲词汇。',
    ],
    sections: [
      {
        title: '怎么用这一单元',
        blocks: [
          { type: 'p', text: unit.blurb },
          {
            type: 'callout',
            tone: 'note',
            title: '第一批核心词',
            text: '本专区先练 20 个单元、共 400 个高频词和搭配，方便英语基础较弱时把句子搭起来。它不是 3000–3500 词的全部大纲，后面仍要在阅读里继续积累。',
          },
          {
            type: 'p',
            text: '先看词表和例句，再做自测。基础档是英译中和中译英，提高档是选词填空。答错会进入错题本。',
          },
        ],
      },
      {
        title: '词表',
        blocks: [
          {
            type: 'vocab',
            items: words.map((word) => ({
              word: word.word,
              pos: word.pos,
              meaning: word.meaning,
              example: word.example,
              exampleZh: word.exampleZh,
              note: word.note,
            })),
          },
        ],
      },
    ],
    workedExamples: [
      {
        title: '示范：先看搭配再写词',
        body: [
          {
            type: 'p',
            text: `以“${words[0].word}”为例。不要只背中文“${words[0].meaning}”，要连例句一起看。`,
          },
        ],
        solution: [
          { type: 'p', text: words[0].example },
          { type: 'p', text: words[0].exampleZh },
          { type: 'p', text: words[0].note ? `易错：${words[0].note}` : '写中译英时只写这个词，不要把整句再译一遍。' },
        ],
      },
    ],
    exercises: { basic, advanced },
  }
}

export const vocabLessons: LessonContent[] = VOCAB_UNIT_DATA.map(unitLesson)

export function getVocabLesson(id: string): LessonContent | undefined {
  return vocabLessons.find((lesson) => lesson.lessonId === id)
}
