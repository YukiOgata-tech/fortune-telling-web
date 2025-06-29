import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, MessageCircle } from 'lucide-react'; // アイコンを追加

// データや他のコンポーネントをインポート
import { fortuneTypes } from "@/data/main-content/fortuneTypes";
import { fortuneDetails } from "@/data/main-content/fortuneDetails";
import { fortuneAdvice } from "@/data/main-content/fortuneAdvice2025";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ResultCard from "@/components/ResultCard";
import DailyFortuneCTA from "@/components/CTAs/DailyFortuneCTA";
import { useAuth } from "@/components/features/AuthContext";

// LINEアイコンのSVGコンポーネント
const LineIcon = (props) => (
  <svg viewBox="0 0 256 256" {...props}>
    <path fill="#06C755" d="M224 0H32C14.33 0 0 14.33 0 32v192c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z" />
    <path fill="#FFF" d="M197.33 160H184c-3.67 0-6.67 2.33-6.67 6v2.67c0 3.67-3 6.67-6.67 6.67h-12c-3.67 0-6.67-3-6.67-6.67v-1.33c0-10-8-18.67-18-18.67H128c-12 0-22-10-22-22V128c0-12 10-22 22-22h13.33c12 0 22 10 22 22v13.33c0 4.67 3.33 8.67 8 8.67h12.67c4.67 0 8.67-4 8.67-8.67V128c0-21.33-17.33-38.67-38.67-38.67H128c-21.33 0-38.67 17.33-38.67 38.67v14.67c0 4.67-3.33 8.67-8 8.67H68c-4.67 0-8.67-4-8.67-8.67V128c0-32.67 26.67-59.33 59.33-59.33h13.33c32.67 0 59.33 26.67 59.33 59.33v18.67c0 7.33-6 13.33-13.33 13.33zm-96-50.67c-5.33 0-10-4.67-10-10s4.67-10 10-10 10 4.67 10 10-4.67 10-10 10zm-34.67 0c-5.33 0-10-4.67-10-10s4.67-10 10-10 10 4.67 10 10-4.67 10-10 10z" />
  </svg>
);


const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [shared, setShared] = useState(false);

  const { topTypes, biasTotal } = state || {};

  // Firestoreに診断結果保存
  useEffect(() => {
    if (!user || !topTypes) return;
    const resultData = {
      topTypes,
      biasTotal,
      date: new Date().toISOString(),
    };
    setDoc(doc(db, "users", user.uid, "results", "latest"), resultData)
      .catch((e) => console.error("診断結果の保存に失敗", e));
  }, [user, topTypes, biasTotal]);

  // 直接アクセス防止
  if (!state || !topTypes) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
        <p className="text-gray-200 mb-4">診断フローからお進みください。</p>
        <button
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md transition"
          onClick={() => navigate("/questionnaire")}
        >
          診断ページへ
        </button>
      </div>
    );
  }

  // メインタイプ
  const mainTypeId = topTypes[0]?.typeId;
  const mainTypeData = fortuneTypes.find((t) => t.id === mainTypeId);

  // サブタイプID配列
  const subTypeIds = topTypes.slice(1, 3).map((t) => t.typeId);

  // ★★★ シェア実行ハンドラ
  const handleShare = async () => {
    const shareText = `【性格診断】私のタイプは「${mainTypeData.name}」でした！\nあなたの隠れた才能や性格を診断してみよう！ #NeoOracle #性格診断`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "性格診断の結果 | Neo Oracle",
          text: shareText,
          url: window.location.href,
        });
        setShared(true); // シェア成功でコンテンツ表示
      } else {
        await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        alert("診断結果をクリップボードにコピーしました！SNSでシェアして友達にも教えよう！");
        setShared(true); // コピー成功でもコンテンツ表示
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("シェアに失敗しました。");
    }
  };
  
  //  LINEシェア用のURLを生成
  const createLineShareUrl = () => {
    const shareText = `【性格診断】私のタイプは「${mainTypeData.name}」でした！\nあなたの隠れた才能や性格を診断してみよう！ #NeoOracle #性格診断`;
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`;
    return url;
  };


  return (
    <div className="text-white min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 tracking-wide new-tegomin-regular">
          あなたの診断結果
        </h1>

        {/* 1位タイプ */}
        {mainTypeData && (
          <section className="mb-6">
            <ResultCard typeId={mainTypeId} className="h-96 rounded-3xl" />
          </section>
        )}

        {/* BiasPoint */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-full px-6 py-2">
            <span className="text-gray-300">固定観念ポイント：</span>
            <span className="text-2xl font-semibold text-white">{biasTotal}</span>
          </div>
        </div>

        {/* 2位・3位タイプ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {subTypeIds.map((subId) => {
            const subTypeData = fortuneTypes.find((t) => t.id === subId);
            return (
              <div key={subId}>
                <ResultCard typeId={subId} className="h-64" />
                <div className="bg-gray-800/60 rounded-xl p-4 mt-3 relative">
                  <div className={`transition-all duration-500 ${shared ? "opacity-100" : "opacity-0 blur-md select-none pointer-events-none"}`}>
                    <div className="font-semibold mb-1 text-lg">{subTypeData?.name} の詳細</div>
                    <p className="text-sm whitespace-pre-line mb-4">{fortuneDetails[subId]}</p>
                    <div className="font-semibold mb-1 text-lg">{subTypeData?.name} 向けアドバイス</div>
                    <p className="text-sm whitespace-pre-line">{fortuneAdvice[subId]}</p>
                  </div>
                  
                  {/* シェア前の表示 */}
                  {!shared && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-xl p-4">
                        <h3 className="text-xl font-bold text-center text-white mb-4">シェアして詳細な結果を見る</h3>
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
                            {/* LINEシェアボタン */}
                            <a
                                href={createLineShareUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setTimeout(() => setShared(true), 500)} // LINEアプリ遷移後に表示を更新
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#06C755] text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                            >
                                <LineIcon className="w-6 h-6" />
                                LINEでシェア
                            </a>
                            {/* 通常のシェアボタン */}
                            <button
                                onClick={handleShare}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-500 transition-colors"
                            >
                                <Share2 className="w-5 h-5" />
                                結果をシェア
                            </button>
                        </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {mainTypeData && (
          <>
            <section className="bg-gray-800/50 backdrop-blur-xs rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-semibold mb-6">{mainTypeData.name} の詳細</h2>
              <div className="prose prose-invert text-gray-100 max-w-none">
                {fortuneDetails[mainTypeId]?.split("\n").map((line, idx) => (<p key={idx}>{line}</p>))}
              </div>
            </section>
            <section className="bg-gray-800/50 backdrop-blur-xs rounded-2xl p-8 mb-20">
              <h2 className="text-3xl font-semibold mb-6">{mainTypeData.name} 向け具体的アドバイス</h2>
              <div className="prose prose-invert text-gray-100 max-w-none">
                {fortuneAdvice[mainTypeId]?.split("\n").map((line, idx) => (<p key={idx}>{line}</p>))}
              </div>
            </section>
          </>
        )}

        <div className="flex justify-center mt-12">
          <button
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition mb-4"
            onClick={() => navigate("/")}
          >
            もう一度診断する
          </button>
        </div>
      </div>
      <DailyFortuneCTA/>
    </div>
  );
};

export default ResultPage;
