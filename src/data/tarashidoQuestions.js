// tarashidoQuestions.js

// 1～12問、5択で設計
const tarashidoQuestions = [
  {
    id: 1,
    question: "イケメンor美女と初デート！「かっこいいね／可愛いね」って言えちゃう？",
    choices: [
      { text: "すぐ言える", score: 5 },
      { text: "空気見て言う", score: 4 },
      { text: "相手次第", score: 3 },
      { text: "なかなか言えない", score: 2 },
      { text: "絶対言えない", score: 1 },
    ],
  },
  {
    id: 2,
    question: "自分の上司や先輩への接し方は？",
    choices: [
      { text: "自分から積極的に話す", score: 5 },
      { text: "挨拶＋軽く会話", score: 4 },
      { text: "必要最低限", score: 3 },
      { text: "受け身で対応", score: 2 },
      { text: "目を合わせない", score: 1 },
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
      { text: "ほぼ話せない", score: 1 },
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
      { text: "率先して仕切る", score: 5 },
      { text: "みんなの話を盛り上げる", score: 4 },
      { text: "聞き役に徹する", score: 3 },
      { text: "気配を消す", score: 2 },
      { text: "ほぼ話さない", score: 1 },
    ],
  },
  {
    id: 6,
    question: "困っている人を見たら？",
    choices: [
      { text: "すぐ声をかける", score: 5 },
      { text: "タイミングを見て助ける", score: 4 },
      { text: "他の人が行くなら行く", score: 3 },
      { text: "気にはなるが行かない", score: 2 },
      { text: "見て見ぬふり", score: 1 },
    ],
  },
  {
    id: 7,
    question: "自分の失敗談を笑いに変えて話せる？",
    choices: [
      { text: "全然余裕", score: 5 },
      { text: "まあまあ話せる", score: 4 },
      { text: "場合による", score: 3 },
      { text: "あまり言いたくない", score: 2 },
      { text: "絶対言わない", score: 1 },
    ],
  },
  {
    id: 8,
    question: "褒め言葉をよく使う方？",
    choices: [
      { text: "気軽に褒める", score: 5 },
      { text: "たまに褒める", score: 4 },
      { text: "褒めたい時だけ", score: 3 },
      { text: "あまり言わない", score: 2 },
      { text: "照れて言えない", score: 1 },
    ],
  },
  {
    id: 9,
    question: "LINEグループで自分発信の話題が多い？",
    choices: [
      { text: "ほぼ毎回話題を出す", score: 5 },
      { text: "よく話題を出す", score: 4 },
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
      { text: "受け身になりがち", score: 2 },
      { text: "全くできない", score: 1 },
    ],
  },
  {
    id: 11,
    question: "サプライズやイベントを企画するのは好き？",
    choices: [
      { text: "大好きでよくやる", score: 5 },
      { text: "たまにやる", score: 4 },
      { text: "誰かと一緒ならやる", score: 3 },
      { text: "やりたくない", score: 2 },
      { text: "絶対やらない", score: 1 },
    ],
  },
  {
    id: 12,
    question: "人から「また会いたい」と言われることが多い？",
    choices: [
      { text: "めっちゃ言われる", score: 5 },
      { text: "たまに言われる", score: 4 },
      { text: "普通くらい", score: 3 },
      { text: "あまり言われない", score: 2 },
      { text: "全然言われない", score: 1 },
    ],
  },
];

export default tarashidoQuestions;
