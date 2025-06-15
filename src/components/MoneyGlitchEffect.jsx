// src/components/MoneyGlitchEffect.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const glitchFrames = [
  { x: -2, y: 1, scale: 1.02, skewX: -2 },
  { x: 2, y: -1, scale: 0.98, skewX: 2 },
  { x: 0, y: 0, scale: 1, skewX: 0 }
];

// 金額を1桁ずつアニメ表示（動き＆ノイズ感を強調）
export default function MoneyGlitchEffect({ amount }) {
  const [display, setDisplay] = useState("...");
  useEffect(() => {
    if (typeof amount === "string") {
      setDisplay(amount);
      return;
    }
    let curr = 0;
    const goal = amount;
    const duration = 1600 + Math.random() * 400;
    const steps = 32;
    const interval = duration / steps;
    let count = 0;
    const timer = setInterval(() => {
      if (count < steps - 1) {
        // ランダムな金額を一瞬表示
        const rand = Math.floor(Math.random() * goal * Math.random());
        setDisplay(rand.toLocaleString("ja-JP") + "円");
      } else {
        setDisplay(goal.toLocaleString("ja-JP") + "円");
        clearInterval(timer);
      }
      count++;
    }, interval);
    return () => clearInterval(timer);
  }, [amount]);

  return (
    <AnimatePresence>
      <motion.div
        key={display}
        className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg mt-10 select-none tracking-wider"
        initial={glitchFrames[0]}
        animate={glitchFrames[1]}
        exit={glitchFrames[2]}
        transition={{
          repeat: 2,
          repeatType: "mirror",
          duration: 0.13,
          type: "spring"
        }}
        style={{
          textShadow:
            "0 0 16px #fff700, 0 0 2px #ffd600, 2px 1px 1px #fff700, -2px 0 6px #fffad0"
        }}
      >
        {display}
      </motion.div>
    </AnimatePresence>
  );
}
