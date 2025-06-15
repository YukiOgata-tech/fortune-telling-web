import { motion } from "framer-motion";

const TarashidoProgressBar = ({ current, total }) => {
  const percent = (current / total) * 100;
  return (
    <div className="w-full mb-8">
      <div className="h-2 bg-slate-700 rounded-xl overflow-hidden">
        <motion.div
          className="h-2 bg-blue-400 rounded-xl"
          style={{ width: `${percent}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="text-right text-xs text-slate-400 mt-1">
        {current} / {total}
      </div>
    </div>
  );
};

export default TarashidoProgressBar;
