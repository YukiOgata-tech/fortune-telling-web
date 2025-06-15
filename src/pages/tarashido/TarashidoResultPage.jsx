import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tarashidoResults from "@/data/tarashidoResults";
import TarashidoResultBadge from "@/components/TarashidoResultBadge";
import TarashidoShareButton from "@/components/TarashidoShareButton";
import { motion } from "framer-motion";

const TarashidoResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score;

  if (typeof score !== "number") {
    // スコアが無い場合は診断スタートページに戻す
    navigate("/tarashido", { replace: true });
    return null;
  }

  // 該当する結果データを取得
  const result = tarashidoResults.find(r => score >= r.min && score <= r.max);

  // シェアテキスト例
  const shareText = `【人たらし度診断】\nあなたの人たらし度は${score}%（${result.type}）でした！\n#人たらし度診断`;

  // 現在ページのURL
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-slate-800 px-2">
      <motion.div
        className="w-full max-w-lg bg-white/10 p-10 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* バッジ＋タイプ */}
        <TarashidoResultBadge
          type={result.type}
          badge={result.badge}
          image={result.image}
        />

        <div className="mb-2 text-lg text-slate-300 font-semibold tracking-widest mt-4">あなたの人たらし度</div>
        <div className="text-6xl font-black text-white mb-3 drop-shadow-lg">{score}%</div>
        <div className="text-base text-white mb-8 text-center">{result.comment}</div>

        {/* シェアボタン */}
        <TarashidoShareButton url={shareUrl} text={shareText} />

        {/* もう一度診断ボタン */}
        <button
          onClick={() => navigate("/tarashido")}
          className="mt-8 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold shadow-lg"
        >
          もう一度診断する
        </button>
      </motion.div>
    </div>
  );
};

export default TarashidoResultPage;
