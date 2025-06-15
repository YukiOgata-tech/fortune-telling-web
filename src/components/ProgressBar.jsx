// src/components/ProgressBar.jsx
import { motion } from "framer-motion";

export default function ProgressBar({ step, total }) {
  const percent = ((step + 1) / total) * 100;
  return (
    <div className="w-full mb-4">
      <div className="h-3 bg-gray-700 rounded-xl overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 rounded-xl shadow-inner"
        />
      </div>
      <div className="text-right text-xs text-yellow-300 mt-1">{step + 1} / {total}</div>
    </div>
  );
}
