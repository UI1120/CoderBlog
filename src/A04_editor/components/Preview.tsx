import { ArticleHeader } from "@/P00_common/components/ArticleHeader";
import { ArticleContent } from "@/P00_common/components/ArticleContent";

interface PreviewProps {
    title: string;
    summary: string;
    keywords: string;
    content: string;
    category: string;
    project: string;
    tags: string[];
    thumbnail: string;
}

export function Preview({
    title,
    summary,
    content,
    category,
    project,
    thumbnail,
}: PreviewProps) {
    // プレビュー用に現在の日付を使用
    const currentDate = new Date().toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* 記事ヘッダー（パンくず込み） */}
            <div className="mb-8">
                <ArticleHeader
                    title={title || "記事タイトル"}
                    summary={summary || "記事の概要がここに入ります"}
                    category={category || "カテゴリ"}
                    categoryId="preview"
                    writer="Editor User"
                    group={project || "プロジェクト"}
                    publishedDate={currentDate}
                    goodCount={0}
                />
            </div>

            {/* サムネイル */}
            {thumbnail && (
                <div className="mb-8">
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
            )}

            {/* 記事本文 */}
            <div className="mb-8">
                <ArticleContent content={content || "記事の内容がここに入ります"} />
            </div>
        </div>
    );
}
