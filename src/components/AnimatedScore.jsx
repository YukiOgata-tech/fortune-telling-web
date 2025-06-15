import React, { useEffect, useState } from "react";

const AnimatedScore = ({ target, duration = 3 }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start;
    let frame;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Easing（スムーズなカーブで止まるように）
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easedProgress * target);
      setDisplayScore(value);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplayScore(target);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  // スロット風：数字一桁ずつアニメで出したい場合
  const padded = displayScore.toString().padStart(3, "0").split("");
  return (
    <div className="flex justify-center items-center gap-1 text-6xl font-black text-white mb-3 drop-shadow-lg select-none">
      {padded.map((num, idx) => (
        <span
          key={idx}
          className="w-10 h-16 flex items-center justify-center bg-gradient-to-br from-blue-300/10 via-fuchsia-400/5 to-white/0 rounded-lg shadow-lg mx-1 animate-spin-slow"
          style={{ animationDelay: `${idx * 0.12}s` }}
        >
          {num}
        </span>
      ))}
      <span className="ml-2 text-3xl text-blue-200 font-bold">%</span>
    </div>
  );
};

export default AnimatedScore;
