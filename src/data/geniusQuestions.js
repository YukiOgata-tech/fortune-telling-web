// geniusQuestions.js
// 各 option は { id, label, score }

export const geniusQuestions = [
  {
    id: "Q1",
    text: "世の中の一般論やルールについて最もあなたの考えに近いものを答えよ。",
    image: "/assets/einstein.jpg",
    alt:  "Question",
    options: [
      { id: "A", label: "大衆の意見が反映されているので、従うのが普通で最も合理的である。", score: 3 },
      { id: "B", label: "世の中の一般的知識の正誤について納得するまで調べることがある。", score: 4 },
      { id: "C", label: "世の中のルールについては疑問に思うことがよくある。", score: 2 },
      { id: "D", label: "何かの分野で大革命を起こしてみたいと思う。", score: 1 },
      { id: "E", label: "他選択肢のように深く考えるだけ無駄。", score: 0 }
    ]
  },
  {
    id: "Q2",
    text: "アインシュタインの言葉『常識とは18歳までに身につけた偏見』について、あなたの姿勢は？",
    image: "/assets/einstein.jpg",
    alt:  "アルベルト・アインシュタイン",
    options: [
      { id: "A", label: "偏見を洗い出すため毎年“常識棚卸し”をする", score: 4 },
      { id: "B", label: "偏見に気づいた時だけ修正する", score: 3 },
      { id: "C", label: "周囲の目が変わるまでは常識に合わせる", score: 1 },
      { id: "D", label: "常識は時代が選別した最適解だ", score: 2 },
      { id: "E", label: "常識議論に興味がない", score: 0 }
    ]
  },
  {
    id: "Q3",
    text: "レオナルド・ダ・ヴィンチの『徹底観察』精神に最も近い行動は？",
    image: "/assets/honda.jpg",
    alt:  "レオナルド・ダ・ヴィンチ",
    options: [
      { id: "A", label: "専用ノートで現象→仮説→図解まで残す", score: 4 },
      { id: "B", label: "写真に撮り後でまとめて整理する", score: 3 },
      { id: "C", label: "目の前で理解できる範囲だけ観察", score: 2 },
      { id: "D", label: "観察より人の解説を読む", score: 1 },
      { id: "E", label: "観察は不要", score: 0 }
    ]
  },
  {
    id: "Q4",
    text: "エイダ・ラブレスの『Poetical Science』に近い姿勢は？",
    image: "/assets/honda.jpg",
    alt:  "エイダ・ラブレス",
    options: [
      { id: "A", label: "数式とメタファを往復し概念を翻訳する", score: 4 },
      { id: "B", label: "理系⇄文系を場面で使い分ける", score: 3 },
      { id: "C", label: "必要なら専門外も読む程度", score: 2 },
      { id: "D", label: "自分の専門言語だけで十分", score: 1 },
      { id: "E", label: "跨領域は無駄", score: 0 }
    ]
  },
  {
    id: "Q5",
    text: "ファインマンが推奨した『問いの深さ』について、あなたは？",
    image: "/assets/honda.jpg",
    alt:  "ファインマン",
    options: [
      { id: "A", label: "解けない問いを持ち続け研究を組む", score: 4 },
      { id: "B", label: "納得できなければ正解でも保留", score: 3 },
      { id: "C", label: "合意解があれば進める", score: 2 },
      { id: "D", label: "速さ優先で FAQ を使う", score: 1 },
      { id: "E", label: "他者の回答をコピペで済ます", score: 0 }
    ]
  },
  {
    id: "Q6",
    text: "スティーブ・ジョブズの『Connecting the Dots』を実践するなら？",
    image: "/assets/honda.jpg",
    alt:  "スティーブ・ジョブス",
    options: [
      { id: "A", label: "異業種経験を時間軸でマッピングし新事業仮説を作る", score: 4 },
      { id: "B", label: "経験を役立つ順にストックして必要時呼び出す", score: 3 },
      { id: "C", label: "偶然の組合せを期待する", score: 2 },
      { id: "D", label: "専門外経験はコストと考える", score: 1 },
      { id: "E", label: "点を増やす前に線を整えるべき", score: 0 }
    ]
  },
  {
    id: "Q7",
    text: "イーロン・マスクのハイリスク革新への向き合い方で最も近いものは？",
    image: "/assets/.jpg",
    alt:  "イーロン・マスク",
    options: [
      { id: "A", label: "人類規模で逆算し既存インフラを再設計する", score: 4 },
      { id: "B", label: "大資金が要るテーマでも段階投資で挑む", score: 3 },
      { id: "C", label: "売上見込みが立つ範囲で革新する", score: 2 },
      { id: "D", label: "投資家が納得しやすい改良に集中", score: 1 },
      { id: "E", label: "リスク大の革新は不要", score: 0 }
    ]
  },
  {
    id: "Q8",
    text: "キュリー夫人の『未知への恐れを超える』姿勢について、あなたは？",
    image: "/assets/curie.jpg",
    alt:  "キュリー",
    options: [
      { id: "A", label: "危険領域でも原理を掴めば自ら実験する", score: 4 },
      { id: "B", label: "安全基準を確立してから実験する", score: 3 },
      { id: "C", label: "低リスクな範囲で試す", score: 2 },
      { id: "D", label: "未知は専門家に任せる", score: 1 },
      { id: "E", label: "未知は避ける", score: 0 }
    ]
  },
  {
    id: "Q9",
    text: "ニコラ・テスラの“頭内 3D 設計”スタイルに最も近いのは？",
    image: "/assets/nicola.jpg",
    alt:  "ニコラ・テスラ",
    options: [
      { id: "A", label: "構想を頭内 3D で完成させ不具合を先に潰す", score: 4 },
      { id: "B", label: "まず紙上設計し次に試作する", score: 3 },
      { id: "C", label: "試作しながら構想を固める", score: 2 },
      { id: "D", label: "既存技術を組み合わせて安全策を取る", score: 1 },
      { id: "E", label: "大規模構想は非現実的", score: 0 }
    ]
  },
  {
    id: "Q10",
    text: "ピカソの『破壊なくして創造なし』に近い姿勢は？",
    image: "/assets/picaso.jpg",
    alt:  "ピカソ",
    options: [
      { id: "A", label: "構成要素を分解し別文脈で再構成する", score: 4 },
      { id: "B", label: "既存様式を変形し独自性を出す", score: 3 },
      { id: "C", label: "様式を守りつつ装飾で差別化", score: 2 },
      { id: "D", label: "歴史様式を保存する方が重要", score: 1 },
      { id: "E", label: "奇抜さ優先で文脈は不要", score: 0 }
    ]
  },
  {
    id: "Q11",
    text: "湯川秀樹の『観測前の理論』に対するあなたのスタンスは？",
    image: "/assets/yukawa.jpg",
    alt:  "湯川秀樹",
    options: [
      { id: "A", label: "未証明でも整合が取れれば公開し議論を促す", score: 4 },
      { id: "B", label: "データ揃うまで外部には伏せる", score: 3 },
      { id: "C", label: "他者理論を改良する方が好き", score: 2 },
      { id: "D", label: "データ無し理論は無意味", score: 1 },
      { id: "E", label: "理論より現場の勘", score: 0 }
    ]
  },
  {
    id: "Q12",
    text: "本田宗一郎の『多試作主義』に最も近い行動は？",
    image: "/assets/honda.jpg",
    alt:  "本田宗一郎",
    options: [
      { id: "A", label: "失敗コストを抑えて大量試作で学習ループ", score: 4 },
      { id: "B", label: "完全設計をしてから少数試作", score: 2 },
      { id: "C", label: "競合製品を徹底分解し改良", score: 3 },
      { id: "D", label: "勘どころ掴むまで試作は控える", score: 1 },
      { id: "E", label: "資金ある企業だけの戦略", score: 0 }
    ]
  },
  {
    id: "Q13",
    text: "退屈な会議中、あなたが取りがちな行動は？",
    image: "/assets/einstein.jpg",
    alt:  "退屈な会議",
    options: [
      { id: "A", label: "議題外でも関連仮説メモを書き散らす", score: 4 },
      { id: "B", label: "結論を先取りし要点をまとめる", score: 3 },
      { id: "C", label: "粛々と議事録品質を上げる", score: 2 },
      { id: "D", label: "発言者が終わるのを待つ", score: 1 },
      { id: "E", label: "周りが眠っていないか観察", score: 0 }
    ]
  },
  {
    id: "Q14",
    text: "初めて訪れた街で 1 時間空いたらどうする？",
    image: "/assets/einstein.jpg",
    alt:  "アルベルト・アインシュタイン",
    options: [
      { id: "A", label: "路地を彷徨い体感で地形を掴む", score: 4 },
      { id: "B", label: "書店や資料館で成り立ちを学ぶ", score: 3 },
      { id: "C", label: "カフェで情報収集しプラン作成", score: 2 },
      { id: "D", label: "観光スポットを最短ルートで回る", score: 1 },
      { id: "E", label: "予定外行動はせず待機", score: 0 }
    ]
  },
  {
  id: "Q15",
  text: "締め切りが 1 週間前倒しになったときの初動は？",
  options: [
    { id: "A", label: "要素分解し影響度低い部分を大胆に捨てる", score: 4 },
    { id: "B", label: "優先度を再設定してチームに即共有する", score: 3 },
    { id: "C", label: "人海戦術でカバーする", score: 2 },
    { id: "D", label: "品質を下げてでも締め切りを優先する", score: 1 },
    { id: "E", label: "まず延期交渉を行い作業は保留する", score: 0 }
  ]
}
]