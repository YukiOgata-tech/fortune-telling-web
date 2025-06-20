// src/components/Seo.jsx

import { useLocation } from "react-router-dom";

export default function Seo({ title, description, image }) {
  const { pathname } = useLocation();
  const url = `https://neo-oracle-17f26.web.app${pathname}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OGP / Twitter */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
}
