import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, User, Calendar, Share2, MessageCircle, ArrowRight } from "lucide-react";
import { loveCompatibilityResults } from "@/data/loveCompatibilityResults";
import { useAuth } from "@/components/features/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Seo from "@/components/Seo";

// ひらがなチェック用の正規表現
const HIRAGANA_REGEX = /^[ぁ-んー]*$/;

// 診断ロジック
const getCompatibilityScore = (user, partner) => {
  const combinedString = `${user.name}-${user.birthday}-${partner.name}-${partner.birthday}`;
  let hash = 0;
  for (let i = 0; i < combinedString.length; i++) {
    hash = (hash << 5) - hash + combinedString.charCodeAt(i);
    hash |= 0;
  }
  const score = Math.abs(hash) % 101;
  return score;
};

// 診断中アニメーション
const FlyingHeartsAnimation = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
        {[...Array(15)].map((_, i) => (
        <motion.div key={i} className="absolute text-pink-400" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }} initial={{ opacity: 0, scale: 0.5, y: 50 }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], y: [50, -50], x: [0, Math.random() * 100 - 50, 0]}} transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}>
            <Heart fill="currentColor" size={Math.random() * 24 + 16} />
        </motion.div>
        ))}
    </div>
);

// LINEアイコン (変更なし)
const LineIcon = (props) => (
    <svg viewBox="0 0 256 256" {...props}><path fill="#06C755" d="M224 0H32C14.33 0 0 14.33 0 32v192c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z" /><path fill="#FFF" d="M197.33 160H184c-3.67 0-6.67 2.33-6.67 6v2.67c0 3.67-3 6.67-6.67 6.67h-12c-3.67 0-6.67-3-6.67-6.67v-1.33c0-10-8-18.67-18-18.67H128c-12 0-22-10-22-22V128c0-12 10-22 22-22h13.33c12 0 22 10 22 22v13.33c0 4.67 3.33 8.67 8 8.67h12.67c4.67 0 8.67-4 8.67-8.67V128c0-21.33-17.33-38.67-38.67-38.67H128c-21.33 0-38.67 17.33-38.67 38.67v14.67c0 4.67-3.33 8.67-8 8.67H68c-4.67 0-8.67-4-8.67-8.67V128c0-32.67 26.67-59.33 59.33-59.33h13.33c32.67 0 59.33 26.67 59.33 59.33v18.67c0 7.33-6 13.33-13.33 13.33zm-96-50.67c-5.33 0-10-4.67-10-10s4.67-10 10-10 10 4.67 10 10-4.67 10-10 10zm-34.67 0c-5.33 0-10-4.67-10-10s4.67-10 10-10 10 4.67 10 10-4.67 10-10 10z" /></svg>
);

