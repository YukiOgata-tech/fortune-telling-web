// tarashidoQuestions.js

// 1～12問、5択で設計
const tarashidoQuestions = [
  {
    id: 1,
    question: "イケメンor美女と初デート！「かっこいいね／可愛いね」って言えちゃう？",
    choices: [
      { text: "すぐ言えるし、正直そう思っているかなんてどうでもいい", score: 5 },
      { text: "言われたら、言い返すけど自分からは言わない", score: 3 },
      { text: "相手の話してみた空気感次第", score: 4 },
      { text: "なかなか言えない", score: 2 },
      { text: "絶対言えない", score: 1 },
    ],
  },
  {
    id: 2,
    question: "自分の上司や先輩への接し方は？",
    choices: [
      { text: "自分から話すし、話題まで提供して仲良くなる", score: 5 },
      { text: "挨拶＋機嫌取りの会話や上司に合わせた会話は得意！", score: 4 },
      { text: "必要最低限接するけど、それ以上は手を出さない", score: 3 },
      { text: "受け身で対応が基本", score: 2 },
      { text: "目を合わせない・合わせたくない", score: 1 },
    ],
  },
  {
    id: 3,
    question: "初対面の人とでも緊張せず話せる？",
    choices: [
      { text: "まったく緊張しない", score: 5 },
      { text: "ほとんど緊張しない", score: 4 },
      { text: "少し緊張する", score: 3 },
      { text: "かなり緊張する", score: 2 },
      { text: "話せない。うなづくとかが限界値", score: 1 },
    ],
  },
  {
    id: 4,
    question: "人にすぐあだ名をつけるタイプ？",
    choices: [
      { text: "すぐ付ける", score: 5 },
      { text: "わりと付ける", score: 4 },
      { text: "相手による", score: 3 },
      { text: "あまり付けない", score: 2 },
      { text: "全然付けない", score: 1 },
    ],
  },
  {
    id: 5,
    question: "グループの飲み会や集まりでどんな役回り？",
    choices: [
      { text: "率先して幹事、話題提供を行うし、それが好き", score: 5 },
      { text: "みんなの話を盛り上げなら任せてください", score: 4 },
      { text: "聞き役に回るのが得意だし、性に合っている", score: 3 },
      { text: "気配を消す", score: 2 },
      { text: "飲み会なんてそもそも誘われたことない、、、", score: 1 },
    ],
  },
  {
    id: 6,
    question: "あなたは街中を歩いています。困っている人を見たら？",
    choices: [
      { text: "すぐ声をかける or 助ける", score: 5 },
      { text: "タイミングを見て助ける", score: 4 },
      { text: "他の人が行くなら行く", score: 3 },
      { text: "気にはなるし助けたいけど、行かない・行けない", score: 2 },
      { text: "それより、自分の影しか見えていない", score: 1 },
    ],
  },
  {
    id: 7,
    question: "自分の失敗談を笑いに変えて話せる？",
    choices: [
      { text: "全部余裕。なんならおしゃべりにネタに", score: 5 },
      { text: "まあまあ話せる", score: 4 },
      { text: "仲のいい人になら話せる", score: 3 },
      { text: "あまり言いたくはない", score: 2 },
      { text: "絶対言わない", score: 1 },
    ],
  },
  {
    id: 8,
    question: "友人への褒め言葉をよく表現する方？",
    choices: [
      { text: "気軽に褒める。褒められるポイントを常に探している。", score: 5 },
      { text: "たまに褒める", score: 4 },
      { text: "褒めたい時だけ", score: 3 },
      { text: "どちらかいうとプライドが邪魔してくるから言いたくない", score: 2 },
      { text: "言えないし、言わない。", score: 1 },
    ],
  },
  {
    id: 9,
    question: "LINEグループで自分発信の話題が多い？",
    choices: [
      { text: "ほぼ毎回話題を出す", score: 5 },
      { text: "話題に対して答えるのは得意です", score: 4 },
      { text: "みんなが静かな時だけ", score: 3 },
      { text: "ほぼROM専", score: 2 },
      { text: "一切発言しない", score: 1 },
    ],
  },
  {
    id: 10,
    question: "気になる人へのアプローチは積極的？",
    choices: [
      { text: "超積極的", score: 5 },
      { text: "けっこう積極的", score: 4 },
      { text: "相手による", score: 3 },
      { text: "受け身恋愛待ってます。。。", score: 2 },
      { text: "全くできずに進展なく終わる", score: 1 },
    ],
  },
  {
    id: 11,
    question: "サプライズやイベントを企画するのは好き？",
    choices: [
      { text: "大好きでよくやる", score: 5 },
      { text: "やる時はやる", score: 4 },
      { text: "誰かと一緒ならやる", score: 3 },
      { text: "極力やりたくない", score: 2 },
      { text: "絶対やらない", score: 1 },
    ],
  },
  {
    id: 12,
    question: "人から「また会いたい」と言われることが多い？",
    choices: [
      { text: "言われすぎて会いきれない", score: 5 },
      { text: "たまに言われる", score: 4 },
      { text: "普通くらい", score: 3 },
      { text: "あまり言われない", score: 2 },
      { text: "全然言われない", score: 1 },
    ],
  },
];

export default tarashidoQuestions;
