// src/components/ElectricSpark.jsx
import { useEffect, useRef } from "react";

const paths = [
  "M10 0 L30 15 L20 25 L40 40",        // 稲妻パス例（数本）
  "M0 25 L20 35 L10 55 L30 65",
  "M5 0  L25 10 L15 30 L35 45",
];

export default function ElectricSpark({
  width = 80,
  height = 80,
  color = "#00FFFF",
  interval = 1000,     // ミリ秒
  zIndex = 20,
  style = {},
  className = "",
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    let timer;

    const triggerSpark = () => {
      // ランダムでパスを生成
      svg.innerHTML = "";
      const pathStr = paths[Math.floor(Math.random() * paths.length)];
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathStr);
      path.setAttribute("stroke", color);
      path.setAttribute("stroke-width", "2");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-linejoin", "round");
      path.setAttribute("stroke-linecap", "round");
      path.style.filter = "drop-shadow(0 0 6px " + color + ")";
      path.style.strokeDasharray = "100";
      path.style.strokeDashoffset = "100";

      svg.appendChild(path);

      // 瞬間的に描いてフェードアウト
      path.animate(
        [
          { strokeDashoffset: 100, opacity: 0 },
          { strokeDashoffset: 0,   opacity: 1, offset: 0.2 },
          { strokeDashoffset: -20, opacity: 0 },
        ],
        { duration: 400, easing: "ease-out" }
      );
    };

    triggerSpark();
    timer = setInterval(triggerSpark, interval);

    return () => clearInterval(timer);
  }, [color, interval]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={`pointer-events-none absolute ${className}`}
      style={{ ...style, zIndex }}
    />
  );
}
