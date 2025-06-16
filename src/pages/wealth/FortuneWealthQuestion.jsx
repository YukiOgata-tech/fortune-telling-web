// src/pages/wealth/FortuneWealthQuestion.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/wealth/ProgressBar";
import { motion, AnimatePresence } from "framer-motion";
// 追加
import { useAuth } from "@/components/features/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// --- 外で宣言 ---
function MotionCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow-xl bg-black/60 p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

const questionItems = [
  {
    q: "もしあなたが、誰もいない森で光り輝く不思議な石を見つけました。どうしますか？",
    options: [
      { key: "A", label: "その場で石の周りの土を掘り、さらに大きな石がないか探す。" },
      { key: "B", label: "とりあえず持ち帰り、後で詳しく調べる。" },
      { key: "C", label: "そのまま置いておくが、場所を覚えておく。" },
      { key: "D", label: "美しい光に感動し、写真を撮ってSNSに投稿する。" }
    ]
  },
  {
    q: "あなたは今日、なぜか普段通らない道を選びました。その道で、少し迷ってしまった時、どんな気持ちになりますか？",
    options: [
      { key: "A", label: "「これも何かの縁かも」と、新しい発見を期待して進む。" },
      { key: "B", label: "少し焦りつつも、すぐに元の道に戻ろうと決める。" },
      { key: "C", label: "「面白い経験になったな」と、ポジティブに捉える。" },
      { key: "D", label: "誰かに助けを求めようと、あたりを見回す。" }
    ]
  },
  {
    q: "もし明日、あなたが突然、世界中のどこへでも行ける「瞬間移動の能力」を手に入れたら、まずどこへ行きますか？",
    options: [
      { key: "A", label: "昔から行きたかった憧れの場所。" },
      { key: "B", label: "まだ誰も知らない、秘密の場所を探しに行く。" },
      { key: "C", label: "大切な人に会いに行く。" },
      { key: "D", label: "特に目的もなく、気の向くままに移動してみる。" }
    ]
  }
];

const genderOptions = [
  { key: "male", label: "男性" },
  { key: "female", label: "女性" },
  { key: "other", label: "その他" },
  { key: "none", label: "未選択" }
];

const steps = ["profile", "question1", "question2", "question3"];
const QUESTION_COUNT = questionItems.length;

// --- ProfileStepも外で宣言 ---
function ProfileStep({ form, setForm, error, validateProfile, setStep, birthdayDisabled }) {
  const yearList = [];
  const nowYear = new Date().getFullYear();
  for (let y = nowYear - 100; y <= nowYear; y++) yearList.push(y);

  return (
    <MotionCard>
      <h2 className="text-xl font-bold text-yellow-300 mb-4">まずはあなたについて教えてください</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-gray-200 mb-1">
            ニックネーム <span className="text-yellow-300">*</span>
          </label>
          <input
            type="text"
            maxLength={18}
            className="w-full px-4 py-2 rounded-xl border-none bg-gray-800 text-gray-100 placeholder-gray-500"
            placeholder="例）金運太郎"
            value={form.nickname}
            onChange={e => setForm(f => ({ ...f, nickname: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-gray-200 mb-1">性別</label>
          <div className="flex gap-3">
            {genderOptions.map(opt => (
              <button
                key={opt.key}
                type="button"
                className={`px-4 py-1 rounded-full border border-gray-700 ${
                  form.gender === opt.key
                    ? "bg-yellow-400 text-black font-bold"
                    : "bg-gray-700 text-gray-200"
                }`}
                onClick={() => setForm(f => ({ ...f, gender: opt.key }))}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-200 mb-1">
            生年月日 <span className="text-yellow-300">*</span>
          </label>
          <div className="flex gap-2">
            <select
              className="bg-gray-800 text-gray-100 rounded-xl px-2 py-1"
              value={form.birth.year}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  birth: { ...f.birth, year: e.target.value }
                }))
              }
              disabled={birthdayDisabled}
            >
              <option value="">年</option>
              {yearList.map(y => (
                <option key={y} value={y}>
                  {y}年
                </option>
              ))}
            </select>
            <select
              className="bg-gray-800 text-gray-100 rounded-xl px-2 py-1"
              value={form.birth.month}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  birth: { ...f.birth, month: e.target.value }
                }))
              }
              disabled={birthdayDisabled}
            >
              <option value="">月</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}月
                </option>
              ))}
            </select>
            <select
              className="bg-gray-800 text-gray-100 rounded-xl px-2 py-1"
              value={form.birth.day}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  birth: { ...f.birth, day: e.target.value }
                }))
              }
              disabled={birthdayDisabled}
            >
              <option value="">日</option>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}日
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && <div className="text-red-400 mt-1">{error}</div>}
        <button
          type="button"
          className="mt-4 bg-yellow-400 hover:bg-yellow-500 transition-colors text-black font-bold rounded-2xl px-8 py-2 shadow-lg w-full"
          onClick={() => {
            if (validateProfile()) setStep(1);
          }}
        >
          次へ
        </button>
      </div>
    </MotionCard>
  );
}

