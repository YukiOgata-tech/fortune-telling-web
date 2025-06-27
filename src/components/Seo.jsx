// src/components/Seo.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Seo({ title, description, image, keywords }) {
  const { pathname } = useLocation();
  const url = `https://neo-oracle-17f26.web.app${pathname}`;

  const defaultTitle = "Neo Oracle | 新時代の占い・診断プラットフォーム";
  const defaultDescription = "Neo Oracleは、最新のテクノロジーと占術を融合させた、まったく新しい形の占い・診断プラットフォームです。あなたの未来を、より深く、より面白く。";

  useEffect(() => {
    // ドキュメントのタイトルを設定
    document.title = title ? `${title} | Neo Oracle` : defaultTitle;

    // metaタグを更新または作成するヘルパー関数
    const setMetaTag = (name, content) => {
      if (!content) return;
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    // OGP用のmetaタグを更新または作成するヘルパー関数
    const setOgTag = (property, content) => {
        if (!content) return;
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('property', property);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    // 各metaタグを設定
    setMetaTag('description', description || defaultDescription);
    if (keywords) {
      setMetaTag('keywords', keywords);
    }

    // OGP / Twitter
    setOgTag('og:type', 'article');
    setOgTag('og:title', title || defaultTitle);
    setOgTag('og:description', description || defaultDescription);
    if (image) {
      setOgTag('og:image', image);
    }
    setOgTag('og:url', url);
    setOgTag('og:site_name', 'Neo Oracle');
    setMetaTag('twitter:card', 'summary_large_image');

  }, [title, description, image, keywords, url]);

  // このコンポーネントは何もレンダリングしない
  return null;
}
