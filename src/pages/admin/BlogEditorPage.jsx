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

const BlogEditorPage = () => {
  const { id } = useParams(); // 既存投稿の編集時のID
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState({ blocks: [] });
  const [previewMode, setPreviewMode] = useState(false);
  const navigate = useNavigate();

  

  // 編集時: 記事データ取得
  useEffect(() => {
    if (id) {
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
      };
      fetchData();
    } else {
      // 新規作成モード：全てリセット
      setTitle("");
      setThumbnailUrl("");
      setTags([]);
      setCategory("");
      setContent({ blocks: [] });
    }
  }, [id]);


  // サムネイル画像アップロード
  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      // 必要に応じてStorageアップロードの関数を使ってURL取得
      const { uploadImageToStorage } = await import(
        "@/utils/uploadImageToStorage"
      );
      const url = await uploadImageToStorage(file);
      setThumbnailUrl(url);
    }
  };

  // プレビュー切替
  const handlePreviewToggle = () => setPreviewMode((prev) => !prev);

  const sanitizeContent = (content) => {
    const flattenList = (items) => {
      // items: Array
      let flat = [];
      items.forEach((item) => {
        if (typeof item === "string") {
          flat.push(item);
        } else if (item && typeof item === "object") {
          // サブリスト構造がある場合でも contentだけ平坦化
          if (item.content) flat.push(item.content);
          // サブリスト(items)をさらにflatten
          if (Array.isArray(item.items) && item.items.length > 0) {
            flat = flat.concat(flattenList(item.items));
          }
        }
      });
      return flat;
    };

    const newBlocks = content.blocks.map((block) => {
      // リスト
      if (block.type === "list" && Array.isArray(block.data.items)) {
        return {
          ...block,
          data: {
            ...block.data,
            items: flattenList(block.data.items),
          },
        };
      }
      // テーブル
      if (block.type === "table" && Array.isArray(block.data.content)) {
        // 二次元配列を一次元string配列（行ごとにカンマ区切り）に変換
        const flatRows = block.data.content.map((row) =>
          Array.isArray(row) ? row.join(",") : String(row)
        );
        return {
          ...block,
          data: {
            ...block.data,
            content: flatRows,
          },
        };
      }
      return block;
    });
    return { ...content, blocks: newBlocks };
  };

  // Firestore保存
  const handleSubmit = async () => {
    if (!title || !content.blocks || content.blocks.length === 0) {
      alert("タイトルと本文を入力してください！");
      return;
    }
    try {
      const safeData = {
        title: title ?? "",
        content: sanitizeContent(content),
        thumbnailUrl: thumbnailUrl ?? "",
        tags: Array.isArray(tags) ? tags : [],
        category: category ?? "",
        authorId: auth.currentUser ? auth.currentUser.uid : null,
        updatedAt: serverTimestamp(),
        ...(id ? {} : { createdAt: serverTimestamp() }),
      };
      if (id) {
        // 編集（上書き保存）
        await setDoc(doc(db, "articles", id), safeData, { merge: true });
        alert("記事を更新しました！");
      } else {
        // 新規
        await addDoc(collection(db, "articles"), {
          ...safeData,
          createdAt: serverTimestamp(),
        });
        console.log("Firestoreに送信するデータ", safeData);

        await addDoc(collection(db, "articles"), safeData);
        alert("投稿が完了しました！");
      }
      navigate("/admin/blog-list");
    } catch (err) {
      alert("投稿に失敗しました");
      console.error(err);
    }
  };

  // プレビュー表示
  const renderPreview = () => (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="サムネイル"
          className="mb-4 rounded-xl max-h-60 object-cover"
        />
      )}
      <div className="mb-2 flex gap-2">
        {category && (
          <span className="px-3 py-1 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white text-xs font-bold">
            {category}
          </span>
        )}
        {tags.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 rounded-2xl bg-gray-200 text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="prose max-w-none mt-6">
        {content.blocks &&
          content.blocks.map((block, idx) => {
            if (block.type === "header")
              return <h2 key={idx}>{block.data.text}</h2>;
            if (block.type === "paragraph")
              return <p key={idx}>{block.data.text}</p>;
            if (block.type === "image")
              return (
                <img
                  key={idx}
                  src={block.data.file.url}
                  alt=""
                  className="my-4"
                />
              );
            if (block.type === "list") {
              if (Array.isArray(block.data.items)) {
                return block.data.style === "ordered" ? (
                  <ol key={idx} className="list-decimal list-inside">
                    {block.data.items.map((item, i) => (
                      <li key={i}>
                        {typeof item === "string"
                          ? item
                          : item?.content || item?.text || JSON.stringify(item)}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul key={idx} className="list-disc list-inside">
                    {block.data.items.map((item, i) => (
                      <li key={i}>
                        {typeof item === "string"
                          ? item
                          : item?.content || item?.text || JSON.stringify(item)}
                      </li>
                    ))}
                  </ul>
                );
              } else {
                // 万一配列でなければデータをそのままダンプ
                return (
                  <pre key={idx} style={{ color: "red" }}>
                    リストデータ異常: {JSON.stringify(block.data, null, 2)}
                  </pre>
                );
              }
            }

            if (block.type === "marker")
              return (
                <mark key={idx} className="bg-yellow-200 px-1">
                  {block.data.text}
                </mark>
              );
            if (block.type === "warning")
              return (
                <div
                  key={idx}
                  className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-900 p-4 rounded mb-4"
                >
                  <div className="font-bold">{block.data.title}</div>
                  <div>{block.data.message}</div>
                </div>
              );
            if (block.type === "table") {
              if (Array.isArray(block.data.content)) {
                return (
                  <table key={idx} className="table-auto border mb-4">
                    <tbody>
                      {block.data.content.map((row, ri) => (
                        <tr key={ri}>
                          {Array.isArray(row)
                            ? row.map((cell, ci) => (
                                <td key={ci} className="border px-2 py-1">
                                  {typeof cell === "object"
                                    ? JSON.stringify(cell)
                                    : cell}
                                </td>
                              ))
                            : null}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              } else {
                return (
                  <pre key={idx} style={{ color: "red" }}>
                    テーブルデータ異常: {JSON.stringify(block.data, null, 2)}
                  </pre>
                );
              }
            }
            return null;
          })}
      </div>
    </div>
  );

return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="bg-gradient-to-br from-indigo-100/70 via-white/60 to-purple-50/60 rounded-2xl shadow-2xl p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/admin/blog-list")}
            className="text-blue-500 hover:underline mr-4"
          >&lt; 一覧に戻る</button>
          <h1 className="text-2xl font-bold">
            {id ? "記事を編集" : "新規投稿"}
          </h1>
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
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleThumbnailChange}
            />
          </label>
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="thumb"
              className="h-16 w-16 rounded-xl object-cover"
            />
          )}
        </div>
        <div className="mb-4">
          <select
            className="px-4 py-2 rounded-xl border bg-white shadow"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">カテゴリを選択</option>
            <option value="占い">占い</option>
            <option value="診断">診断</option>
            <option value="紹介">紹介</option>
            <option value="コラム">コラム</option>
          </select>
        </div>
        <TagInput key={id || "new"} tags={tags} setTags={setTags} />
        {!previewMode ? (
          <EditorBlock initialData={content} onChange={setContent} />
        ) : (
          <div>{renderPreview()}</div>
        )}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePreviewToggle}
            className="px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 shadow transition hover:brightness-110 active:scale-95"
          >
            {previewMode ? "編集に戻る" : "プレビュー"}
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transition hover:brightness-110 active:scale-95"
          >
            {id ? "更新する" : "投稿する"}
          </button>
        </div>
      </div>
    </div>
  );
};

// 認証ガードでエクスポート
function BlogEditorPageWithGuard() {
  return (
    <AdminGuard>
      <BlogEditorPage />
    </AdminGuard>
  );
}
export default BlogEditorPageWithGuard;