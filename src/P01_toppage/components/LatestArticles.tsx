import { useState, useEffect } from "react";
import { ArticleCarousel } from "@/P00_common/components/ArticleCarousel";
import { API_BASE_URL } from "@/constants";

export function LatestArticles() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/articles?type=latest`)
      .then(res => res.json())
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch latest articles:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          最新記事
        </h2>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : articles.length > 0 ? (
          <ArticleCarousel articles={articles} />
        ) : (
          <p className="text-center text-gray-500">記事が見つかりませんでした。</p>
        )}
        <div className="text-center mt-8">
          <a 
            href="/search"
            className="inline-block bg-[#67e0b8] text-gray-900 px-6 py-3 rounded-lg hover:bg-[#55c9a3] transition-colors font-bold"
          >
            記事一覧へ
          </a>
        </div>
      </div>
    </section>
  );
}
