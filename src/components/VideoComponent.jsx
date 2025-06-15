import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

const VideoComponent = ({ videoPath, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,  // 何度もトリガーする
    threshold: 0.5,      // 50%が画面に入ったときにトリガー
  });

  // スクロールして動画が画面に入ったら再生、出たら停止
  React.useEffect(() => {
    if (inView) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [inView]);

  return (
    <div ref={ref} className={`${className} relative`}>
      <video
        className="w-full h-full object-cover bg-transparent"
        autoPlay={isPlaying}
        muted
        loop
      >
        <source src={videoPath} type="video/webm" />
        お使いのブラウザは動画タグをサポートしていません。
      </video>
    </div>
  );
};

export default VideoComponent;
