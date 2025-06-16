import { Link } from "react-router-dom";
import { Gem } from "lucide-react";
import { motion } from "framer-motion";



const WealthFortuneCTA = ({ className = "" }) => {
  return (
    <motion.section
      className={`
        relative w-full max-w-2xl mx-auto  rounded-3xl shadow-xl overflow-hidden
        p-8 flex flex-col md:flex-row items-center gap-4 md:gap-10
        ${className}
      `}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* 背景画像レイヤー */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/images/bg-wealth-cta.png')",
          filter: "brightness(0.92) blur(0px)",
        }}
        aria-hidden="true"
      />
      {/* 前景の内容 */}
      <div className="relative z-10 flex items-start gap-4 flex-1 text-center md:text-left">
        <Gem className="md:w-10 md:h-10 w-8 h-8 text-yellow-300 shrink-0 drop-shadow-glow animate-pulse" />
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
            <span className="text-3xl text-yellow-200">生涯年収の可能性</span>を診断しよう
          </h2>
          <p className="text-white/90 leading-relaxed drop-shadow">
            あなたに眠る“金運の器”はどれほど大きい？<br />
            簡単な質問に答え、エンタメ感たっぷりに生涯金運を大胆予測！<br />
            一歩踏み出すきっかけに、あなたの未来の可能性をのぞいてみませんか。
          </p>
        </div>
      </div>
      {/* 行動ボタン */}
      <Link to="/fortune-wealth" className="w-full md:w-auto relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-500 text-yellow-900 font-semibold shadow-md"
        >
          未来の金運を診断する
        </motion.button>
      </Link>
    </motion.section>
  );
};

export default WealthFortuneCTA;
