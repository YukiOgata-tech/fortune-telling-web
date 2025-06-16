import ContactForm from "@/components/general/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-0">
      <div className="w-full max-w-[95%] sm:max-w-[80%] md:max-w-[65%] px-4 sm:px-6 md:px-8 rounded-2xl bg-white/10 backdrop-blur shadow-xl border border-white/20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white my-6 tracking-wide">
          CONTACT
        </h1>
        <p className="text-sm sm:text-base text-center text-slate-200 mb-2">
          サイトへのご質問・ご要望など、お気軽にお送りください。
        </p>
        <ContactForm />
      </div>
    </div>
  );
}
