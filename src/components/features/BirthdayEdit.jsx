import React, { useState } from "react";
import { useAuth } from "@/components/features/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const BirthdayEdit = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [birthday, setBirthday] = useState(""); // YYYY-MM-DD

  // Firestoreの誕生日データ取得
  React.useEffect(() => {
    const fetchBirthday = async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists() && snap.data().birthday && snap.data().birthday.toDate) {
        // Firestore Timestamp型→input用文字列
        const date = snap.data().birthday.toDate();
        setBirthday(date.toISOString().slice(0, 10));
      }
    };
    fetchBirthday();
  }, [user]);

  if (!user) return null;

  // 既に誕生日が登録されていれば「変更」、未登録なら「登録」ボタン
  const label = birthday ? "誕生日を変更" : "誕生日を登録";

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    if (!birthday) {
      setError("日付を選択してください");
      return;
    }
    setLoading(true);
    try {
      // Firestoreに保存
      await setDoc(doc(db, "users", user.uid), {
        birthday: new Date(birthday),
      }, { merge: true });
      setMsg("誕生日を更新しました！");
      setOpen(false);
    } catch (err) {
      setError("更新に失敗しました: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-2">
      <Button
        onClick={() => setOpen((v) => !v)}
        variant="secondary"
        className="mb-2"
      >
        {label}
      </Button>
      <div className="text-white/70 text-sm mb-1 text-center">
        {birthday && <>登録済み: {birthday}</>}
      </div>
      <AnimatePresence>
        {open && (
          <motion.form
            key="birthday-form"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3, type: "spring" }}
            onSubmit={handleSave}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-md space-y-4"
          >
            <div>
              <label className="block mb-1 font-semibold text-white/80">
                生年月日
              </label>
              <Input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="bg-white/30"
                disabled={loading}
                max={new Date().toISOString().slice(0, 10)}
              />
            </div>
            {error && <div className="text-sm text-red-400">{error}</div>}
            {msg && <div className="text-sm text-green-300">{msg}</div>}
            <div className="flex gap-3">
              <Button type="submit" disabled={!birthday || loading}>
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

export default BirthdayEdit;
