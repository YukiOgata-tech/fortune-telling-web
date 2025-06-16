import { useState, useMemo } from "react";
import { questions } from "@/data/reincarnation/reincarnationQuestions";
import { calcDiagnosis } from "@/data/reincarnation/reincarnationLogic";
import QuestionStep from "@/components/reincarnation/QuestionStep";
import ProgressBar from "@/components/reincarnation/ProgressBarForRein";
import ResultPage from "@/pages/ReincarnationResultPage";
import { motion, AnimatePresence } from "framer-motion";

const shuffle = arr => arr.map(v => [v, Math.random()]).sort((a,b) => a[1]-b[1]).map(([v])=>v);

export default function ReincarnationPage() {
  // シャッフル済みの質問・各選択肢もシャッフル
  const questionList = useMemo(() => shuffle(questions).map(q => ({
    ...q,
    options: shuffle(q.options)
  })), []);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (optionIdx) => {
    setAnswers(ans => [...ans, optionIdx]);
    if (step < questionList.length - 1) {
      setStep(s => s + 1);
    } else {
      // スコア集計
      const score = {};
      questionList.forEach((q, idx) => {
        const option = q.options[answers[idx] ?? 0];
        Object.entries(option.add).forEach(([type, point]) => {
          score[type] = (score[type] || 0) + point;
        });
      });
      const diagnosis = calcDiagnosis(score);
      setResult(diagnosis);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  const guideText = result
    ? "あなたの前世診断の結果はこちら！"
    : "15の質問に答えて、あなたの前世タイプを探ろう。";


  return (
    <div className="min-h-screen w-full p-6 flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        <div className="w-full max-w-2xl mx-auto">
          {/* 説明テキスト（プログレスバーの上） */}
          <div className="mb-4 text-center">
            <span className="inline-block px-4 py-2 rounded-2xl font-semibold text-white/90 bg-fuchsia-700/20 shadow-sm tracking-wide text-xl md:text-2xl yusei-magic-regular">
              {guideText}
            </span>
          </div>
          {/* 診断内容 */}
          {!result ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full"
            >
              <ProgressBar current={step} total={questionList.length} />
              <QuestionStep
                question={questionList[step]}
                onSelect={handleAnswer}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="w-full"
            >
              <ResultPage result={result} onRestart={handleRestart} />
            </motion.div>
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
