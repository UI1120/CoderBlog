import { Button } from "@/P00_common/ui/button";
import { Input } from "@/P00_common/ui/input";
import { Label } from "@/P00_common/ui/label";
import { Textarea } from "@/P00_common/ui/textarea";
import { Upload, Save } from "lucide-react";
import MDEditor from '@uiw/react-md-editor';

interface ArticleEditorProps {
    title: string;
    summary: string;
    keywords: string;
    content: string;
    onTitleChange: (title: string) => void;
    onSummaryChange: (summary: string) => void;
    onKeywordsChange: (keywords: string) => void;
    onContentChange: (content: string) => void;
    onSave: () => void;
}

export function ArticleEditor({
    title,
    summary,
    keywords,
    content,
    onTitleChange,
    onSummaryChange,
    onKeywordsChange,
    onContentChange,
    onSave,
}: ArticleEditorProps) {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === "text/markdown" || file.name.endsWith('.md'))) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                onContentChange(text);
            };
            reader.readAsText(file);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                const imageMarkdown = `![画像](${base64})`;
                onContentChange(content + '\n' + imageMarkdown);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="title">タイトル</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder="記事のタイトルを入力してください"
                        className="text-lg"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="summary">要約</Label>
                    <Textarea
                        id="summary"
                        value={summary}
                        onChange={(e) => onSummaryChange(e.target.value)}
                        placeholder="記事の要約を入力してください"
                        rows={3}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="keywords">キーワード</Label>
                    <Textarea
                        id="keywords"
                        value={keywords}
                        onChange={(e) => onKeywordsChange(e.target.value)}
                        placeholder="キーワードをカンマ区切りで入力してください"
                        rows={2}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".md,.txt"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload">
                        <Button asChild>
                            <span className="cursor-pointer">
                                <Upload className="w-4 h-4 mr-2" />
                                mdファイルのアップロード
                            </span>
                        </Button>
                    </label>

                    <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload">
                        <Button asChild variant="outline">
                            <span className="cursor-pointer">
                                <Upload className="w-4 h-4 mr-2" />
                                画像を追加
                            </span>
                        </Button>
                    </label>
                </div>

                <Button onClick={onSave} size="lg">
                    <Save className="w-4 h-4 mr-2" />
                    完成/保存
                </Button>
            </div>

            <div data-color-mode="light">
                <MDEditor
                    value={content}
                    onChange={(val) => onContentChange(val || '')}
                    height={600}
                    preview="live"
                />
            </div>
        </div>
    );
}
