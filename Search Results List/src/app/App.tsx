import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CardMatrix, Article } from "./components/CardMatrix";

// モックデータ（75個の記事）
const generateArticles = (): Article[] => {
  const categories = ["テクノロジー", "ビジネス", "デザイン", "開発", "マーケティング"];
  const images = [
    "https://images.unsplash.com/photo-1737868131581-6379cdee4ec3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbGFwdG9wfGVufDF8fHx8MTc2Njg3ODMwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzY2ODg4MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1625535069703-a67ae00bd6de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBjb21wdXRlcnxlbnwxfHx8fDE3NjY4OTkxNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2V8ZW58MXx8fHwxNzY2OTcxNTczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1716703435551-4326ab111ae2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY2OTAzMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ];

  return Array.from({ length: 75 }, (_, i) => ({
    id: i + 1,
    title: `記事タイトル ${i + 1}: 最新のトレンドと技術について`,
    category: categories[i % categories.length],
    date: `2024-12-${String((i % 28) + 1).padStart(2, "0")}`,
    writer: `著者${(i % 10) + 1}`,
    image: images[i % images.length],
  }));
};

const ARTICLES_PER_PAGE = 12;

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery] = useState("React");
  
  const allArticles = generateArticles();
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);
  
  // 現在のページの記事を取得
  const currentArticles = allArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  // ページ番号の配列を生成（最大5ページ分を表示）
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 検索結果ヘッダー */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            [{searchQuery}] の検索結果
          </h2>
          <p className="text-gray-600">
            {allArticles.length}件の記事が見つかりました
          </p>
        </div>

        {/* 記事一覧 */}
        <CardMatrix articles={currentArticles} />

        {/* ページネーション */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            前のページへ
          </button>

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-lg ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            次のページへ
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}