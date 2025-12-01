export function Hero() {
  return (
    <section className="relative bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1683813479742-4730f91fa3ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2NDQ3NjM1OXww&ixlib=rb-4.1.0&q=80&w=1080')" }}>
      <div className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-white/30 rounded-2xl p-8 border-4 border-[#67e0b8] shadow-lg">
          <h1 className="text-gray-900 mb-6 text-[24px]">
            OPUCoder 技術ブログ
          </h1>
          <p className="text-gray-800 mb-8 max-w-2xl mx-auto">
            ゲーム開発・AI・ロボット・インフラなど、技術系活動の成果を発信します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
              プロジェクト記事を見る
            </button>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
              最新記事一覧
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}