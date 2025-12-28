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
      {/* 險倅ｺ九・繝・ム繝ｼ・医ヱ繝ｳ縺上★霎ｼ縺ｿ・・*/}
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

      {/* 繧ｵ繝繝阪う繝ｫ */}
      <div className="mb-8">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* 險倅ｺ区悽譁・*/}
      <div className="mb-8">
        <ArticleContent content={article.content} />
      </div>

      {/* 繧｢繧ｯ繧ｷ繝ｧ繝ｳ繝懊ち繝ｳ */}
      <div className="mb-12">
        <ActionButtons
          goodCount={article.good_count}
          articleTitle={article.title}
        />
      </div>

      {/* 繧ｳ繝｡繝ｳ繝医そ繧ｯ繧ｷ繝ｧ繝ｳ */}
      <div className="mb-12">
        <CommentSection />
      </div>

      {/* 髢｢騾｣險倅ｺ・*/}
      <div>
        <RelatedArticles />
        {/* <RelatedArticles articles={relatedArticles} /> */}
      </div>
    </div>
  );
}
