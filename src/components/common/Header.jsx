import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Menu, Mail, ArrowUpFromLine, LogIn, X,} from "lucide-react";
// Auth機能
import { useAuth } from "@/components/features/AuthContext";

// 画像パス: public/images/menu-witch01.png を配置
const witchImg = "/images/menu-witch01.png";

// ヘッダー用ログインステータス（クリックで任意ページ遷移）
const LoginStatusButton = ({ onClick }) => {
  const { user } = useAuth();
  if (!user) return null;

  const name = user.displayName || user.email;
  return (
    <button
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#f5efff] font-bold bg-gradient-to-br from-[#35a288]/70 to-[#252f39]/70 hover:bg-[#88f7ea]/10 shadow"
      onClick={onClick}
      title="ログイン状態を管理"
    >
      <span className="rounded-full bg-green-400 w-2 h-2 animate-pulse" />
      {name}（ログイン中）
    </button>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  // ページ遷移時にドロワーを閉じる
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ドロワー開閉でスクロール制御
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // トップへ（他ページならホームへナビゲート後スクロール）
  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 共通ボタン
  const NavButton = ({ icon: Icon, label, onClick, title }) => (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-3 py-2 text-[#f5efff] hover:text-[#ffd6fb] rounded-xl text-base transition-all font-bold bg-gradient-to-br from-[#46426b]/50 to-[#2c2844]/50"
      title={title}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <>
      {/* ───── 固定ヘッダー ───── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#1e2337] via-[#22243d] to-[#2a2d46] shadow-lg border-b border-[#282b43] backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          {/* ロゴ / タイトル */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={scrollToTop}
          >
            <Sparkles
              size={28}
              className="text-[#88f7ea] drop-shadow-glow group-hover:rotate-6 transition-transform"
            />
            <span className="text-xl md:text-2xl font-extrabold tracking-wide text-[#f5efff] drop-shadow-xl font-mono group-hover:text-[#c2a9fa] transition-colors">
              占いみたいな性格診断
            </span>
          </div>

          {/* デスクトップナビ */}
          <nav className="hidden md:flex items-center gap-5">
            <NavButton icon={Mail} label="お問い合わせ" onClick={() => navigate("/contact")} title="お問い合わせページへ" />
            <NavButton icon={ArrowUpFromLine} label="トップ" onClick={scrollToTop} title="ページトップへ" />
            {!user ? (
              <NavButton icon={LogIn} label="ログイン" onClick={() => navigate("/login/to/neo-oracle")} />
            ) : (
              <LoginStatusButton onClick={() => navigate("/login/to/neo-oracle")} />
            )}
          </nav>

          {/* モバイルメニュー開く */}
          <button
            className="md:hidden flex items-center justify-center text-[#b09eff] hover:text-[#f5efff] transition"
            onClick={() => setOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* ───── オーバーレイ ───── */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* ───── モバイルドロワー ───── */}
      <aside
        className={`fixed top-0 right-0 h-full w-65 max-w-[70%] z-50 bg-[#23243a]/95 border-l border-[#33374d] shadow-2xl transform-gpu transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* クローズボタン専用ヘッダー */}
        <div className="flex justify-end p-4 border-b border-[#33374d]">
          <button
            className="text-[#b09eff] hover:text-[#f5efff] transition"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* メニューリスト */}
        <nav className="flex flex-col gap-6 px-6 py-6">
          <NavButton icon={Mail} label="お問い合わせ" onClick={() => navigate("/contact")} title="お問い合わせページへ" />
          <NavButton icon={ArrowUpFromLine} label="トップ" onClick={scrollToTop} />
          {!user ? (
            <NavButton icon={LogIn} label="ログイン" onClick={() => navigate("/login/to/neo-oracle")} />
          ) : (
            <LoginStatusButton onClick={() => navigate("/login/to/neo-oracle")} />
          )}
        </nav>
      </aside>

      {/* ───── 魔女がのぞく演出 ───── */}
      <img
        src={witchImg}
        alt="魔女がのぞき込んでいる"
        className={`fixed bottom-[-7rem] w-50 -translate-y-1/2 z-50 pointer-events-none transition-transform duration-500 opacity-70 ${
          open ? "right-[calc(4px+11rem)] translate-x-0" : "right-0 translate-x-full"
        }`}
        style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.6))" }}
      />

      {/* コンテンツを押し下げるプレースホルダー */}
      <div className="h-[72px] md:h-[80px]" />
    </>
  );
};

export default Header;