import { Link, useNavigate } from "react-router-dom";
import AdminGuard from "@/components/features/AdminGuard";

const NAV_ITEMS = [
  {
    title: "ブログ投稿管理",
    description: "ブログ記事の新規投稿、編集、削除ができます。",
    to: "/admin/blog-list",
    icon: (
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
        <rect x="6" y="10" width="20" height="12" rx="2" />
        <path d="M8 14h16M8 18h10" />
      </svg>
    )
  },
  // ここに新規管理メニューを追加するだけ！
];

const AdminHomePage = () => {
  

  return (
    <div className="min-h-[80vh] py-10 px-2 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100/40 via-white/60 to-purple-50/40">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">管理者ダッシュボード</h1>
      <div className="grid gap-6 w-full max-w-3xl md:grid-cols-2">
        {NAV_ITEMS.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="rounded-2xl bg-white/80 shadow-xl p-6 flex flex-col gap-2 hover:shadow-2xl hover:bg-blue-50/60 border border-blue-100 transition"
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-xl font-bold">{item.title}</span>
            </div>
            <div className="text-gray-500 text-sm">{item.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

function AdminHomePageWithGuard() {
  return (
    <AdminGuard>
      <AdminHomePage />
    </AdminGuard>
  );
}
export default AdminHomePageWithGuard;
