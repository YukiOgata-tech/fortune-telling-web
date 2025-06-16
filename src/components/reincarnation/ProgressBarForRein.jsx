export default function ProgressBarForRein({ current, total }) {
  const percent = ((current + 1) / total) * 100;
  return (
    <div className="w-full mb-8">
      <div className="h-3 bg-gray-300 rounded-xl overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="text-right text-xs mt-1 text-gray-400">
        {current + 1} / {total}
      </div>
    </div>
  );
}