function QuestionStep({ idx, form, setForm, setStep, navigate }) {
  return (
    <MotionCard>
      <h2 className="text-xl font-bold text-yellow-300 mb-4">{`質問${idx + 1}`}</h2>
      <p className="mb-6 text-gray-100">{questionItems[idx].q}</p>
      <div className="grid grid-cols-1 gap-4">
        {questionItems[idx].options.map(opt => (
          <motion.button
            whileTap={{ scale: 0.96, opacity: 0.85 }}
            key={opt.key}
            className="w-full bg-gray-800 hover:bg-yellow-400 hover:text-black transition-colors rounded-xl px-4 py-3 text-left text-gray-100 font-medium shadow"
            onClick={() => {
              setForm(f => {
                const arr = [...f.answers];
                arr[idx] = opt.key;
                return { ...f, answers: arr };
              });
              if (idx < QUESTION_COUNT - 1) {
                setStep(s => s + 1);
              } else {
                setTimeout(() => {
                  const answers = [...form.answers];
                  answers[idx] = opt.key;
                  const nextForm = { ...form, answers };
                  localStorage.setItem("fortuneWealthForm", JSON.stringify(nextForm));
                  navigate("/fortune-wealth/result");
                }, 10);
              }
            }}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>
    </MotionCard>
  );
}

export default function FortuneWealthQuestion() {
  const { user } = useAuth(); // 追加
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nickname: "",
    gender: "none",
    birth: { year: "", month: "", day: "" },
    answers: []
  });
  const [error, setError] = useState("");
  const [birthdayDisabled, setBirthdayDisabled] = useState(false); // 追加
  const navigate = useNavigate();

  // 追加: Firestoreから誕生日取得
  useEffect(() => {
    const fetchBirthday = async () => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const data = docSnap.data();
        const birthdayDate = data?.birthday?.toDate ? data.birthday.toDate() : null;
        if (birthdayDate) {
          setForm(f => ({
            ...f,
            birth: {
              year: birthdayDate.getFullYear().toString(),
              month: (birthdayDate.getMonth() + 1).toString(),
              day: birthdayDate.getDate().toString(),
            }
          }));
          setBirthdayDisabled(true);
        } else {
          setBirthdayDisabled(false);
        }
      } else {
        setBirthdayDisabled(false);
      }
    };
    fetchBirthday();
    // eslint-disable-next-line
  }, [user]);

  const validateProfile = () => {
    if (!form.nickname.trim()) {
      setError("ニックネームを入力してください");
      return false;
    }
    if (!form.birth.year || !form.birth.month || !form.birth.day) {
      setError("生年月日をすべて入力してください");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-yellow-800">
      <div className="w-full max-w-xl bg-black/50 rounded-2xl p-6 md:p-8 shadow-2xl mt-8">
        <ProgressBar step={step} total={steps.length} />
        <div className="mt-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              {step === 0 ? (
                <ProfileStep
                  form={form}
                  setForm={setForm}
                  error={error}
                  validateProfile={validateProfile}
                  setStep={setStep}
                  birthdayDisabled={birthdayDisabled} // 追加
                />
              ) : (
                <QuestionStep
                  idx={step - 1}
                  form={form}
                  setForm={setForm}
                  setStep={setStep}
                  navigate={navigate}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
