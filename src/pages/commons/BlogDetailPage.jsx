// src/pages/commons/BlogDetailPage.jsx
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";

const renderBlock = (block, idx) => {
  if (block.type === "header") return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{block.data.text}</h2>;
  if (block.type === "paragraph") return <p key={idx} className="mb-5">{block.data.text}</p>;
  if (block.type === "image") return (
    <img
      key={idx}
      src={block.data.file.url}
      alt=""
      className="my-8 rounded-xl max-w-full mx-auto"
      style={{ maxHeight: 380 }}
    />
  );
  if (block.type === "list") {
    if (Array.isArray(block.data.items)) {
      return block.data.style === "ordered" ? (
        <ol key={idx} className="list-decimal list-inside mb-5">
          {block.data.items.map((item, i) => (
            <li key={i}>{typeof item === "string" ? item : item?.content || item?.text || JSON.stringify(item)}</li>
          ))}
        </ol>
      ) : (
        <ul key={idx} className="list-disc list-inside mb-5">
          {block.data.items.map((item, i) => (
            <li key={i}>{typeof item === "string" ? item : item?.content || item?.text || JSON.stringify(item)}</li>
          ))}
        </ul>
      );
    }
  }
  if (block.type === "marker") {
    return (
      <mark key={idx} className="bg-yellow-200 px-1">
        {block.data.text}
      </mark>
    );
  }
  if (block.type === "warning") {
    return (
      <div
        key={idx}
        className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-900 p-4 rounded mb-4"
      >
        <div className="font-bold">{block.data.title}</div>
        <div>{block.data.message}</div>
      </div>
    );
  }
  if (block.type === "table") {
    if (Array.isArray(block.data.content)) {
      return (
        <table key={idx} className="table-auto border mb-8">
          <tbody>
            {block.data.content.map((row, ri) => (
              <tr key={ri}>
                {typeof row === "string"
                  ? row.split(",").map((cell, ci) => (
                      <td key={ci} className="border px-2 py-1">{cell}</td>
                    ))
                  : null}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
  return null;
};

const BlogDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const snap = await getDoc(doc(db, "articles", id));
      setArticle(snap.exists() ? snap.data() : null);
    };
    fetchArticle();
  }, [id]);

  if (!article) return (
    <div className="max-w-3xl mx-auto py-24 text-center text-lg text-gray-500">
      記事が見つかりませんでした
      <div className="mt-6">
        <Link to="/blog" className="text-blue-500 hover:underline">← 一覧へ戻る</Link>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-4 md:py-8 px-2 bg-white/70">
      <div className="mb-6">
        <Link to="/blog" className="text-blue-500 hover:underline text-sm">&lt; 一覧へ戻る</Link>
      </div>
      {article.thumbnailUrl && (
        <img
          src={article.thumbnailUrl}
          alt="サムネイル"
          className="w-full max-h-80 object-cover rounded-2xl mb-6"
        />
      )}
      <h1 className="text-2xl md:text-3xl font-bold mb-3">{article.title}</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {article.category && (
          <span className="px-3 py-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs font-bold">
            {article.category}
          </span>
        )}
        {article.tags?.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 rounded-2xl bg-gray-200 text-xs text-purple-700 border border-purple-200">
            #{tag}
          </span>
        ))}
      </div>
      <div className="text-gray-400 text-xs mb-8">
        {article.createdAt && article.createdAt.toDate
          ? article.createdAt.toDate().toLocaleString("ja-JP")
          : ""}
      </div>
      <div className="prose max-w-none">
        {article.content?.blocks?.map((block, idx) => renderBlock(block, idx))}
      </div>
    </div>
  );
};

export default BlogDetailPage;
