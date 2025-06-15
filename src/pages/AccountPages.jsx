// Dashboard & VerifyEmail pages with sleek UI and AuthContext helpers.
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/components/features/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card";
import { SparklesIcon, MailCheckIcon } from "lucide-react";
import ResultCard from "@/components/ResultCard";
import { fortuneTypes } from "@/data/fortuneTypes";
import { fortuneDetails } from "@/data/fortuneDetails";
import { fortuneAdvice } from "@/data/fortuneAdvice2025";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LogoutButton, SwitchAccountButton } from "@/components/features/AccountActionButtons";
import NicknameEdit from "@/components/features/NicknameEdit";

/* --------------- Generic Gradient BG --------------- */
const GradientWrap = ({ children }) => (
  <div className="min-h-[100vh]  text-white">
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
      {children}
    </div>
  </div>
);

/* --------------- Dashboard Page --------------- */
export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firestoreから最新診断結果を取得
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getDoc(doc(db, "users", user.uid, "results", "latest")).then((snap) => {
      if (snap.exists()) setLatest(snap.data());
      else setLatest(null);
      setLoading(false);
    });
  }, [user]);

  return (
    <GradientWrap>
      <motion.div
        className="grid gap-8 md:grid-cols-2 items-start"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Welcome Card */}
        <Card className="rounded-2xl bg-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold biz-udpmincho-regular">
              <SparklesIcon className="h-6 w-6 text-yellow-300" /> ようこそ、
              {user?.displayName || user?.email.split("@")[0]} さん！
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {loading ? (
              <div>診断データを読み込み中...</div>
            ) : latest && latest.topTypes ? (
              <>
                <h3 className="text-xl font-bold mb-2">あなたの診断結果は</h3>
                <p>診断日: {latest.date?.slice(0, 10)}</p>
                <ResultCard
                  typeId={latest.topTypes[0].typeId}
                  className="h-56 max-w-md mx-auto"
                />
                <div className="my-2">
                  <div className="font-semibold">詳細</div>
                  <div className="text-sm whitespace-pre-line">
                    {fortuneDetails[latest.topTypes[0].typeId]}
                  </div>
                </div>
                <div className="my-2">
                  <div className="font-semibold">アドバイス</div>
                  <div className="text-sm whitespace-pre-line">
                    {fortuneAdvice[latest.topTypes[0].typeId]}
                  </div>
                </div>
                <Button onClick={() => navigate("/daily")}>今日の運勢を見る</Button>
              </>
            ) : (
              <div>
                <p className="mb-4">まだ診断データがありません。</p>
                <Button onClick={() => navigate("/questionnaire")}>
                  診断を受ける
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile Card */}
        <Card className="rounded-2xl bg-white/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold biz-udpmincho-regular">プロフィール</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm  md:text-lg text-white/80">
            <p>メール: {user?.email}</p>
            <p>UID: {user?.uid}</p>
            <p>
              メール確認:{" "}
              {user?.emailVerified ? "✓ 済" : "未確認"}
            </p>
          </CardContent>
          <CardContent className="mb-2" >
            <LogoutButton className="bg-red-600/20" />
          </CardContent>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold biz-udpmincho-regular">設定変更</CardTitle>
          </CardHeader>
          <NicknameEdit/>
        </Card>
        
      </motion.div>
    </GradientWrap>
  );
};

/* --------------- Verify Email Page --------------- */
export const VerifyEmailPage = () => {
  const { user } = useAuth();
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const resend = async () => {
    if (!user) return;
    await user.sendEmailVerification();
    setSent(true);
  };

  const refresh = async () => {
    await user.reload();
    if (user.emailVerified) navigate("/dashboard", { replace: true });
  };

  return (
    <GradientWrap>
      <motion.div
        className="mx-auto max-w-lg rounded-2xl bg-white/10 p-10 text-center backdrop-blur-md"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <MailCheckIcon className="mx-auto mb-4 h-12 w-12 text-indigo-300" />
        <h2 className="mb-4 text-2xl font-bold">メールアドレスを確認してください</h2>
        <p className="mb-8 text-sm text-white/80">
          {user?.email} 宛に確認メールを送信しました。リンクをクリックするとアカウントが有効になります。
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="secondary" onClick={refresh}>
            確認完了 → ダッシュボードへ
          </Button>
          <Button onClick={resend} disabled={sent}>
            {sent ? "再送しました" : "メールを再送信"}
          </Button>
        </div>
      </motion.div>
    </GradientWrap>
  );
};

