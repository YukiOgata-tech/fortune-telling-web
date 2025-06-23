import { Link } from "react-router-dom";
import { Gem } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const WealthFortuneCTA = ({ className = "" }) => {
  const sendGtagEvent = useGtagEvent();

  return (
    <motion.section
      className={`relative flex flex-col h-full w-full rounded-3xl shadow-xl overflow-hidden p-8 bg-white/10 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/CTAs/bg-wealth-cta.png')",
          filter: "brightness(0.92) blur(0px)",
        }}
        aria-hidden="true"
      />
      <div className="flex-1 flex flex-col justify-between z-10">
        <div className="flex items-start gap-4 mb-2">
          <Gem className="md:w-10 md:h-10 w-8 h-8 text-yellow-300 shrink-0 drop-shadow-glow animate-pulse" />
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
              <span className="text-3xl text-yellow-200">生涯年収</span>を診断しよう
            </h2>
            <p className="text-white/90 leading-relaxed drop-shadow">
              あなたに眠る価値はどれほど大きい？
              簡単な質問に答え、生涯金運を大胆予測！<br />
              一歩踏み出すきっかけに、未来の可能性をのぞいてみませんか？
            </p>
          </div>
        </div>
        <div>
          <Link to="/fortune-wealth" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-500 text-yellow-900 font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_wealth_fortune', {
                  event_category: 'CTA',
                  event_label: 'WealthFortuneCTA',
                });
              }}
            >
              生涯年収を診断する
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default WealthFortuneCTA;
