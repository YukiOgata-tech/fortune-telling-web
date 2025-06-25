import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import Background3DSpace from "@/components/general/Background3DSpace";
import ScrollToTop from "@/components/general/ScrollToTop";
import RequireAuth from "@/components/features/RequireAuth";
import SpaceLoading from "@/components/general/SpaceLoader";
import SvgSprite from "@/components/general/SvgSprite";
import Layout from "@/components/Layout";
// pages import
import TopPage from "@/pages/commons/TopPage";
import DiagnosePage from "@/pages/diagnose-1/DiagnosePage";
import QuestionnairePage from "@/pages/diagnose-1/QuestionnairePage";
import ResultPage from "@/pages/diagnose-1/ResultPage";
import PrivacyPolicy from "@/pages/commons/PrivacyPolicy";
import ContactPage from "@/pages/commons/ContactPage";
import DailyFortunePage from "@/pages/DailyFortunePage";
import {
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
} from "@/pages/commons/AuthPages";
import { VerifyEmailPage } from "@/pages/commons/AccountPages";
import AboutMe from "@/pages/commons/AboutMePage";
import FaqPage from "@/pages/commons/FaqPage";
import FortuneWealthHome from "@/pages/wealth/FortuneWealthHome";
import FortuneWealthQuestion from "@/pages/wealth/FortuneWealthQuestion";
import FortuneWealthResult from "@/pages/wealth/FortuneWealthResult";
import TarashidoDiagnosePage from "@/pages/tarashido/TarashidoDiagnosePage";
import TarashidoResultPage from "@/pages/tarashido/TarashidoResultPage";
import ReincarnationPage from "@/pages/reincarnation/ReincarnationPage";
import SoulNumberDiagnoser from "@/pages/SoulNumberPage";
import GeniusQuiz from "@/pages/HowGeniusPage";
import DashboardPage from "@/pages/commons/DashBoardPage";
import BlogListPage from "@/pages/commons/BlogListPage";
import BlogDetailPage from "@/pages/commons/BlogDetailPage";
// Admin Pages
import AdminHomePageWithGuard from "@/pages/admin/AdminHomePage";
import AdminBlogListPageWithGuard from "@/pages/admin/AdminBlogList";
import BlogEditorPageWithGuard from "@/pages/admin/BlogEditorPage";

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
      <Layout>
        <div className="min-h-screen min-w-screen flex flex-col">
          <ScrollToTop />
          <Header />
          <main className="">
            <Background3DSpace />
            <Routes>
              <Route path="/" element={<TopPage />} />
              <Route path="/diagnose" element={<DiagnosePage />} />
              <Route path="/questionnaire" element={<QuestionnairePage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/faq" element={<FaqPage />} />

              {/** ブログページ */}
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              {/* 管理者ページ（ガード済み） */}
              <Route path="/admin" element={<AdminHomePageWithGuard />} />
              <Route path="/admin/blog-list" element={<AdminBlogListPageWithGuard />}/>
              <Route path="/admin/blog-edit" element={<BlogEditorPageWithGuard />}/>
              <Route path="/admin/blog-edit/:id" element={<BlogEditorPageWithGuard />}/>

              <Route path="/daily" element={<DailyFortunePage />} />
              {/* アカウント作成・ログイン・PWリセット */}
              <Route path="/login/to/neo-oracle" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset" element={<ResetPasswordPage />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <DashboardPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/verify"
                element={
                  <RequireAuth>
                    <VerifyEmailPage />
                  </RequireAuth>
                }
              />
              {/* 診断コンテンツ関連ページ */}
              <Route path="/fortune-wealth" element={<FortuneWealthHome />} />
              <Route
                path="/fortune-wealth/question"
                element={<FortuneWealthQuestion />}
              />
              <Route
                path="/fortune-wealth/result"
                element={<FortuneWealthResult />}
              />
              <Route path="/tarashido" element={<TarashidoDiagnosePage />} />
              <Route
                path="/tarashido/result"
                element={<TarashidoResultPage />}
              />
              <Route path="/reincarnation" element={<ReincarnationPage />} />
              <Route path="/soul-number" element={<SoulNumberDiagnoser />} />
              <Route path="/how-much-genius" element={<GeniusQuiz />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <SvgSprite />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
