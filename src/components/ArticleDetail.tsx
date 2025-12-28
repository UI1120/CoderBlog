import { ArticleHeader } from "./ArticleHeader";
import { ArticleContent } from "./ArticleContent";
import { ActionButtons } from "./ActionButtons";
import { CommentSection } from "./CommentSection";
import { RelatedArticles } from "./RelatedArticles";

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  category_id: string;
  writer: string;
  group: string;
  published_date: string;
  good_count: number;
  thumbnail: string;
  content: string;
}

interface RelatedArticle {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  published_date: string;
}

interface ArticleDetailProps {
  article: Article;
  relatedArticles: RelatedArticle[];
}

export function ArticleDetail({
  article,
  relatedArticles,
}: ArticleDetailProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 記事ヘッダー（パンくず込み） */}
      <div className="mb-8">
        <ArticleHeader
          title={article.title}
          summary={article.summary}
          category={article.category}
          categoryId={article.category_id}
          writer={article.writer}
          group={article.group}
          publishedDate={article.published_date}
          goodCount={article.good_count}
        />
      </div>

      {/* サムネイル */}
      <div className="mb-8">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* 記事本文 */}
      <div className="mb-8">
        <ArticleContent content={article.content} />
      </div>

      {/* アクションボタン */}
      <div className="mb-12">
        <ActionButtons
          goodCount={article.good_count}
          articleTitle={article.title}
        />
      </div>

      {/* コメントセクション */}
      <div className="mb-12">
        <CommentSection />
      </div>

      {/* 関連記事 */}
      <div>
        <RelatedArticles />
        {/* <RelatedArticles articles={relatedArticles} /> */}
      </div>
    </div>
  );
}