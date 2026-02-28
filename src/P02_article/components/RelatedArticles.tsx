import { ArticleCarousel } from "@/P00_common/components/ArticleCarousel";
interface RelatedArticlesProps {
  articles: any[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          関連記事
        </h2>
        {articles.length > 0 ? (
          <ArticleCarousel articles={articles} />
        ) : (
          <div className="text-center text-gray-500">読み込み中...</div>
        )}
        <div className="text-center mt-8">
          <button className="bg-[#67e0b8] text-gray-900 px-6 py-3 rounded-lg hover:bg-[#55c9a3] transition-colors">
            記事一覧へ
          </button>
        </div>
      </div>
    </section>
  );
}
