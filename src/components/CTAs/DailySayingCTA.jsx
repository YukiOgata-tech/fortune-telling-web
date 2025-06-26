import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const DailySayingCTA = ({ className = "" }) => {
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
          backgroundImage: "url('/images/CTAs/bg-dailysaying-cta.png')",
          filter: "brightness(0.9)",
        }}
        aria-hidden="true"
      />
      {/* === コンテンツ ========================== */}
      <div className="flex-1 flex flex-col justify-between z-10">
        <div className="flex items-start gap-1 md:gap-4 mb-2">
          <Flame className="md:w-10 md:h-10 w-8 h-8 text-red-500 shrink-0" />
          <div className="space-y-2">
            <h2 className="md:text-2xl text-lg font-extrabold tracking-tight text-white leading-snug">
              <span className="md:text-3xl text-2xl text-red-300">今日の名言診断</span>で<br className="sm:hidden md:block" />
              今のあなたに贈る一言
            </h2>
            <p className="text-white/80 leading-relaxed md:text-base text-sm">
              誕生日と名前を入力するだけで、<br />
              <span className="font-semibold">毎日あなた専用の格言や名言</span>が届きます。<br className="hidden md:block" />
              その日の気分やヒントを得て、特別な1日にしよう！
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/dailysaying" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-1.5 md:py-3 rounded-xl bg-gradient-to-r from-yellow-200/90 to-indigo-400/80 text-gray-900 font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_dailysaying', {
                  event_category: 'CTA',
                  event_label: 'DailySayingCTA',
                });
              }}
            >
              今日の名言を診断する
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default DailySayingCTA;
