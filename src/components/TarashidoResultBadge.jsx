import { Moon, Sun, SunMedium, Ghost, Sparkle, HeartHandshake, Gem } from "lucide-react";

const iconMap = {
  "Moon": <Moon size={48} className="text-indigo-400" />,
  "Ghost": <Ghost size={48} className="text-slate-300" />,
  "Sparkle": <Sparkle size={48} className="text-pink-300" />,
  "Gem": <Gem size={48} className="text-blue-400" />,
  "HeartHandshake": <HeartHandshake size={48} className="text-rose-400" />,
  "Sun": <Sun size={48} className="text-yellow-400" />,
  "SunMedium": <SunMedium size={48} className="text-yellow-400" />,
};

const TarashidoResultBadge = ({ type, badge, image }) => (
  <div className="flex flex-col items-center">
    {image ? (
      <img src={image} alt={type} className="w-32 h-32 rounded-2xl mb-2 shadow-lg" />
    ) : (
      iconMap[badge] || null
    )}
    <div className="mt-2 text-lg text-blue-300 font-bold">{type}</div>
  </div>
);

export default TarashidoResultBadge;
