import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fortuneTypes } from "@/data/main-content/fortuneTypes";
import { fortuneDetails } from "@/data/main-content/fortuneDetails";
import { fortuneAdvice } from "@/data/main-content/fortuneAdvice2025";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
// components import
import ResultCard from "@/components/ResultCard";
import DailyFortuneCTA from "@/components/CTAs/DailyFortuneCTA";
import { useAuth } from "@/components/features/AuthContext";



// Stripe決済のダミー購入状態（本番はサーバー/Stripe連携）
const initialPurchased = {};

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [purchased, setPurchased] = useState(initialPurchased);

  

  // topTypes: [{ typeId: 1, value:10 }, ...]
  const { topTypes, biasTotal } = state || {};
  // Firestoreに診断結果保存
  React.useEffect(() => {
    if (!user || !topTypes) return;
    const resultData = {
      topTypes,
      biasTotal,
      date: new Date().toISOString(),
    };
    setDoc(doc(db, "users", user.uid, "results", "latest"), resultData)
      .catch((e) => {
        console.error("診断結果の保存に失敗", e);
      });
  }, [user, topTypes, biasTotal]);


  // Stripe購入状態（サブタイプごと）

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

  // Firestoreに診断結果保存
  React.useEffect(() => {
    if (!user || !topTypes) return;
    const resultData = {
      topTypes,
      biasTotal,
      date: new Date().toISOString(),
    };
    setDoc(doc(db, "users", user.uid, "results", "latest"), resultData)
      .catch((e) => {
        console.error("診断結果の保存に失敗", e);
      });
  }, [user, topTypes, biasTotal]);

  // メインタイプ
  const mainTypeId = topTypes[0]?.typeId;
  const mainTypeData = fortuneTypes.find((t) => t.id === mainTypeId);

  // サブタイプID配列
  const subTypeIds = topTypes.slice(1, 3).map((t) => t.typeId);

  // Stripe購入ダミー
  const handlePurchase = (typeId) => {
    // 仮実装：Stripe決済フロー後に解除、実際はここでCheckout API等
    window.alert(`タイプ「${fortuneTypes.find(t => t.id === typeId)?.name}」の詳細購入完了（ダミー）`);
    setPurchased(prev => ({ ...prev, [typeId]: true }));
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
            <ResultCard
              typeId={mainTypeId}
              className="h-96 rounded-3xl"
            />
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
                {/* 詳細＆アドバイス部分 */}
                <div className="bg-gray-800/60 rounded-xl p-4 mt-3">
                  <div className="font-semibold mb-1">
                    {subTypeData?.name} の詳細
                  </div>
                  <div className="text-sm whitespace-pre-line mb-2">
                    {purchased[subId]
                      ? fortuneDetails[subId]
                      : (
                        <span className="blur-sm select-none pointer-events-none text-gray-400">
                          {fortuneDetails[subId]?.slice(0, 100) || ""}
                        </span>
                      )
                    }
                  </div>
                  <div className="font-semibold mb-1">
                    {subTypeData?.name} 向けアドバイス
                  </div>
                  <div className="text-sm whitespace-pre-line mb-3">
                    {purchased[subId]
                      ? fortuneAdvice[subId]
                      : (
                        <span className="blur-sm select-none pointer-events-none text-gray-400">
                          {fortuneAdvice[subId]?.slice(0, 100) || ""}
                        </span>
                      )
                    }
                  </div>
                  {!purchased[subId] && (
                    <button
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition"
                      onClick={() => handlePurchase(subId)}
                    >
                      購入して続きを見る
                    </button>
                  )}
                  {purchased[subId] && (
                    <span className="text-green-400 font-bold">購入済み</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 1位タイプ詳細 */}
        {mainTypeData && (
          <section className="bg-gray-800/50 backdrop-blur-xs rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-semibold mb-6">
              {mainTypeData.name} の詳細
            </h2>
            <div className="prose prose-invert text-gray-100 max-w-none">
              {fortuneDetails[mainTypeId]?.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </section>
        )}

        {/* 1位タイプアドバイス */}
        {mainTypeData && (
          <section className="bg-gray-800/50 backdrop-blur-xs rounded-2xl p-8 mb-20">
            <h2 className="text-3xl font-semibold mb-6">
              {mainTypeData.name} 向け具体的アドバイス
            </h2>
            <div className="prose prose-invert text-gray-100 max-w-none">
              {fortuneAdvice[mainTypeId]?.split("\n").map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </section>
        )}

        {/* 再診断 */}
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
