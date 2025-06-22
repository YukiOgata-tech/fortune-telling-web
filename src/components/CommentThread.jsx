import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { motion } from "framer-motion";
import { useAuth } from "@/components/features/AuthContext";
import CommentList from "@/components/CommentList";

export default function CommentThread({
  docPath,
  requiredFields = ["name", "comment"],
  title = "コメントを投稿しよう",
  description = "",
}) {
  const { user } = useAuth();
  const displayName = user?.displayName?.trim() || "";
  const initialForm = Object.fromEntries(requiredFields.map(f => [f, ""]));
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const validate = () => {
    if (requiredFields.includes("name") && form.name.length > 15) {
      setError("名前は15文字以内で入力してください。");
      return false;
    }
    if (requiredFields.includes("comment") && form.comment.length > 200) {
      setError("コメントは200文字以内で入力してください。");
      return false;
    }
    for (const f of requiredFields) {
      if (!displayName && f === "name" && !form[f]?.trim()) {
        setError("名前を入力してください。");
        return false;
      }
      if (f !== "name" && !form[f]?.trim()) {
        setError("すべての必須項目を入力してください。");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user) {
      setError("コメント投稿にはログインが必要です。");
      return;
    }
    if (!validate()) return;
    setLoading(true);
    await addDoc(collection(db, docPath), {
      ...form,
      userId: user.uid,
      userName: user.displayName || "",
      createdAt: serverTimestamp(),
    });
    setForm(initialForm);
    setLoading(false);
    setError("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 flex flex-col gap-10">
      {/* 投稿フォームカード */}
      <motion.section className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg p-6 flex flex-col gap-4"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-xl font-bold mb-1 text-white">{title}</h2>
        {description && <p className="mb-2 text-white/80">{description}</p>}
        {!user ? (
          <div className="text-center text-white/80 mb-2">
            コメントするにはログインが必要です。<br />
            <a href="/login/to/neo-oracle" className="text-fuchsia-300 underline">ログインページへ</a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-start w-full"
          >
            <div className="flex flex-row gap-3 w-full items-center">
              {/* displayName優先、未登録時だけ入力欄 */}
              {requiredFields.includes("name") && (
                displayName
                  ? <div className="px-3 py-2 rounded-lg bg-white/80 text-gray-800 border border-fuchsia-300 font-bold">
                      {displayName}
                    </div>
                  : <input
                      name="name"
                      value={form.name}
                      maxLength={15}
                      onChange={handleChange}
                      placeholder="名前 (15文字以内)"
                      className="w-36 px-3 py-2 rounded-lg bg-white/80 text-gray-800 border border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-400 focus:outline-none"
                      autoComplete="off"
                    />
              )}
              {/* 年齢・診断結果も同様に */}
              {/* ここから同様のロジック追加で拡張可能 */}
              {requiredFields.includes("age") && (
                <input
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="年齢"
                  type="number"
                  min={0}
                  max={120}
                  className="w-20 px-3 py-2 rounded-lg bg-white/80 text-gray-800 border border-slate-300 focus:ring-2 focus:ring-fuchsia-200 focus:outline-none"
                  autoComplete="off"
                />
              )}
              {requiredFields.includes("diagnosis") && (
                <input
                  name="diagnosis"
                  value={form.diagnosis}
                  onChange={handleChange}
                  placeholder="診断結果"
                  className="w-40 px-3 py-2 rounded-lg bg-white/80 text-gray-800 border border-slate-300 focus:ring-2 focus:ring-fuchsia-200 focus:outline-none"
                  autoComplete="off"
                />
              )}
            </div>
            <div className="w-full">
              {requiredFields.includes("comment") && (
                <textarea
                  name="comment"
                  value={form.comment}
                  maxLength={200}
                  onChange={handleChange}
                  placeholder="コメントを入力… (200文字以内)"
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl bg-white/80 text-gray-800 border border-fuchsia-200 focus:ring-2 focus:ring-fuchsia-400 focus:outline-none resize-none"
                />
              )}
            </div>
            {error && <div className="text-fuchsia-300 text-sm">{error}</div>}
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl px-8 py-2 mt-2 bg-gradient-to-r from-indigo-400 to-fuchsia-500 text-white font-bold hover:opacity-90 transition"
            >
              投稿
            </button>
          </form>
        )}
      </motion.section>
      {/* コメントリストをimportで分離 */}
      <CommentList db={db} docPath={docPath} />
    </div>
  );
}
