export function Footer() {
  return (
    <footer id="footer" className="bg-black text-white py-12 border-t border-[#67e0b8]/20 mt-auto">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <div className="mb-4 text-2xl font-black tracking-tighter text-[#67e0b8]">
            OPUCoder
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 OPUCoder - 岡山県立大学 技術系サークル
          </p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold">
          <a href="/search" className="text-gray-400 hover:text-[#67e0b8] transition-colors">
            記事一覧
          </a>
          <a href="/category" className="text-gray-400 hover:text-[#67e0b8] transition-colors">
            カテゴリ一覧
          </a>
          <a href="/project" className="text-gray-400 hover:text-[#67e0b8] transition-colors">
            プロジェクト一覧
          </a>
          <a href="/tag" className="text-gray-400 hover:text-[#67e0b8] transition-colors">
            タグ一覧
          </a>
          <a href="/creator" className="text-gray-400 hover:text-[#67e0b8] transition-colors">
            クリエイター一覧
          </a>
          <a href="/login" className="text-gray-500 hover:text-white transition-colors border-l border-gray-700 pl-8 ml-4">
            管理者用
          </a>
        </nav>
      </div>
    </footer>
  );
}
