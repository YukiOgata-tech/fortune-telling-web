// QuestionStep.jsx
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

// 画像は public ディレクトリに移動し `/reincarnation-bg.png` で参照推奨

export default function QuestionStep({ question, onSelect }) {
  return (
    <div
      className="
        relative w-full rounded-3xl overflow-hidden shadow-2xl
        min-h-[420px] md:min-h-[480px] flex flex-col items-center justify-center
        ring-2 ring-fuchsia-400/40 ring-offset-2
        bg-gradient-to-br from-blue-900/80 via-fuchsia-800/60 to-slate-900/80
        backdrop-blur-[2px]
      "
    >
      {/* 背景画像レイヤー */}
      <div
        className="absolute inset-0 z-0 opacity-70"
        style={{
          backgroundImage: "url('/public/images/reincarnation-bg.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(1.5px) brightness(0.98)"
        }}
        aria-hidden="true"
      />

      {/* 内容エリア */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-4 py-8">
        <div className="text-xl md:text-2xl font-bold text-white/90 text-center drop-shadow-lg mb-10">
          {question.q}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-xl">
          {question.options.map((opt, idx) => (
            <motion.div
              key={opt.text}
              whileHover={{ scale: 1.04, boxShadow: "0 0 16px #d946ef44" }}
            >
              <Card
                className={`
                  rounded-2xl shadow-2xl p-5 min-h-[68px]
                  flex items-center justify-center cursor-pointer
                  bg-white/80 hover:bg-fuchsia-100/90 transition
                  text-fuchsia-700 text-lg font-semibold
                  border-2 border-fuchsia-300/40 hover:border-fuchsia-400
                `}
                onClick={() => onSelect(idx)}
              >
                {opt.text}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
