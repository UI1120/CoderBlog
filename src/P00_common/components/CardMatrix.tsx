import { ArticleCard } from "./ArticleCard";

interface Article {
    article_id: number;
    title: string;
    project_name: string;
    project_id: number;
    published_at: string;
    writer_name: string;
    writer_id?: number;
    writer_icon?: string;
    thumbnail: string;
}

interface CardMatrixProps {
    articles: Article[];
}

export function CardMatrix({ articles }: CardMatrixProps) {
    return (
        <div className="flex justify-center mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.article_id}
                        article_id={article.article_id}
                        thumbnail={article.thumbnail}
                        project_name={article.project_name}
                        project_id={article.project_id}
                        title={article.title}
                        published_at={article.published_at}
                        writer_name={article.writer_name}
                        writer_id={article.writer_id}
                        writer_icon={article.writer_icon}
                    />
                ))}
            </div>
        </div>
    );
}

export type { Article };
