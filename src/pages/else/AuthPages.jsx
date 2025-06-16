// One file for simplicity; you can split later if needed.
import React, { useState } from "react";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/features/AuthContext";
import LoginStatus from "@/components/features/LoginStaus";
import { SwitchAccountButton, LogoutButton } from "@/components/features/AccountActionButtons";
import LoginBenefits from "@/components/general/LoginBenefits";

/* ---------- Helper Layout with animation ---------- */
const AuthLayout = ({ title, children }) => (
  <div className="relative min-h-[50dvh] overflow-hidden text-white">
    {/* Floating stars backdrop */}
    <div className="pointer-events-none absolute inset-0 " />

    <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-24 md:py-32">
      {/* Illustration (hidden on small) */}
      <motion.img
        src="/auth-astro.svg"
        alt="Fortune illustration"
        loading="lazy"
        className="hidden w-1/2 max-w-md select-none "
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "anticipate" }}
      />

      {/* Card */}
      <motion.div
        className="w-full max-w-xl rounded-2xl bg-white/10 backdrop-blur-lg md:ml-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Card className="rounded-2xl border border-white/10 bg-transparent shadow-lg backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-white drop-shadow-md">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </motion.div>
    </div>
  </div>
);

/* ---------- Login Page ---------- */
export const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ログイン済みならフォーム非表示でLoginStatus+案内+ダッシュボード遷移ボタンのみ
  if (user) {
    return (
      <AuthLayout title="ログイン中です">
        <LoginStatus position="" className="top-16" />
        <div className="mt-8 flex flex-col items-center gap-6 text-lg">
          <div className="text-center">
            <p className="mb-2 font-semibold">すでにログインしています。</p>
            <p className="text-sm text-gray-200">
              このままご利用いただけます。<br />
              下のボタンからダッシュボードに移動できます。
            </p>
          </div>
          <Button
            size="lg"
            className="px-8 py-3 text-lg rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-xl"
            onClick={() => navigate("/dashboard")}
          >
            ダッシュボードへ移動
          </Button>
          <SwitchAccountButton/>
        </div>
      </AuthLayout>
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <AuthLayout title="ログイン">
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-6">
          <Input
            className="bg-white/10 placeholder:text-white/60 focus:bg-white/20"
            type="email"
            placeholder="メールアドレス"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            className="bg-white/10 placeholder:text-white/60 focus:bg-white/20"
            type="password"
            placeholder="パスワード"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button type="submit" className="w-[20%] mx-auto border-1" disabled={loading}>
          {loading ? "ログイン中…" : "ログイン"}
        </Button>
        <div className="flex flex-col gap-2 pt-2 text-center text-sm md:flex-row md:justify-between">
          <Link to="/reset" className="text-indigo-300 hover:underline">
            パスワードを忘れた？
          </Link>
          <Link to="/register" className="text-indigo-300 hover:underline">
            新規登録はこちら
          </Link>
        </div>
      </form>
    </AuthLayout>
    <LoginBenefits/>
    </div>
  );
}
/* ---------- Register Page ---------- */
export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", displayName: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.email, form.password, { displayName: form.displayName });
      navigate("/verify", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="新規登録">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            placeholder="ニックネーム (任意)"
            value={form.displayName}
            onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          />
          <Input
            type="email"
            placeholder="メールアドレス"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            type="password"
            placeholder="パスワード (6文字以上)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "登録中…" : "登録"}
        </Button>
        <p className="mt-4 text-center text-sm">
          すでにアカウントをお持ちですか？ {" "}
          <Link to="/login" className="text-indigo-500 hover:underline">
            ログイン
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

/* ---------- Password Reset Page ---------- */
export const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setDone(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout title="パスワードリセット">
      {done ? (
        <p className="text-center text-sm">リセットメールを送信しました。受信ボックスをご確認ください。</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="登録済みメールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full">
            送信
          </Button>
        </form>
      )}
      <p className="mt-4 text-center text-sm">
        <Link to="/login" className="text-indigo-500 hover:underline">
          ログインに戻る
        </Link>
      </p>
    </AuthLayout>
  );
};
