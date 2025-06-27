/**
 * HowGenius.jsx – 「天才度診断」1 ファイル実装
 * 要件:
 *  1. スタート画面 (説明 + 誕生日入力 + 開始ボタン)
 *  2. ログインユーザーで birthday がある場合は自動入力
 *  3. 診断終了後に「結果を保存するか」選択可
 *     - 保存すると users/{uid}/results/genius に書き込み
 *  4. 質問・選択肢は毎回ランダム
 *  5. スマホ〜PC 完全レスポンシブ
 */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geniusQuestions } from "@/data/geniusQuestions";
import { geniusResults } from "@/data/geniusResults";
import Seo from "@/components/Seo";
import { useAuth } from "@/components/features/AuthContext"; // ← パス要調整
import { db } from "@/lib/firebase"; // firebase 初期化ファイル
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

// ---------- utils ----------
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------- メイン ----------
export default function HowGenius() {
  const { user } = useAuth(); // AuthContext からログインユーザー
  /* 画面フロー: "start" | "quiz" | "result" */
  const [phase, setPhase] = useState("start");
  const [birthday, setBD] = useState(""); // 誕生日入力
  const [questions, setQs] = useState([]);
  const [idx, setIdx] = useState(0);
  const [scores, setScores] = useState([]);
  /* 保存可否 */
  const [save, setSave] = useState(true); // チェックボックスの状態
  const [saving, setSaving] = useState(false); // ボタン多重防止
  const [saved, setSaved] = useState(false); // 保存完了表示

  /* 1) ログインユーザーに birthday があれば取得して自動入力 */
  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists() && snap.data().birthday) {
        const iso = new Date(snap.data().birthday.seconds * 1000)
          .toISOString()
          .slice(0, 10);
        setBD(iso);
      }
    })();
  }, [user]);

  /* 2) 診断スタート時にシャッフル */
  const startQuiz = () => {
    const qs = shuffle(geniusQuestions).map((q) => ({
      ...q,
      options: shuffle(q.options),
    }));
    setQs(qs);
    setIdx(0);
    setScores([]);
    setPhase("quiz");
  };

  /* 3) 選択肢クリック時 */
  const handleSelect = (score) => {
    setScores([...scores, score]);
    if (idx + 1 < questions.length) setIdx(idx + 1);
    else setPhase("result");
  };

  /* 4) 保存実行 */
  const saveResult = async (total, resObj) => {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(
        doc(db, "users", user.uid, "results", "genius"),
        {
          total,
          resultId: resObj.id,
          title: resObj.title,
          analysis: resObj.analysis,
          date: serverTimestamp(),
        },
        { merge: true }
      );
      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  /* ------------------ フェーズ別 UI ------------------ */

  /* A. スタート画面 */
  if (phase === "start") {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
        >
          <h1 className="text-center text-3xl font-bold">あなたの天才度診断</h1>
          <p className="leading-relaxed">
            歴史的な天才たちの思考様式に基づいた 15
            問で、あなたの“発想傾向”を解析します。 所要時間は 3〜4
            分。気軽に挑戦してみましょう！
          </p>

          {/* 誕生日入力 (任意) */}
          <label className="block text-sm sm:text-base">
            生年月日 (任意)
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBD(e.target.value)}
              className="mt-1 w-full bg-black/30 rounded-md border border-white/20 px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
            />
          </label>

          <button
            onClick={startQuiz}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 font-semibold text-lg hover:opacity-90"
          >
            診断スタート
          </button>
        </motion.div>
      </section>
    );
  }

  /* B. 質問ロードが済むまでのガード */
  if (phase === "quiz" && !questions.length) return null;

  /* C. 結果フェーズ */
  if (phase === "result") {
    const total = scores.reduce((a, b) => a + b, 0);
    const res = geniusResults.find((r) => total >= r.min && total <= r.max);

    return (
      <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 bg-black text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center">
            {res.title}
          </h2>
          <p className="leading-relaxed whitespace-pre-wrap">{res.analysis}</p>

          <div className="border-t border-white/20 pt-4 space-y-2">
            <h3 className="font-semibold">アドバイス</h3>
            <p className="leading-relaxed">{res.advice}</p>
          </div>

          {user && (
            <div className="space-y-4 pt-6">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={save}
                  onChange={(e) => setSave(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                />
                この結果をアカウントに保存する
              </label>

              <button
                disabled={saving || saved || !save}
                onClick={() => saveResult(total, res)}
                className={`w-full py-3 rounded-xl font-semibold text-lg
                  ${
                    saved
                      ? "bg-green-600 cursor-default"
                      : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90"
                  }`}
              >
                {saved
                  ? "保存しました ✅"
                  : saving
                  ? "保存中…"
                  : "結果を保存する"}
              </button>
            </div>
          )}

          <button
            className="w-full py-2 text-sm underline text-center opacity-70 hover:opacity-100"
            onClick={() => {
              setPhase("start");
              setSaved(false);
            }}
          >
            もう一度診断する
          </button>
        </motion.div>
      </section>
    );
  }

  /* D. 質問フェーズ */
  const q = questions[idx];
  const percent = Math.round((idx / questions.length) * 100);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 text-white">
      <Seo
        title="あなたの天才度診断 - 歴史的偉人タイプでわかる発想傾向 | Neo-Oracle"
        description="あなたに秘められた天才性を無料で診断！15の質問から、あなたの思考タイプを分析し、歴史的な天才に例えて解説します。自分の強みやユニークな発想力を発見しよう。"
        keywords="天才診断, 性格診断, 無料, 思考タイプ, 発想力, 心理テスト, 偉人, 強み, 自己分析"
        image="/images/CTAs/bg-genius-cta.png"
      />
      {/* progress bar */}
      <div
        className="absolute top-0 left-0 h-1 bg-indigo-500 transition-all duration-200"
        style={{ width: `${percent}%` }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="max-w-xl w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-10 shadow-2xl"
        >
          {q.image && (
            <img
              src={q.image}
              alt={q.alt || "question-image"}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto mb-4 border-2 border-white/60 pointer-events-none"
            />
          )}

          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-6 leading-snug">
            {idx + 1}. {q.text}
          </h2>

          <div className="flex flex-col gap-3">
            {q.options.map((opt) => (
              <motion.button
                key={opt.id}
                whileTap={{ scale: 0.96 }}
                className="w-full py-3 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-indigo-500/60 to-pink-500/60 shadow-lg font-semibold text-sm sm:text-lg hover:opacity-90"
                onClick={() => handleSelect(opt.score)}
              >
                {opt.label}
              </motion.button>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-white/60">
            {idx + 1} / {questions.length}
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
