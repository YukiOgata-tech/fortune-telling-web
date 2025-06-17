import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// コンポーネントをimport
import StaticNoise from "@/components/general/StaticNoise";
import ElectricSpark from "@/components/general/ElectricSpark";
import DailyFortuneCTA from "@/components/DailyFortuneCTA";
import WealthFortuneCTA from "@/components/wealth/WealthFortuneCTA";
import TarashidoCTA from "@/components/tarashido/TarashidoCTA";
import ReincarnationCTA from "@/components/reincarnation/ReincarnationCTA";
import SoulNumberCTA from "@/components/SoulNumberCTA";


/** --------------------------------------------------
 *  ヒーローセクション用 HUD フレーム
 *  - 中央に診断メイン画像を表示（public/images/hero/diagnose-hero.jpg）
 *  - テレビのノイズ & グリッチエフェクトを CSS keyframes で実装
 * -------------------------------------------------- */

/** 200 文字のサマリー */
const summary =
  "本診断は、18 タイプ × 3 カテゴリであなたの潜在的な性格傾向を多角的に可視化します。\n質問は直感・思考・感情の 3 ルートから設計され、解析結果は近未来 UI と共に提示され、潜在バイアスや才能を明確に示します。";

const HeroScreen = () => (
  <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden select-none">
    {/* ---------- 電撃エフェクトを数本ランダム配置 ---------- */}
    <ElectricSpark style={{ top: "10%", left: "5%" }} />
    <ElectricSpark style={{ bottom: "20%", right: "15%" }} interval={1600} />
    <ElectricSpark style={{ top: "12%", right: "8%" }} interval={1000} />
    <ElectricSpark style={{ bottom: "-1%", left: "9%" }} interval={700} />

    {/* 背景フレーム */}
    <img
      src="/images/hero-bg01.jpg" // スクリーン画像
      alt="HUD Frame"
      className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-65"
    />
    
    {/* サマリーテキスト（ノイズグリッチ） */}
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
      <div
        className="noise-text text-white text-lg md:text-3xl font-extrabold px-6 py-4 rounded-2xl
        bg-black/20 shadow-xs max-w-2xl mx-auto text-center select-text"
        style={{
          letterSpacing: "0.04em",
          lineHeight: "1.7",
          // お好みで調整
        }}
        data-text={summary}
      >
        {summary}
      </div>
    </div>

    {/* メイン画像 */}
    <div className="relative w-16/17 md:w-8/9 h-5/6 rounded-xl overflow-hidden shadow-2xl opacity-80">
      <img
        src="/images/hero-bg-content01.png"
        alt="占い性格診断 ヒーロー"
        className="w-full h-full object-cover glitch opacity-60"
      />
      {/* ノイズオーバーレイ */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay animate-static" />
    </div>
    <StaticNoise opacity={0.18} fps={30} />
  </div>
);


/** 600 文字のリード（占いの歴史 + 不安に寄り添う） */
const lead = `占いの起源は紀元前のメソポタミアで空と星を読み解いた天文暦注に始まり、ギリシアでは四大元素論と結び付けられ、中世ヨーロッパでは錬金術師が心理学と占星学を橋渡ししながら個人の運命を探りました。明治期の日本では易や九星術が庶民に浸透し、昭和後期には雑誌やテレビが "スターサイン" を大衆文化へと昇華。その根底にあるのは「わたしは何者なのか」「この先どう歩めば良いのか」という普遍的な問いです。\n\n現代社会は情報過多で変化が速く、将来像を描きにくい時代。不確実性は時に不安として心を沈ませます。本サイトは単なる『当たり外れ』ではなく、データ化された自己像と伝統占いの象徴体系をクロスオーバーし、あなたが行動選択の指針を獲得することを目的としています。問いに答える中で浮かび上がる“潜在バイアス”は、悩みや願いの影に隠れた思考のクセ。そのクセを知り、受け止め、未来志向へ書き換える一歩として本診断を体験してください。`;

/**
 * テキストの一部だけ揺らすアニメーション (CSS @keyframes)
 */
const AnimatedWord = ({ children }) => (
  <motion.span
    className="inline-block"
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    {children}
  </motion.span>
);

const DiagnosePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100/0 text-white min-h-screen flex flex-col">
      {/* Hero Screen */}
      <HeroScreen />

      {/* 説明セクション */}
      <section className="max-w-4xl mx-auto px-15 py-12 space-y-10">
        {/* 600文字リード + 一部アニメーション */}
        <div className="prose prose-invert max-w-none text-gray-100 leading-loose">
          {lead.split(/(占い|不安|未来|心理学)/).map((segment, idx) =>
            segment === "占い" || segment === "不安" || segment === "未来" || segment === "心理学" ? (
              <AnimatedWord key={idx}>{segment}</AnimatedWord>
            ) : (
              <span key={idx}>{segment}</span>
            )
          )}
        </div>

        {/* スタートボタン */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => navigate("/questionnaire")}
            className="relative px-12 py-4 font-semibold text-lg text-white rounded-full overflow-hidden bg-indigo-600 hover:bg-indigo-500 transition-transform active:scale-95 shadow-lg"
          >
            <span className="relative z-10">診断をスタート</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-pink-500/20 animate-pulse" />
          </button>
        </div>
      </section>
      <div className="max-w-4xl mx-auto px-4">
      <DailyFortuneCTA className="mb-4" />
      <WealthFortuneCTA className="mb-4"/>
      <TarashidoCTA className="mb-4" />
      <ReincarnationCTA className="mb-4" />
      <SoulNumberCTA className="mb-4" />
      </div>
    </div>
  );
};

export default DiagnosePage;
