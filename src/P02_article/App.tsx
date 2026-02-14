import { ArticleDetail } from "./components/ArticleDetail";
import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";

export default function App() {
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    // URLのクエリパラメータからIDを取得
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");

    if (!id) {
      window.location.href = "/notfound";
      return;
    }

    // 記事データ取得
    fetch(`${API_BASE_URL}/articles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not Found');
        return res.json();
      })
      .then(data => setArticle(data))
      .catch(err => {
        console.error('Failed to fetch article:', err);
        window.location.href = "/notfound";
      });

    // PVカウントアップ (Cookie制御: 1日1回)
    const viewedKey = `viewed_article_${id}`;
    const isViewed = document.cookie.split('; ').find(row => row.startsWith(viewedKey));

    if (!isViewed) {
      fetch(`${import.meta.env.VITE_API_BASE_URL || '/api'}/articles/${id}/view`, {
        method: 'POST',
      }).then(() => {
        // Cookieセット (1日有効)
        const date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        document.cookie = `${viewedKey}=true; expires=${date.toUTCString()}; path=/`;
      }).catch(err => console.error('Failed to increment PV:', err));
    }
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <ArticleDetail
          article={article}
          onUpdateGoodCount={(count: number) => setArticle({ ...article, good_count: count })}
        />
      </main>
      <Footer />
    </div>
  );
}
