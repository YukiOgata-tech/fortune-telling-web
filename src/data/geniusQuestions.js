// geniusQuestions.js
// 各 option は { id, label, score }

export const geniusQuestions = [
  {
    id: "Q1",
    text: "世の中の一般論やルールについて最もあなたの考えに近いものを答えよ。",
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
    image: "https://divnil.com/wallpaper/ipad/img/app/a/l/albert-einstein-hd-wallpaper-iphone_a790e5937af5a2f6c12f61687aca3032_raw.jpg",
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
    image: "https://s.eximg.jp/exnews/feed/Karapaia/Karapaia_52301337_b1c7_1.jpg",
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
    text: "エイダ・ラブレスの『Poetical Science(詩的科学)』に最も近い姿勢は？",
    image: "https://th.bing.com/th/id/R.fa14f204e9e0b2c21c0a4c5e4b0cdacc?rik=acToYM3rTt0j6Q&riu=http%3a%2f%2fwww.historyanswers.co.uk%2fwp-content%2fuploads%2f2015%2f10%2fAda_Lovelace_portrait-1024x858.jpg&ehk=wAM3hCQSYkmsWW%2fskVhHMHEp6mW0SPQdT5NAIC9MmcY%3d&risl=&pid=ImgRaw&r=0",
    alt:  "エイダ・ラブレス",
    options: [
      { id: "A", label: "学問で重要なことは、世界の中で他分野を融合し新事実を見出すこと", score: 4 },
      { id: "B", label: "理論や事実に、創造的な直感や比喩的表現を積極的に取り入れ、真実を探求", score: 3 },
      { id: "C", label: "過程重視でアイデアや発想は付加価値である", score: 2 },
      { id: "D", label: "主観や感性ではなく、客観性や論理的思考を最優先", score: 1 },
      { id: "E", label: "論理や数値だけですべてを説明できると信じる", score: 0 }
    ]
  },
  {
    id: "Q5",
    text: "「どんな権威の言うことも鵜呑みにするな。自分自身で考えよ。」といった天才物理学者ファインマンに近い考えは？",
    image: "https://th.bing.com/th/id/OIP.VY7GKb47g1_Q5pNUil-TaAAAAA?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    alt:  "ファインマン",
    options: [
      { id: "A", label: "強い好奇心を持ち、解けない問いを持ち続け、研究を組む", score: 4 },
      { id: "B", label: "納得できなければ正解でも保留", score: 3 },
      { id: "C", label: "合意解があれば進めるのが無難", score: 2 },
      { id: "D", label: "速さ優先で FAQ を使う", score: 1 },
      { id: "E", label: "他者の回答をコピペで済ます、そこに好奇心は重要ではない", score: 0 }
    ]
  },
  {
    id: "Q6",
    text: "スティーブ・ジョブズの『Connecting the Dots』を実践するなら？",
    image: "https://th.bing.com/th/id/R.ea38e20eadfc52466d592449a7a34c27?rik=ec9362SrOkXqVQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-FM4eKKmWTSs%2fTpOQAttKlSI%2fAAAAAAAAABA%2fEowEr4W1DzI%2fs1600%2fsteve-jobs.jpg&ehk=PBLPCiGmMaHMF8QhbWK%2fQPcP1BZrViutYTCNuB7krXM%3d&risl=&pid=ImgRaw&r=0",
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
    image: "https://media.wired.jp/photos/671734bed6e461928d526c90/master/w_2560%2Cc_limit/GettyImages-1499013102.jpg",
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
    image: "https://th.bing.com/th/id/OIP._Ant9pZVTVYKJd9PVcCeowHaKE?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    alt:  "キュリー",
    options: [
      { id: "A", label: "危険領域でも原理を掴めば自ら実験する", score: 4 },
      { id: "B", label: "安全基準を確立してから実験する", score: 3 },
      { id: "C", label: "低リスクな範囲で試す", score: 2 },
      { id: "D", label: "未知は専門家に任せる", score: 1 },
      { id: "E", label: "未知は避けるべきではないか", score: 0 }
    ]
  },
  {
    id: "Q9",
    text: "ニコラ・テスラの“頭内 3D 設計”スタイルに最も近いのは？",
    image: "https://www.thefamouspeople.com/profiles/images/nikola-tesla-12.jpg",
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
    image: "https://tse3.mm.bing.net/th?id=OIP.TxPs-OzhDaYCGMYrW13KKgHaI1&pid=15.1",
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
    image: "https://risk.ismcdn.jp/mwimgs/9/d/1340m/img_9ddb9e5b3f34426ecb1ef7859e0a522a105943.jpg",
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
    image: "https://archive.mfj.or.jp/hof/images/souichiro-honda.png",
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