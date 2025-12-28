import { ArticleDetail } from "./components/ArticleDetail";
import { Header } from '@/000_common/components/Header';
import { Footer } from '@/000_common/components/Footer';
import { useEffect, useState } from "react";

export default function App() {
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    // ID 1 の記事を取得（モック API）
    fetch('/api/articles/1')
      .then(res => {
        if (!res.ok) throw new Error('Not Found');
        return res.json();
      })
      .then(data => setArticle(data))
      .catch(err => console.error('Failed to fetch article:', err));
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <article>
        <ArticleDetail article={article} relatedArticles={article.relatedArticles || []} />
      </article>
      <Footer />
    </div>
  );
}
