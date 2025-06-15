import { useState } from "react";
import { User, Mail, MessageCircle, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null); // "ok" or "error"

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch(
        "https://us-central1-neo-oracle-17f26.cloudfunctions.net/sendContactMail",
        {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.status === "ok") {
        setResult("ok");
        setForm({ name: "", email: "", message: "" });
      } else {
        setResult("error");
      }
    } catch (err) {
      setResult("error");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex justify-center items-center mb-8 via-blue-800">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8 sm:p-10 space-y-8"
        acceptCharset="UTF-8"
        autoComplete="off"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-4 tracking-widest drop-shadow flex items-center justify-center gap-2">
          <MessageCircle size={32} className="text-cyan-400 drop-shadow-glow" />
          お問い合わせ
        </h2>

        {/* サクセス＆エラーメッセージ */}
        {result === "ok" && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-cyan-600/20 text-cyan-100 font-bold shadow">
            <CheckCircle2 className="text-cyan-400" /> 送信完了しました。ありがとうございます！
          </div>
        )}
        {result === "error" && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-600/20 text-red-100 font-bold shadow">
            <AlertCircle className="text-red-400" /> 送信に失敗しました。もう一度お試しください。
          </div>
        )}

        {/* 名前 */}
        <div>
          <label htmlFor="name" className="block text-white/80 text-lg mb-1">
            <span className="flex items-center gap-2">
              <User className="text-cyan-400" size={20} /> お名前
            </span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300 opacity-70 pointer-events-none" size={18} />
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="例：山田 太郎"
              required
              className="pl-10 w-full rounded-xl bg-black/40 text-white px-4 py-3 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 placeholder:text-gray-400/60 transition shadow-inner"
            />
          </div>
        </div>
        {/* メール */}
        <div>
          <label htmlFor="email" className="block text-white/80 text-lg mb-1">
            <span className="flex items-center gap-2">
              <Mail className="text-cyan-400" size={20} /> メールアドレス
            </span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300 opacity-70 pointer-events-none" size={18} />
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="例：taro@example.com"
              required
              className="pl-10 w-full rounded-xl bg-black/40 text-white px-4 py-3 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 placeholder:text-gray-400/60 transition shadow-inner"
            />
          </div>
        </div>
        {/* メッセージ */}
        <div>
          <label htmlFor="message" className="block text-white/80 text-lg mb-1">
            <span className="flex items-center gap-2">
              <MessageCircle className="text-cyan-400" size={20} /> お問い合わせ内容
            </span>
          </label>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-6 text-cyan-300 opacity-70 pointer-events-none" size={18} />
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="ご質問・ご要望などご自由にご記入ください"
              required
              rows={6}
              className="pl-10 w-full rounded-xl bg-black/40 text-white px-4 py-3 border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 placeholder:text-gray-400/60 transition shadow-inner"
            />
          </div>
        </div>
        {/* ボタン */}
        <button
          type="submit"
          disabled={sending}
          className="w-full py-3 mt-6 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 text-xl font-bold text-white tracking-widest shadow-lg hover:scale-105 transition-all duration-200 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <Send className={`transition-transform ${sending ? "animate-bounce" : ""}`} size={22} />
          {sending ? "送信中..." : "送信"}
        </button>
      </form>
    </div>
  );
}
