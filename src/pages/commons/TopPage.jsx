import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DiagnoseCTA from "@/components/CTAs/DiagnoseCTA";
import DailyFortuneCTA from "@/components/CTAs/DailyFortuneCTA";
import WealthFortuneCTA from "@/components/CTAs/WealthFortuneCTA";
import TarashidoCTA from "@/components/CTAs/TarashidoCTA";
import ReincarnationCTA from "@/components/CTAs/ReincarnationCTA";
import SoulNumberCTA from "@/components/CTAs/SoulNumberCTA";
import HowGeniusCTA from "@/components/CTAs/HowGeniusCTA";
import Seo from "@/components/Seo";

const CTAS = [
  <DiagnoseCTA key="diagnose" />,
  <DailyFortuneCTA key="daily" />,
  <WealthFortuneCTA key="wealth" />,
  <TarashidoCTA key="tarashido" />,
  <ReincarnationCTA key="reincarnation" />,
  <SoulNumberCTA key="soulnumber" />,
  <HowGeniusCTA key="howgenius" />,
];

const TopPage = () => {
  return (
    <div className="min-h-screen text-white">
      <Seo
        title="Neo-Oracle | あなたのための診断・占いサイト"
        description="近未来的UIで性格診断・各種占いを体験。安心・無料でユーザー参加型の自己分析。"
      />

      {/* ヒーローバナー */}
      <section className="relative w-full flex flex-col items-center justify-center h-[40vh] md:h-[60vh] py-12 overflow-hidden ">
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-bl from-indigo-800/30 via-fuchsia-700/20 to-black/30 opacity-65"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 drop-shadow-xl hidden">
            Neo-Oracle
          </h1>
          <p className="text-lg md:text-3xl font-semibold text-white/90 mb-6 yuji-mai-regular">
            多ジャンルの診断・占いで“今”の自分を知ろう
          </p>
          {/* バナー */}
          <div className="w-[360px] md:w-[500px] lg:w-[700px] h-[220px] md:h-[300px] lg:h-[380px] rounded-xl bg-gray-700/30 flex items-center justify-center shadow-2xl mb-2">
            <img
              src="/images/Top-banner.png" // 生成画像のパス
              alt="NEO ORACLE バナー"
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* CTAグリッド */}
      <section className="max-w-5xl mx-auto px-2 py-4 ">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 auto-rows-fr"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18 },
            },
          }}
        >
          {CTAS.map((C, i) => (
            <motion.div
              className="w-full"
              key={i}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 80, damping: 18 }}
            >
              {C}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* アカウント登録/ログイン誘導 */}
      <section className="max-w-2xl mx-auto rounded-3xl bg-white/10 shadow-lg p-8 mt-4 mb-10 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-3 text-fuchsia-200 dotgothic16-regular">
            アカウント登録・ログインのご案内
          </h2>
          <ul className="mb-3 list-disc list-inside text-white/90">
            <li>
              一部コンテンツの診断が、より<strong>スムーズ</strong>に利用可能
            </li>
            <li>
              診断結果の<strong>記録・管理</strong>
              ができ、マイページでいつでも確認
            </li>
            <li>
              診断ごとの<strong>コメント参加</strong>も楽しめます
            </li>
            <li>
              すべて<strong>無料</strong>でご利用いただけます
            </li>
          </ul>
          <p className="mb-2 text-white/70">
            個人情報は厳重に管理し、プライバシーを最優先します。
            <Link
              to="/privacypolicy"
              className="underline text-fuchsia-300 ml-1 hover:text-indigo-200 transition "
            >
              プライバシーポリシー
            </Link>
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              to="/register"
              className="inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500/30 to-fuchsia-600/30 font-semibold hover:scale-105 transition shadow dotgothic16-regular"
            >
              新規登録
            </Link>
            <Link
              to="/login/to/neo-oracle"
              className="inline-block px-5 py-2 rounded-xl bg-white/20 font-semibold hover:scale-105 transition shadow border border-fuchsia-300 text-fuchsia-100 dotgothic16-regular"
            >
              ログイン
            </Link>
          </div>
        </motion.div>
      </section>

      {/* サイト説明・信頼感 */}
      <section className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-8 mb-16 shadow-md backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-4">Neo-Oracleについて</h2>
          <p className="text-lg mb-2 text-white/90">
            Neo-Oracleは、性格診断や各種占いを、心理学や統計・AI技術を活かして現代的に再構成した新しい自己分析サイトです。
          </p>
          <p className="text-base text-gray-300 mb-2">
            「当たり外れ」だけで終わらない、本質的な自己理解と未来への指針を提供。
            <br />
            安心してご利用いただけるよう、
            <strong>最新のセキュリティと厳重なプライバシー管理</strong>
            を徹底しています。
          </p>
          <p className="text-base text-gray-400">
            どなたでも気軽に、深く自分を知り、行動のきっかけを見つけてほしい。
            <br />
            そんな想いでサービスを運営しています。
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default TopPage;
