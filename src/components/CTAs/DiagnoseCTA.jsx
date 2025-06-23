import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const DiagnoseCTA = ({ className = "" }) => {
  const sendGtagEvent = useGtagEvent();

  return (
    <motion.section
      className={`relative flex flex-col h-full w-full bg-white/10 rounded-3xl shadow-xl p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* 背景画像レイヤー */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/hero-bg-content01.png')",
          filter: "brightness(0.95) blur(0px)",
        }}
        aria-hidden="true"
      />
      {/* メインコンテンツ: flex-1で上部に寄せる */}
      <div className="flex-1 flex flex-col justify-between z-10">
        {/* アイコン + テキスト */}
        <div className="flex items-start gap-4 mb-2">
          <BrainCircuit className="md:w-10 md:h-10 w-8 h-8 text-indigo-400 shrink-0" />
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              <span className="text-3xl text-indigo-200">性格診断</span>で<br className="sm:hidden md:block" />
              本当の自分を発見
            </h2>
            <p className="text-white/80 leading-relaxed">
              18タイプ×3カテゴリの質問で、直感・思考・感情からあなたの「隠れた性格傾向」を徹底解析。<br />
              近未来UIとともに、知らなかった自分の新たな一面・才能・バイアスを可視化します。
            </p>
          </div>
        </div>
        {/* 行動ボタン */}
        <div>
          <Link to="/diagnose" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_diagnose', {
                  event_category: 'CTA',
                  event_label: 'DiagnoseCTA',
                });
              }}
            >
              性格診断を始める
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default DiagnoseCTA;
