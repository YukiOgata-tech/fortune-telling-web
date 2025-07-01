// src/pages/AuthPages.jsx — Email/Password + Google, Apple, Game Center

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { useAuth } from "@/components/features/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

/* -------------------------------------------------- */

const AuthLayout = ({ title, children }) => (
  <div className="relative min-h-screen overflow-hidden text-white">
    <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-24 md:py-32">
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

/* ---------- Reset Password ---------- */
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
        <p className="text-center text-sm text-lime-200">
          リセットメールを送信しました。受信ボックスをご確認ください。
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="登録済みメールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/20 backdrop-blur-md"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 hover:opacity-90"
          >
            送信
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm">
        <Link
          to="/login/to/neo-oracle"
          className="text-emerald-300 hover:underline"
        >
          ログインに戻る
        </Link>
      </p>
    </AuthLayout>
  );
};

/* -------------------- Login ------------------------ */
export const LoginPage = () => {
  const navigate = useNavigate();
  const { user, login, logout, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await login(email, password);
      
      // ★★★ 修正点 ★★★
      // ログイン後、メール認証が済んでいるかチェック
      if (userCredential.user.emailVerified) {
        navigate("/dashboard"); // 認証済みならダッシュボードへ
      } else {
        navigate("/verify-email"); // 未認証なら確認ページへ
      }

    } catch (err) {
      setError("メールアドレスまたはパスワードが違います。");
      console.error(err);
    }
  };
  
  // ソーシャルログイン後のリダイレクト処理
  const handleSocialLogin = async (loginMethod) => {
    try {
      const userCredential = await loginMethod();
      // ソーシャルログインの場合、多くはemailVerifiedがtrueだが、念のためチェック
      if (userCredential.user.emailVerified) {
        navigate("/dashboard");
      } else {
        // 万が一、プロバイダが未認証のメールを返す場合
        navigate("/verify-email");
      }
    } catch (err) {
      setError("ログインに失敗しました。");
      console.error(err);
    }
  }



  /* 既にログインしている場合 */
  if (user) {
    return (
      <AuthLayout title="すでにログイン中">
        <p className="mb-6 text-center text-sm">
          {user.displayName || user.email} でログインしています。
        </p>
        <Button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-gradient-to-r from-lime-400 to-emerald-500"
        >
          ダッシュボードへ
        </Button>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={async () => {
            await logout();
            navigate("/login/to/neo-oracle");
          }}
        >
          別アカウントでログイン
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="ログイン">
      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/50 backdrop-blur"
        />
        <Input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white/50 backdrop-blur"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 hover:opacity-90"
        >
          ログイン
        </Button>
      </form>
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-white/30" />
        <span className="mx-3 text-sm text-white/70 select-none">または</span>
        <div className="flex-grow border-t border-white/30" />
      </div>

      {/* Social Buttons */}
      <div className="my-6 flex flex-col gap-3">
        <Button onClick={() => handleSocialLogin(loginWithGoogle)} className="social-btn bg-white text-gray-800">
          <img src="/images/google-icon.svg" className="h-5 mr-2" alt="Google" /> Google で続行
        </Button>
        {/*<Button onClick={loginWithApple}  className="social-btn bg-black text-white">
          <img src="/apple.svg"  className="h-5 mr-2"/>  Apple で続行
        </Button>
        <Button onClick={loginWithGameCenter} className="social-btn bg-emerald-500/80 text-gray-900">
          <img src="/game.svg"   className="h-5 mr-2"/>  Game Center で続行
        </Button>*/}
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <Link to="/reset-password" className="text-lime-300 hover:underline">
          パスワードをお忘れですか？
        </Link>
        <Link to="/register" className="text-lime-300 hover:underline">
          新規登録はこちら
        </Link>
      </div>
    </AuthLayout>
  );
};

/* -------------------- Register --------------------- */
export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle, loginWithApple, loginWithGameCenter } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, { displayName: name });
      
      // 登録後、ダッシュボードではなくメール認証ページへ
      navigate("/verify");

    } catch (err) {
      setError(err.message);
    }
  };
  // ソーシャルログイン用のハンドラ
  const handleSocialRegister = async (loginMethod) => {
    try {
      await loginMethod();
      navigate("/dashboard"); // ソーシャルログインは通常emailVerified=trueなので直接ダッシュボードへ
    } catch (err) {
      setError("登録に失敗しました。");
      console.error(err);
    }
  };

  return (
    <AuthLayout title="新規登録">
      <form onSubmit={onSubmit} className="space-y-6">
        <Input
          placeholder="ニックネーム"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-white/20 backdrop-blur"
        />
        <Input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/20 backdrop-blur"
        />
        <Input
          type="password"
          placeholder="パスワード (6文字以上)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white/20 backdrop-blur"
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-lime-400 to-emerald-500 hover:opacity-90"
        >
          登録
        </Button>
      </form>
      <div className="relative flex items-center my-6">
        <div className="flex-grow border-t border-white/30" />
        <span className="mx-3 text-sm text-white/70 select-none">または</span>
        <div className="flex-grow border-t border-white/30" />
      </div>

      <div className="my-6 flex flex-col gap-3">
        <Button onClick={() => handleSocialRegister(loginWithGoogle)} className="social-btn bg-white text-gray-800">
          <img src="/images/google-icon.svg" className="h-5 mr-2" alt="Google" /> Google で登録
        </Button>
        {/*<Button onClick={loginWithApple}  className="social-btn bg-black text-white">
          <img src="/apple.svg"  className="h-5 mr-2"/>  Apple で登録
        </Button>
        <Button onClick={loginWithGameCenter} className="social-btn bg-emerald-500/80 text-gray-900">
          <img src="/game.svg"   className="h-5 mr-2"/>  Game Center で登録
        </Button>*/}
      </div>

      <p className="mt-4 text-center text-sm">
        すでにアカウントをお持ちですか？{" "}
        <Link
          to="/login/to/neo-oracle"
          className="text-lime-300 hover:underline"
        >
          ログインへ
        </Link>
      </p>
    </AuthLayout>
  );
};

/* --------------- Route Export Helper --------------- */
export default {
  ResetPasswordPage,
  LoginPage,
  RegisterPage,
};
