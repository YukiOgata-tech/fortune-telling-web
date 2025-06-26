import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Share2 } from "lucide-react";
import { sayings } from "@/data/sayings";
import { useAuth } from "@/components/features/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useGtagEvent from "@/hooks/useGtagEvent";

// コメントパターン
const messagePatterns = [
  "今日はこの言葉を心に留めて、一日を過ごしてみてください。",
  "この名言があなたの背中を押してくれるはずです。素敵な一日を！",
  "この言葉とともに、素晴らしい一日をお過ごしください。",
];

// ハッシュ化による名言抽出（日・人ごとで1日固定）
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

  const sendGtagEvent = useGtagEvent();

  // 今日の日付
  const today = new Date().toISOString().slice(0, 10);

  // ユーザーデータ取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const data = docSnap.data();
        // 誕生日
        const birthdayDate = data?.birthday?.toDate
          ? data.birthday.toDate()
          : null;
        const yyyyMMdd = birthdayDate
          ? birthdayDate.toISOString().slice(0, 10)
          : "";
        // 名前
        const displayName = data?.displayName || user.displayName || "";
        if (yyyyMMdd) {
          setBirthday(yyyyMMdd);
          setBirthdayDisabled(true);
        } else {
          setBirthday("");
          setBirthdayDisabled(false);
        }
        if (displayName) {
          setName(displayName);
          setNameDisabled(true);
        } else {
          setName("");
          setNameDisabled(false);
        }
      } else {
        setBirthday("");
        setName("");
        setBirthdayDisabled(false);
        setNameDisabled(false);
      }
    };
    fetchProfile();
    // eslint-disable-next-line
  }, [user]);

  // シェア
  const [shared, setShared] = useState(false);
  const handleShare = async () => {
    const shareData = {
      title: "今日の名言 | Neo Oracle",
      text: `${name}さんの今日の名言を診断！\n#今日の名言 #NeoOracle`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShared(true);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("リンクをコピーしました。SNSに貼り付けてシェアしてください。");
        setShared(true);
      }
    } catch (err) {
      alert("シェアに失敗しました");
      console.error(err);
    }
  };

  // 診断実行
  const handleDiagnose = (e) => {
    e.preventDefault();
    if (!name || !birthday) return;
    sendGtagEvent("click_start_dailysaying", {
      event_category: "execution",
      event_label: "DailySayingPage: Start",
    });
    setShowAnimation(true);
    setShowResult(false);
    setTimeout(() => {
      setShowAnimation(false);
      setShowResult(true);
      setShared(false);
    }, 1800);
  };

  let result = null,
    pattern = null;
  if (showResult && name && birthday) {
    const idx = getDiagnosisIndex(name, birthday, today);
    result = sayings[idx];
    const patternIdx = getPatternIndex(name, today);
    pattern = messagePatterns[patternIdx];
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white p-4">
      <div className="relative w-full max-w-2xl bg-slate-900/50  rounded-xl shadow-xl p-8">
        {/* === 背景イメージレイヤー ========================== */}
        <div
          className="absolute inset-0 -z-2 bg-cover bg-center opacity-55"
          style={{
            backgroundImage: "url('/images/bg-dailysaying.png')",
            filter: "brightness(0.9)",
          }}
          aria-hidden="true"
        />
        <h1 className="text-3xl font-bold mb-6 text-center tracking-wider yusei-magic-regular">
          今日の名言診断
        </h1>

        {/* 診断前フォーム */}
        {!showAnimation && !showResult && (
          <>
            <form
              className="space-y-6 justify-center"
              onSubmit={handleDiagnose}
            >
              <div>
                <label className="block mb-1 font-semibold">
                  <User className="inline w-4 h-4 mr-1 -mt-1" />
                  名前
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-400 ${
                    nameDisabled ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  placeholder="例）山田太郎"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={nameDisabled}
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">
                  <Calendar className="inline w-4 h-4 mr-1 -mt-1" />
                  誕生日
                </label>
                <input
                  type="date"
                  className={`w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-400 ${
                    birthdayDisabled ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  disabled={birthdayDisabled}
                />
              </div>

              <button
                type="submit"
                className="w-auto px-4 py-2 mt-4 rounded bg-gradient-to-r from-indigo-500 to-blue-700 hover:from-blue-700 hover:to-indigo-500 font-bold tracking-wider shadow-lg transition"
              >
                診断開始
              </button>
            </form>
            {/* 名言とは？フェーズ */}
            <div className="mt-8 mb-2 bg-white/10 rounded-xl p-5 text-white/90 shadow-inner border border-indigo-800/30">
              <h2 className="font-bold text-lg md:text-2xl mb-2 tracking-wide text-indigo-200">
                名言や格言とはなにか
              </h2>
              <p className="text-md md:text-lg leading-relaxed whitespace-pre-line">
                名言や格言とは、人の心に深く響き、人生や社会の本質を鋭く捉えた「言葉の遺産」です。偉人や哲学者だけでなく、時には物語や現実の「悪人」と呼ばれる人物の言葉でさえ、私たちの心を揺さぶる名言となることがあります。悪人の言葉には、善悪や正義の枠を越えて、人間の本音や社会の矛盾、心理の深層を鋭く突く力があり、時に私たちをハッとさせたり、新たな視点を与えたりします。
                名言や格言は、その言葉が発せられた状況や背景によって重みを増し、必ずしも「善」や「模範」を語るものだけではありません。人生の苦悩や迷い、闇を経験したからこそ生まれる言葉もあり、そうした言葉は聞く人の心に“納得”や“共感”をもたらします。
                名言や格言とは、誰が語ったかにかかわらず、人間の本質や普遍的な真理に迫る力を持つものであり、私たちがよりよく生きるためのヒントや問いを与えてくれる存在なのです。
              </p>
            </div>
          </>
        )}

        {/* アニメーション */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              className="flex flex-col items-center justify-center min-h-[200px]"
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-400 flex items-center justify-center mb-4"
                animate={{
                  scale: [1, 1.2, 0.95, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                  boxShadow: [
                    "0 0 0px #4f46e5",
                    "0 0 32px #6366f1",
                    "0 0 64px #818cf8",
                    "0 0 0px #4f46e5",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="w-8 h-8 bg-white bg-opacity-40 rounded-full"
                  animate={{
                    scale: [0.95, 1.2, 1, 1.1, 0.95],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <motion.div
                className="text-lg font-bold tracking-wide animate-pulse"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                今日の名言を診断中...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 診断結果 */}
        <AnimatePresence>
          {showResult && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
              className="mt-10 text-center"
            >
              <div className="text-sm text-slate-400 mb-1">
                {name}さんの今日の名言
              </div>
              <div className="text-3xl font-bold mt-2 mb-3">
                『{result.text}』
              </div>
              <div className="mb-4 font-bold text-yellow-500 text-lg">
                — {result.author}
              </div>
              <div className="text-lg text-slate-300">{pattern}</div>
              <button
                onClick={handleShare}
                className="mt-7 px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-400 font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:opacity-80"
              >
                <Share2 className="w-5 h-5" />
                シェアする
              </button>
              <button
                onClick={() => {
                  setShowResult(false);
                  if (!nameDisabled) setName("");
                  if (!birthdayDisabled) setBirthday("");
                }}
                className="mt-4 px-6 py-2 rounded-md bg-slate-900/80 hover:bg-slate-700 border border-indigo-500 text-indigo-200 transition"
              >
                もう一度診断する
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
