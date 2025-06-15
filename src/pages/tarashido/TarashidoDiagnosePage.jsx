import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tarashidoQuestions from "@/data/tarashidoQuestions";
import TarashidoQuestionCard from "@/components/tarashido/TarashidoQuestionCard";
import TarashidoProgressBar from "@/components/tarashido/TarashidoProgressBar";

// シャッフル関数
const shuffleArray = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const TarashidoDiagnosePage = () => {
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 質問と各選択肢を一度だけシャッフル
    const shuffled = shuffleArray(tarashidoQuestions).map(q => ({
      ...q,
      choices: shuffleArray(q.choices),
    }));
    setShuffledQuestions(shuffled);
  }, []);

  if (shuffledQuestions.length === 0) return null;

  const handleAnswer = (score) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (current < shuffledQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      // 全問終了→スコアを計算し結果ページへ
      const totalScore = newAnswers.reduce((sum, n) => sum + n, 0);
      const percent = Math.round((totalScore / (shuffledQuestions.length * 5)) * 100);
      navigate("/tarashido/result", { state: { score: percent } });
    }
  };

  const q = shuffledQuestions[current];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2">
      <div className="w-full max-w-xl">
        <TarashidoProgressBar current={current + 1} total={shuffledQuestions.length} />
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
