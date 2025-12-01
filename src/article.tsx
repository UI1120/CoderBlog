import { createRoot } from "react-dom/client";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Calendar, Tag, Folder, User, Heart, MessageSquare, Share2, Clock } from 'lucide-react';
import "./index.css";

// Mock Data based on design document
const ARTICLE = {
    article_id: 1,
    title: "React + TypeScript + Vite で作るモダンなブログサイト構築",
    summary: "OPUCoderの活動記録として、ReactとViteを使用した高速なブログシステムの構築方法を解説します。コンポーネント設計からデプロイまでを網羅。",
    published_at: "2025-12-01",
    updated_at: "2025-12-02",
    good_count: 42,
    view_count: 1205,
    category: { id: 1, name: "Web Development" },
    tags: [
        { id: 1, name: "React" },
        { id: 2, name: "TypeScript" },
        { id: 3, name: "Vite" },
        { id: 4, name: "TailwindCSS" }
    ],
    projects: [
        { id: 1, name: "OPUCoder Blog Project" }
    ],
    writer: {
        id: 1,
        display_name: "TechLead_Taro",
        profile: "Webフロントエンドが得意です。最近はRustも勉強中。",
        icon_path: "https://github.com/shadcn.png" // Placeholder
    },
    group: {
        id: 1,
        display_name: "Web Dev Team"
    },
    content: `
    <h2>はじめに</h2>
    <p>こんにちは、OPUCoder Web開発チームのTaroです。今回は、私たちのサークル活動を発信するための新しいブログシステムを構築したので、その技術選定と実装のポイントについて共有します。</p>
    
    <h2>技術スタックの選定</h2>
    <p>今回のプロジェクトでは、以下の技術スタックを採用しました。</p>
    <ul>
      <li><strong>Frontend:</strong> React, TypeScript, Vite</li>
      <li><strong>Styling:</strong> TailwindCSS, Lucide React</li>
      <li><strong>Backend:</strong> Python (FastAPI) - ※予定</li>
    </ul>
    <p>選定の理由は、<strong>開発体験の良さ</strong>と<strong>パフォーマンス</strong>です。特にViteのHMR（Hot Module Replacement）は爆速で、開発効率が劇的に向上しました。</p>

    <h2>ディレクトリ構成</h2>
    <pre><code class="language-bash">src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── pages/
│   └── Article.tsx
└── main.tsx</code></pre>

    <h2>コンポーネント設計</h2>
    <p>Atomic Designをベースにしつつ、過度に分割しすぎない「コロケーション」を意識した構成にしています。特にHeaderやFooterなどの共通パーツは独立させ、再利用性を高めました。</p>

    <h3>Headerコンポーネント</h3>
    <p>グラスモーフィズムを取り入れたモダンなデザインに挑戦しました。TailwindCSSの <code>backdrop-blur</code> ユーティリティを使うことで簡単に実装できます。</p>

    <h2>今後の展望</h2>
    <p>今後はバックエンドとの連携機能（記事の動的取得、いいね機能、コメント機能）を実装していく予定です。また、OGP画像の自動生成などもやってみたいですね。</p>

    <h2>まとめ</h2>
    <p>React + Vite + TailwindCSS の組み合わせは、現代のWeb開発において非常に強力なスタンダードです。皆さんもぜひ試してみてください！</p>
  `
};

