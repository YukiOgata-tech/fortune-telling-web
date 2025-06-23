import { Link } from "react-router-dom";


const PrivacyPolicy = () => (
  <div className="max-w-3xl mx-auto bg-white/40 rounded-2xl shadow-xl px-6 py-10 my-12">
    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#2c1960]">プライバシーポリシー</h1>

    <p className="mb-5 text-sm text-gray-800 text-center">
      最終更新日: 2025年6月3日
    </p>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">1. 基本方針</h2>
      <p>
        当サイト「占いみたいな性格診断」（以下「当サイト」）は、ユーザーの個人情報保護の重要性を認識し、個人情報の適切な収集・利用・管理を行います。
      </p>
    </section>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">2. 収集する情報</h2>
      <ul className="list-disc pl-5 mb-2">
        <li>ユーザーが診断を受ける際の入力情報・回答データ</li>
        <li>今後導入するログイン機能により登録されるアカウント情報（メールアドレス等）</li>
        <li>Stripe等による決済時に取得する必要最小限の支払い情報</li>
        <li>サイト利用時に自動取得するアクセス情報（Cookie、IPアドレス等）</li>
        <li>お問い合わせ時の氏名・メールアドレス等</li>
      </ul>
      <p className="text-sm text-gray-900">
        Stripe決済に関する情報は、Stripe社のプライバシーポリシーに準じて管理されます。
      </p>
    </section>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">3. 利用目的</h2>
      <ul className="list-disc pl-5 mb-2">
        <li>診断サービスの提供および利便性向上</li>
        <li>本人確認・ログイン認証・ユーザー管理</li>
        <li>決済処理およびサービス利用履歴の管理</li>
        <li>サイトの利用状況分析・改善・不正利用防止</li>
        <li>お問い合わせ対応</li>
        <li>法令に基づく対応</li>
      </ul>
    </section>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">4. 情報の第三者提供</h2>
      <p>
        当サイトは、法令に基づく場合を除き、本人の同意なく第三者に個人情報を提供することはありません。<br/>
        但し、Stripe等の決済代行・認証システム等、外部サービスとの連携時は、サービス提供のため必要な範囲で情報を共有することがあります。
      </p>
    </section>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">5. Cookie等の利用について</h2>
      <p>
        当サイトは、サービス品質向上・利便性確保・アクセス解析等の目的でCookieや類似技術を使用する場合があります。<br/>
        ユーザーはブラウザ設定でCookieの受け入れ可否を選択できますが、一部機能が利用できない場合があります。
      </p>
    </section>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">6. 情報の管理</h2>
      <p>
        当サイトは、個人情報への不正アクセス・漏洩・改ざん・紛失防止のために、適切な安全管理措置を講じます。
      </p>
    </section>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">7. 広告・解析について</h2>
      <p>
        サイト改善のためGoogle Analytics等の解析ツールや今後広告配信システムを利用する場合があります。<br/>
        これらのツールによるデータ収集・管理は各サービスのプライバシーポリシーをご確認ください。
      </p>
    </section>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">8. 個人情報の開示・訂正・削除</h2>
      <p>
        ユーザーご本人から個人情報の開示・訂正・削除等のご希望があった場合は、本人確認の上、速やかに対応いたします。
      </p>
    </section>

    <section className="mb-6">
      <h2 className="font-bold text-lg mb-2">9. お問い合わせ</h2>
      <p>
        プライバシーポリシーに関するご質問・ご相談は、
        <Link to="/contact" className="underline text-blue-600 ml-1">
          お問い合わせフォーム
        </Link>
        からご連絡ください。
      </p>
    </section>

    <section className="mb-2">
      <h2 className="font-bold text-lg mb-2">10. 改定について</h2>
      <p>
        本ポリシーは、法令やサービス内容の変更等に応じて予告なく改定される場合があります。最新の内容は常に本ページをご確認ください。
      </p>
    </section>
  </div>
);

export default PrivacyPolicy;
