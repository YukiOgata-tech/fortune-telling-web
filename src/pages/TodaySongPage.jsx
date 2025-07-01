import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Music, Share2, Users } from "lucide-react";
import { songList } from "@/data/songs";
import Seo from "@/components/Seo";
import { useAuth } from "@/components/features/AuthContext"; // 既存のAuthContextを使用
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // 既存のfirebase.jsからdbをインポート

// 文字列から一意の数値を生成する（ハッシュ化）関数
// これにより、同じ入力からは常に同じ結果が得られる
const stringToSeed = (str) => {
  let hash = 0;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // 32bit integerに変換
  }
  return hash;
};

export default function TodaySongPage() {
  const { user } = useAuth();
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("none");
  const [resultSongs, setResultSongs] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [birthdayDisabled, setBirthdayDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 今日の日付を'YYYY-MM-DD'形式で取得
  const today = new Date().toISOString().slice(0, 10);

  // ログインユーザーの誕生日情報をFirestoreから取得
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            // FirestoreのTimestamp型を'YYYY-MM-DD'形式に変換
            if (data.birthday && typeof data.birthday.toDate === "function") {
              const birthdayDate = data.birthday.toDate();
              const formattedBirthday = birthdayDate.toISOString().slice(0, 10);
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
    setShowAnimation(true);
    setShowResult(false);

    // 診断ロジック
    setTimeout(() => {
      // シード（種）を作成
      const seed = `${today}-${birthday}-${gender}`;

      // シードを元に曲リストをシャッフル（常に同じ結果になるように）
      const shuffled = [...songList].sort((a, b) => {
        const seedA = stringToSeed(a.title + seed);
        const seedB = stringToSeed(b.title + seed);
        return seedA - seedB;
      });

      setResultSongs(shuffled.slice(0, 3));
      setShowAnimation(false);
      setShowResult(true);
    }, 1800);
  };

  // もう一度診断する
  const handleReset = () => {
    setShowResult(false);
    setResultSongs([]);
    // ログイン時に自動設定された誕生日はリセットしない
    if (!birthdayDisabled) {
      setBirthday("");
    }
    setGender("none");
  };

  // シェア機能
  const handleShare = async () => {
    const songsText = resultSongs
      .map((song) => `♪ ${song.title} / ${song.artist}`)
      .join("\n");
    const shareData = {
      title: "今日の歌 | Neo Oracle",
      text: `今日の私にオススメの3曲はこちら！\n\n${songsText}\n\nあなたのおすすめも診断してみよう。#今日の歌 #NeoOracle`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        alert("診断結果をクリップボードにコピーしました！");
      }
    } catch (err) {
      console.error("Share failed:", err);
      alert("シェアに失敗しました。");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 bg-gray-900/20 font-sans">
      <Seo
        title="今日の歌診断 - あなたの気分にぴったりの一曲を毎日お届け | Neo-Oracle"
        description="誕生日を入力するだけで、今日のあなたにオススメの曲を3曲無料で診断します。J-POP、洋楽、K-POPなど200曲以上からセレクト。新しい音楽との出会いを楽しもう。"
        keywords="今日の歌, 音楽, 診断, 無料, おすすめ, J-POP, 洋楽, K-POP, プレイリスト, 毎日"
        image="/images/CTAs/bg-dailysong-cta.png"
      />
      <div className="relative w-full max-w-2xl bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 border border-cyan-500/20"> 
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center tracking-wider text-cyan-300 mochiy-pop-p-one-regular">
          今日の歌 診断
        </h1>

        {/* 診断前フォーム */}
        <AnimatePresence>
          {!showAnimation && !showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isLoading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-6 bg-slate-700 rounded w-1/4"></div>
                  <div className="h-12 bg-slate-800 rounded w-full"></div>
                  <div className="h-6 bg-slate-700 rounded w-1/4"></div>
                  <div className="flex flex-wrap gap-4">
                    <div className="h-10 bg-slate-800 rounded-lg w-24"></div>
                    <div className="h-10 bg-slate-800 rounded-lg w-24"></div>
                    <div className="h-10 bg-slate-800 rounded-lg w-24"></div>
                    <div className="h-10 bg-slate-800 rounded-lg w-32"></div>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleDiagnose}>
                  <div>
                    <label className="block mb-2 font-semibold text-cyan-100">
                      <Calendar className="inline w-5 h-5 mr-2 -mt-1" />
                      誕生日
                    </label>
                    <input
                      type="date"
                      className={`w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${
                        birthdayDisabled ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      disabled={birthdayDisabled}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold text-cyan-100">
                      <Users className="inline w-5 h-5 mr-2 -mt-1" />
                      性別（任意）
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {["男性", "女性", "その他", "none"].map((g) => (
                        <label
                          key={g}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={gender === g}
                            onChange={(e) => setGender(e.target.value)}
                            className="hidden"
                          />
                          <span
                            className={`px-4 py-2 rounded-md transition-all duration-200 text-sm sm:text-base border-2 ${
                              gender === g
                                ? "bg-cyan-500 border-cyan-400 text-white font-bold"
                                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                            }`}
                          >
                            {g === "none" ? "選択しない" : g}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {error && <p className="text-red-400 text-center">{error}</p>}
                  <div className="text-center pt-4">
                    <button
                      type="submit"
                      className="px-10 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-bold tracking-wider shadow-lg text-lg transform hover:scale-105 transition-all duration-300"
                    >
                      診断する
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* アニメーション */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              key="analyze"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center min-h-[250px]"
            >
              <motion.div
                className="w-24 h-24 text-cyan-400 flex items-center justify-center mb-4"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              >
                <Music size={60} />
              </motion.div>
              <p className="text-lg font-bold tracking-wide animate-pulse text-cyan-200">
                今日のあなたに合う曲を解析中...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 診断結果 */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <h2 className="text-2xl font-bold text-cyan-300 mb-6">
                本日のあなたへ贈る3曲
              </h2>
              <div className="space-y-4 mb-8">
                {resultSongs.map((song, index) => (
                  <motion.div
                    key={index}
                    className="bg-slate-800/50 p-4 rounded-lg shadow-md border border-slate-700 text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <p className="text-lg sm:text-xl font-semibold text-white">
                      {song.title}
                    </p>
                    <p className="text-sm sm:text-base text-slate-400">
                      {song.artist}
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <button
                  onClick={handleShare}
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-teal-600 font-bold text-white flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-opacity"
                >
                  <Share2 className="w-5 h-5" />
                  結果をシェア
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded-full bg-slate-700 hover:bg-slate-600 border border-slate-500 text-slate-200 transition"
                >
                  もう一度診断する
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
