import { motion } from "framer-motion";

const TarashidoQuestionCard = ({ question, choices, onSelect }) => (
  <motion.div
    className="w-full bg-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-md"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-xl font-bold text-white mb-6">{question}</h2>
    <div className="flex flex-col gap-4">
      {choices.map((choice, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(choice.score)}
          whileTap={{ scale: 0.96 }}
          className="bg-blue-600 hover:bg-blue-400 transition text-white text-base rounded-xl py-3 px-4 shadow-lg w-full"
        >
          {choice.text}
        </motion.button>
      ))}
    </div>
  </motion.div>
);

export default TarashidoQuestionCard;
