import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const LoveCompatibilityCTA = ({ className = "" }) => {
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
      {/* 背景画像はご自身のプロジェクトのパスに合わせて変更してください */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: "url('/images/CTAs/bg-love-cta.png')",
          filter: "brightness(0.8)",
        }}
        aria-hidden="true"
      />
      {/* === コンテンツ ========================== */}
      <div className="flex-1 flex flex-col justify-between z-10">
        {/* アイコン + テキスト */}
        <div className="flex items-start gap-1 md:gap-4 mb-2">
          <HeartHandshake className="md:w-10 md:h-10 w-8 h-8 text-pink-400 shrink-0" />
          <div className="space-y-2">
            <h2 className="md:text-2xl text-lg font-extrabold tracking-tight text-white leading-snug">
              <span className="md:text-3xl text-2xl text-pink-200">恋するふたりの相性診断</span>で<br className="sm:hidden md:block" />
              あの人との絆を知る
            </h2>
            <p className="text-white/80 leading-relaxed md:text-base text-sm">
              あなたと、気になるお相手の名前と誕生日を入力するだけ。<br />
              <span className="font-semibold">ふたりの相性度をパーセントで診断</span>し、関係を深めるヒントを探ります。
            </p>
          </div>
        </div>
        {/* 行動ボタン */}
        <div className="flex justify-center">
          <Link to="/love-compatibility" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-1.5 md:py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_love_compatibility', {
                  event_category: 'CTA',
                  event_label: 'LoveCompatibilityCTA',
                });
              }}
            >
              相性診断を始める
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default LoveCompatibilityCTA;
