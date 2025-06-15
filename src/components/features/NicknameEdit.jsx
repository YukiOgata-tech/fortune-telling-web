import React, { useState } from "react";
import { useAuth } from "@/components/features/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const MAX_LENGTH = 16;
const MIN_LENGTH = 2;

const NicknameEdit = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  if (!user) return null;

  // 入力バリデーション
  const isValid =
    nickname.trim().length >= MIN_LENGTH &&
    nickname.trim().length <= MAX_LENGTH;

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    if (!isValid) {
      setError(`ユーザー名は${MIN_LENGTH}～${MAX_LENGTH}文字で入力してください`);
      return;
    }
    setLoading(true);
    try {
      await updateProfile(user, { displayName: nickname.trim() });
      await user.reload();

      // Firestoreにも反映
    await setDoc(doc(db, "users", user.uid), {
      displayName: nickname.trim(),
    }, { merge: true });

      setMsg("ユーザー名を更新しました！");
      setOpen(false);
    } catch (err) {
      setError("更新に失敗しました: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <Button
        onClick={() => setOpen((v) => !v)}
        variant="secondary"
        className="mb-2"
      >
        ユーザー名を変更
      </Button>

      <AnimatePresence>
        {open && (
          <motion.form
            key="nickname-form"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, type: "spring" }}
            onSubmit={handleSave}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-md space-y-4"
          >
            <div>
              <label className="block mb-1 font-semibold text-white/80">
                新しいユーザー名
              </label>
              <Input
                value={nickname}
                maxLength={MAX_LENGTH}
                minLength={MIN_LENGTH}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="2～16文字"
                className="bg-white/30"
                disabled={loading}
              />
              <div className="text-xs text-white/60 mt-1">
                {nickname.length}/{MAX_LENGTH}文字
              </div>
            </div>
            {error && <div className="text-sm text-red-400">{error}</div>}
            {msg && <div className="text-sm text-green-300">{msg}</div>}
            <div className="flex gap-3">
              <Button type="submit" disabled={!isValid || loading}>
                {loading ? "保存中…" : "保存"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="ml-2"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                キャンセル
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NicknameEdit;
