import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
// エクスポートされているものをすべてインポート
import animationData from '';

const AnimationComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      animationData: animationData.default, // defaultエクスポートを使う
      renderer: 'svg',
      loop: true,
      autoplay: true
    });

    return () => animation.destroy();
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ width: '300px', height: '300px', margin: '0 auto' }} 
    />
  );
};

export default AnimationComponent;
