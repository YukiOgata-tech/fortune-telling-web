import { useState, useEffect } from "react";
import { doc, setDoc, getDoc, collectionGroup, where, query, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/features/AuthContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/features/AccountActionButtons";
import ResultCard from "@/components/ResultCard";
import GeniusResultSection from "@/components/features/GeniusResultsection";
import { fortuneDetails } from "@/data/main-content/fortuneDetails";
import { fortuneAdvice } from "@/data/main-content/fortuneAdvice2025";
import { SparklesIcon, Mail, BellOff } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";

import MyCommentsList from "@/components/features/MycommentsList";
import InlineEditField from "@/components/features/InlineEditField";
import { Switch } from "@/components/ui/switch";

dayjs.extend(relativeTime);
dayjs.locale("ja");

const limeGlass = "bg-gradient-to-bl from-lime-300/10 via-white/10 to-lime-500/10 backdrop-blur-sm border border-lime-400/30";

// メール配信設定コンポーネント
function SubscriptionSettings() {
    const { user } = useAuth();
    const [subscribed, setSubscribed] = useState(true);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        const fetchSubscriptionStatus = async () => {
            const userDocRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                setSubscribed(docSnap.data().wantsDailyDigest !== false);
            }
            setLoading(false);
        };
        fetchSubscriptionStatus();
    }, [user]);

    const handleSubscriptionChange = async (isChecked) => {
        if (!user) return;
        setSaving(true);
        setSubscribed(isChecked);
        const userDocRef = doc(db, "users", user.uid);
        try {
            await setDoc(userDocRef, { wantsDailyDigest: isChecked }, { merge: true });
        } catch (error) {
            console.error("Failed to update subscription status:", error);
            setSubscribed(!isChecked);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="h-10 animate-pulse bg-white/10 rounded-lg"></div>;
    }

    return (
        <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
            <div className="flex items-center gap-3">
                {subscribed ? <Mail className="w-5 h-5 text-lime-300" /> : <BellOff className="w-5 h-5 text-red-400" />}
                <span className="font-semibold text-white">毎朝の運勢メール</span>
            </div>
            <Switch
                checked={subscribed}
                onCheckedChange={handleSubscriptionChange}
                disabled={saving}
                aria-label="メール配信設定"
            />
        </div>
    );
}

// プロフィール項目編集コンポーネント
function ProfileFields() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    if (!user) return;
    const fetchBirthday = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists() && snap.data().birthday && snap.data().birthday.toDate) {
        const date = snap.data().birthday.toDate();
        setBirthday(date.toISOString().slice(0, 10));
      }
    };
    fetchBirthday();
  }, [user]);

  const handleNicknameSave = async (nickname) => {
    setSaving(true);
    try {
      await updateProfile(user, { displayName: nickname });
      await setDoc(doc(db, "users", user.uid), { displayName: nickname, updatedAt: new Date() }, { merge: true });
      const q = query(collectionGroup(db, "comments"), where("userId", "==", user.uid));
      const snap = await getDocs(q);
      const promises = snap.docs.map((d) => updateDoc(d.ref, { userName: nickname }));
      await Promise.all(promises);
    } finally {
      setSaving(false);
    }
  };

  const handleBirthdaySave = async (birthdayVal) => {
    setSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), { birthday: new Date(birthdayVal) }, { merge: true });
      setBirthday(birthdayVal);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-1">
      <InlineEditField label="ユーザー名" value={user?.displayName} minLength={2} maxLength={16} validate={v => v.length >= 2 && v.length <= 16} onSave={handleNicknameSave} disabled={saving} />
      <div className="border-t border-white/20 my-1" />
      <InlineEditField label="誕生日" type="date" value={birthday} onSave={handleBirthdaySave} disabled={saving} />
    </div>
  );
}

// ダッシュボードページ本体
export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [latest, setLatest] = useState(null);
  const [loadingResult, setLoadingResult] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/login/to/neo-oracle", { replace: true });
    } else if (!user.emailVerified) {
      navigate("/verify-email", { replace: true });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user || !user.emailVerified) return;
    const ref = doc(db, "users", user.uid, "results", "latest");
    getDoc(ref).then((snap) => {
      if (snap.exists()) setLatest(snap.data());
      setLoadingResult(false);
    });
  }, [user]);

  if (authLoading || !user || !user.emailVerified) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-lime-400"></div>
        </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pb-20 pt-10 flex flex-col items-center text-gray-200 relative overflow-x-hidden">
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

        {/* プロフィールタブ */}
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
              <p>メール確認: {user?.emailVerified ? "✓ 済" : "未確認"}</p>
            </CardContent>
          </Card>

          <Card className={`${limeGlass} p-6 space-y-4`}>
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-xl md:text-2xl font-semibold text-white biz-udpmincho-regular">設定変更</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4 text-white border-1 rounded-2xl">
              <ProfileFields />
              <div className="border-t border-white/20 my-1" />
              <SubscriptionSettings />
            </CardContent>
            <div className="pt-4">
              <LogoutButton className="bg-red-600/30 hover:bg-red-600/60" />
            </div>
          </Card>
        </TabsContent>

        {/* 診断結果タブ */}
        <TabsContent value="results">
          <Card className={`${limeGlass} p-6 space-y-6 w-full text-white`}>
            <CardHeader>
              <CardTitle className="text-xl md:text-3xl font-semibold biz-udpmincho-regular">性格診断の結果</CardTitle>
            </CardHeader>
            <CardContent>
              {loadingResult ? (
                <div>診断データを読み込み中...</div>
              ) : latest && latest.topTypes ? (
                <>
                  <p className="mb-2">最終診断日: {latest.date?.slice(0, 10)}</p>
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
                  <p className="mb-4">まだ性格診断のデータがありません。</p>
                  <Button onClick={() => navigate("/questionnaire")}>診断を受ける</Button>
                </div>
              )}
            </CardContent>
          </Card>
          <GeniusResultSection className="mt-3 md:mt-8 bg-purple-300/20" />
        </TabsContent>
        
        {/* コメントタブ */}
        <TabsContent value="comments" className="py-8 px-2">
            <h2 className="text-2xl font-bold text-lime-300 mb-6">過去のコメント</h2>
            <MyCommentsList/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
