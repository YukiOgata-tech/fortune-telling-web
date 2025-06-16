// src/pages/wealth/FortuneWealthResult.jsx
import { useEffect, useState } from "react";
import MoneyGlitchEffect from "@/components/MoneyGlitchEffect";
import ShareButtons from "@/components/ShareButtons";
import { getWealthResult } from "@/data/wealth-releted/calculateWealthPower";

export default function FortuneWealthResult() {
  // 仮: ローカルストレージからデータ取得
  const [form, setForm] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fortuneWealthForm"));
    setForm(saved);

    // 本来は、金運パワー値計算＆金額生成＆コメント出し分け
    if (saved) {
      const r = getWealthResult(saved);
      setResult(r);
    }
  }, []);

  if (!form || !result) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-yellow-300">
        診断結果を計算中...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-yellow-800">
      <div className="max-w-xl w-full bg-black/60 rounded-2xl shadow-2xl p-8 mt-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">
          {form.nickname}さんの生涯年収は…？
        </h2>
        <MoneyGlitchEffect amount={result.amount} />
        <div className="text-gray-100 mt-8 text-center font-medium">{result.message}</div>
        <div className="mt-8 w-full">
          <ShareButtons
            nickname={form.nickname}
            amount={result.amount}
            message={result.message}
          />
        </div>
        <div className="mt-10 text-yellow-300 underline font-semibold text-center">
          <a href="/daily">毎日の占いと金運アドバイスはこちら &rarr;</a>
        </div>
      </div>
    </div>
  );
}
