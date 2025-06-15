import { useAuth } from "@/components/features/AuthContext";

// ポジション名と対応するCSSクラス（Tailwind対応）
const positionClass = {
  "top-right":  "fixed top-4 right-4",
  "top-left":   "fixed top-4 left-4",
  "bottom-right": "fixed bottom-4 right-4",
  "bottom-left":  "fixed bottom-4 left-4",
  "center":     "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const LoginStatus = ({
  position = "top-right",   // デフォルトは右上
  className = "",           // 追加カスタムクラス
  style = {},               // インラインスタイルも渡せる
  ...rest                  // その他propsも受け入れ
}) => {
  const { user } = useAuth();
  if (!user) return null;

  const name = user.displayName || user.email;

  return (
    <div
      className={`z-50 px-4 py-2 rounded-xl shadow-lg bg-gray-900/80 text-gray-100 flex items-center gap-2 text-sm ${positionClass[position] || positionClass["top-right"]} ${className}`}
      style={style}
      {...rest}
    >
      <span className="rounded-full bg-green-400 w-2 h-2 animate-pulse" />
      ログイン中：{name}
    </div>
  );
};

export default LoginStatus;
