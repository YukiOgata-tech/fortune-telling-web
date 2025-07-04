import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import useGtagEvent from "@/hooks/useGtagEvent";

const TarashidoCTA = ({ className = "" }) => {
  const sendGtagEvent = useGtagEvent();

  return (
    <motion.section
      className={`relative flex flex-col h-full w-full rounded-3xl shadow-xl overflow-hidden p-8 bg-white/10 ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-bottom md:bg-center opacity-30"
        style={{
          backgroundImage: "url('/images/CTAs/bg-tarashido-cta.png')",
          filter: "brightness(0.92) blur(0px)",
        }}
        aria-hidden="true"
      />
      <div className="flex-1 flex flex-col justify-between z-10">
        <div className="flex items-start gap-1 md:gap-4 mb-2">
          <HeartHandshake className="md:w-10 md:h-10 w-8 h-8 text-pink-400 shrink-0 animate-pulse" />
          <div className="space-y-2">
            <h2 className="md:text-2xl text-lg font-extrabold tracking-tight text-white drop-shadow">
              <span className="md:text-3xl text-2xl text-blue-200">人たらし度診断</span>で<br className="sm:hidden md:block"/>“コミュ力”を測ろう
            </h2>
            <p className="text-white/90 leading-relaxed drop-shadow md:text-base text-sm">
              陽キャ？紳士型？それとも陰キャ…？<br />
              12問に答えるだけで、話題性バツグンの“人たらし度”がまるわかり！友達ともシェアしたくなる自己診断をぜひ。
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/tarashido" className="w-full md:w-auto relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-1.5 md:py-3 rounded-xl bg-gradient-to-r from-blue-400 via-pink-400 to-fuchsia-500 text-white font-semibold shadow-md"
              onClick={() => {
                sendGtagEvent('click_tarashido', {
                  event_category: 'CTA',
                  event_label: 'TarashidoCTA',
                });
              }}
            >
              人たらし度を診断する
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default TarashidoCTA;
