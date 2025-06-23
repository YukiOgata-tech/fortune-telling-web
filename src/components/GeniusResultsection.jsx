import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/features/AuthContext";
import { geniusResults } from "@/data/geniusResults";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GeniusResultSection({ className = "" }) {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Firestore から取得 */
  useEffect(() => {
    if (!user) return;
    (async () => {
      const ref = doc(db, "users", user.uid, "results", "genius");
      const snap = await getDoc(ref);
      if (snap.exists()) setData(snap.data());
      setLoading(false);
    })();
  }, [user]);

  /* ローディング状態 ---------------------------- */
  if (loading)
    return (
      <Card className={`p-6 space-y-4 ${className}`}>
        <p>天才度診断を読み込み中...</p>
      </Card>
    );

  /* データなし ---------------------------- */
  if (!data)
    return (
      <Card className={`p-6 space-y-4 ${className}`}>
        <p className="mb-4">まだ天才度診断の結果がありません。</p>
        <Button onClick={() => (window.location.href = "/genius")}>
          今すぐ診断する
        </Button>
      </Card>
    );

  /* データあり ---------------------------- */
  const detail = geniusResults.find((r) => r.id === data.resultId) || {};
  const dateStr = data.date?.seconds
    ? new Date(data.date.seconds * 1000).toLocaleDateString("ja-JP")
    : "";

  return (
    <Card className={`relative p-6 space-y-6 text-white ${className}`}>
      <img alt="bg-howgenius-result" className="absolute w-full h-full opacity-50 content-center object-contain inset-0 -z-1" src="/images/CTAs/bg-genius-cta.png"/>
      <CardHeader>
        <CardTitle className="text-xl md:text-3xl font-semibold biz-udpmincho-regular">
          天才度診断結果
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p>
          診断日: <span className="font-semibold">{dateStr}</span>
          総合スコア: <span className="font-semibold text-2xl">{data.total}</span>
        </p>

        <div className="bg-white/10 rounded-xl p-4 space-y-3">
          <h3 className="text-lg md:text-xl font-bold text-lime-300">
            {detail.title || "結果データ読込エラー"}
          </h3>
          <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
            {detail.analysis}
          </p>
          <div className="border-t border-white/20 pt-2">
            <p className="font-semibold text-yellow-300">◆ アドバイス</p>
            <p className="whitespace-pre-wrap text-sm md:text-base">
              {detail.advice}
            </p>
          </div>
        </div>

        <Button
          variant="secondary"
          className="bg-lime-600/80 hover:bg-lime-600/60"
          onClick={() => (window.location.href = "/genius")}
        >
          もう一度診断する
        </Button>
      </CardContent>
    </Card>
  );
}
