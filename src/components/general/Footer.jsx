import { useNavigate } from "react-router-dom";
import { Github, Twitter, Mail, Instagram } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-[#23243a] via-[#191a27] to-[#2a2d46] border-t border-[#282b43] pt-7 pb-6 px-4 md:px-0 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-end justify-between gap-8">
        {/* サイト情報 */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-lg font-extrabold text-[#a9e2fa] mb-1 tracking-wide">
            占いみたいな性格診断
          </div>
          <div className="text-xs text-[#c8c7d9] mb-2">Copyright © {year} Yuyu All rights reserved.</div>
        </div>
        {/* メニューリンク */}
        <nav className="flex items-center gap-5 mb-2 md:mb-0">
          <button
            className="text-[#a6f2fd] hover:text-[#f7ceff] transition text-sm font-semibold"
            onClick={() => navigate("/about-me")}
          >
            サイトについて
          </button>
          <button
            className="text-[#9ad0e5] hover:text-[#f7ceff] transition text-sm font-semibold"
            onClick={() => navigate("/privacypolicy")}
          >
            プライバシーポリシー
          </button>
          <button
            className="text-[#9ad0e5] hover:text-[#f7ceff] transition text-sm font-semibold"
            onClick={() => navigate("/contact")}
          >
            お問い合わせ
          </button>
        </nav>
        {/* SNSアイコン */}
        <div className="flex gap-3">
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#77ffe6] text-[#b5b7ea] transition"
            aria-label="Twitter"
          >
            <Twitter size={22} />
          </a>
          <a
            href="https://www.instagram.com/neo_oracle_web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8c4a77] text-[#b5b7ea] transition"
            aria-label="公式Instagram"
          >
            <Instagram size={22} />
          </a>
          <button
            onClick={() => navigate("/contact")}
            className="hover:text-[#77ffe6] text-[#b5b7ea] transition"
            aria-label="Mail"
            type="button"
          >
            <Mail size={22} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
