import { Link } from "react-router-dom";
import { Diameter } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const SoulNumberCTA = ({ className = "" }) => {
    const sendGtagEvent = useGtagEvent();
  
  return (
    <motion.section
      className={`relative w-full max-w-2xl mx-auto bg-white/10 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-4 md:gap-10 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* 背景レイヤー */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('/images/CTAs/bg-soul-cta.png')",
          filter: "brightness(0.9)",
        }}
        aria-hidden="true"
      />

      {/* テキスト＆アイコン */}
      <div className="flex items-start gap-4 flex-1 text-center md:text-left z-10">
        <Diameter className="md:w-10 md:h-10 w-8 h-8 text-cyan-300 shrink-0" />
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            <span className="text-3xl text-indigo-200">ソウルナンバー</span>で
            <br className="hidden md:block" />
            あなたの本質を探る
          </h2>
          <p className="text-white/80 leading-relaxed">
            生年月日を入力で、あなたが生まれ持った<br />
            ミッションや才能が浮かび上がります。<br className="hidden md:block" />
            同じナンバーの著名人も一緒にチェック！
          </p>
        </div>
      </div>

      {/* 行動ボタン */}
      <Link to="/soul-number" className="w-full md:w-auto relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-300/80 to-blue-600/70 text-white font-semibold shadow-md"
          // button event counting!!
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
    </motion.section>
  );
};

export default SoulNumberCTA;
