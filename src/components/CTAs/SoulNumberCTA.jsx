import { Link } from "react-router-dom";
import { Diameter } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const SoulNumberCTA = ({ className = "" }) => {
  const sendGtagEvent = useGtagEvent();

  return (
    <motion.section
      className={`relative flex flex-col h-full w-full bg-white/10 rounded-3xl shadow-xl p-8 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('/images/CTAs/bg-soul-cta.png')",
          filter: "brightness(0.9)",
        }}
        aria-hidden="true"
      />
      <div className="flex-1 flex flex-col justify-between z-10">
        <div className="flex items-start gap-1 md:gap-4 mb-2">
          <Diameter className="md:w-10 md:h-10 w-8 h-8 text-cyan-300 shrink-0" />
          <div className="space-y-2">
            <h2 className="md:text-2xl text-lg font-extrabold tracking-tight text-white">
              <span className="md:text-3xl text-2xl text-indigo-200">ソウルナンバー</span>で
              <br className="sm:hidden md:block" />
              あなたの本質を探る
            </h2>
            <p className="text-white/80 leading-relaxed md:text-base text-sm">
              生年月日を入力で、あなたが生まれ持ったミッションや才能が浮かび上がります。<br className="hidden md:block" />
              あなたの結果と同じナンバーの著名人も一緒にチェック！
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/soul-number" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-1.5 md:py-3 rounded-xl bg-gradient-to-r from-indigo-300/80 to-blue-600/70 text-white font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_soulNumber', {
                  event_category: 'CTA',
                  event_label: 'SoulNumberCTA',
                });
              }}
            >
              診断を始める
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default SoulNumberCTA;
