import Seo from "@/components/Seo";

export default function Layout({ children }) {
  return (
    <>
      {/* 全ページ共通 Organization スキーマ */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Neo-Oracle | 1万人が利用した性格と占い診断",
          url: "https://neo-oracle-17f26.web.app",
          logo: "https://neo-oracle-17f26.web.app/images/icon-image01.png",
        })}
      </script>

      {/* children＝各ページ */}
      {children}
    </>
  );
}
