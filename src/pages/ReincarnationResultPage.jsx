import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hourglass } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultPage({ result, onRestart }) {
  return (
    <div className="
      min-h-[480px] w-full rounded-3xl shadow-2xl flex flex-col items-center justify-center py-10
      bg-gradient-to-br from-blue-950/90 via-fuchsia-800/50 to-slate-950/60
      ring-2 ring-fuchsia-400/40 ring-offset-2
    ">
      {/* タイトル・アイコン */}
      <motion.div
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <Hourglass className="w-8 h-8 md:w-10 md:h-10 text-fuchsia-200 drop-shadow" />
        <div className="text-xl md:text-2xl font-extrabold text-fuchsia-100 drop-shadow">
          あなたの前世タイプは…
        </div>
      </motion.div>

      {/* 結果カード */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5, type: "spring" }}
        className="w-full max-w-xl"
      >
        <Card className="
          rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col items-center
          bg-white/80 backdrop-blur-md border-2 border-fuchsia-200/40
        ">
          <div className="text-3xl md:text-4xl font-extrabold text-fuchsia-700 mb-2 text-center drop-shadow">
            {result.name}
          </div>
          <div className="text-base md:text-lg mb-1 text-fuchsia-800 font-semibold">
            （タイプ: {result.type}）
          </div>
          <div className="text-md md:text-xl text-center text-gray-700/90 mt-2">
            {result.description}
          </div>
        </Card>
      </motion.div>

      {/* 再診断ボタン */}
      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          onClick={onRestart}
          className="rounded-xl px-6 py-3 text-lg bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-semibold shadow-lg"
        >
          もう一度診断する
        </Button>
      </motion.div>
    </div>
  );
}
