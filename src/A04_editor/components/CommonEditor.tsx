import { ImageIcon, FileText } from "lucide-react";
import React, { useRef } from "react";
import MDEditor from '@uiw/react-md-editor';
import { API_BASE_URL } from "@/constants";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminButton } from "@/A00_common/components/AdminButton";

interface CommonEditorProps {
    title: string;
    content: string;
    onTitleChange: (title: string) => void;
    onContentChange: (content: string) => void;
    // Optional props for Article mode specifics, can be ignored if not needed in other modes
    summary?: string;
    keywords?: string;
    onSummaryChange?: (summary: string) => void;
    onKeywordsChange?: (keywords: string) => void;
    // Mode specific labels or hide flags
    hideSummary?: boolean;
    hideKeywords?: boolean;
    targetId?: string; // ID for media upload directory structure
}

export function CommonEditor({
    title,
    content,
    onTitleChange,
    onContentChange,
    summary = "",
    keywords = "",
    onSummaryChange,
    onKeywordsChange,
    hideSummary = false,
    hideKeywords = false,
    targetId = "",
}: CommonEditorProps) {
    const markdownInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

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
                formData.append('file', file); // Use 'file' instead of 'image' to match the spec
                formData.append('purpose', 'articles'); // Add purpose key for backend sorting
                formData.append('target_id', targetId || 'new');

                const response = await fetch(`${API_BASE_URL}/admin/media`, {
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
                        placeholder="タイトルを入力してください"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 text-lg"
                    />
                </div>

                {/* Article Specifics: Summary & Keywords */}
                {(!hideSummary || !hideKeywords) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {!hideSummary && onSummaryChange && (
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">要約</label>
                                <textarea
                                    value={summary}
                                    onChange={(e) => onSummaryChange(e.target.value)}
                                    placeholder="要約を入力してください"
                                    rows={3}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all resize-none text-gray-700 text-sm"
                                />
                            </div>
                        )}

                        {!hideKeywords && onKeywordsChange && (
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
                        )}
                    </div>
                )}
            </AdminCard>

            <div className="flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-gray-100">
                <div className="flex gap-3">
                    <input
                        type="file"
                        ref={markdownInputRef}
                        className="hidden"
                        accept=".md,.txt"
                        onChange={handleFileUpload}
                    />
                    <AdminButton
                        variant="secondary"
                        icon={<FileText className="w-4 h-4" />}
                        className="cursor-pointer"
                        onClick={() => markdownInputRef.current?.click()}
                    >
                        Markdown読込
                    </AdminButton>

                    <input
                        type="file"
                        ref={imageInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <AdminButton
                        variant="secondary"
                        icon={<ImageIcon className="w-4 h-4" />}
                        className="cursor-pointer"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        画像追加
                    </AdminButton>
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
