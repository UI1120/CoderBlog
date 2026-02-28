import { ArticleHeader } from "@/P00_common/components/ArticleHeader";
import { ArticleContent } from "@/P00_common/components/ArticleContent";
import { ActionButtons } from "./ActionButtons";
import { CommentSection } from "./CommentSection";
import { RelatedArticles } from "./RelatedArticles";

interface Article {
  article_id: number;
  title: string;
  summary: string;
  category_name: string;
  category_id: number;
  project_name: string;
  project_id: number;
  tags: string[];
  writer_name: string;
  writer_id?: number;
  writer_icon?: string;
  group_name: string;
  group_id?: number;
  group_icon?: string;
  published_at: string;
  updated_at?: string;
  good_count: number;
  thumbnail: string;
  content: string;
  relatedArticles?: any[];
}

interface ArticleDetailProps {
  article: Article;
  onUpdateGoodCount?: (count: number) => void;
}

export function ArticleDetail({
  article,
  onUpdateGoodCount
}: ArticleDetailProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 記事ヘッダー（パンくず込み） */}
      <div className="mb-8">
        <ArticleHeader
          title={article.title}
          summary={article.summary}
          category_name={article.category_name}
          category_id={article.category_id}
          project_name={article.project_name}
          project_id={article.project_id}
          tags={article.tags}
          writer_name={article.writer_name}
          writer_id={article.writer_id}
          writer_icon={article.writer_icon}
          group_name={article.group_name}
          group_id={article.group_id}
          group_icon={article.group_icon}
          published_at={article.published_at}
          updated_at={article.updated_at}
          good_count={article.good_count}
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
        <ArticleContent
          content={article.content}
          writer_name={article.writer_name}
          writer_id={article.writer_id}
          writer_icon={article.writer_icon}
        />
      </div>

      {/* アクションボタン */}
      <div className="mb-12">
        <ActionButtons
          articleId={article?.article_id?.toString() || ""}
          goodCount={article?.good_count || 0}
          articleTitle={article?.title || ""}
          onUpdateGoodCount={onUpdateGoodCount}
        />
      </div>

      {/* コメントセクション */}
      <div className="mb-12">
        <CommentSection articleId={article?.article_id?.toString() || ""} />
      </div>

      {/* 関連記事 */}
      <div>
        <RelatedArticles articles={article.relatedArticles || []} />
      </div>
    </div>
  );
}
