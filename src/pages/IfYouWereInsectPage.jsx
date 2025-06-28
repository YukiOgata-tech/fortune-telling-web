import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Share2, Users, Bug } from "lucide-react";
import { insectResults } from "@/data/insectResults";
import { useAuth } from "@/components/features/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Seo from "@/components/Seo";

// 文字列から一意の数値を生成する（ハッシュ化）関数
const stringToSeed = (str) => {
  let hash = 0;
  if (!str || str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 32bit integerに変換
  }
  return hash;
};

// 診断ロジック
const getInsectResult = (birthday, gender, name) => {
  const seed = stringToSeed(`${birthday}-${gender}-${name || ""}`);
  const index = Math.abs(seed) % insectResults.length;
  return insectResults[index];
};

// 診断中アニメーション用の虫コンポーネント
const FlyingInsect = ({ delay, duration, size, children }) => (
  <motion.div
    className="absolute text-cyan-200"
    style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0.8, 0],
      scale: [0, 1, 1, 0],
      x: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
      y: [0, Math.random() * 200 - 100, Math.random() * 200 - 100, 0],
      rotate: [0, Math.random() * 720 - 360],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  >
    {React.cloneElement(children, { size: size })}
  </motion.div>
);

export default function IfYouWereInsectPage() {
  const { user } = useAuth();
  const [phase, setPhase] = useState("input"); // 'input' | 'animating' | 'result'
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("female");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [nameDisabled, setNameDisabled] = useState(false);
  const [birthdayDisabled, setBirthdayDisabled] = useState(false);

  // ログインユーザーの情報を取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.displayName) {
              setName(data.displayName);
              setNameDisabled(true);
            }
            if (data.birthday?.toDate) {
              const formattedBirthday = data.birthday.toDate().toISOString().slice(0, 10);
              setBirthday(formattedBirthday);
              setBirthdayDisabled(true);
            }
          }
        } catch (err) {
          console.error("Failed to fetch user profile:", err);
        }
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, [user]);

  // 診断実行
  const handleDiagnose = (e) => {
    e.preventDefault();
    if (!birthday) {
      setError("誕生日を入力してください。");
      return;
    }
    setError("");
    setPhase("animating");

    setTimeout(() => {
      const diagnosisResult = getInsectResult(birthday, gender, name);
      setResult(diagnosisResult);
      setPhase("result");
    }, 2500); // アニメーション時間
  };

  // シェア機能
  const handleShare = async () => {
    if (!result) return;
    const shareText = `【あなたがもし虫なら診断】\n私は「${result.name}」タイプでした！\nあなたも診断してみよう！ #もし虫診断 #NeoOracle`;
    try {
      await navigator.share({
        title: "あなたがもし虫なら診断 | Neo Oracle",
        text: shareText,
        url: window.location.href,
      });
    } catch (err) {
      console.error("Share failed:", err);
      alert("シェアに失敗しました。");
    }
  };

  // もう一度診断する
  const handleRestart = () => {
    setPhase("input");
    setResult(null);
  };

  return (
    <>
      <Seo
        title="あなたがもし虫なら診断 | Neo-Oracle"
        description="誕生日と名前から、もしあなたが虫だったらのタイプを診断します。あなたの隠れた本能や性質が明らかに！"
        keywords="虫, 診断, 性格診断, 無料, 占い, 昆虫, あなたがもし"
        image="/images/CTAs/bg-insect-cta.png"
      />
      <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 font-sans overflow-hidden">
        <AnimatePresence mode="wait">
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative w-full max-w-lg bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-500/20 shadow-2xl"
            >
              <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center tracking-wider text-green-300 yusei-magic-regular">
                あなたがもし虫なら診断
              </h1>
              {isLoading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-6 bg-slate-700 rounded w-1/4"></div>
                  <div className="h-12 bg-slate-800 rounded w-full"></div>
                  <div className="h-6 bg-slate-700 rounded w-1/4"></div>
                  <div className="h-12 bg-slate-800 rounded w-full"></div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleDiagnose}>
                  <div>
                    <label className="block mb-2 font-semibold text-green-100"><User className="inline w-5 h-5 mr-2 -mt-1" />名前 (任意)</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={nameDisabled} className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all disabled:opacity-70" placeholder="例: 山田 花子" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-green-100"><Calendar className="inline w-5 h-5 mr-2 -mt-1" />誕生日</label>
                    <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} disabled={birthdayDisabled} required className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all disabled:opacity-70" />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-green-100"><Users className="inline w-5 h-5 mr-2 -mt-1" />性別</label>
                    <div className="flex flex-wrap gap-3">
                      {[{key: 'female', label: '女性'}, {key: 'male', label: '男性'}, {key: 'other', label: 'その他'}].map((g) => (
                        <label key={g.key} className="flex items-center cursor-pointer">
                          <input type="radio" name="gender" value={g.key} checked={gender === g.key} onChange={(e) => setGender(e.target.value)} className="hidden" />
                          <span className={`px-4 py-2 rounded-md transition-all duration-200 text-sm sm:text-base border-2 ${gender === g.key ? 'bg-green-500 border-green-400 text-white font-bold' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>{g.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {error && <p className="text-red-400 text-center">{error}</p>}
                  <div className="text-center pt-4">
                    <button type="submit" className="px-10 py-3 rounded-full bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-400 hover:to-cyan-500 font-bold tracking-wider shadow-lg text-lg transform hover:scale-105 transition-all duration-300">診断する</button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {phase === "animating" && (
            <motion.div key="animating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center text-center w-full max-w-lg h-96 relative">
              <p className="text-xl font-bold tracking-wide animate-pulse text-green-200 z-10">あなたに似ている虫を探しています...</p>
              <div className="absolute inset-0 w-full h-full">
                {/* 虫のアニメーション */}
                <FlyingInsect delay={0} duration={5} size={30}><Bug /></FlyingInsect>
                <FlyingInsect delay={0.5} duration={6} size={24}><Bug /></FlyingInsect>
                <FlyingInsect delay={1} duration={4.5} size={36}><Bug /></FlyingInsect>
                <FlyingInsect delay={1.5} duration={5.5} size={28}><Bug /></FlyingInsect>
                <FlyingInsect delay={2} duration={7} size={22}><Bug /></FlyingInsect>
              </div>
            </motion.div>
          )}

          {phase === "result" && result && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-green-500/30 shadow-2xl flex flex-col items-center text-center">
              <p className="text-green-300 mb-2">あなたがもし虫なら...</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{result.name}</h2>
              {/* <img src={result.image} alt={result.name} className="w-48 h-48 object-cover rounded-full mb-6 border-4 border-green-400/50 shadow-lg" /> */}
              <div className="mb-6">
                {result.characteristics.map((char, i) => (
                  <span key={i} className="inline-block bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-sm mr-2 mb-2">{char}</span>
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed mb-8">{result.description}</p>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <button onClick={handleShare} className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity"><Share2 className="w-5 h-5" />結果をシェア</button>
                <button onClick={handleRestart} className="px-6 py-2 rounded-full bg-slate-700 hover:bg-slate-600 border border-slate-500 text-slate-200 transition">もう一度診断する</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
