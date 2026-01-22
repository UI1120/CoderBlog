import { ArticleHeader } from "@/P00_common/components/ArticleHeader";
import { ArticleContent } from "@/P00_common/components/ArticleContent";
import { ActionButtons } from "./ActionButtons";
import { CommentSection } from "./CommentSection";
import { RelatedArticles } from "./RelatedArticles";

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  category_id: number;
  project: string;
  project_id: number;
  tags: string[];
  writer: string;
  writer_id?: number;
  writer_icon?: string;
  group: string;
  group_id?: number;
  group_icon?: string;
  published_date: string;
  good_count: number;
  thumbnail: string;
  content: string;
}

interface ArticleDetailProps {
  article: Article;
}

export function ArticleDetail({
  article,
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
          project={article.project}
          projectId={article.project_id}
          tags={article.tags}
          writer={article.writer}
          writerId={article.writer_id}
          writerIcon={article.writer_icon}
          group={article.group}
          groupId={article.group_id}
          groupIcon={article.group_icon}
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
        <ArticleContent
          content={article.content}
          writer={article.writer}
          writerId={article.writer_id}
          writerIcon={article.writer_icon}
        />
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
        <CommentSection articleId={article.id} />
      </div>

      {/* 関連記事 */}
      <div>
        <RelatedArticles />
      </div>
    </div>
  );
}
