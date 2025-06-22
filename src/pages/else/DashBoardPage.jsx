import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/features/AuthContext";
import { updateProfile } from "firebase/auth";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/features/AccountActionButtons";
import NicknameEdit from "@/components/features/NicknameEdit";
import BirthdayEdit from "@/components/features/BirthdayEdit";
import ResultCard from "@/components/ResultCard";
import { fortuneDetails } from "@/data/main-content/fortuneDetails";
import { fortuneAdvice } from "@/data/main-content/fortuneAdvice2025";
import { SparklesIcon, TrashIcon } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";

import MyCommentsList from "@/components/MycommentsList";

dayjs.extend(relativeTime);
dayjs.locale("ja");

const limeGlass =
  "bg-gradient-to-bl from-lime-300/10 via-white/10 to-lime-500/10 backdrop-blur-sm border border-lime-400/30";

export default function DashboardPage() {
  const { user } = useAuth();

  /* ────────── Result (latest) ────────── */
  const [latest, setLatest] = useState(null);
  const [loadingResult, setLoadingResult] = useState(true);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "results", "latest");
    getDoc(ref).then((snap) => {
      if (snap.exists()) setLatest(snap.data());
      setLoadingResult(false);
    });
  }, [user]);


  



  /* ────────── UI Tabs ────────── */
  return (
    <div className="min-h-screen px-4 pb-20 pt-10 flex flex-col items-center text-gray-700 relative overflow-x-hidden">
      <Tabs defaultValue="profile" className="w-full max-w-4xl">
        <TabsList className="flex justify-center gap-4 mb-10 bg-amber-100/20">
          {[
            { v: "profile", label: "プロフィール" },
            { v: "results", label: "診断結果" },
            { v: "comments", label: "コメント" },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              className="tab px-6 py-2 rounded-full font-bold text-sm md:text-base data-[state=active]:bg-lime-500 data-[state=active]:text-gray-900 bg-white/10 hover:bg-lime-600/40 transition"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ─────── Profile ─────── */}
        <TabsContent value="profile" className="space-y-8">
          <Card className={`${limeGlass} p-6 w-full`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white biz-udpmincho-regular">
                <SparklesIcon className="w-5 h-5 text-yellow-400" /> ようこそ、
                {user?.displayName || user?.email?.split("@")[0]} さん！
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-md md:text-base font-bold text-gray-200">
              <p>メール: {user?.email}</p>
              <p>UID: {user?.uid}</p>
              <p>
                メール確認: {user?.emailVerified ? "✓ 済" : "未確認"}
              </p>
            </CardContent>
          </Card>

          <Card className={`${limeGlass} p-6 space-y-6`}>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-semibold text-white biz-udpmincho-regular">設定変更</CardTitle>
            </CardHeader>
            <NicknameEdit />
            <BirthdayEdit />
            <div className="pt-4">
              <LogoutButton className="bg-red-600/30 hover:bg-red-600/60" />
            </div>
          </Card>
        </TabsContent>

        {/* ─────── Results ─────── */}
        <TabsContent value="results">
          <Card className={`${limeGlass} p-6 space-y-6 w-full text-white`}>
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl font-semibold biz-udpmincho-regular">最新の診断結果</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingResult ? (
                <div>診断データを読み込み中...</div>
              ) : latest && latest.topTypes ? (
                <>
                  <p className="mb-2">診断日: {latest.date?.slice(0, 10)}</p>
                  <ResultCard typeId={latest.topTypes[0].typeId} className="h-64 max-w-md mx-auto" />
                  <details className="mt-4">
                    <summary className="cursor-pointer font-semibold md:text-xl hover:text-white/50">詳細</summary>
                    <p className="whitespace-pre-line text-sm md:text-base mt-2">
                      {fortuneDetails[latest.topTypes[0].typeId]}
                    </p>
                  </details>
                  <details className="mt-4">
                    <summary className="cursor-pointer font-semibold md:text-xl hover:text-white/50">アドバイス</summary>
                    <p className="whitespace-pre-line text-sm md:text-base mt-2">
                      {fortuneAdvice[latest.topTypes[0].typeId]}
                    </p>
                  </details>
                </>
              ) : (
                <div>
                  <p className="mb-4">まだ診断データがありません。</p>
                  <Button onClick={() => (window.location.href = "/questionnaire")}>診断を受ける</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─────── Comments ─────── */}
        
        <TabsContent value="comments" className="py-8 px-2">
            <h2 className="text-2xl font-bold text-lime-300 mb-6">過去のコメント</h2>
            <MyCommentsList/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
