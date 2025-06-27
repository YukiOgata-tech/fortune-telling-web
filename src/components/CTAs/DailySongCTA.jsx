import { Link } from "react-router-dom";
import { Music4 } from "lucide-react"; // Musicアイコンを使用
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const TodaySongCTA = ({ className = "" }) => {
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
      {/* ご自身のプロジェクトに合った画像パスに変更してください */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('/images/CTAs/bg-dailysong-cta.png')",
          filter: "brightness(0.8)",
        }}
        aria-hidden="true"
      />
      {/* === コンテンツ ========================== */}
      <div className="flex-1 flex flex-col justify-between z-10">
        {/* アイコン + テキスト */}
        <div className="flex items-start gap-1 md:gap-4 mb-2">
          <Music4 className="md:w-10 md:h-10 w-8 h-8 text-cyan-400 shrink-0" />
          <div className="space-y-2">
            <h2 className="md:text-2xl text-lg font-extrabold tracking-tight text-white leading-snug">
              <span className="md:text-3xl text-2xl text-cyan-200">今日の歌 診断</span>で<br className="sm:hidden md:block" />
              あなたの心に響く一曲を
            </h2>
            <p className="text-white/80 leading-relaxed md:text-base text-sm">
              誕生日を入力するだけで、<br />
              <span className="font-semibold">今日のあなたにピッタリな3曲</span>をAIが毎日セレクト。<br className="hidden md:block" />
              新しい音楽との出会いが、あなたの一日を彩ります。
            </p>
          </div>
        </div>
        {/* 行動ボタン */}
        <div className="flex justify-center">
          <Link to="/dailysong" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-1.5 md:py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_dailysong', {
                  event_category: 'CTA',
                  event_label: 'dailySongCTA',
                });
              }}
            >
              今日の歌を診断する
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default TodaySongCTA;
