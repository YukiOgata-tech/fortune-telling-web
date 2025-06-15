import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import tarashidoQuestions from "@/data/tarashidoQuestions";
import TarashidoQuestionCard from "@/components/TarashidoQuestionCard";
import TarashidoProgressBar from "@/components/TarashidoProgressBar";

const TarashidoDiagnosePage = () => {
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (current < tarashidoQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      // 全問終了→スコアを計算し結果ページへ
      const totalScore = newAnswers.reduce((sum, n) => sum + n, 0);
      const percent = Math.round((totalScore / (tarashidoQuestions.length * 5)) * 100);
      navigate("/tarashido/result", { state: { score: percent } });
    }
  };

  const q = tarashidoQuestions[current];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-2">
      <div className="w-full max-w-xl">
        <TarashidoProgressBar current={current + 1} total={tarashidoQuestions.length} />
        <TarashidoQuestionCard
          question={q.question}
          choices={q.choices}
          onSelect={handleAnswer}
        />
      </div>
    </div>
  );
};

export default TarashidoDiagnosePage;
