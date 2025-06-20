import { Link } from "react-router-dom";
import { Baby } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";


const ReincarnationCTA = ({ className = "" }) => {
  const sendGtagEvent = useGtagEvent();

  return (
    <motion.section
      className={`
        relative w-full max-w-2xl mx-auto rounded-3xl shadow-xl overflow-hidden
        p-8 flex flex-col md:flex-row items-center gap-4 md:gap-10
        ${className}
      `}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* 軽い星空レイヤー */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-900/30 via-fuchsia-600/20 to-blue-700/10 opacity-60"
        aria-hidden="true"
      />
      {/* 背景画像レイヤー */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/CTAs/bg-reincarnation-cta.png')",
          filter: "brightness(0.92) blur(0px)",
        }}
        aria-hidden="true"
      />
      {/* 内容 */}
      <div className="relative z-10 flex items-start gap-4 flex-1 text-center md:text-left">
        <Baby className="md:w-10 md:h-10 w-8 h-8 text-fuchsia-300 shrink-0 animate-pulse" />
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
            <span className="text-3xl text-fuchsia-200">前世診断</span>で<br className="md:hidden" />
            真の自分を探そう
          </h2>
          <p className="text-white/90 leading-relaxed drop-shadow">
            あなたの前世は偉人？動物？それとも伝説の…？<br />
            質問に答えるだけで、100種超の中から“前世”が判明！<br />
            あなたの新しい一面、のぞいてみませんか？
          </p>
        </div>
      </div>
      {/* ボタン */}
      <Link to="/reincarnation" className="w-full md:w-auto relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-semibold shadow-md"
          onClick={() => {
            sendGtagEvent('click_reincarnation', {
            event_category: 'CTA',
            event_label: 'ReincarnationCTA',
            });
          }}
        >
          前世を診断する
        </motion.button>
      </Link>
    </motion.section>
  );
};

export default ReincarnationCTA;
