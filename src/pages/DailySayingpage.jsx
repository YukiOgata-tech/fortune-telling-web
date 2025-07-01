import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Share2, MessageCircle } from "lucide-react";
import { sayings } from "@/data/sayings";
import { useAuth } from "@/components/features/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useGtagEvent from "@/hooks/useGtagEvent";
import Seo from "@/components/Seo";

// LINEアイコンのSVGコンポーネント
const LineIcon = (props) => (
    <svg viewBox="0 0 256 256" {...props}><path fill="#06C755" d="M224 0H32C14.33 0 0 14.33 0 32v192c0 17.67 14.33 32 32 32h192c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32z" /><path fill="#FFF" d="M197.33 160H184c-3.67 0-6.67 2.33-6.67 6v2.67c0 3.67-3 6.67-6.67 6.67h-12c-3.67 0-6.67-3-6.67-6.67v-1.33c0-10-8-18.67-18-18.67H128c-12 0-22-10-22-22V128c0-12 10-22 22-22h13.33c12 0 22 10 22 22v13.33c0 4.67 3.33 8.67 8 8.67h12.67c4.67 0 8.67-4 8.67-8.67V128c0-21.33-17.33-38.67-38.67-38.67H128c-21.33 0-38.67 17.33-38.67 38.67v14.67c0 4.67-3.33 8.67-8 8.67H68c-4.67 0-8.67-4-8.67-8.67V128c0-32.67 26.67-59.33 59.33-59.33h13.33c32.67 0 59.33 26.67 59.33 59.33v18.67c0 7.33-6 13.33-13.33 13.33zm-96-50.67c-5.33 0-10-4.67-10-10s4.67-10 10-10 10 4.67 10 10-4.67 10-10 10zm-34.67 0c-5.33 0-10-4.67-10-10s4.67-10 10-10 10 4.67 10 10-4.67 10-10 10z" /></svg>
);

// コメントパターン
const messagePatterns = [
  "今日はこの言葉を心に留めて、一日を過ごしてみてください。",
  "この名言があなたの背中を押してくれるはずです。素敵な一日を！",
  "この言葉とともに、素晴らしい一日をお過ごしください。",
];

// ハッシュ化による名言抽出
const getDiagnosisIndex = (name, birthday, date) => {
  const str = `${name}-${birthday}-${date}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % sayings.length;
};
const getPatternIndex = (name, date) => {
  const str = `${name}-${date}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % messagePatterns.length;
};

