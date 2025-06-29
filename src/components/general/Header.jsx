import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Menu, Mail, House, LogIn, X, HelpCircle, NotebookText, Pickaxe, User as UserIcon } from "lucide-react";
import { useAuth } from "@/components/features/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const witchImg = "/images/menu-witch01.png";

// === PCヘッダーバー / モバイルドロワー 共通のログイン状態ボタン ===
const LoginStatusButton = ({ onClick, isMobile = false }) => {
  const { user } = useAuth();
  if (!user) return null;

  const name = user.displayName || user.email?.split('@')[0];
  
  if (isMobile) {
    return (
      <button
        className="w-full flex items-center gap-4 px-4 py-3 text-[#f5efff] rounded-xl text-base transition-all font-bold bg-gradient-to-br from-[#35a288]/70 to-[#252f39]/70 hover:bg-[#88f7ea]/20"
        onClick={onClick}
      >
        <UserIcon size={20} className="text-lime-300" />
        <span>{name}</span>
      </button>
    );
  }

  return (
    <button
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#f5efff] font-bold bg-gradient-to-br from-[#35a288]/70 to-[#252f39]/70 hover:bg-[#88f7ea]/10 shadow"
      onClick={onClick}
      title="ダッシュボードへ"
    >
      <span className="rounded-full bg-green-400 w-2 h-2 animate-pulse" />
      {name}
    </button>
  );
};


