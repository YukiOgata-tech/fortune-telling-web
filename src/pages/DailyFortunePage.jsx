
import { useState } from "react";
import { createDailyFortune } from "@/utils/fortuneGenerator";
import { Star, Calendar, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const DailyFortunePage = () => {
  const [birthday,setBirthday] = useState("");
  const [gender,setGender] = useState("F");
  const [result,setResult] = useState(null);
  const [shared,setShared] = useState(false);

  const handleSubmit = e=>{
    e.preventDefault();
    const today = new Date().toISOString().slice(0,10);
    setResult(createDailyFortune(birthday,gender,today));
  };

  const handleShare = async () => {
    const shareData = {
      title: "今日の運勢をシェア",
      text: "私の今日の運勢をチェックしてみて！",
      url: window.location.href
    };
    try {
      if(navigator.share){
        await navigator.share(shareData);
        setShared(true);
      }else{
        await navigator.clipboard.writeText(shareData.url);
        alert("リンクをコピーしました。SNSに貼り付けてシェアしてください。");
        setShared(true);
      }
    }catch(err){
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/5 via-slate-900/5 to-fuchsia-800/5 px-4 py-10">
      {!result && (
        <motion.form onSubmit={handleSubmit}
          className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-xl space-y-6"
          initial={{y:30,opacity:0}} animate={{y:0,opacity:1}}>
          <h1 className="text-2xl font-extrabold text-center text-white mb-4">今日の運勢をチェック</h1>
          <label className="block text-white/90 text-sm font-medium mb-1">
            <Calendar className="inline-block w-4 h-4 mr-1 -mt-1"/>誕生日
            <input type="date" required value={birthday}
              onChange={e=>setBirthday(e.target.value)}
              className="mt-1 w-full rounded-xl bg-white/80 p-2 text-slate-800"/>
          </label>
          <div className="flex justify-between items-center">
            <span className="text-white/90 text-sm">性別</span>
            <div className="flex gap-4">
              {["F","M","O"].map(g=>(
                <label key={g} className="text-white/90 flex items-center gap-1">
                  <input type="radio" name="gender" value={g}
                    checked={gender===g} onChange={()=>setGender(g)}
                    className="accent-fuchsia-500"/>
                  {g==="F"?"女性":g==="M"?"男性":"その他"}
                </label>
              ))}
            </div>
          </div>
          <button type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-bold hover:opacity-90">
            今日の運勢を見る
          </button>
        </motion.form>
      )}

      {result && (
        <motion.div
          className="w-full max-w-3xl bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl mt-6 space-y-6 text-white"
          initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}}>

          {/* 総合運カード */}
          <div className="bg-white/10 p-6 rounded-3xl text-center relative">
            <p className="text-5xl font-extrabold mb-2">
              総合運：{result.average.toFixed(1)} / 5
            </p>
            <p className="text-lg whitespace-pre-line mb-4">{result.overallComment}</p>
            <p className="mb-1">
              🎯 <strong>ラッキーアイテム</strong>：{result.luckyItems.join(" / ")}
            </p>
            <p className="flex items-center justify-center gap-2">
              🎨 <strong>ラッキーカラー</strong>：
              <span className="inline-block w-6 h-6 rounded-full border"
                    style={{backgroundColor: result.luckyColor}} />
            </p>
            {!shared && (
              <button onClick={handleShare}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-bold">
                <Share2 className="w-4 h-4"/> シェアして詳細を確認
              </button>
            )}
          </div>

          {/* 各運勢カード */}
          {["love","money","work","health"].map(cat=>(
            <div key={cat} className="bg-white/10 p-4 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-1">
                <span className="capitalize font-semibold">
                  {cat==="love"&&"恋愛運"}
                  {cat==="money"&&"金運"}
                  {cat==="work"&&"仕事運"}
                  {cat==="health"&&"健康運"}
                </span>
                <div className="flex">
                  {Array.from({length:result[cat].stars}).map((_,i)=>(
                    <Star key={i} className="w-5 h-5 text-yellow-300 fill-yellow-300"/>
                  ))}
                </div>
              </div>

              {/* テキスト */}
              <p className={`whitespace-pre-line text-sm leading-relaxed transition
                ${!shared ? "blur-sm select-none" : ""}`}>
                {result[cat].text}
              </p>

              {/* モザイク/覆い */}
              {!shared && (
                <div className="absolute h-[80%] top-[20%] bg-[repeating-linear-gradient(45deg,#4b5563_0_4px,#4b556300_4px_8px)] opacity-70 pointer-events-none" />
              )}
            </div>
          ))}

          {!shared && (
            <button onClick={handleShare}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-400 to-fuchsia-500 text-white font-bold flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5"/> シェアして詳細を表示
            </button>
          )}

          {shared && (
            <button onClick={()=>setResult(null)}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-400 to-fuchsia-500 text-white font-bold hover:opacity-90">
              別の日付で占う
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default DailyFortunePage;
