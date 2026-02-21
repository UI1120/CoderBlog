import { ArticleHeader } from "@/P00_common/components/ArticleHeader";
import { ArticleContent } from "@/P00_common/components/ArticleContent";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { NoticeCard } from "@/P00_common/components/NoticeCard";

interface PreviewProps {
    title: string;
    summary?: string;
    content: string;
    project?: string;
    projectId?: string | number;
    tags?: string[];
    thumbnail?: string;
    // For Wiki/Notice Context
    typeLabel?: string;
    category?: string;
    url?: string;
}

export function Preview({
    title,
    summary = "",
    content,
    project,
    projectId,
    tags,
    thumbnail,
    typeLabel = "Article Preview",
    category,
    url,
}: PreviewProps) {
    const currentDate = new Date().toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '.');

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="bg-emerald-600/5 border border-emerald-600/10 rounded-2xl px-6 py-4 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">{typeLabel}</span>
                <span className="text-[10px] font-bold text-gray-400">Rendering Actual UI Components</span>
            </div>

            {typeLabel.includes("NOTICE") ? (
                <div className="mt-8 max-w-3xl mx-auto">
                    <NoticeCard notices={[{
                        date: currentDate,
                        category: category || "カテゴリ",
                        title: title || "お知らせの内容を入力してください",
                        url: url
                    }]} />
                </div>
            ) : (
                <AdminCard className="p-12">
                    <div className="mb-12">
                        <ArticleHeader
                            title={title || "無題"}
                            summary={summary || "内容の概要"}
                            category={typeLabel}
                            categoryId="preview"
                            project={project || "プロジェクト未指定"}
                            projectId={projectId || "preview"}
                            tags={tags || []}
                            writer="Editor User"
                            group={project || "グループ"}
                            publishedDate={currentDate}
                            goodCount={0}
                        />
                    </div>

                    {thumbnail && (
                        <div className="mb-12 relative group">
                            <img
                                src={thumbnail}
                                alt={title}
                                className="w-full h-auto rounded-3xl shadow-2xl shadow-emerald-900/10 border border-gray-100"
                            />
                        </div>
                    )}

                    <div className="max-w-none">
                        <ArticleContent
                            content={content || "本文が入力されていません。Markdownで執筆を開始してください。"}
                            className=""
                        />
                    </div>
                </AdminCard>
            )}
        </div>
    );
}
