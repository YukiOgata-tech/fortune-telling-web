import React from "react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/data/main-content/questions";
import { fortuneTypes } from "@/data/main-content/fortuneTypes";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// 質問リストをシャッフル
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Questionnaire = () => {
  const navigate = useNavigate();
  // シャッフル済み質問を最初に生成
  const shuffledQuestions = useMemo(() => shuffleArray(questions), []);
  const [step, setStep] = useState(0); // 現在の質問番号
  const [scores, setScores] = useState({});
  const [biasTotal, setBiasTotal] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false); // アニメ用

  const total = shuffledQuestions.length;

  // 質問に答えた時の処理
  const handleAnswer = (option) => {
    // スコア加算
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([typeId, pt]) => {
      newScores[typeId] = (newScores[typeId] || 0) + pt;
    });
    setScores(newScores);
    setBiasTotal((prev) => prev + (option.biasPoint || 0));

    // 次へ進むアニメーション開始
    setIsTransitioning(true);

    setTimeout(() => {
      if (step + 1 === total) {
        // 結果ページへ
        const sorted = Object.entries(newScores)
          .map(([typeId, value]) => ({
            typeId: Number(typeId),
            value,
            type: fortuneTypes.find((t) => t.id === Number(typeId)),
          }))
          .filter((x) => !!x.type)
          .sort((a, b) => b.value - a.value);
        const topTypes = sorted.slice(0, 3);
        navigate("/result", { state: { topTypes, biasTotal } });
      } else {
        setStep((prev) => prev + 1);
        setIsTransitioning(false);
      }
    }, 450); // アニメーション終了を待つ
  };

  // 質問中
  if (step < total) {
    const q = shuffledQuestions[step];

    return (
      // 画面全体の未来感グラデ背景
      <div className="min-h-screen flex items-center justify-center bg-fuchsia-200/0 transition-colors duration-400 p-1">
        {/* ガラス風のメインカード */}
        <motion.div
          className="max-w-xl w-full p-8 rounded-3xl bg-white/40 shadow-[0_8px_32px_0_rgba(63,56,175,0.3)] border border-fuchsia-400/40 backdrop-blur-2xl relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {/* 質問番号・進捗バー */}
          <div className="flex items-center mb-4 gap-3">
            {/* Q番号 + アイコン */}
            <motion.div
              className="text-xl font-bold text-fuchsia-600 tracking-wider flex items-center gap-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              Q{step + 1}
            </motion.div>
            {/* 進捗バー */}
            <div className="flex-1 mx-2">
              <div className="h-2 bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-sky-400 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 bg-white/80"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / total) * 100}%` }}
                  transition={{ duration: 0.7, type: "spring" }}
                />
              </div>
            </div>
            <span className="ml-2 text-xs text-fuchsia-300/80">/{total}</span>
          </div>
          {/* 質問文 */}
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <motion.h2
                key={step}
                className="text-2xl font-extrabold text-center text-slate-900 mb-8 select-none"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                {q.text}
              </motion.h2>
            )}
          </AnimatePresence>
          {/* 選択肢リスト */}
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <motion.div
                key={`opts-${step}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col space-y-4 w-full"
              >
                {q.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    className="relative group w-full px-6 py-3 text-lg rounded-xl border-2 border-fuchsia-300/50 bg-gradient-to-r from-fuchsia-200/40 via-white/60 to-indigo-200/30 shadow-lg font-semibold text-slate-900 hover:scale-105 hover:from-fuchsia-400/40 hover:to-indigo-400/40 transition-all duration-200 overflow-hidden"
                    whileTap={{ scale: 0.97, rotate: -1 }}
                    onClick={() => handleAnswer(option)}
                    whileHover={{
                      boxShadow: "0 0 24px #e879f9, 0 0 4px #818cf8",
                    }}
                  >
                    {/* ボタン内アイコン */}
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-fuchsia-500" />
                      {option.text}
                    </span>
                    {/* ホバーで光るアニメ背景 */}
                    <motion.span
                      className="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-fuchsia-200/30 transition-all duration-500 z-0"
                      layoutId="btn-bg"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 z-0">
          </div>
        </motion.div>
      </div>
    );
  }

  // 通常はここに来ない（最後はnavigateで/resultへ遷移）
  return null;
};

export default Questionnaire;
