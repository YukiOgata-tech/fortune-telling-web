// src/hooks/useScrollDepth.js
// GOOGlEアナリティクスのスクロール計測hook ページごと呼んで使用
import { useEffect } from "react";

export default function useScrollDepth(pageLabel = "Page") {
  const scrollSteps = [25, 50, 75, 100];
  let triggered = {};

  function sendScrollEvent(percent) {
    if (window.gtag) {
      window.gtag('event', 'scroll_depth', {
        event_category: 'Engagement',
        event_label: `${pageLabel}: Scrolled ${percent}%`,
        value: percent,
      });
    }
  }

  useEffect(() => {
    triggered = {};

    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const percent = Math.floor(((scrollTop + winHeight) / docHeight) * 100);

      scrollSteps.forEach((step) => {
        if (percent >= step && !triggered[step]) {
          sendScrollEvent(step);
          triggered[step] = true;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageLabel]);
}
