import { useState } from "react";
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";
dayjs.extend(relativeTime);
dayjs.locale("ja");

function renderTime(ts) {
  if (!ts?.toDate) return "";
  const now = dayjs();
  const t = dayjs(ts.toDate());
  return now.diff(t, "day") < 7 ? t.fromNow() : t.format("YYYY/MM/DD");
}

export default function CommentList({ db, docPath }) {
  const COMMENTS_PER_PAGE = 20;
  const [comments, setComments] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [prevStacks, setPrevStacks] = useState([]);

  // 最新20件ロード
  const loadInitial = async () => {
    const q = query(
      collection(db, docPath),
      orderBy("createdAt", "desc"),
      limit(COMMENTS_PER_PAGE)
    );
    const snap = await getDocs(q);
    setComments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLastDoc(snap.docs[snap.docs.length - 1] || null);
    setFirstDoc(snap.docs[0] || null);
    setHasMore(snap.docs.length === COMMENTS_PER_PAGE);
    setPrevStacks([]);
    setPage(1);
  };

  // 次の20件ロード
  const loadNext = async () => {
    if (!lastDoc) return;
    const q = query(
      collection(db, docPath),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(COMMENTS_PER_PAGE)
    );
    const snap = await getDocs(q);
    setComments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setPrevStacks(prev => [...prev, firstDoc]);
    setLastDoc(snap.docs[snap.docs.length - 1] || null);
    setFirstDoc(snap.docs[0] || null);
    setHasMore(snap.docs.length === COMMENTS_PER_PAGE);
    setPage(p => p + 1);
  };

  // 前の20件
  const loadPrev = async () => {
    if (prevStacks.length === 0) return;
    const prevFirst = prevStacks[prevStacks.length - 1];
    const q = query(
      collection(db, docPath),
      orderBy("createdAt", "desc"),
      startAfter(prevFirst),
      limit(COMMENTS_PER_PAGE)
    );
    const snap = await getDocs(q);
    setComments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setPrevStacks(prev => prev.slice(0, -1));
    setLastDoc(snap.docs[snap.docs.length - 1] || null);
    setFirstDoc(snap.docs[0] || null);
    setHasMore(true);
    setPage(p => p - 1);
  };

  // コメント表示トリガー
  const handleShowComments = async () => {
    setShowComments(true);
    await loadInitial();
  };

  return (
    <>
      {!showComments && (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            className="px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white rounded-full font-bold shadow-md hover:opacity-90 transition"
            onClick={handleShowComments}
          >
            コメントに参加する
          </button>
        </motion.div>
      )}
      {showComments && (
        <motion.section
          className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-lg p-6"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-semibold mb-5 text-white">みんなのコメント</h3>
          <div className="flex flex-col gap-6">
            {comments.length === 0 && (
              <p className="text-white/80">まだコメントはありません。</p>
            )}
            {comments.map(c => (
              <motion.div
                key={c.id}
                className="bg-white/80 rounded-xl shadow flex flex-col px-5 py-4 gap-1 border border-fuchsia-100/60"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-fuchsia-700">{c.userName || c.name}</span>
                  {/* 同様のロジックをThreadに追加後にここも機能増やせば追加可能 */}
                  {c.age && <span className="text-xs text-gray-500">({c.age})</span>}
                  <span className="text-xs ml-auto text-gray-400">{renderTime(c.createdAt)}</span>
                </div>
                {c.diagnosis && (
                  <div className="text-xs text-fuchsia-500 mb-1">診断結果: {c.diagnosis}</div>
                )}
                <div className="text-sm text-gray-900 break-words whitespace-pre-line">{c.comment}</div>
              </motion.div>
            ))}
          </div>
          {/* ページネーション */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={loadPrev}
              disabled={page <= 1}
              className="px-4 py-2 rounded-full bg-white/70 border border-fuchsia-200 text-fuchsia-500 font-bold shadow hover:bg-fuchsia-100 disabled:opacity-40 transition"
            >
              前へ
            </button>
            <span className="px-3 py-2 text-white/90 font-semibold rounded-xl bg-gradient-to-r from-indigo-400 to-fuchsia-500 shadow">{page}</span>
            <button
              onClick={loadNext}
              disabled={!hasMore}
              className="px-4 py-2 rounded-full bg-white/70 border border-fuchsia-200 text-fuchsia-500 font-bold shadow hover:bg-fuchsia-100 disabled:opacity-40 transition"
            >
              次へ
            </button>
          </div>
        </motion.section>
      )}
    </>
  );
}
