import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// 画像パス（3つ）
const images = [
  "/images/benefit-mail.png",        // daily占いメール通知
  "/images/benefit-result.png",      // 診断結果表示
  "/images/benefit-future.png",      // 今後のコンテンツ
];

const items = [
  {
    title: "毎日の運勢をメールでお届け",
    desc: "登録で、あなた専用のdaily占い通知を毎朝メールで受け取れます。大事な運勢を見逃しません。",
    img: images[0],
    alt: "メールで運勢通知イラスト"
  },
  {
    title: "あなた専用の結果ページ",
    desc: "当サイトメインコンテンツの診断結果をいつでも見返せます。振り返りもカンタン！",
    img: images[1],
    alt: "診断結果カードのイラスト"
  },
  {
    title: "今後のサービスupdateに対応！",
    desc: "今後、ユーザー限定の新コンテンツや体験がどんどん追加予定。登録しておけば常に最新の情報を受け取れます。",
    img: images[2],
    alt: "未来のアップデートイメージ"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.18, duration: 0.5, type: "spring" }
  })
};

const LoginBenefits = () => {
  return (
    <section className="py-6 sm:12 px-4 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-wide text-white yusei-magic-regular"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring" }}
      >
        ログインで<br className="sm:hidden" />なにができる？
      </motion.h2>
      <div className="flex flex-col gap-8">
  {items.map((item, i) => (
    <motion.div
      key={item.title}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
    >
      <Card className="rounded-2xl bg-gradient-to-br from-[#2a2d46]/80 to-[#181b34]/70 shadow-lg border-0 w-full flex flex-col items-center">
        <CardContent className="w-full p-0">
          {/* 上段2カラム（画像＋タイトル） */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-7 py-2 md:py-6 px-4 w-full">
            <div className="w-24 h-24 sm:w-28 sm:h-28  flex-shrink-0 flex items-center justify-center">
              <img
                src={item.img}
                alt={item.alt}
                className="w-full h-full object-contain rounded-xl shadow-lg bg-white/10"
                loading="lazy"
              />
            </div>
            <h3 className="text-2xl font-bold text-white drop-shadow text-center md:text-left">
              {item.title}
            </h3>
          </div>
          {/* 下段（説明文） */}
          <div className="w-full pb-7 px-4 flex items-center justify-center">
            <p className="text-base text-white/80 text-center leading-relaxed">
              {item.desc}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>

    </section>
  );
};

export default LoginBenefits;
