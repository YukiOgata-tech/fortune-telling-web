import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import AdminGuard from "@/components/features/AdminGuard";

const AdminBlogListPage = () => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      const snapshot = await getDocs(collection(db, "articles"));
      setArticles(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("本当に削除しますか？")) {
      await deleteDoc(doc(db, "articles", id));
      setArticles(articles => articles.filter(a => a.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen py-10 px-2 bg-gradient-to-br from-slate-900/20 via-slate-950/25 to-purple-950/20">
      <h1 className="text-2xl md:text-3xl font-bold mb-10 text-fuchsia-200 text-center drop-shadow">
        ブログ投稿一覧（管理用）
      </h1>
      <ul className="space-y-4">
        {articles.map(article => (
          <li
            key={article.id}
            className="bg-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between shadow-md hover:bg-fuchsia-950/20 transition border border-fuchsia-900/20"
          >
            <div className="flex-1 min-w-0">
              <Link
                to={`/blog/${article.id}`}
                className="font-bold text-lg md:text-xl text-blue-300 hover:underline truncate block mb-1"
              >
                {article.title}
              </Link>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-0.5 rounded-xl bg-gradient-to-r from-blue-400/60 to-purple-500/70 text-white font-bold">
                  {article.category || "カテゴリ未設定"}
                </span>
                <span className="text-xs text-gray-400">
                  {article.createdAt && article.createdAt.toDate
                    ? article.createdAt.toDate().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" })
                    : ""}
                </span>
              </div>
              <div className="text-gray-300 text-sm truncate">
                {/* 本文の冒頭をプレビュー */}
                {article.content?.blocks?.find(
                  block => block.type === "paragraph" || block.type === "header"
                )?.data?.text?.slice(0, 60)}
                {article.content?.blocks?.length > 0 && "..."}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex-shrink-0 flex gap-2 md:gap-4 justify-end">
              <button
                onClick={() => navigate(`/admin/blog-edit/${article.id}`)}
                className="px-4 py-1 rounded-xl bg-gradient-to-r from-blue-500/90 to-purple-500/90 text-white font-semibold hover:brightness-110 shadow"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(article.id)}
                className="px-4 py-1 rounded-xl bg-gradient-to-r from-red-600/80 to-pink-700/80 text-white font-semibold hover:brightness-110 shadow"
              >
                削除
              </button>
            </div>
          </li>
        ))}
        {articles.length === 0 && (
          <li className="text-center text-gray-400 py-12">記事がありません</li>
        )}
      </ul>
      <div className="flex justify-end mt-10">
        <button
          className="px-7 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-700 font-bold text-white text-lg shadow-lg hover:scale-105 transition"
          onClick={() => navigate("/admin/blog-edit")}
        >
          + 新規投稿
        </button>
      </div>
    </div>
  );
};

function AdminBlogListPageWithGuard() {
  return (
    <AdminGuard>
      <AdminBlogListPage />
    </AdminGuard>
  );
}

export default AdminBlogListPageWithGuard;
