import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import tarashidoQuestions from "@/data/tarashidoQuestions";
import tarashidoResults from "@/data/tarashidoResults";
import TarashidoQuestionCard from "@/components/tarashido/TarashidoQuestionCard";
import TarashidoProgressBar from "@/components/tarashido/TarashidoProgressBar";
import TarashidoResultBadge from "@/components/tarashido/TarashidoResultBadge";
import TarashidoShareButton from "@/components/tarashido/TarashidoShareButton";
import AnimatedScore from "@/components/tarashido/AnimatedScore";
import Seo from "@/components/Seo";

// for シャッフル
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TarashidoPage = () => {
  // 'diagnose' | 'result'
  const [phase, setPhase] = useState("diagnose"); 
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(null);

  // 質問と選択肢をコンポーネントのマウント時に一度だけシャッフル
  const shuffledQuestions = useMemo(() => {
    return shuffleArray(tarashidoQuestions).map(q => ({
      ...q,
      choices: shuffleArray(q.choices),
    }));
  }, []);

  // 回答ハンドラ
  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      // 次の質問へ
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 全問終了 → スコアを計算し結果フェーズへ
      const totalScore = newAnswers.reduce((sum, n) => sum + n, 0);
      const percent = Math.round((totalScore / (shuffledQuestions.length * 5)) * 100);
      setFinalScore(percent);
      setPhase("result");
    }
  };

  // もう一度診断
  const handleRestart = () => {
    setPhase("diagnose");
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setFinalScore(null);
  };
  
  // --- UI レンダリング ---

  // 結果表示用のデータ
  const resultData = useMemo(() => {
    if (finalScore === null) return null;
    return tarashidoResults.find(r => finalScore >= r.min && finalScore <= r.max);
  }, [finalScore]);

  return (
    <>
      <Seo
        title="人たらし度診断 - あなたのコミュニケーション能力を測定 | Neo-Oracle"
        description="10の質問であなたの「人たらし度」をパーセントで診断！あなたの隠れた魅力やコミュニケーションの強みを発見し、人間関係をより豊かにするヒントを見つけましょう。"
        keywords="人たらし, 診断, 性格診断, 無料, コミュニケーション, 魅力, 心理テスト, 人間関係"
        image="/images/CTAs/bg-tarashido-cta.png"
      />
      <div className="flex flex-col items-center justify-center min-h-screen px-2 text-white">
        <AnimatePresence mode="wait">
          {phase === "diagnose" && (
            <motion.div
              key="diagnose"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl"
            >
              <TarashidoProgressBar current={currentQuestionIndex + 1} total={shuffledQuestions.length} />
              <TarashidoQuestionCard
                question={shuffledQuestions[currentQuestionIndex].question}
                choices={shuffledQuestions[currentQuestionIndex].choices}
                onSelect={handleAnswer}
              />
            </motion.div>
          )}

          {phase === "result" && resultData && (
            <motion.div
              key="result"
              className="w-full max-w-lg bg-white/10 p-6 md:p-10 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TarashidoResultBadge type={resultData.type} badge={resultData.badge} image={resultData.image} />
              <div className="mb-2 text-lg text-slate-300 font-semibold tracking-widest mt-4">あなたの人たらし度</div>
              <AnimatedScore target={finalScore} duration={2.5} />
              <div className="text-base text-white mb-8 text-center">{resultData.comment}</div>
              <TarashidoShareButton
                url={typeof window !== "undefined" ? window.location.href : ""}
                text={`【人たらし度診断】\nあなたの人たらし度は${finalScore}%（${resultData.type}）でした！\n#人たらし度診断`}
              />
              <button
                onClick={handleRestart}
                className="mt-8 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold shadow-lg new-tegomin-regular"
              >
                もう一度診断する
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TarashidoPage;
