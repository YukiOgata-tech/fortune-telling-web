// src/hooks/useGtagEvent.js
export default function useGtagEvent() {
  // イベント送信関数
  function sendGtagEvent(eventName, params = {}) {
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
  }

  return sendGtagEvent;
}
