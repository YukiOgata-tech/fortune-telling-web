// components/AnimatedCardWrapper.jsx
// cardの上などにのぞき込んだり、淵を移動したりのアニメーション用
import { Player } from '@lottiefiles/react-lottie-player';

import PropTypes from "prop-types";

/**
 * 上にLottieアニメーションを重ねる汎用ラッパー
 * @param {string} animationData - Lottieのjsonファイル（importで渡す）
 * @param {string} position - "top-left", "top-right", "bottom-left", "bottom-right", "center"
 * @param {number|string} width, height - アニメーションのサイズ
 * @param {ReactNode} children - カード本体
 */
const positions = {
    // -top-28.5, -bottom-1はデフォルトサイズの120×120の場合の適正値
  "top-left": "absolute -top-28.5 left-0",
  "top-right": "absolute -top-28.5 right-0",
  "bottom-left": "absolute -bottom-1 left-0",
  "bottom-right": "absolute -bottom-1 right-0",
  "center": "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

export default function AnimationForCard({
  src,
  position = "top-right",
  width = 120,
  height = 120,
  className = "",
  style = {},
  ...props
}) {
  return (
    <div
      className={`
        pointer-events-none z-20
        ${positions[position]}
        ${className}
      `}
      style={{ width, height, ...style }}
      aria-hidden
      {...props}
    >
      <Player autoplay loop src={src} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

AnimationForCard.propTypes = {
  animationData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  position: PropTypes.oneOf(Object.keys(positions)),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired,
};
