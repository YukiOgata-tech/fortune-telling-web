import { useState } from "react";
import {
  collectionGroup, query, where, orderBy,
  limit, getDocs, startAfter, deleteDoc, doc
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/features/AuthContext";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
dayjs.extend(relativeTime); dayjs.locale("ja");

const PER = 20;
const timeFmt = t =>
  dayjs().diff(t, "day") < 7 ? dayjs(t).fromNow() : dayjs(t).format("YYYY/MM/DD");

export default function MyCommentsList() {
  const { user } = useAuth();
  const [list, setList]   = useState([]);
  const [last, setLast]   = useState(null);
  const [hasMore, setHas] = useState(false);
  const [show, setShow]   = useState(false);

  const load = async (after) => {
    if (!user) return;
    let q = query(
      collectionGroup(db, "comments"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(PER)
    );
    if (after) q = query(q, startAfter(after));
    const snap = await getDocs(q);
    setList(prev => [...prev, ...snap.docs.map(d => ({ id: d.id, ref: d.ref, ...d.data() }))]);
    setLast(snap.docs[snap.docs.length - 1] || null);
    setHas(snap.docs.length === PER);
  };

  const handleDelete = async (refId) => {
    if (window.confirm("このコメントを削除しますか？")) {
      await deleteDoc(refId);
      setList(prev => prev.filter(c => c.ref.path !== refId.path));
    }
  };

  return (
    <>
      {!show && (
        <button
          onClick={() => { setShow(true); load(); }}
          className="mx-auto mb-6 px-8 py-3 rounded-full bg-gradient-to-r from-lime-400 to-emerald-500 text-gray-900 font-bold shadow hover:opacity-90"
        >
          過去のコメントを表示
        </button>
      )}

      {show && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="space-y-4">
          {list.length === 0 && <p className="text-center text-gray-300">コメントがありません。</p>}

          {list.map(c => (
            <div key={c.id}
              className="relative bg-white/15 backdrop-blur-xl rounded-2xl p-4 border border-lime-400/30 shadow-md">
              <p className="text-sm text-emerald-100 mb-1">{timeFmt(c.createdAt.toDate())}</p>
              <p className="whitespace-pre-line text-gray-100 mb-2">{c.comment}</p>

              <button
                onClick={() => handleDelete(c.ref)}
                className="absolute top-2 right-2 text-lime-300 hover:text-red-400 transition"
                aria-label="delete"
              >🗑</button>
            </div>
          ))}

          {hasMore && (
            <button
              onClick={() => load(last)}
              className="mx-auto mt-4 px-6 py-2 rounded-full bg-lime-500/80 text-gray-900 font-bold hover:bg-lime-600/80"
            >
              もっと見る
            </button>
          )}
        </motion.div>
      )}
    </>
  );
}
