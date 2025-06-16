import * as Icons from "lucide-react";
// fortuneTypes の中に imageUrl（背景画像）を持つ想定です
import { fortuneTypes } from "@/data/main-content/fortuneTypes";

const ResultCard = ({ typeId, className = "" }) => {
  const type = fortuneTypes.find((t) => t.id === typeId);
  if (!type) return <div>診断タイプが見つかりません</div>;
  console.log(type.imageUrl)

  const LucideIcon = Icons[type.icon] || Icons.Sparkle;

  return (
    <div
      className={`relative w-full opacity-98 rounded-2xl overflow-hidden shadow-xl ${className}`}
      style={{
        backgroundImage: `url(${type.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 背景画像の上に半透明オーバーレイ */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* コンテンツ：アイコン・名称・説明 */}
      <div className="relative z-10 flex flex-col items-center space-y-2 p-6">
        <LucideIcon size={48} color={type.color} />
        <h2
          className="text-2xl font-bold text-white text-center"
          style={{ color: type.color }}
        >
          {type.name}
        </h2>
        <p className="text-base text-gray-200 text-center">
          {type.description}
        </p>
        <p className="text-sm text-gray-300 text-center">
          {type.supplement}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
