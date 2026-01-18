export function Footer() {
  return (
    <footer id="footer" className="bg-black text-white py-12 border-t border-[#67e0b8]/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <div className="mb-4 text-[20px]">
            OPUCoder
          </div>
          <p className="text-gray-300">
            © 2025 OPUCoder - 岡山県立大学 技術系サークル
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-gray-300">
          <a href="#articles" className="hover:text-[#67e0b8] transition-colors">
            記事一覧
          </a>
          <a href="#tags" className="hover:text-[#67e0b8] transition-colors">
            タグ一覧
          </a>
          <a href="#privacy" className="hover:text-[#67e0b8] transition-colors">
            プライバシーポリシー
          </a>
          <a href="/login" className="hover:text-[#67e0b8] transition-colors">
            運用者用
          </a>
        </div>
      </div>
    </footer>
  );
}
