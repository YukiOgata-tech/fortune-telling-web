// GoogleAd.jsx
import React, { useEffect, useRef } from "react";

const GoogleAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // 2重実行エラー回避
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-6">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3927353202195333"
        data-ad-slot="9761096445"
        data-ad-format="auto"
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
};

export default GoogleAd;
