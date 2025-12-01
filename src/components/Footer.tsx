export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <div className="mb-4 text-[20px]">
            OPUCoder
          </div>
          <p className="text-gray-400">
            © 2025 OPUCoder - 岡山県立大学 技術系サークル
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-gray-400">
          <a href="#articles" className="hover:text-white transition-colors">
            記事一覧
          </a>
          <a href="#tags" className="hover:text-white transition-colors">
            タグ一覧
          </a>
          <a href="#privacy" className="hover:text-white transition-colors">
            プライバシーポリシー
          </a>
          <a href="#analytics" className="hover:text-white transition-colors">
            Google Analyticsについて
          </a>
        </div>
      </div>
    </footer>
  );
}
