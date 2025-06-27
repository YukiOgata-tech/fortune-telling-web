// src/pages/commons/BlogDetailPage.jsx
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Seo from "@/components/Seo"; // ライブラリ不要版のSeoコンポーネントをインポート

// ブログコンテンツの各ブロックをレンダリングする関数
const renderBlock = (block, idx) => {
  switch (block.type) {
    case "header":
      return (
        <h2 key={idx} className="text-2xl md:text-3xl font-bold mt-10 mb-5 border-l-4 border-cyan-400 pl-4 text-cyan-200">
          {block.data.text}
        </h2>
      );
    case "paragraph":
      return <p key={idx} className="mb-6 leading-relaxed text-gray-300" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
    case "image":
      return (
        <div key={idx} className="my-8 text-center">
          <img
            src={block.data.file.url}
            alt={block.data.caption || '記事画像'}
            className="my-4 rounded-xl max-w-full mx-auto shadow-lg"
          />
          {block.data.caption && <p className="text-sm text-gray-500 mt-2">{block.data.caption}</p>}
        </div>
      );
    case "list": {
      const ListTag = block.data.style === "ordered" ? "ol" : "ul";
      const listStyle = ListTag === "ol" ? "list-decimal" : "list-disc";
      return (
        <ListTag key={idx} className={`${listStyle} list-inside mb-6 pl-4 text-gray-300 space-y-2`}>
          {block.data.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ListTag>
      );
    }
    case "warning":
        return (
            <div key={idx} className="bg-yellow-900/50 border-l-4 border-yellow-400 text-yellow-200 p-4 rounded-r-lg my-6">
                <div className="font-bold" dangerouslySetInnerHTML={{ __html: block.data.title }}/>
                <div className="mt-1" dangerouslySetInnerHTML={{ __html: block.data.message }}/>
            </div>
        );
    case "table": { // <--- エラー修正箇所
        if (!block.data?.content || !Array.isArray(block.data.content)) {
            return null;
        }
        return (
            <div key={idx} className="my-8 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-slate-700">
                        {block.data.content.map((row, ri) => {
                            // rowが文字列であることを確認してからsplitを実行
                            if (typeof row !== 'string') return null;
                            return (
                                <tr key={ri} className="hover:bg-slate-800/50">
                                    {row.split(',').map((cell, ci) => (
                                        <td key={ci} className="border-b border-slate-700 px-4 py-3" dangerouslySetInnerHTML={{ __html: cell }} />
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
    default:
      return null;
  }
};

// SEO用のdescriptionを記事本文から生成するヘルパー関数
const getMetaDescription = (blocks) => {
    if (!blocks) return "Neo Oracleのブログ記事。未来を、より深く、より面白く。";
    const firstParagraph = blocks.find(block => block.type === 'paragraph');
    if (firstParagraph && firstParagraph.data.text) {
      const textOnly = firstParagraph.data.text.replace(/<[^>]+>/g, '');
      return textOnly.substring(0, 120) + '...';
    }
    return "Neo Oracleのブログ記事を読んで、新しい発見を。";
};


const BlogDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const snap = await getDoc(doc(db, "articles", id));
        setArticle(snap.exists() ? snap.data() : null);
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500"></div>
        </div>
    );
  }

  if (!article) {
    return (
      <>
        <Seo title="記事が見つかりません" />
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-2xl text-white mb-4">記事が見つかりませんでした</h1>
            <p className="text-gray-400 mb-8">お探しのページは削除されたか、URLが変更された可能性があります。</p>
            <Link to="/blog" className="flex items-center gap-2 px-6 py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-colors">
                <ArrowLeft size={18} />
                ブログ一覧へ戻る
            </Link>
        </div>
      </>
    );
  }
  
  const metaDescription = getMetaDescription(article.content?.blocks);
  const metaKeywords = article.tags?.join(', ');

  return (
    <>
      <Seo 
        title={article.title}
        description={metaDescription}
        image={article.thumbnailUrl}
        keywords={metaKeywords}
      />
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>ブログ一覧へ戻る</span>
                </Link>
            </div>
            <article className="bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl border border-slate-700/50">
                {article.thumbnailUrl && (
                    <img
                    src={article.thumbnailUrl}
                    alt={`${article.title}のサムネイル`}
                    className="w-full h-auto max-h-[450px] object-cover rounded-xl mb-8 shadow-lg"
                    />
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-cyan-300 tracking-wide leading-tight">
                    {article.title}
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-400 mb-8">
                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <time dateTime={article.createdAt?.toDate().toISOString()}>
                            {article.createdAt?.toDate().toLocaleDateString("ja-JP")}
                        </time>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {article.category && (
                            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-medium">
                                {article.category}
                            </span>
                        )}
                        {article.tags?.map((tag, idx) => (
                            <span key={idx} className="flex items-center gap-1 text-purple-300">
                                <Tag size={14} />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="prose prose-invert max-w-none prose-h2:text-cyan-200 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white">
                    {article.content?.blocks?.map((block, idx) => renderBlock(block, idx))}
                </div>
            </article>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
