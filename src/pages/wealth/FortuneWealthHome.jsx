// src/pages/wealth/FortuneWealthHome.jsx
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import animationData from "@/assets/boy-running.json";
import AnimationForCard from "@/components/common/AnimationForCard";
// import AnimationComponent from '@/components/AnimationComponent';
import VideoComponent from "@/components/VideoComponent";

export default function FortuneWealthHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      {/*<VideoComponent videoPath="/videos/yuki-and-kazuki.webm" className="w-50 h-50" />*/}
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-purple-300/20 rounded-2xl p-8 shadow-2xl max-w-lg w-full flex flex-col items-center"
      >
        {/* 多様なcontainer上にアニメーション付けたいとき */}
        <AnimationForCard src={animationData} position="top-right" width={120} height={120} className="right-20"/>

        <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-4 tracking-wide text-center drop-shadow-lg yusei-magic-regular">
          あなたの生涯年収診断
        </h1>
        <p className="text-gray-200 text-center mb-8">
          眠れる才能と運命の鍵、そして具体的な生涯金運予測。
          <br />
          ワクワクする未来を占いませんか？
        </p>
        <button
          className="bg-yellow-400 hover:bg-yellow-500 transition-colors duration-300 text-black font-bold rounded-2xl px-8 py-3 text-xl shadow-lg"
          onClick={() => navigate("/fortune-wealth/question")}
        >
          診断スタート
        </button>
      </motion.div>
    </div>
  );
}
