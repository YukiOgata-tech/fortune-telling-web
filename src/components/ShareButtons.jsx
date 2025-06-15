// src/components/ShareButtons.jsx
import { Twitter, Facebook } from "lucide-react";


// LINE公式SVGアイコン（緑色に調整）
function LineIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 36 36" width="24" height="24" fill="none">
      <circle cx="18" cy="18" r="18" fill="#06C755"/>
      <path d="M9.6 14.81C9.6 12.68 12.56 11 16.16 11c3.6 0 6.56 1.68 6.56 3.81 0 2.13-2.96 3.81-6.56 3.81-.83 0-1.62-.06-2.36-.19l-2.11.73.43-2.06c-.48-.42-.76-.92-.76-1.49z" fill="#fff"/>
      <rect x="12" y="20" width="12" height="2" rx="1" fill="#fff"/>
    </svg>
  );
}

const shareBase = {
  url: window.location.href,
  hashtags: "未来の金運,金運占い,診断コンテンツ",
};

function handleShare(platform, text) {
  const { url, hashtags } = shareBase;
  let shareUrl = "";
  if (platform === "twitter") {
    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;
  } else if (platform === "facebook") {
    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  } else if (platform === "line") {
    shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  }
  window.open(shareUrl, "_blank", "noopener,noreferrer");
}

export default function ShareButtons({ nickname, amount, message }) {
  const text = `${nickname}さんの生涯年収は… ${typeof amount === "string" ? amount : amount.toLocaleString("ja-JP") + "円"}！ #未来の金運占い`;

  return (
    <div className="flex gap-4 justify-center">
      <button onClick={() => handleShare("twitter", text)} className="bg-yellow-400 hover:bg-yellow-500 transition rounded-full p-3 shadow-lg">
        <Twitter className="w-6 h-6 text-black" />
      </button>
      <button onClick={() => handleShare("facebook", text)} className="bg-blue-500 hover:bg-blue-600 transition rounded-full p-3 shadow-lg">
        <Facebook className="w-6 h-6 text-white" />
      </button>
      <button onClick={() => handleShare("line", text)} className="bg-green-400 hover:bg-green-500 transition rounded-full p-3 shadow-lg">
        <LineIcon className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
