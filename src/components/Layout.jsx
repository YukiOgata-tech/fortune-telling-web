import Seo from "@/components/Seo";

export default function Layout({ children }) {
  return (
    <>
      {/* 全ページ共通 Organization スキーマ */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Neo-Oracle | 性格と占い診断~元気だしてこ~",
          url: "https://neo-oracle-17f26.web.app",
          logo: "https://neo-oracle-17f26.web.app/images/icon-image01.png",
        })}
      </script>

      {/* children＝各ページ */}
      {children}
    </>
  );
}
