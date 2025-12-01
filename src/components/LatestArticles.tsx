import { ArticleListItem } from './ArticleListItem';

const articles = [
  {
    id: 1,
    date: "2025/01/20",
    title: "Unity ECSで高速化してみた",
    writer: "Creator: こうち"
  },
  {
    id: 2,
    date: "2025/01/18",
    title: "機械学習モデルの軽量化Tips",
    writer: "Creator: 山田"
  },
  {
    id: 3,
    date: "2025/01/14",
    title: "サークルの新ブログシステム開発ログ",
    writer: "Creator: Sato"
  }
];

export function LatestArticles() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          最新記事
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {articles.map((article) => (
              <ArticleListItem
                key={article.id}
                date={article.date}
                title={article.title}
                writer={article.writer}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-[#67e0b8] text-gray-900 px-6 py-3 rounded-lg hover:bg-[#55c9a3] transition-colors">
              記事一覧へ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}