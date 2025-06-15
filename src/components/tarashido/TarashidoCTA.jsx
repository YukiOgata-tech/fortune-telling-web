import { Link } from "react-router-dom";
import { HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

/*
  TarashidoCTA ― トップページなどに挿入する案内コンポーネント。
  - キャッチーな導入文
  - /tarashido へのリンクボタン
  - Tailwind & FramerMotionでレスポンシブ＆アニメ
*/

const TarashidoCTA = ({ className = "" }) => {
  return (
    <motion.section
      className={`
        relative mx-auto lg:w-[800px] md:w-[600px] w-[400px] rounded-3xl shadow-xl
        overflow-hidden p-8 flex flex-col md:flex-row items-center gap-4 md:gap-10
        ${className}
      `}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {/* 背景装飾レイヤー */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-pink-400/30 via-indigo-400/20 to-blue-400/20 opacity-50"
        aria-hidden="true"
      />
      {/* メイン内容 */}
      <div className="relative z-10 flex items-start gap-4 flex-1 text-center md:text-left">
        <HeartHandshake className="md:w-10 md:h-10 w-8 h-8 text-pink-400 shrink-0 animate-pulse" />
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-white drop-shadow">
            <span className="text-3xl text-blue-200">人たらし度診断</span>で自分の“コミュ力”を測ろう
          </h2>
          <p className="text-white/90 leading-relaxed drop-shadow">
            あなたはスーパー陽キャ？紳士型？それともピュア陰キャ…？<br />
            12問に答えるだけで、話題性バツグンの“人たらし度”がまるわかり！<br />
            ネタにも本気にもなる、友達ともシェアしたくなる自己診断をぜひお試しください。
          </p>
        </div>
      </div>
      {/* 行動ボタン */}
      <Link to="/tarashido" className="w-full md:w-auto relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-400 via-pink-400 to-fuchsia-500 text-white font-semibold shadow-md"
        >
          人たらし度を診断する
        </motion.button>
      </Link>
    </motion.section>
  );
};

export default TarashidoCTA;
