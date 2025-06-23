import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const masterNumbers = [11, 22, 33];

/** 計算ロジック（最終ナンバーだけ返す） */
const calcSoulNumber = (dateStr) => {
  const digits = dateStr.replace(/-/g, "").split("").map(Number);
  let total = digits.reduce((a, b) => a + b, 0);
  if (masterNumbers.includes(total)) return total;
  while (total >= 10) {
    total = total.toString().split("").reduce((a, b) => a + +b, 0);
    if (masterNumbers.includes(total)) break;
  }
  return total;
};

/**
 * ステップ列を作る： ["1", "+", "9", "+", ... "=", "38", "→", "3", "+", "8", "=", "11"]
 */
const buildSequence = (dateStr) => {
  const seq = [];
  let digits = dateStr.replace(/-/g, "").split("");
  // 1st stage
  digits.forEach((d, i) => {
    seq.push(d);
    if (i < digits.length - 1) seq.push("+");
  });
  let total = digits.map(Number).reduce((a, b) => a + b, 0);
  seq.push("=");
  seq.push(total.toString());

  if (!masterNumbers.includes(total) && total >= 10) {
    // 次の縮約
    while (total >= 10 && !masterNumbers.includes(total)) {
      seq.push("→");
      digits = total.toString().split("");
      digits.forEach((d, i) => {
        seq.push(d);
        if (i < digits.length - 1) seq.push("+");
      });
      total = digits.map(Number).reduce((a, b) => a + b, 0);
      seq.push("=");
      seq.push(total.toString());
    }
  }
  return seq;
};

export default function CalculationAnimation({ date, onComplete }) {
  const [sequence, setSequence] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!date) return;
    const seq = buildSequence(date);
    setSequence(seq);
    setVisibleCount(0);
  }, [date]);

  useEffect(() => {
    if (sequence.length === 0) return;
    if (visibleCount >= sequence.length) {
      // 完了後少し待ってコールバック
      const timer = setTimeout(() => {
        onComplete(calcSoulNumber(date));
      }, 600);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 450);
    return () => clearTimeout(timer);
  }, [visibleCount, sequence, date, onComplete]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 text-5xl font-extrabold select-none dotgothic16-regular">
      <AnimatePresence>
        {sequence.slice(0, visibleCount).map((item, idx) => (
          <motion.span
            key={`${item}-${idx}`}
            initial={{ y: -40, opacity: 0, scale: 0.3, rotate: -20 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={
              item === "+" || item === "=" || item === "→"
                ? "text-cyan-300 mx-1"
                : "text-purple-200"
            }
          >
            {item}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
