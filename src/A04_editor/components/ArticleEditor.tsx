import { ImageIcon, FileText } from "lucide-react";
import MDEditor from '@uiw/react-md-editor';
import { API_BASE_URL } from "@/constants";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminButton } from "@/A00_common/components/AdminButton";

interface ArticleEditorProps {
    title: string;
    summary: string;
    keywords: string;
    content: string;
    onTitleChange: (title: string) => void;
    onSummaryChange: (summary: string) => void;
    onKeywordsChange: (keywords: string) => void;
    onContentChange: (content: string) => void;
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch(`${API_BASE_URL}/upload/image`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Image upload failed');
                }

                const data = await response.json();
                const imageMarkdown = `![画像](${data.url})`;
                onContentChange(content + '\n' + imageMarkdown);
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('画像のアップロードに失敗しました。');
            }
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <AdminCard className="p-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">タイトル</label>
                    <input
                        value={title}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder="記事のタイトルを入力を入力してください"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 text-lg"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">要約</label>
                        <textarea
                            value={summary}
                            onChange={(e) => onSummaryChange(e.target.value)}
                            placeholder="記事の要約を入力してください"
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all resize-none text-gray-700 text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">キーワード (SEO)</label>
                        <textarea
                            value={keywords}
                            onChange={(e) => onKeywordsChange(e.target.value)}
                            placeholder="キーワードをカンマ区切りで入力してください"
                            rows={3}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all resize-none text-gray-700 text-sm"
                        />
                    </div>
                </div>
            </AdminCard>

            <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-gray-100">
                <div className="flex gap-3">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".md,.txt"
                        onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload">
                        <AdminButton variant="secondary" icon={<FileText className="w-4 h-4" />} className="cursor-pointer">
                            Markdown読込
                        </AdminButton>
                    </label>

                    <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <label htmlFor="image-upload">
                        <AdminButton variant="secondary" icon={<ImageIcon className="w-4 h-4" />} className="cursor-pointer">
                            画像追加
                        </AdminButton>
                    </label>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pr-4">
                    Markdown Editor Active
                </div>
            </div>

            <AdminCard className="p-1">
                <div data-color-mode="light">
                    <MDEditor
                        value={content}
                        onChange={(val) => onContentChange(val || '')}
                        height={600}
                        preview="edit"
                        style={{ border: 'none', borderRadius: '1.8rem' }}
                    />
                </div>
            </AdminCard>
        </div>
    );
}
