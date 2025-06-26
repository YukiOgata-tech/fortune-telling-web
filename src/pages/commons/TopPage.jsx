import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CTAs from "@/components/CTAs";
import Seo from "@/components/Seo";

const TopPage = () => {
  return (
    <div className="min-h-screen text-white">
      <Seo
        title="Neo-Oracle | あなたのための診断・占いサイト"
        description="近未来的UIで性格診断・各種占いを体験。安心・無料でユーザー参加型の自己分析。"
      />

      {/* ヒーローバナー */}
      <section className="relative w-full flex flex-col items-center justify-center h-[40vh] md:h-[60vh] py-12 overflow-hidden ">
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-bl from-indigo-800/30 via-fuchsia-700/20 to-black/30 opacity-65"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 drop-shadow-xl hidden">
            Neo-Oracle
          </h1>
          <p className="text-lg md:text-3xl font-semibold text-white/90 mb-6 yuji-mai-regular">
            多ジャンルの診断・占いで“今”の自分を知ろう
          </p>
          {/* バナー */}
          <div className="w-[360px] md:w-[500px] lg:w-[700px] h-[220px] md:h-[300px] lg:h-[380px] rounded-xl bg-gray-700/30 flex items-center justify-center shadow-2xl mb-2">
            <img
              src="/images/Top-banner.png" // 生成画像のパス
              alt="NEO ORACLE バナー"
              className="w-full h-full object-cover rounded-xl shadow-2xl"
            />
          </div>
        </motion.div>
      </section>
      {/* サイト紹介リード・SEO対応 */}
      <section className="w-full flex justify-center items-center py-8 mb-2">
        <motion.div
          className="max-w-4xl text-center relative group cursor-pointer select-none"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <span className="pointer-events-none absolute left-0 top-0 w-full h-full z-20 overflow-hidden">
            <span className="shine block absolute left-[-75%] top-0 w-2/3 h-full" />
          </span>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-yellow-100 tracking-wide drop-shadow-sm z-10 relative biz-udpmincho-regular">
            あなたぴったりの診断・占いが毎日楽しめる
          </h2>
          <p className="text-sm md:text-lg text-white/90 font-medium leading-relaxed z-10 relative">
            <strong className="text-fuchsia-300 font-semibold biz-udpmincho-regular">
              Neo-Oracle
            </strong>
            は、<strong>性格診断</strong>や
            <span className="underline underline-offset-4 decoration-indigo-400">
              占い
            </span>
            、<strong>年収診断</strong>
            など多彩な無料コンテンツを用意した次世代の自己分析サイトです。
            <br />
            「毎日占い」など
            <span className="text-fuchsia-200 font-bold">累計2万人以上</span>
            が体験！
            <br className="hidden md:block" />
            心理テスト・運勢占い・仕事適性・恋愛傾向・あなたの強みや可能性まで幅広くサポートします。
            <br />
            初めての方もリピーターの方も、
            <strong>あなたの“今”に寄り添う診断体験</strong>
            をぜひ楽しんで！！
          </p>
          <style jsx>{`
            .shine {
              pointer-events: none;
              height: 100%;
              background: linear-gradient(
                110deg,
                transparent 30%,
                rgba(255, 255, 255, 0.45) 55%,
                transparent 70%
              );
              filter: blur(0.5px);
              opacity: 0;
              transition: opacity 0.18s;
            }
            .group:hover .shine {
              animation: shine 1.0s cubic-bezier(0.57, 0.12, 0.6, 1.15) 1;
              opacity: 1;
            }
            @keyframes shine {
              from {
                left: -75%;
              }
              to {
                left: 120%;
              }
            }
          `}</style>
        </motion.div>
      </section>

      {/* CTAグリッド */}
      <div>
        <CTAs />
      </div>

      {/* アカウント登録/ログイン誘導 */}
      <section className="max-w-2xl mx-auto rounded-3xl bg-white/10 shadow-lg p-8 mt-4 mb-10 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-3 text-fuchsia-200 dotgothic16-regular">
            アカウント登録・ログインのご案内
          </h2>
          <ul className="mb-3 list-disc list-inside text-white/90">
            <li>
              一部コンテンツの診断が、より<strong>スムーズ</strong>に利用可能
            </li>
            <li>
              診断結果の<strong>記録・管理</strong>
              ができ、マイページでいつでも確認
            </li>
            <li>
              診断ごとの<strong>コメント参加</strong>も楽しめます
            </li>
            <li>
              すべて<strong>無料</strong>でご利用いただけます
            </li>
          </ul>
          <p className="mb-2 text-white/70">
            個人情報は厳重に管理し、プライバシーを最優先します。
            <Link
              to="/privacypolicy"
              className="underline text-fuchsia-300 ml-1 hover:text-indigo-200 transition "
            >
              プライバシーポリシー
            </Link>
          </p>
          <div className="flex gap-4 mt-4">
            <Link
              to="/register"
              className="inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500/30 to-fuchsia-600/30 font-semibold hover:scale-105 transition shadow dotgothic16-regular"
            >
              新規登録
            </Link>
            <Link
              to="/login/to/neo-oracle"
              className="inline-block px-5 py-2 rounded-xl bg-white/20 font-semibold hover:scale-105 transition shadow border border-fuchsia-300 text-fuchsia-100 dotgothic16-regular"
            >
              ログイン
            </Link>
          </div>
        </motion.div>
      </section>

      {/* サイト説明・信頼感 */}
      <section className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-8 mb-16 shadow-md backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold mb-4 biz-udpmincho-regular">Neo-Oracleについて</h2>
          <p className="text-lg mb-2 text-white/90">
            Neo-Oracleは、性格診断や各種占いを、心理学や統計・AI技術を活かして現代的に再構成した新しい自己分析サイトです。
          </p>
          <p className="text-base text-gray-300 mb-2">
            「当たり外れ」だけで終わらない、本質的な自己理解と未来への指針を提供。
            <br />
            安心してご利用いただけるよう、
            <strong>最新のセキュリティと厳重なプライバシー管理</strong>
            を徹底しています。
          </p>
          <p className="text-base text-gray-400">
            どなたでも気軽に、深く自分を知り、行動のきっかけを見つけてほしい。
            <br />
            そんな想いでサービスを運営しています。
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default TopPage;
