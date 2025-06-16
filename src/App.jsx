import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Background3DSpace from "@/components/common/Background3DSpace";
import ScrollToTop from "@/components/ScrollToTop";
import RequireAuth from "@/components/features/RequireAuth";
import SpaceLoading from "@/components/common/SpaceLoader";
import SvgSprite from "@/components/common/SvgSprite";
// pages import
import DiagnosePage from "@/pages/DiagnosePage";
import QuestionnairePage from "@/pages/QuestionnairePage";
import ResultPage from "@/pages/ResultPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ContactPage from "@/pages/ContactPage";
import DailyFortunePage from "@/pages/DailyFortunePage";
import { LoginPage, RegisterPage, ResetPasswordPage } from "@/pages/AuthPages";
import { DashboardPage, VerifyEmailPage} from "@/pages/AccountPages";
import FortuneWealthHome from "@/pages/wealth/FortuneWealthHome";
import FortuneWealthQuestion from "@/pages/wealth/FortuneWealthQuestion";
import FortuneWealthResult from "@/pages/wealth/FortuneWealthResult";
import TarashidoDiagnosePage from "@/pages/tarashido/TarashidoDiagnosePage";
import TarashidoResultPage from "@/pages/tarashido/TarashidoResultPage";
import ReincarnationPage from "@/pages/ReincarnationPage";


function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 例: 最低1秒はローディング表示、初期データfetch完了でsetIsLoading(false)
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#191a23] flex items-center justify-center">
        <SpaceLoading />
      </div>
    );
  }

  return (
    <BrowserRouter>
    <div className="min-h-screen min-w-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Background3DSpace />
        <Routes>
          <Route path="/" element={<DiagnosePage />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/daily" element={<DailyFortunePage />} />
          <Route path="/login/to/neo-oracle" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPasswordPage />} />

          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/verify" element={<RequireAuth><VerifyEmailPage /></RequireAuth>} />
          {/* wealth関連ページ */}
          <Route path="/fortune-wealth" element={<FortuneWealthHome />} />
          <Route path="/fortune-wealth/question" element={<FortuneWealthQuestion />} />
          <Route path="/fortune-wealth/result" element={<FortuneWealthResult />} />

          <Route path="/tarashido" element={<TarashidoDiagnosePage />} />
          <Route path="/tarashido/result" element={<TarashidoResultPage />} />

          <Route path="/reincarnation" element={<ReincarnationPage />} />


        </Routes>
      </main>
    <Footer/>
    </div>
    <SvgSprite />
    </BrowserRouter>
  )
}

export default App