// === メニュー項目用のボタンコンポーネント ===
const NavButton = ({ icon: Icon, label, onClick, isMobile = false }) => (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 text-[#f5efff] rounded-xl text-base transition-all font-bold ${isMobile ? 'bg-white/5 hover:bg-white/10' : 'bg-white/5 hover:bg-white/10 text-xl'}`}
      whileHover={!isMobile ? { scale: 1.03 } : {}}
      whileTap={!isMobile ? { scale: 0.98 } : {}}
    >
      <Icon size={isMobile ? 20 : 24} className="text-cyan-300" />
      <span>{label}</span>
    </motion.button>
);


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [pcMenuOpen, setPcMenuOpen] = useState(false);

  useEffect(() => {
    setMobileDrawerOpen(false);
    setPcMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const isMenuOpen = mobileDrawerOpen || pcMenuOpen;
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen, pcMenuOpen]);

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { icon: House, label: "トップへ", action: scrollToTop },
    { icon: Pickaxe, label: "このサイトについて", action: () => navigate("/about-me") },
    { icon: NotebookText, label: "ブログ", action: () => navigate("/blog") },
    { icon: HelpCircle, label: "よくある質問", action: () => navigate("/faq") },
    { icon: Mail, label: "お問い合わせ", action: () => navigate("/contact") },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#1e2337] via-[#22243d] to-[#2a2d46] shadow-lg border-b border-[#282b43] backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={scrollToTop}>
            <Sparkles size={28} className="text-[#88f7ea] drop-shadow-glow group-hover:rotate-6 transition-transform" />
            <span className="text-xl md:text-2xl font-extrabold tracking-wide text-[#f5efff] drop-shadow-xl font-mono group-hover:text-[#c2a9fa] transition-colors biz-udpmincho-regular">
              占いみたいな性格診断
            </span>
          </div>

          {/* PC用メニュー */}
          <nav className="hidden md:flex items-center gap-4 ml-auto">
            <button className="flex items-center gap-1 px-3 py-2 text-[#f5efff] hover:text-[#ffd6fb] rounded-xl font-bold bg-gradient-to-br from-[#2d3146]/70 to-[#2c2844]/40" onClick={scrollToTop} title="ページトップへ">
              <House size={20} />
            </button>
            <div>
              {!user ? (
                <button onClick={() => navigate("/login/to/neo-oracle")} className="flex items-center gap-1 px-3 py-2 text-[#f5efff] hover:text-[#ffd6fb] rounded-xl font-bold bg-gradient-to-br from-[#46426b]/50 to-[#2c2844]/50">
                  <LogIn size={18} />
                  ログイン
                </button>
              ) : (
                <LoginStatusButton onClick={() => navigate("/dashboard")} />
              )}
            </div>
            <button className="flex items-center justify-center text-[#b09eff] hover:text-[#f5efff] transition p-2" onClick={() => setPcMenuOpen(true)} aria-label="メニューを開く">
              <Menu size={26} />
            </button>
          </nav>

          {/* === ★★★ ここから修正箇所 ★★★ === */}
          {/* モバイル用ボタンコンテナ */}
          <div className="md:hidden flex items-center gap-2">
            {/* トップページ以外の時にHOMEボタンを表示 */}
            {location.pathname !== '/' && (
                <button className="flex items-center gap-1 px-3 py-2 text-[#f5efff] hover:text-[#ffd6fb] rounded-xl font-bold bg-gradient-to-br from-[#2d3146]/70 to-[#2c2844]/40" onClick={scrollToTop} title="ページトップへ">
              <House size={20} />
            </button>
            )}
            {/* 既存のメニューボタン */}
            <button className="flex items-center justify-center text-[#b09eff] hover:text-[#f5efff] transition" onClick={() => setMobileDrawerOpen(true)} aria-label="メニューを開く">
                <Menu size={28} />
            </button>
          </div>
          {/* === ★★★ ここまで修正 ★★★ === */}
        </div>
      </header>

      {/* モバイル用ドロワーメニュー */}
      <div className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMobileDrawerOpen(false)} />
      <aside className={`fixed top-0 right-0 h-full w-64 max-w-[70%] z-[101] bg-[#23243a]/95 border-l border-[#33374d] shadow-2xl transform-gpu transition-transform duration-300 ${mobileDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4 border-b border-[#33374d]">
          <button className="text-[#b09eff] hover:text-[#f5efff] transition" onClick={() => setMobileDrawerOpen(false)}><X size={24} /></button>
        </div>
        <nav className="flex flex-col gap-3 p-4">
          {menuItems.map((item, index) => <NavButton key={index} icon={item.icon} label={item.label} onClick={item.action} isMobile />)}
          <div className="border-t border-white/10 my-2" />
          {!user ? (
            <NavButton icon={LogIn} label="ログイン" onClick={() => navigate("/login/to/neo-oracle")} isMobile />
          ) : (
            <LoginStatusButton onClick={() => navigate("/dashboard")} isMobile />
          )}
        </nav>
      </aside>
      <img src={witchImg} alt="魔女" className={`fixed bottom-[-7rem] w-48 -translate-y-1/2 z-[102] pointer-events-none transition-transform duration-500 opacity-70 ${mobileDrawerOpen ? "right-[calc(4px+16rem)] translate-x-0" : "right-0 translate-x-full"}`} style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.6))" }} />

      {/* PC用フルスクリーンメニュー */}
      <AnimatePresence>
        {pcMenuOpen && (
          <motion.div key="pc-menu" className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
            <motion.button className="absolute top-6 right-6 text-[#b09eff] hover:text-[#f5efff] transition z-10" onClick={() => setPcMenuOpen(false)} aria-label="メニューを閉じる" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, transition: { delay: 0.3 } }}>
              <X size={40} />
            </motion.button>
            <div className="relative w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-10">
              <motion.img src={witchImg} alt="メニューの魔女" className="w-56 h-auto md:w-80 pointer-events-none" style={{ filter: "drop-shadow(2px 4px 12px rgba(0,0,0,0.7))" }} initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } }} />
              <motion.nav className="w-full max-w-sm flex flex-col gap-3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}>
                {menuItems.map((item, index) => (
                  <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <NavButton icon={item.icon} label={item.label} onClick={item.action} />
                  </motion.div>
                ))}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-[68px]" />
    </>
  );
};

export default Header;
