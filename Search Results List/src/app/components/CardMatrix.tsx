import { ArticleCard } from "./ArticleCard";

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  writer: string;
  image: string;
}

interface CardMatrixProps {
  articles: Article[];
}

export function CardMatrix({ articles }: CardMatrixProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {articles.map((article) => (
          <ArticleCard 
            key={article.id} 
            image={article.image}
            category={article.category}
            title={article.title}
            date={article.date}
            writer={article.writer}
          />
        ))}
      </div>
    </div>
  );
}

export type { Article };
