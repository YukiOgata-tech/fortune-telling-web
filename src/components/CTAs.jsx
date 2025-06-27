import { motion } from "framer-motion";
import DiagnoseCTA from "@/components/CTAs/DiagnoseCTA";
import DailyFortuneCTA from "@/components/CTAs/DailyFortuneCTA";
import WealthFortuneCTA from "@/components/CTAs/WealthFortuneCTA";
import TarashidoCTA from "@/components/CTAs/TarashidoCTA";
import ReincarnationCTA from "@/components/CTAs/ReincarnationCTA";
import SoulNumberCTA from "@/components/CTAs/SoulNumberCTA";
import HowGeniusCTA from "@/components/CTAs/HowGeniusCTA";
import DailySayingCTA from "@/components/CTAs/DailySayingCTA";
import TodaySongCTA from "@/components/CTAs/DailySongCTA";

const CTAS = [
  <DiagnoseCTA key="diagnose" />,
  <DailyFortuneCTA key="daily" />,
  <WealthFortuneCTA key="wealth" />,
  <TarashidoCTA key="tarashido" />,
  <ReincarnationCTA key="reincarnation" />,
  <SoulNumberCTA key="soulnumber" />,
  <HowGeniusCTA key="howgenius" />,
  <DailySayingCTA key="dailysaying" />,
  <TodaySongCTA key="dailysong" />
];

const CTAs = () => (
  <section className="max-w-5xl mx-auto px-2 py-4 mt-4">
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 auto-rows-fr"
      initial={{ opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", staggerChildren: 0.18 }}
    >
      {CTAS.map((C, i) => (
        <motion.div
          className="w-full"
          key={i}
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          {C}
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default CTAs;