export default function LoveCompatibilityPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [phase, setPhase] = useState("input");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [shared, setShared] = useState(false);

  const [myName, setMyName] = useState("");
  const [myBirthday, setMyBirthday] = useState("");
  const [myNameDisabled, setMyNameDisabled] = useState(false);
  const [myBirthdayDisabled, setMyBirthdayDisabled] = useState(false);

  const [partnerName, setPartnerName] = useState("");
  const [partnerBirthday, setPartnerBirthday] = useState("");

  const [resultScore, setResultScore] = useState(null);
  const [resultText, setResultText] = useState(""); // ★★★ 表示用メインテキストのstateを追加

  // ログインユーザー情報取得 (変更なし)
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.displayName) { setMyName(data.displayName); setMyNameDisabled(true); }
            if (data.birthday?.toDate) { setMyBirthday(data.birthday.toDate().toISOString().slice(0, 10)); setMyBirthdayDisabled(true); }
          }
        } catch (err) { console.error(err); }
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, [user]);

  // 診断実行 (★★★ 修正箇所 ★★★)
  const handleDiagnose = (e) => {
    e.preventDefault();
    if (!myBirthday || !partnerName || !partnerBirthday) {
      setError("すべての必須項目を入力してください。");
      return;
    }
    if (!HIRAGANA_REGEX.test(partnerName)) {
      setError("お相手の名前はひらがなで入力してください。");
      return;
    }
    setError("");
    setPhase("animating");

    setTimeout(() => {
      const score = getCompatibilityScore({ name: myName, birthday: myBirthday }, { name: partnerName, birthday: partnerBirthday });
      const resultData = loveCompatibilityResults.find(r => score >= r.minScore && score <= r.maxScore);
      
      // テキスト候補からランダムに1つ選ぶ
      const randomIndex = Math.floor(Math.random() * resultData.mainTextCandidates.length);
      setResultText(resultData.mainTextCandidates[randomIndex]);
      
      setResultScore(score);
      setPhase("result");
    }, 3000);
  };

  // シェア機能 (変更なし)
  const handleShare = async () => {
    const shareText = `【相性診断】あの人との相性は${resultScore}%でした！\nあなたも診断してみよう！ #相性診断 #NeoOracle`;
    try {
      await navigator.share({ title: "ふたりの相性診断 | Neo Oracle", text: shareText, url: window.location.href });
      setShared(true);
    } catch (err) { alert("シェアに失敗しました。"); }
  };

  // LINEシェア (変更なし)
  const handleLineShare = () => {
    const shareText = `【相性診断】あの人との相性は${resultScore}%でした！\nあなたも診断してみよう！ #相性診断 #NeoOracle`;
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => setShared(true), 500);
  };

  const resultData = useMemo(() => {
    if (resultScore === null) return null;
    return loveCompatibilityResults.find(r => resultScore >= r.minScore && resultScore <= r.maxScore);
  }, [resultScore]);

  return (
    <>
      <Seo
        title="恋するふたりの相性度診断 | Neo-Oracle"
        description="あなたと気になるお相手の名前と誕生日から、ふたりの相性度をパーセントで診断します。恋の行方や、もっと仲良くなるためのヒントが見つかるかも？"
        keywords="相性診断, 恋愛, 占い, 無料, カップル, 片思い, 相性, 性格診断"
        image="/images/ogp/love-compatibility.png"
      />
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 font-sans overflow-hidden">
        <AnimatePresence mode="wait">
          {phase === "input" && (
            // ... 入力フォームのJSXは変更なし ...
            <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-2xl">
              <div className="relative bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-pink-500/20 shadow-2xl">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center tracking-wider text-pink-300 dotgothic16-regular">ふたりの相性度診断</h1>
                {isLoading ? ( <div className="h-64 animate-pulse bg-slate-800 rounded-lg"></div> ) : (
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleDiagnose}>
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-center text-pink-200 border-b-2 border-pink-400/50 pb-2">あなた</h2>
                      <div>
                        <label className="block mb-2 font-semibold"><User className="inline w-5 h-5 mr-2 -mt-1" />名前 (任意)</label>
                        <input type="text" value={myName} onChange={(e) => setMyName(e.target.value)} disabled={myNameDisabled} className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 disabled:opacity-70" />
                      </div>
                      <div>
                        <label className="block mb-2 font-semibold"><Calendar className="inline w-5 h-5 mr-2 -mt-1" />誕生日</label>
                        <input type="date" value={myBirthday} onChange={(e) => setMyBirthday(e.target.value)} disabled={myBirthdayDisabled} required className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 disabled:opacity-70" />
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h2 className="text-xl font-bold text-center text-cyan-200 border-b-2 border-cyan-400/50 pb-2">お相手</h2>
                      <div>
                        <label className="block mb-2 font-semibold"><User className="inline w-5 h-5 mr-2 -mt-1" />名前 (ひらがな)</label>
                        <input type="text" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700" placeholder="例: はなこ" />
                      </div>
                      <div>
                        <label className="block mb-2 font-semibold"><Calendar className="inline w-5 h-5 mr-2 -mt-1" />誕生日</label>
                        <input type="date" value={partnerBirthday} onChange={(e) => setPartnerBirthday(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700" />
                      </div>
                    </div>
                    <div className="md:col-span-2 text-center pt-4">
                      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                      <button type="submit" className="px-10 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 font-bold tracking-wider shadow-lg text-lg transform hover:scale-105 transition-all duration-300">相性を占う</button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {phase === "animating" && (
            <motion.div key="animating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center w-full max-w-lg h-96 relative">
              <p className="text-xl font-bold tracking-wide animate-pulse text-pink-200 z-10">ふたりの相性を計算中...</p>
              <FlyingHeartsAnimation />
            </motion.div>
          )}

          {phase === "result" && resultData && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-pink-500/30 shadow-2xl flex flex-col items-center text-center">
              <p className="text-pink-300 mb-2">ふたりの相性度は...</p>
              <div className="relative flex items-center justify-center mb-4">
                <span className="text-7xl sm:text-8xl font-bold text-white tracking-tighter">{resultScore}</span>
                <span className="text-3xl font-bold text-pink-400 mt-4">%</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{resultData.title}</h2>
              {/* ★★★ 表示テキストをstateから取得 ★★★ */}
              <p className="text-slate-300 leading-relaxed mb-6">{resultText}</p>

              <div className="w-full p-4 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
                <div className={`transition-all duration-500 ${!shared ? 'blur-xs select-none' : ''}`}>
                  <h3 className="font-bold text-pink-300 mb-2">ふたりのための追加アドバイス</h3>
                  <p className="text-slate-300 leading-relaxed">{resultData.unlockedText}</p>
                </div>
                <AnimatePresence>
                  {!shared && (
                    <motion.div 
                      key="share-overlay"
                      className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 backdrop-blur-sm p-4 rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3 className="font-bold text-white mb-3 text-center">シェアして追加アドバイスを見る</h3>
                      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                        <button onClick={handleLineShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#06C755] text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"><LineIcon className="w-6 h-6" />LINEで送る</button>
                        <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-500 transition-colors"><Share2 className="w-5 h-5" />その他でシェア</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button onClick={() => navigate("/daily")} className="mt-8 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
                今日の恋愛運を占って相性度を高めよう！ <ArrowRight size={20} />
              </button>

              <button onClick={() => { setShared(false); setPhase("input"); }} className="mt-4 text-sm text-slate-400 hover:text-white transition">もう一度診断する</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
