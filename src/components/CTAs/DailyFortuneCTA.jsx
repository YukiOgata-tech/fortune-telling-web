import { Link } from "react-router-dom";
import { CalendarCheck2 } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const DailyFortuneCTA = ({ className = "" }) => {
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
          backgroundImage: "url('/images/CTAs/bg-daily-cta.png')",
          filter: "brightness(0.92) blur(0px)",
        }}
        aria-hidden="true"
      />
      {/* コンテンツ本体 */}
      <div className="flex-1 flex flex-col justify-between z-10">
        <div className="flex items-start gap-1 md:gap-4 mb-2">
          <CalendarCheck2 className="md:w-10 md:h-10 w-8 h-8 text-fuchsia-400 shrink-0" />
          <div className="space-y-2">
            <h2 className="md:text-2xl text-lg font-extrabold tracking-tight text-white">
              <span className="md:text-3xl text-2xl text-yellow-200">今日の運勢</span>をひと目で
            </h2>
            <p className="text-white/80 leading-relaxed md:text-base text-sm">
              慌ただしい毎日に、ほんの少しの指針を。
              簡単な入力で恋愛・金運・仕事・健康、そして総合運をチェックできます。<br/>
              一日のはじまりに、静かに背中を押してくれるメッセージを受け取ってみませんか。
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/daily" className="w-full md:w-auto relative z-10 items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-1.5 md:py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_daily_fortune', {
                  event_category: 'CTA',
                  event_label: 'DailyFortuneCTA',
                });
              }}
            >
              今日の運勢を見る
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default DailyFortuneCTA;
