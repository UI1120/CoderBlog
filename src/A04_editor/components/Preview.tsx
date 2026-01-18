import { ArticleHeader } from "@/P00_common/components/ArticleHeader";
import { ArticleContent } from "@/P00_common/components/ArticleContent";
import { AdminCard } from "@/A00_common/components/AdminCard";

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
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="bg-emerald-600/5 border border-emerald-600/10 rounded-2xl px-6 py-4 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Article Preview Mode</span>
                <span className="text-[10px] font-bold text-gray-400">Rendering Actual UI Components</span>
            </div>

            <AdminCard className="p-12">
                {/* 記事ヘッダー（パンくず込み） */}
                <div className="mb-12">
                    <ArticleHeader
                        title={title || "無題の記事"}
                        summary={summary || "記事の概要がここに入ります"}
                        category={category || "カテゴリ未指定"}
                        categoryId="preview"
                        writer="Editor User"
                        group={project || "プロジェクト未指定"}
                        publishedDate={currentDate}
                        goodCount={0}
                    />
                </div>

                {/* サムネイル */}
                {thumbnail && (
                    <div className="mb-12 relative group">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-auto rounded-3xl shadow-2xl shadow-emerald-900/10 border border-gray-100"
                        />
                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full px-4 py-1.5 shadow-sm">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Cover Image</span>
                        </div>
                    </div>
                )}

                {/* 記事本文 */}
                <div className="max-w-none">
                    <ArticleContent
                        content={content || "本文が入力されていません。Markdownで執筆を開始してください。"}
                        className=""
                    />
                </div>
            </AdminCard>
        </div>
    );
}
