import { Link } from "react-router-dom";
import { Bug } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const IfYouWereInsectCTA = ({ className = "" }) => {
  const sendGtagEvent = useGtagEvent();

  return (
    <motion.section
      className={`relative flex flex-col h-full w-full bg-white/10 rounded-3xl shadow-xl p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* === 背景イメージレイヤー ========================== */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('/images/CTAs/bg-insect-cta.png')",
          filter: "brightness(0.8)",
        }}
        aria-hidden="true"
      />
      {/* === コンテンツ ========================== */}
      <div className="flex-1 flex flex-col justify-between z-10">
        {/* アイコン + テキスト */}
        <div className="flex items-start gap-1 md:gap-4 mb-2">
          <Bug className="md:w-10 md:h-10 w-8 h-8 text-green-400 shrink-0" />
          <div className="space-y-2">
            <h2 className="md:text-2xl text-lg font-extrabold tracking-tight text-white leading-snug">
              <span className="md:text-3xl text-2xl text-green-200">あなたがもし虫なら診断</span>で<br className="sm:hidden md:block" />
              あなたの本能を探る
            </h2>
            <p className="text-white/80 leading-relaxed md:text-base text-sm">
              誕生日から、あなたの本能や性質を虫に例えて診断します。<br />
              <span className="font-semibold">カブトムシ？蝶？それとも…？</span><br className="hidden md:block" />
              あなたの隠れた一面を発見しよう！
            </p>
          </div>
        </div>
        {/* 行動ボタン */}
        <div className="flex justify-center">
          <Link to="/if-you-were-insect" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-1.5 md:py-3 rounded-xl bg-gradient-to-r from-green-500 to-cyan-600 text-white font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_insect_diagnose', {
                  event_category: 'CTA',
                  event_label: 'IfYouWereInsectCTA',
                });
              }}
            >
              あなたの虫タイプを診断する
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default IfYouWereInsectCTA;
