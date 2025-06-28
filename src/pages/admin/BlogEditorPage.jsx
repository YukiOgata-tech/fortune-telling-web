import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorBlock from "@/components/blog/EditorBlock";
import TagInput from "@/components/blog/TagInput";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import AdminGuard from "@/components/features/AdminGuard";

// === プレビュー専用のレンダリング関数 ===
const renderPreviewBlock = (block, idx) => {
    switch (block.type) {
      case "header":
        return <h2 key={idx} className="text-2xl md:text-3xl font-bold mt-8 mb-4 border-l-4 border-gray-400 pl-3">{block.data.text}</h2>;
      case "paragraph":
        return <p key={idx} className="mb-5 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
      case "image":
        return (
          <div key={idx} className="my-6 text-center">
            <img src={block.data.file.url} alt={block.data.caption || '記事画像'} className="my-2 rounded-lg max-w-full mx-auto" />
            {block.data.caption && <p className="text-xs text-gray-500 mt-1">{block.data.caption}</p>}
          </div>
        );
      case "list": {
        const ListTag = block.data.style === "ordered" ? "ol" : "ul";
        return (
          <ListTag key={idx} className={`list-inside mb-5 pl-5 ${block.data.style === "ordered" ? 'list-decimal' : 'list-disc'}`}>
            {block.data.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}
          </ListTag>
        );
      }
      case "warning":
        return (
            <div key={idx} className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 my-5 rounded-r-md">
                <div className="font-bold" dangerouslySetInnerHTML={{ __html: block.data.title }}/>
                <div className="mt-1" dangerouslySetInnerHTML={{ __html: block.data.message }}/>
            </div>
        );
      case "table": {
        if (!block.data?.content || !Array.isArray(block.data.content)) return null;
        return (
            <div key={idx} className="my-6 overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-300">
                    <tbody>
                        {block.data.content.map((row, ri) => (
                            <tr key={ri} className="border-b border-slate-200">
                                {(Array.isArray(row) ? row : String(row).split(',')).map((cell, ci) => (
                                    <td key={ci} className="border-r border-slate-200 p-2" dangerouslySetInnerHTML={{ __html: cell }} />
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
      }
      case "linkTool":
        return (
            <a href={block.data.link} target="_blank" rel="noopener noreferrer" className="block my-5 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <strong className="font-bold text-blue-600">{block.data.meta.title || block.data.link}</strong>
                <p className="text-sm text-gray-600 mt-1">{block.data.meta.description}</p>
                <p className="text-xs text-gray-400 mt-2 truncate">{block.data.link}</p>
            </a>
        )
      default:
        return null;
    }
};

const BlogEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState({ blocks: [] });
  
  const [previewMode, setPreviewMode] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(!id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      setIsContentLoaded(false);
      const fetchData = async () => {
        const snap = await getDoc(doc(db, "articles", id));
        if (snap.exists()) {
          const data = snap.data();
          setTitle(data.title ?? "");
          setThumbnailUrl(data.thumbnailUrl ?? "");
          setTags(data.tags ?? []);
          setCategory(data.category ?? "");
          setContent(data.content ?? { blocks: [] });
        }
        setIsContentLoaded(true);
      };
      fetchData();
    } else {
      setTitle("");
      setThumbnailUrl("");
      setTags([]);
      setCategory("");
      setContent({ blocks: [] });
      setIsContentLoaded(true);
    }
  }, [id]);

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { uploadImageToStorage } = await import("@/utils/uploadImageToStorage");
      const url = await uploadImageToStorage(file, "blog-thumbnails");
      setThumbnailUrl(url);
    }
  };

  const sanitizeContentForSave = (rawContent) => {
    if (!rawContent || !rawContent.blocks) return { blocks: [] };
    const newBlocks = rawContent.blocks.map((block) => {
      if (block.type === "table" && Array.isArray(block.data.content)) {
        const flatRows = block.data.content.map((row) =>
          Array.isArray(row) ? row.join(",") : String(row)
        );
        return { ...block, data: { ...block.data, content: flatRows } };
      }
      return block;
    });
    return { ...rawContent, blocks: newBlocks };
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!title || !content.blocks || content.blocks.length === 0) {
      alert("タイトルと本文を入力してください！");
      return;
    }
    setIsSubmitting(true);

    try {
      const dataToSave = {
        title: title ?? "",
        content: sanitizeContentForSave(content),
        thumbnailUrl: thumbnailUrl ?? "",
        tags: Array.isArray(tags) ? tags : [],
        category: category ?? "",
        authorId: auth.currentUser ? auth.currentUser.uid : null,
        updatedAt: serverTimestamp(),
      };

      if (id) {
        await setDoc(doc(db, "articles", id), dataToSave, { merge: true });
        alert("記事を更新しました！");
      } else {
        await addDoc(collection(db, "articles"), {
          ...dataToSave,
          createdAt: serverTimestamp(),
        });
        alert("投稿が完了しました！");
      }
      navigate("/admin/blog-list");
    } catch (err) {
      alert("投稿に失敗しました");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPreview = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg mt-6">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {thumbnailUrl && (
            <img src={thumbnailUrl} alt="サムネイル" className="mb-4 rounded-xl max-h-60 object-cover w-full" />
        )}
        <div className="mb-4 flex gap-2 flex-wrap">
            {category && <span className="px-3 py-1 rounded-full bg-cyan-500 text-white text-xs font-bold">{category}</span>}
            {tags.map((tag, idx) => <span key={idx} className="px-2 py-1 rounded-full bg-gray-200 text-xs">#{tag}</span>)}
        </div>
        <div className="text-black">
            {content.blocks.map((block, idx) => renderPreviewBlock(block, idx))}
        </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="bg-gradient-to-br from-indigo-100/70 via-white/60 to-purple-50/60 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate("/admin/blog-list")} className="text-blue-500 hover:underline mr-4">&lt; 一覧に戻る</button>
          <h1 className="text-2xl font-bold">{id ? "記事を編集" : "新規投稿"}</h1>
        </div>
        <input
          className="w-full mb-5 px-4 py-3 rounded-2xl text-3xl font-bold bg-white shadow-inner focus:outline-none"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center gap-4 mb-5">
          <label className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow transition hover:brightness-110 active:scale-95">
            サムネイル画像
            <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailChange} />
          </label>
          {thumbnailUrl && <img src={thumbnailUrl} alt="thumb" className="h-16 w-16 rounded-xl object-cover" />}
        </div>
        <div className="mb-4">
          <select className="px-4 py-2 rounded-xl border bg-white shadow" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">カテゴリを選択</option>
            <option value="占い">占い</option>
            <option value="診断">診断</option>
            <option value="紹介">紹介</option>
            <option value="コラム">コラム</option>
          </select>
        </div>
        <TagInput tags={tags} setTags={setTags} />
        
        {!previewMode ? (
          isContentLoaded ? (
            <EditorBlock key={id || "new"} initialData={content} onChange={setContent} />
          ) : (
            <div className="text-center p-10">読み込み中...</div>
          )
        ) : (
          renderPreview()
        )}
        
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 shadow transition hover:brightness-110 active:scale-95"
          >
            {previewMode ? "編集に戻る" : "プレビュー"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "処理中..." : (id ? "更新する" : "投稿する")}
          </button>
        </div>
      </div>
    </div>
  );
};

function BlogEditorPageWithGuard() {
  return (
    <AdminGuard>
      <BlogEditorPage />
    </AdminGuard>
  );
}
export default BlogEditorPageWithGuard;
