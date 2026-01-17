import { Card } from "@/P00_common/ui/card";
import { Badge } from "@/P00_common/ui/badge";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
    keywords,
    content,
    category,
    project,
    tags,
    thumbnail,
}: PreviewProps) {
    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {thumbnail && (
                <div className="w-full h-64 rounded-lg overflow-hidden">
                    <img
                        src={thumbnail}
                        alt="サムネイル"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <Card className="p-8">
                {title && (
                    <h1 className="mb-4 text-3xl font-bold">{title}</h1>
                )}

                {summary && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-gray-700 italic">{summary}</p>
                    </div>
                )}

                {keywords && (
                    <div className="mb-6">
                        <p className="text-sm text-gray-600">
                            <strong>キーワード:</strong> {keywords}
                        </p>
                    </div>
                )}

                <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {category && (
                            <Badge variant="secondary">
                                カテゴリー: {category}
                            </Badge>
                        )}
                        {project && (
                            <Badge variant="outline">
                                プロジェクト: {project}
                            </Badge>
                        )}
                    </div>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <Badge key={tag} variant="default">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>

                <div className="prose prose-gray max-w-none">
                    {content ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {content}
                        </ReactMarkdown>
                    ) : (
                        <p className="text-gray-400 italic">
                            記事の内容がまだ入力されていません
                        </p>
                    )}
                </div>
            </Card>
        </div>
    );
}
