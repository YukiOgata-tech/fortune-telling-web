import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import useScrollDepth from "@/hooks/useScrollDepth";

export default function AboutMe() {
  useScrollDepth("AboutMePage");
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start py-12 px-2">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-8 items-center">
        {/* ページタイトル */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight text-center drop-shadow-lg mochiy-pop-p-one-regular">
          --当サイトについて--
        </h1>

        {/* イラスト用エリア */}
        <div className="w-48 h-40 md:w-60 md:h-48 rounded-full bg-gradient-to-tr from-cyan-400/20 via-indigo-500/10 to-purple-700/60 flex items-center justify-center shadow-xl border-2 border-indigo-400/40 overflow-hidden mb-2">
        <img src="/images/about-me-top.png" alt="アバターイラスト"
             className="object-contain w-full h-full"
             draggable={false}
        />
        <span className="absolute translate-y-24 text-white text-center biz-udpmincho-regular">製作者: Yuyu</span>
        </div>

        {/* 本文カード */}
        <Card className="w-full bg-white/10 border border-white/15 shadow-2xl rounded-2xl backdrop-blur-xl">
          <CardContent className="flex flex-col gap-8 p-6 md:p-10 text-white/95 text-base md:text-lg">
            {/* サイト概要 */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-cyan-300 new-tegomin-regular">-サイト概要</h2>
              <p className="biz-udpmincho-regular">
                当サイトは、占いのような性格診断や、その日の運勢診断をはじめ、エンタメ性の高い生涯年収診断や「人たらし度」診断など、思わず試したくなる診断コンテンツを提供しています。
                「どこかで聞いたことがある診断」「知りたくなるネタ」を、遊び心たっぷりにお届けし、今後も新しいコンテンツを随時拡張していく予定です。
                日々のちょっとした楽しみや、友達との話題作りに、ぜひご活用ください。
              </p>
            </section>

            {/* 運営者 */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-cyan-300 new-tegomin-regular">-運営者について</h2>
              <p className="biz-udpmincho-regular">
                このサイトは、普段は某大学工学部の普通の大学生（兼フリーランスエンジニア）が、趣味と好奇心から立ち上げ・運営しています。
                WEBサイトやアプリ制作やオンサイト・クラウドシステムの開発・接続などをお受けしています。<br/>このサイトは「遊び」も大切に、自由な発想でつくっています。
                実はカナダでのワーキングホリデー経験もあり、世界を広げることや、人の役に立つ独自のシステムやサービスを開発して、近いうちにデカい何か創造したい――そんな想いで日々bull sh〇tな大学生活を送ってます。
                もしサイトの不具合や気になる点、要望などがありましたら、ぜひお問い合わせフォームよりご連絡ください。
              </p>
            </section>

            {/* サイトの使い方 */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-cyan-300 new-tegomin-regular">-サイトの使い方</h2>
              <div className="biz-udpmincho-regular">
                会員登録・ログイン機能をご用意しています。ログインすることで、診断結果の振り返りや入力項目の省略など、より便利にご利用いただけます。
                また、アカウント登録していただくと、
                <ul className="list-disc list-inside ml-4 my-2">
                  <li>毎日運勢占いをメールで受け取れる</li>
                  <li>最新アップデート情報の通知</li>
                  <li>会員限定コンテンツ（現在開発中）への先行アクセス</li>
                </ul>
                といった機能も順次拡充していきます。<br />
                なお、診断結果はあくまでデータです。信じていいのは自分自身！！「自分の人生を動かせるのは自分自身」、この気持ちを忘れずに利用してください♪
              </div>
            </section>

            {/* チーム仲間募集 */}
            <section>
              <h2 className="text-xl font-semibold mb-2 text-cyan-300 new-tegomin-regular">(ガチ)仲間を募集しています</h2>
              <p className="biz-udpmincho-regular">
                現在、サイト運営や新しいコンテンツ・アプリケーションの開発に興味がある仲間を募集中です。
                「画期的なシステムを作りたい」、「一緒にサービスを作りたい！」という方がいれば、お気軽にお問い合わせフォーム(フッターから飛べます)からご連絡ください。一緒にデカくなりましょう。
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