export default function DailySayingPage() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [birthdayDisabled, setBirthdayDisabled] = useState(false);
  const [nameDisabled, setNameDisabled] = useState(false);
  const [isQuoteUnlocked, setIsQuoteUnlocked] = useState(false); // ★★★ 名言表示のロック状態

  const sendGtagEvent = useGtagEvent();
  const today = new Date().toISOString().slice(0, 10);

  // ユーザーデータ取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            const data = docSnap.data();
            const birthdayDate = data?.birthday?.toDate ? data.birthday.toDate() : null;
            const yyyyMMdd = birthdayDate ? birthdayDate.toISOString().slice(0, 10) : "";
            const displayName = data?.displayName || user.displayName || "";
            if (yyyyMMdd) { setBirthday(yyyyMMdd); setBirthdayDisabled(true); }
            if (displayName) { setName(displayName); setNameDisabled(true); }
        }
      }
    };
    fetchProfile();
  }, [user]);

  // 診断実行
  const handleDiagnose = (e) => {
    e.preventDefault();
    if (!name || !birthday) return;
    sendGtagEvent("click_start_dailysaying", { event_category: "execution", event_label: "DailySayingPage: Start" });
    setShowAnimation(true);
    setShowResult(false);
    setIsQuoteUnlocked(false); // ★★★ 診断開始時にロック状態をリセット
    setTimeout(() => {
      setShowAnimation(false);
      setShowResult(true);
    }, 1800);
  };
  
  // 診断結果の計算
  const result = useMemo(() => {
    if (showResult && name && birthday) {
      const idx = getDiagnosisIndex(name, birthday, today);
      return sayings[idx];
    }
    return null;
  }, [showResult, name, birthday, today]);
  
  const pattern = useMemo(() => {
      if(result) {
          const patternIdx = getPatternIndex(name, today);
          return messagePatterns[patternIdx];
      }
      return "";
  }, [result, name, today]);

  // シェア機能
  const handleShare = async () => {
    if (!result) return;
    const shareText = `今日の私の名言は「${result.author}」のあのセリフ！\nあなたも診断してみよう！ #今日の名言 #NeoOracle`;
    try {
      await navigator.share({ title: "今日の名言 | Neo Oracle", text: shareText, url: window.location.href });
      setIsQuoteUnlocked(true);
    } catch (err) {
      alert("シェアに失敗しました");
    }
  };
  
  // LINEシェア
  const handleLineShare = () => {
      if (!result) return;
      const shareText = `今日の私の名言は「${result.author}」のあのセリフ！\nあなたも診断してみよう！ #今日の名言 #NeoOracle`;
      const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setTimeout(() => setIsQuoteUnlocked(true), 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4">
      <Seo
        title="今日の名言診断 - あなたに贈る一日一言 | Neo-Oracle"
        description="誕生日と名前から、今日のあなたにぴったりの名言・格言を毎日お届けします。偉人や哲学者の言葉が、あなたの人生や一日に新たな視点とインスピレーションを与えてくれるはず。"
        keywords="今日の名言, 名言, 格言, 診断, 毎日, 偉人, 哲学者, 人生, 自己啓発, インスピレーション"
        image="/images/CTAs/bg-dailysaying-cta.png"
      />
      <div className="relative w-full max-w-2xl bg-slate-900/50 rounded-xl shadow-xl p-8">
        <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-55" style={{ backgroundImage: "url('/images/bg-dailysaying.png')", filter: "brightness(0.9)" }} aria-hidden="true" />
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wider yusei-magic-regular">今日の名言診断</h1>

        {/* 診断前フォーム */}
        {!showAnimation && !showResult && (
          <>
            <form className="space-y-6 justify-center" onSubmit={handleDiagnose}>
              <div>
                <label className="block mb-1 font-semibold"><User className="inline w-4 h-4 mr-1 -mt-1" />名前</label>
                <input type="text" className={`w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-400 ${nameDisabled ? "opacity-70 cursor-not-allowed" : ""}`} placeholder="例）山田太郎" value={name} onChange={(e) => setName(e.target.value)} required disabled={nameDisabled} />
              </div>
              <div>
                <label className="block mb-1 font-semibold"><Calendar className="inline w-4 h-4 mr-1 -mt-1" />誕生日</label>
                <input type="date" className={`w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-400 ${birthdayDisabled ? "opacity-70 cursor-not-allowed" : ""}`} value={birthday} onChange={(e) => setBirthday(e.target.value)} required disabled={birthdayDisabled} />
              </div>
              <button type="submit" className="w-auto px-4 py-2 mt-4 rounded bg-gradient-to-r from-indigo-500 to-blue-700 hover:from-blue-700 hover:to-indigo-500 font-bold tracking-wider shadow-lg transition">診断開始</button>
            </form>
            <div className="mt-8 mb-2 bg-white/10 rounded-xl p-5 text-white/90 shadow-inner border border-indigo-800/30">
              <h2 className="font-bold text-lg md:text-2xl mb-2 tracking-wide text-indigo-200">名言や格言とはなにか</h2>
              <p className="text-md md:text-lg leading-relaxed whitespace-pre-line">名言や格言とは、人の心に深く響き、人生や社会の本質を鋭く捉えた「言葉の遺産」です。偉人や哲学者だけでなく、時には物語や現実の「悪人」と呼ばれる人物の言葉でさえ、私たちの心を揺さぶる名言となることがあります。悪人の言葉には、善悪や正義の枠を越えて、人間の本音や社会の矛盾、心理の深層を鋭く突く力があり、時に私たちをハッとさせたり、新たな視点を与えたりします。その言葉が発せられた状況や背景によって重みを増し、必ずしも「善」や「模範」を語るものだけではありません。人生の苦悩や迷い、闇を経験したからこそ生まれる言葉もあり、そうした言葉は聞く人の心に“納得”や“共感”をもたらします。名言や格言とは、誰が語ったかにかかわらず、人間の本質や普遍的な真理に迫る力を持つものであり、私たちがよりよく生きるためのヒントや問いを与えてくれる存在なのです。</p>
            </div>
          </>
        )}

        {/* アニメーション */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div key="analyze" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center min-h-[200px]">
              <motion.div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-400 flex items-center justify-center mb-4" animate={{ scale: [1, 1.2, 0.95, 1.1, 1], rotate: [0, 10, -10, 0], boxShadow: ["0 0 0px #4f46e5", "0 0 32px #6366f1", "0 0 64px #818cf8", "0 0 0px #4f46e5"] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                <motion.div className="w-8 h-8 bg-white bg-opacity-40 rounded-full" animate={{ scale: [0.95, 1.2, 1, 1.1, 0.95] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }} />
              </motion.div>
              <motion.div className="text-lg font-bold tracking-wide animate-pulse" initial={{ opacity: 0.7 }} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ repeat: Infinity, duration: 1.2 }}>今日の名言を診断中...</motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 診断結果 */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div key="result" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="mt-10 text-center">
              <div className="text-sm md:text-md text-slate-400 mb-1">{name}さんの今日の名言</div>
              
              <div className="relative bg-slate-800/50 p-6 rounded-xl border border-indigo-500/20 overflow-hidden">
                <div className={`transition-all duration-500 ${!isQuoteUnlocked ? 'blur-sm select-none' : ''}`}>
                  <blockquote className="text-2xl md:text-3xl font-bold my-4">『{result.text}』</blockquote>
                </div>
                
                <AnimatePresence>
                {!isQuoteUnlocked && (
                    <motion.div 
                        key="share-overlay-saying"
                        className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/20 backdrop-blur-xs p-4 rounded-xl"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <h3 className="font-bold text-white mb-4">シェアして名言を見る</h3>
                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                            <button onClick={handleLineShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#06C755] text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition-opacity"><LineIcon className="w-6 h-6" />LINEでシェア</button>
                            <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-500 transition-colors"><Share2 className="w-5 h-5" />その他でシェア</button>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
              </div>
              
              <div className="mt-4 mb-4 font-bold text-yellow-500 text-xl">— {result.author}</div>
              {isQuoteUnlocked && <div className="text-lg text-slate-300">{pattern}</div>}

              <button onClick={() => { setShowResult(false); }} className="mt-8 px-6 py-2 rounded-md bg-slate-800/80 hover:bg-slate-700 border border-indigo-500 text-indigo-200 transition">もう一度診断する</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
