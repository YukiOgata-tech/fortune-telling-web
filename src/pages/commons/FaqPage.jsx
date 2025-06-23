import React, { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "このサイトの占いは無料ですか？",
    answer:
      "はい、全ての占い・診断コンテンツは無料でご利用いただけます。ぜひ毎日利用して運気を挙げていきましょう！",
  },
  {
    question: "アカウント登録すると何ができますか？",
    answer:
      "基本的な機能は登録不要で使えますが、過去の診断の記録やランキング・コメント参加機能にはアカウント登録が必要です。さらにメールの定期配信が受け取れます。無料でメニュー欄から登録しちゃいましょう！",
  },
  {
    question: "診断や占い結果は全て真実ですか？",
    answer:
      "結論から言うと結果がすべて正しいわけではありません。統計的な観点などから導出しているにすぎません。この世に100%あたる占いなどありません。でもなにかを信じていなきゃ人生やっていけません。まずはあなたの身近にいる人から信じてみましょう、全部さらけ出すんです！！",
  },
  {
    question: "診断結果はどのように保存されますか？",
    answer:
      "ログインユーザーはダッシュボードから、一部、過去の診断履歴を確認できます。未登録の場合は保存されません。なにか機能追加の希望があればお問い合わせからご連絡ください♪",
  },
  {
    question: "診断コンテンツに新しいものを追加してほしいのですが",
    answer:
      "そのご要望ぜひお聞きしたいです！導入してほしい診断コンテンツがありましたら、お問い合わせからご連絡ください♪",
  },
  {
    question: "個人情報の取り扱いはどうなっていますか？",
    answer: (
      <>
        プライバシーポリシーに基づき、厳重に管理しています。第三者に無断で情報提供することはありません。詳しい内容は
        <Link
          to="/privacypolicy"
          rel="noopener noreferrer"
          className="text-pink-300 underline hover:text-pink-400 ml-1 mochiy-pop-p-one-regular"
        >
          該当ページ
        </Link>
        をご確認ください。
      </>
    ),
  },
];

function FaqItem({ question, answer, isOpen, onClick }) {
  const ref = useRef(null);
  const [coutentHeight, setContentHeight] = useState(0);

  // FAQ構造化データ（JSON-LD）生成
  // answerがReact要素の場合は、plainTextだけ入
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        // answerが文字列ならそのまま、要素ならテキストだけ出すよーん
        text:
          typeof item.answer === "string"
            ? item.answer
            : "プライバシーポリシーに基づき、厳重に管理しています。第三者に無断で情報提供することはありません。詳しい内容は該当ページをご確認ください。",
      },
    })),
  };

  // 展開時のみ高さを計測
  useLayoutEffect(() => {
    if (isOpen && ref.current) {
      setContentHeight(ref.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="mb-4">
      {/* ★ ここでJSON-LDをheadへ挿入（React19ならreturnの最初でOKなはず） */}
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>

      <button
        onClick={onClick}
        className={`flex w-full items-center justify-between px-6 py-4 bg-gradient-to-r
          from-slate-900 via-slate-700/60 to-slate-800 rounded-2xl
          shadow-lg hover:shadow-xl transition
          text-lg font-semibold text-white focus:outline-none new-tegomin-regular`}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={28} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { type: "spring", stiffness: 250, damping: 10 },
              opacity: { duration: 0.2 },
            }}
            className="overflow-hidden bg-slate-600/60 bg-opacity-90 rounded-b-2xl px-6 pb-0 pt-0 text-slate-200 text-lg shadow-inner backdrop-blur"
            style={{ willChange: "height, opacity" }}
          >
            <div className="pb-3 pt-3 " ref={ref}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center text-slate-100 tracking-wide drop-shadow"
      >
        よくあるご質問 <span className="text-indigo-400">FAQ</span>
      </motion.h1>
      <div>
        {faqData.map((item, idx) => (
          <FaqItem
            key={idx}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-lg text-slate-200 mb-2">
          解決しないご質問やご要望がある方は
          <Link
            to="/contact"
            className="ml-2 text-pink-300 underline hover:text-pink-400 mochiy-pop-p-one-regular text-xl"
          >
            お問い合わせページ
          </Link>
          からご連絡ください。
        </p>
      </div>
    </div>
  );
}
