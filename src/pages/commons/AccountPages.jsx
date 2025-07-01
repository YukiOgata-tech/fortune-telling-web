// VerifyEmail pages with sleek UI and AuthContext helpers.
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/components/features/AuthContext";
import { Button } from "@/components/ui/button";
import { MailCheckIcon } from "lucide-react";

/* --------------- Generic Gradient BG --------------- */
const GradientWrap = ({ children }) => (
  <div className="min-h-[100vh]  text-white">
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
      {children}
    </div>
  </div>
);



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
        <p className="mb-2 text-sm text-white/80">
          {user?.email} 宛に確認メールを送信しました。
          <br />
          <span className="block mt-2">
            <strong className="text-lime-300">
              メール内の認証リンクをクリックするとアカウントの有効化が完了します。
            </strong>
          </span>
        </p>
        <p className="mb-6 text-sm text-white/80">
          <span className="block">
            <span className="font-semibold text-yellow-200">【ご注意】</span>
            メール認証後は自動でログイン状態が切れる場合があります。
          </span>
          <span className="block mt-1">
            <strong>認証後はこの画面で「ダッシュボードへ」ボタンを押すか、または再度ログインしてください。</strong>
            <br />
            （下の「ログインページに戻る」ボタンからログインできます）
          </span>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="secondary" onClick={refresh}>
            確認完了 → ダッシュボードへ
          </Button>
          <Button onClick={resend} disabled={sent}>
            {sent ? "再送しました" : "メールを再送信"}
          </Button>
        </div>
        <div className="mt-6 text-black">
          <Button
            variant="outline"
            onClick={() => navigate("/login/to/neo-oracle")}
          >
            ログインページに戻る
          </Button>
        </div>
      </motion.div>
    </GradientWrap>
  );
};
