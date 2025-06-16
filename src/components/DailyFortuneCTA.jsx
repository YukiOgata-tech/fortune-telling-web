import { Link } from "react-router-dom";
import { CalendarCheck2 } from "lucide-react";
import { motion } from "framer-motion";

/*
  DailyFortuneCTA ― トップページに挿入する案内コンポーネント。
  - 落ち着いた導入文でユーザーの興味を喚起
  - /daily へのリンクボタン
  - Tailwind でレスポンシブ対応（縦→横レイアウト）
  - さりげないアニメーションで注目を集める
*/

const DailyFortuneCTA = ({ className = "" }) => {
  return (
    <motion.section
      className={`relative w-full max-w-2xl mx-auto  bg-white/10 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-4 md:gap-10 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* 背景画像レイヤー */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/bg-daily-cta.png')",
          filter: "brightness(0.92) blur(0px)",
        }}
        aria-hidden="true"
      />
      {/* アイコン + テキスト */}
      <div className="flex items-start gap-4 flex-1 text-center md:text-left">
        <CalendarCheck2 className="md:w-10 md:h-10 w-8 h-8 text-fuchsia-400 shrink-0" />
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            <span className="text-3xl text-yellow-200 ">今日の運勢</span>をひと目で
          </h2>
          <p className="text-white/80 leading-relaxed">
            慌ただしい毎日に、ほんの少しの指針を。
            簡単な入力で恋愛・金運・仕事・健康、そして総合運をチェックできます。<br/>
            一日のはじまりに、静かに背中を押してくれるメッセージを受け取ってみませんか。
          </p>
        </div>
      </div>

      {/* 行動ボタン */}
      <Link to="/daily" className="w-full md:w-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-semibold shadow-md"
        >
          今日の運勢を見る
        </motion.button>
      </Link>
    </motion.section>
  );
};

export default DailyFortuneCTA;
