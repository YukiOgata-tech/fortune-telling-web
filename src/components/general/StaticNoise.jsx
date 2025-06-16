// src/components/StaticNoise.jsx
import { useRef, useEffect } from "react";

const StaticNoise = ({
  className = "",
  width = 640,
  height = 360,
  fps = 24,
  opacity = 0.15,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frameId;
    let then = 0;
    const interval = 1000 / fps;

    const drawNoise = () => {
      const now = performance.now();
      if (now - then > interval) {
        then = now;
        const imageData = ctx.createImageData(width, height);
        const buffer = new Uint32Array(imageData.data.buffer);
        for (let i = 0; i < buffer.length; i++) {
          // 0xAARRGGBB  :  Alpha  は 0xFF で不透明
          buffer[i] = (255 << 24) | (Math.random() * 255) << 16 | (Math.random() * 255) << 8 | (Math.random() * 255);
        }
        ctx.putImageData(imageData, 0, 0);
      }
      frameId = requestAnimationFrame(drawNoise);
    };
    drawNoise();
    return () => cancelAnimationFrame(frameId);
  }, [fps, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={`absolute inset-0 w-full h-full object-cover mix-blend-screen pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
};

export default StaticNoise;
