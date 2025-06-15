import React from "react";
import Lottie from "lottie-react";
import animationData from "@/assets/space-loading.json"; // パスはプロジェクトに合わせて調整

const SpaceLoading = ({ style, className = "", ...props }) => (
  <div
    className={`flex flex-col items-center justify-center w-full h-full ${className}`}
    style={style}
    {...props}
  >
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: 180, height: 180, ...style }}
    />
  </div>
);

export default SpaceLoading;
