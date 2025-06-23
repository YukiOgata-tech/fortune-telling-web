import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const HowGeniusCTA = ({ className = "" }) => {
  const sendGtagEvent = useGtagEvent();

  return (
    <motion.section
      className={`relative flex flex-col h-full w-full bg-white/10 rounded-3xl shadow-xl p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* === 背景イメージレイヤー ================================= */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/CTAs/bg-genius-cta.png')",
          filter: "brightness(0.92) blur(0px)",
        }}
        aria-hidden="true"
      />

      {/* === コンテンツ本体 ================================ */}
      <div className="flex-1 flex flex-col justify-between z-10">
        {/* アイコン + 見出し + 説明 */}
        <div className="flex items-start gap-1 md:gap-4 mb-2">
          <Brain className="md:w-10 md:h-10 w-8 h-8 text-yellow-300 shrink-0" />
          <div className="space-y-2">
            <h2 className="md:text-2xl text-lg font-extrabold tracking-tight text-white leading-snug">
              <span className="md:text-3xl text-2xl text-yellow-200">天才度診断</span>で<br className="sm:hidden md:block" />
              あなたの発想タイプを解析
            </h2>
            <p className="text-white/80 leading-relaxed md:text-base text-sm">
              歴史的・現代の偉人たちの思考をもとにした<span className="font-semibold">15問</span>で
              “世界の見え方”をスキャン。<br />
              あなたの理解度と天才度は...?
            </p>
          </div>
        </div>

        {/* 行動ボタン */}
        <div className="flex justify-center">
          <Link to="/how-much-genius" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-1.5 md:py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-gray-900 font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent("click_genius", {
                  event_category: "CTA",
                  event_label: "GeniusCTA",
                });
              }}
            >
              天才度を診断する
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default HowGeniusCTA;
