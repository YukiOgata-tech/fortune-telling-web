// カテゴリ定義（使い回し用）
export const fortuneCategories = [
  { id: "intuition", name: "直感・創造タイプ", description: "未来志向やインスピレーション重視" },
  { id: "analysis",  name: "分析・戦略タイプ", description: "知性・計画性・問題解決型" },
  { id: "empathy",   name: "共感・調和タイプ", description: "人とのつながりや心の安定を重視" },
];

export const fortuneTypes = [
  // ①直感・創造タイプ
  {
    id: 1,
    name: "光の探求者",
    description: "理想を追い求める直感派",
    color: "#f8e71c",
    icon: "Sun",
    supplement: "今週は理想に一歩近づく直感が冴える日。自分を信じて進みましょう。",
    imageUrl: "/images/types/id01-bg.jpg",
    category: "intuition"
  },
  {
    id: 6,
    name: "月影の予言者",
    description: "感受性が鋭く、直感に優れた神秘派",
    color: "#9b59b6",
    icon: "Moon",
    supplement: "夜の静けさの中でインスピレーションが湧く予感。",
    imageUrl: "/images/types/id06-bg.jpg",
    category: "intuition"
  },
  {
    id: 7,
    name: "風の語り部",
    description: "コミュニケーションに長け、表現力豊かな創造者",
    color: "#00b894",
    icon: "Feather",
    supplement: "言葉に力が宿る日。発信したことが誰かの心に響きます。",
    imageUrl: "/images/types/id07-bg.jpg",
    category: "intuition"
  },
  {
    id: 14,
    name: "雷の創造者",
    description: "インスピレーション豊かで、アイデアを生み出すイノベーター",
    color: "#fdcb6e",
    icon: "Zap",
    supplement: "ひらめきが訪れるタイミング。メモを忘れずに。",
    imageUrl: "/images/types/id14-bg.jpg",
    category: "intuition"
  },
  {
    id: 16,
    name: "銀の魔術師",
    description: "独自の視点を持ち、柔軟な発想ができるクリエイター",
    color: "#b2bec3",
    icon: "Wand2",
    supplement: "型にとらわれない柔軟さがチャンスを呼びます。",
    imageUrl: "/images/types/id16-bg.jpg",
    category: "intuition"
  },
  {
    id: 18,
    name: "楽園の奏者",
    description: "楽しむことを大切にし、周囲を幸せにするエンターテイナー",
    color: "#fab1a0",
    icon: "Music",
    supplement: "楽しいことに積極的に関わることで幸運が舞い込む予感。",
    imageUrl: "/images/types/id18-bg.jpg",
    category: "intuition"
  },
  // ②分析・戦略タイプ
  {
    id: 2,
    name: "静寂の賢者",
    description: "思慮深く内省的な知性派",
    color: "#50e3c2",
    icon: "BookOpen",
    supplement: "自分と向き合うことで新たな発見が。静かな時間を大切に。",
    imageUrl: "/images/types/id02-bg.jpg",
    category: "analysis"
  },
  {
    id: 9,
    name: "星の観測者",
    description: "知識を求め、分析することが得意な研究者",
    color: "#00a8ff",
    icon: "Star",
    supplement: "情報収集や勉強に最適な日。気になるテーマに集中を。",
    imageUrl: "/images/types/id09-bg.jpg",
    category: "analysis"
  },
  {
    id: 11,
    name: "影の策士",
    description: "戦略を考え、状況を冷静に見極めるクール派",
    color: "#636e72",
    icon: "Eye",
    supplement: "計画的に動くことで思いがけない成果が得られます。",
    imageUrl: "/images/types/id11-bg.jpg",
    category: "analysis"
  },
  {
    id: 17,
    name: "影の観測者",
    description: "物事の裏側を見抜き、分析力に優れた洞察派",
    color: "#576574",
    icon: "EyeOff",
    supplement: "普段見落としていたことに気付ける一日となりそう。",
    imageUrl: "/images/types/id17-bg.jpg",
    category: "analysis"
  },
  {
    id: 8,
    name: "太陽の導き手",
    description: "周囲に光をもたらし、元気づけるポジティブ派",
    color: "#fbc531",
    icon: "Sunrise",
    supplement: "あなたの明るさが周囲を照らし、良い流れを生み出します。",
    imageUrl: "/images/types/id08-bg.jpg",
    category: "analysis"
  },
  {
    id: 12,
    name: "炎の守護者",
    description: "情熱と正義感を持ち、人を守る使命感が強いリーダー",
    color: "#e17055",
    icon: "ShieldCheck",
    supplement: "仲間や家族との絆が深まる日。サポート役に徹して吉。",
    imageUrl: "/images/types/id12-bg.jpg",
    category: "analysis"
  },
  // ③共感・調和タイプ
  {
    id: 3,
    name: "情熱の炎",
    description: "エネルギッシュで行動的なリーダータイプ",
    color: "#ff4e50",
    icon: "Flame",
    supplement: "情熱を持って進むほど、周囲を巻き込む力が高まります。",
    imageUrl: "/images/types/id03-bg.jpg",
    category: "empathy"
  },
  {
    id: 4,
    name: "夢見る旅人",
    description: "自由を愛し、未知の世界を求める冒険家",
    color: "#7ed6df",
    icon: "Compass",
    supplement: "冒険心が運を引き寄せます。新しい世界へ一歩踏み出しましょう。",
    imageUrl: "/images/types/id04-bg.jpg",
    category: "empathy"
  },
  {
    id: 5,
    name: "大地の守護者",
    description: "安定を好み、周囲を支える実務派",
    color: "#b8e994",
    icon: "Shield",
    supplement: "地に足をつけて着実に進むことで、信頼が積み重なります。",
    imageUrl: "/images/types/id05-bg.jpg",
    category: "empathy"
  },
  {
    id: 10,
    name: "水の共感者",
    description: "感受性豊かで、人の気持ちを深く理解するヒーラー",
    color: "#00cec9",
    icon: "Droplet",
    supplement: "誰かの悩みに寄り添うことで自分自身も癒されるでしょう。",
    imageUrl: "/images/types/id10-bg.jpg",
    category: "empathy"
  },
  {
    id: 13,
    name: "森の案内人",
    description: "自然を愛し、心の調和を大切にする癒し系",
    color: "#00b894",
    icon: "TreePine",
    supplement: "自然の中でリラックスすると心身が浄化されます。",
    imageUrl: "/images/types/id13-bg.jpg",
    category: "empathy"
  },
  {
    id: 15,
    name: "砂漠の旅人",
    description: "逆境に強く、どんな状況でも生き抜くサバイバー",
    color: "#e1b382",
    icon: "Map",
    supplement: "困難も経験値に変わる日。自信を持って進みましょう。",
    imageUrl: "/images/types/id15-bg.jpg",
    category: "empathy"
  }
];
