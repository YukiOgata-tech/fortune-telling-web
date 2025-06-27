import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SOUL_NUMBERS } from "@/data/soulNumbers";
import CalculationAnimation from "@/components/SoulCalculationAnimation";
import useGtagEvent from "@/hooks/useGtagEvent";
import Seo from "@/components/Seo";
// import { Calendar } from "lucide-react";

//  Auth & Firestore
import { useAuth } from "@/components/features/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function SoulNumberPage() {
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [birthdayDisabled, setBirthdayDisabled] = useState(false);

  const [phase, setPhase] = useState("input"); // input | animating | result
  const [soulNumber, setSoulNumber] = useState(null);
  const [shared, setShared] = useState(false);

  const sendGtagEvent = useGtagEvent();

  /* ────────────────────────── Firestore 生日自動取得 */
  useEffect(() => {
    const fetchBirthday = async () => {
      if (user) {
        try {
          const snap = await getDoc(doc(db, "users", user.uid));
          const data = snap.data();
          const bdate = data?.birthday?.toDate ? data.birthday.toDate() : null;
          const yyyyMMdd = bdate ? bdate.toISOString().slice(0, 10) : "";
          if (yyyyMMdd) {
            setDate(yyyyMMdd);
            setBirthdayDisabled(true);
          } else {
            setDate("");
            setBirthdayDisabled(false);
          }
        } catch (e) {
          console.error(e);
          setBirthdayDisabled(false);
        }
      } else {
        setDate("");
        setBirthdayDisabled(false);
      }
    };
    fetchBirthday();
  }, [user]);

  /* -------------------- share helper -------------------- */
  const shareResult = async (num) => {
    const shareText = `私のソウルナンバーは ${num} ！あなたはいくつ？診断してみて→ ${window.location.href}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "ソウルナンバー診断",
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert(
          "シェア文をクリップボードにコピーしました！ 友達に貼り付けて送ってみましょう。"
        );
      }
      setShared(true);
    } catch (e) {
      console.error(e);
    }
  };

  /* -------------------- phase handlers -------------------- */
  const startAnimation = () => {
    if (!date) return;
    sendGtagEvent("click_start_soul_diagnose", {
      event_category: "execution",
      event_label: "SoulNumberPage: Start",
    });
    setPhase("animating");
  };
  const handleComplete = (num) => {
    setSoulNumber(num);
    setPhase("result");
  };
  const reset = () => {
    setSoulNumber(null);
    setShared(false);
    setPhase("input");
  };

  const resultData = SOUL_NUMBERS.find((d) => d.number === soulNumber);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
      <Seo
        title="ソウルナンバー診断 - 誕生日でわかるあなたの本当の性格・使命 | Neo-Oracle"
        description="生年月日からあなたのソウルナンバーを無料で計算します。隠された性格、才能、恋愛傾向、そして人生の使命までを解き明かし、本当の自分を知る手助けをします。"
        keywords="ソウルナンバー, 占い, 性格診断, 無料, 数秘術, 運命数, 誕生日, 性格, 使命, 才能, 恋愛"
        image="/images/CTAs/bg-soul-cta.png"
      />
      {/* Input Card */}
      {phase === "input" && (
        <Card className="relative w-full max-w-md bg-gradient-to-br from-[#1a1a2e]/90 via-[#23233a]/85 to-[#222e3c]/90 backdrop-blur-xl border-2 border-cyan-400/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-3xl overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_40%_10%,rgba(34,211,238,0.18)_0%,rgba(139,92,246,0.07)_100%)] before:opacity-30 before:blur-sm before:pointer-events-none">
          <CardContent className="flex flex-col gap-6 p-8 z-10">
            <h1 className="text-2xl font-semibold text-center text-white biz-udpmincho-regular">
              SOUL NUMBER 診断
            </h1>
            <label className="block text-white text-sm font-medium mb-1"></label>
            <span className="text-white ">--誕生日入力--</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={birthdayDisabled}
              className="w-full px-4 py-2 rounded-xl text-slate-300 bg-white/10 focus:outline-none border-amber-200 border-1"
            />
            <label />
            <Button
              disabled={!date}
              className="w-full text-lg py-2 rounded-xl yuji-mai-regular bg-indigo-500 hover:bg-indigo-400 transition-colors"
              onClick={startAnimation}
            >
              診断スタート
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Calculation（計算） Animation */}
      {phase === "animating" && (
        <CalculationAnimation date={date} onComplete={handleComplete} />
      )}

      {/* Result  部分 */}
      {phase === "result" && resultData && (
        <Card className="w-full max-w-xl bg-gradient-to-br from-[#1a1a2e]/90 via-[#23233a]/85 to-[#222e3c]/90 border-2 border-cyan-400/60 backdrop-blur-xl shadow-xl mt-8 rounded-3xl">
          <CardContent className="p-8 flex flex-col gap-6 z-10">
            <h2 className="text-4xl font-bold text-center mb-2 text-white yuji-mai-regular">
              あなたの
              <br />
              ソウルナンバーは
              <span className="ml-3 text-cyan-300 animate-pulse text-5xl">
                {resultData.number}
              </span>
            </h2>
            <p className="text-lg leading-relaxed text-indigo-100 mb-2">
              {resultData.description}
            </p>

            {/* Share CTA */}
            {!shared && (
              <Button
                onClick={() => shareResult(resultData.number)}
                className="self-center bg-gradient-to-r from-cyan-400/90 to-indigo-500/90 px-7 py-3 rounded-xl font-bold shadow-lg hover:from-cyan-300 hover:to-indigo-400"
              >
                結果をシェアして著名人を解禁する
              </Button>
            )}

            {/* Celebrities List */}
            <div className="relative mt-4">
              <h3 className="text-xl font-semibold mb-2 text-cyan-200">
                同じナンバーの著名人
              </h3>
              <ul
                className={`grid grid-cols-2 gap-2 text-sm transition-all duration-500 ${
                  shared ? "" : "filter blur-sm grayscale"
                }`}
              >
                {resultData.celebrities.map((c) => (
                  <li
                    key={c.name}
                    className="bg-white/10 rounded-lg px-3 py-2 flex flex-col text-white/90 shadow"
                  >
                    <span className="font-medium">{c.name}</span>
                    <span className="text-cyan-200/80">{c.occupation}</span>
                  </li>
                ))}
              </ul>
              {!shared && (
                <div className="absolute inset-0 flex items-center justify-center text-sm md:text-md font-semibold text-white/90 bg-black/30 rounded-lg pointer-events-none">
                  シェアして著名人との共通点を確認しよう！
                </div>
              )}
            </div>

            <Button
              onClick={reset}
              className="mt-6 self-center bg-white/10 border border-indigo-700/70 text-cyan-200 hover:bg-indigo-900/50"
            >
              もう一度診断する
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
