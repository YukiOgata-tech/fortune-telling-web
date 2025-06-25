// src/pages/commons/BlogListPage.jsx
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import CTAs from "@/components/CTAs";

// カテゴリ一覧（増減時もここを書き換えればOK）
const CATEGORY_OPTIONS = [
  { label: "全て", value: "all" },
  { label: "占い", value: "占い" },
  { label: "診断", value: "診断" },
  { label: "紹介", value: "紹介" },
  { label: "コラム", value: "コラム" },
];

// ローディング用スピナー
const Spinner = () => (
  <div className="flex items-center justify-center min-h-[40vh]">
    <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-purple-400"></div>
  </div>
);

const BlogListPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(docs);
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  // 絞り込み
  const filteredArticles =
    category === "all"
      ? articles
      : articles.filter(article => article.category === category);

  if (isLoading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto min-h-screen py-8 px-2">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-white">ブログ一覧</h1>

      {/* カテゴリ切り替え部分やで */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {CATEGORY_OPTIONS.map(opt => (
          <button
            key={opt.value}
            className={`
              px-4 py-1 rounded-full font-bold border
              ${category === opt.value
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow"
                : "bg-white/80 text-purple-700 border-purple-200 hover:bg-purple-50"}
              transition
            `}
            onClick={() => setCategory(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 記事リスト */}
      <div className="grid gap-8 md:grid-cols-2">
        {filteredArticles.map(article => (
          <Link
            to={`/blog/${article.id}`}
            key={article.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition block overflow-hidden flex flex-col"
          >
            {article.thumbnailUrl && (
              <img
                src={article.thumbnailUrl}
                alt="サムネイル"
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            )}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-2">
                {article.category && (
                  <span className="px-2 py-0.5 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs font-bold">
                    {article.category}
                  </span>
                )}
                {article.tags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-2xl bg-gray-100 text-xs text-purple-700 border border-purple-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h2 className="text-lg md:text-xl font-bold mb-1 line-clamp-2">{article.title}</h2>
              {/* 日付表示 */}
              <div className="text-xs text-gray-400 mb-2">
                {article.createdAt && article.createdAt.toDate
                  ? article.createdAt.toDate().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })
                  : ""}
              </div>
              <div className="text-gray-500 text-sm line-clamp-2 mb-2">
                {/* 最初のparagraphかheaderを抜粋 */}
                {
                  article.content?.blocks?.find(
                    block => block.type === "paragraph" || block.type === "header"
                  )?.data?.text?.slice(0, 60)
                }
                {article.content?.blocks?.length > 0 && "..."}
              </div>
            </div>
          </Link>
        ))}
        {filteredArticles.length === 0 && (
          <div className="text-center text-gray-400 col-span-2">記事がありません</div>
        )}
      </div>
      <div className="mt-6 md:mt-16">
        <CTAs/>
      </div>
    </div>
  );
};

export default BlogListPage;