function Article() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Main Content Column */}
                    <article className="flex-1 min-w-0 bg-white rounded-3xl shadow-sm p-6 md:p-10 lg:p-12">

                        {/* Article Header */}
                        <header className="mb-10 border-b border-gray-100 pb-10">
                            {/* Category & Date */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-mint-50 text-mint-700 rounded-full font-medium bg-[#e8f9f4] text-[#00a86b]">
                                    <Folder className="w-4 h-4" />
                                    {ARTICLE.category.name}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {ARTICLE.published_at}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    Updated: {ARTICLE.updated_at}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                {ARTICLE.title}
                            </h1>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {ARTICLE.tags.map(tag => (
                                    <span key={tag.id} className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                                        <Tag className="w-3 h-3" />
                                        {tag.name}
                                    </span>
                                ))}
                            </div>

                            {/* Writer Info */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={ARTICLE.writer.icon_path}
                                        alt={ARTICLE.writer.display_name}
                                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                                    />
                                    <div>
                                        <div className="font-bold text-gray-900">{ARTICLE.writer.display_name}</div>
                                        <div className="text-sm text-gray-500">Writer</div>
                                    </div>
                                    {ARTICLE.group && (
                                        <>
                                            <div className="w-px h-8 bg-gray-200 mx-2"></div>
                                            <div>
                                                <div className="font-bold text-gray-900">{ARTICLE.group.display_name}</div>
                                                <div className="text-sm text-gray-500">Group</div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Social Share (Mock) */}
                                <div className="flex gap-2">
                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* Article Body */}
                        <div
                            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#00a86b] prose-pre:bg-gray-900 prose-pre:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: ARTICLE.content }}
                        />

                        {/* Article Footer Actions */}
                        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                            <button className="flex items-center gap-2 px-6 py-3 bg-pink-50 text-pink-600 rounded-full hover:bg-pink-100 transition-colors font-medium">
                                <Heart className="w-5 h-5 fill-current" />
                                <span>Like {ARTICLE.good_count}</span>
                            </button>

                            <div className="text-gray-500 text-sm">
                                {ARTICLE.view_count} Views
                            </div>
                        </div>

                    </article>

                    {/* Sidebar (TOC & Related) */}
                    <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">

                        {/* Table of Contents */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Folder className="w-5 h-5 text-[#00a86b]" />
                                目次
                            </h3>
                            <nav className="space-y-2 text-sm">
                                <a href="#" className="block text-gray-600 hover:text-[#00a86b] pl-0 border-l-2 border-transparent hover:border-[#00a86b] pl-3 transition-all">はじめに</a>
                                <a href="#" className="block text-gray-600 hover:text-[#00a86b] pl-0 border-l-2 border-transparent hover:border-[#00a86b] pl-3 transition-all">技術スタックの選定</a>
                                <a href="#" className="block text-gray-600 hover:text-[#00a86b] pl-0 border-l-2 border-transparent hover:border-[#00a86b] pl-3 transition-all">ディレクトリ構成</a>
                                <a href="#" className="block text-gray-600 hover:text-[#00a86b] pl-0 border-l-2 border-transparent hover:border-[#00a86b] pl-3 transition-all">コンポーネント設計</a>
                                <a href="#" className="block text-gray-600 hover:text-[#00a86b] pl-4 border-l-2 border-transparent hover:border-[#00a86b] pl-3 transition-all">Headerコンポーネント</a>
                                <a href="#" className="block text-gray-600 hover:text-[#00a86b] pl-0 border-l-2 border-transparent hover:border-[#00a86b] pl-3 transition-all">今後の展望</a>
                                <a href="#" className="block text-gray-600 hover:text-[#00a86b] pl-0 border-l-2 border-transparent hover:border-[#00a86b] pl-3 transition-all">まとめ</a>
                            </nav>
                        </div>

                        {/* Writer Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-[#00a86b]" />
                                この記事を書いた人
                            </h3>
                            <div className="flex items-start gap-4">
                                <img
                                    src={ARTICLE.writer.icon_path}
                                    alt={ARTICLE.writer.display_name}
                                    className="w-14 h-14 rounded-full bg-gray-100"
                                />
                                <div>
                                    <div className="font-bold text-gray-900">{ARTICLE.writer.display_name}</div>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                        {ARTICLE.writer.profile}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Related Projects */}
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Folder className="w-5 h-5 text-[#00a86b]" />
                                関連プロジェクト
                            </h3>
                            <div className="space-y-3">
                                {ARTICLE.projects.map(project => (
                                    <div key={project.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                        <div className="font-medium text-gray-900 text-sm">{project.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </aside>

                </div>

                {/* Comments Section */}
                <div className="mt-12 lg:mt-20 max-w-4xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                        <MessageSquare className="w-6 h-6 text-[#00a86b]" />
                        コメント
                    </h3>

                    <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 mb-8">
                        <textarea
                            className="w-full bg-gray-50 border-0 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#00a86b] transition-all resize-none h-32"
                            placeholder="この記事への感想や質問を書いてみましょう（ログイン不要）"
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button className="px-6 py-2.5 bg-[#00a86b] text-white rounded-xl font-medium hover:bg-[#008f5b] transition-colors shadow-lg shadow-mint-200">
                                コメントを投稿
                            </button>
                        </div>
                    </div>

                    {/* Mock Comments List */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <div className="font-bold text-gray-900">名無しエンジニア</div>
                                <div className="text-xs text-gray-400">2025-12-01 14:30</div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Viteのビルド速度には本当に驚かされますよね。参考になりました！
                            </p>
                        </div>
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}

createRoot(document.getElementById("root")!).render(<Article />);
