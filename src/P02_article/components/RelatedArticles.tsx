import { ArticleCarousel } from "@/000_common/components/ArticleCarousel";
import { useState, useEffect } from "react";

/*
const articles = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjQzODYyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Game Dev",
    date: "2025/01/20",
    title: "Unity ECSで高速化してみぁE,
    writer: "こうち",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1717501219687-ddce079f704b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzY0NDI1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI / Research",
    date: "2025/01/18",
    title: "機械学習モチE��の軽量化Tips",
    writer: "山田",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjQzODYyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Systems / Web",
    date: "2025/01/14",
    title: "サークルブログ開発ログ",
    writer: "Ogata",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1762742228148-f38c34ea7f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwZGV2ZWxvcG1lbnQlMjB1bml0exlbnwxfHx8fDE3NjQ0NzUzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Robotics",
    date: "2025/01/12",
    title: "センサー統合シスチE��の実裁E,
    writer: "鈴木",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1717501219687-ddce079f704b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzY0NDI1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI / Research",
    date: "2025/01/09",
    title: "PyTorchでニューラルネット構篁E,
    writer: "高橁E,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjQzODYyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Systems / Web",
    date: "2025/01/06",
    title: "React ÁETypeScriptのプラクチE��ス",
    writer: "渡辺",
  },
];
*/

export function RelatedArticles() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/article-lists/related-articles')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Failed to fetch related articles:', err));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          関連記亁E
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

