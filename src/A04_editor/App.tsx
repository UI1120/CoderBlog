import { useState } from "react";
import { Button } from "@/P00_common/ui/button";
import { ArticleEditor } from "@/A04_editor/components/ArticleEditor";
import { MetadataEditor } from "@/A04_editor/components/MetadataEditor";
import { Preview } from "@/A04_editor/components/Preview";
import { Toaster } from "@/P00_common/ui/sonner";
import { toast } from "sonner";

type Tab = "edit" | "metadata" | "preview";

export default function App() {
    const [activeTab, setActiveTab] = useState<Tab>("edit");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [keywords, setKeywords] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [project, setProject] = useState("");
    const [group, setGroup] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState("");

    const handleSave = () => {
        const missingFields: string[] = [];

        if (!title.trim()) missingFields.push("タイトル");
        if (!content.trim()) missingFields.push("本文");
        if (!category) missingFields.push("カテゴリー");

        if (missingFields.length > 0) {
            toast.error("入力内容に不備があります", {
                description: (
                    <ul className="list-disc pl-4 mt-2">
                        {missingFields.map((field) => (
                            <li key={field}>{field}は必須です</li>
                        ))}
                    </ul>
                ),
            });
            return;
        }

        console.log("保存しました", {
            title,
            summary,
            keywords,
            content,
            category,
            project,
            group,
            tags,
            thumbnail,
        });
        toast.success("記事を保存しました！");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Toaster richColors position="top-center" />
            {/* ヘッダ */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4 max-w-7xl">
                    <div className="flex items-center">
                        <div className="flex gap-2 mx-auto">
                            <Button
                                variant={activeTab === "edit" ? "default" : "outline"}
                                onClick={() => setActiveTab("edit")}
                            >
                                記事編集
                            </Button>
                            <Button
                                variant={activeTab === "metadata" ? "default" : "outline"}
                                onClick={() => setActiveTab("metadata")}
                            >
                                メタデータ編集
                            </Button>
                            <Button
                                variant={activeTab === "preview" ? "default" : "outline"}
                                onClick={() => setActiveTab("preview")}
                            >
                                プレビュー
                            </Button>
                        </div>
                        <div className="ml-8">
                            <Button onClick={handleSave} size="default" className="bg-blue-600 hover:bg-blue-700">
                                完成/保存
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <main className="flex-1 container mx-auto px-4 py-8">
                {activeTab === "edit" && (
                    <ArticleEditor
                        title={title}
                        summary={summary}
                        keywords={keywords}
                        content={content}
                        onTitleChange={setTitle}
                        onSummaryChange={setSummary}
                        onKeywordsChange={setKeywords}
                        onContentChange={setContent}
                    />
                )}

                {activeTab === "metadata" && (
                    <MetadataEditor
                        category={category}
                        project={project}
                        group={group}
                        tags={tags}
                        thumbnail={thumbnail}
                        onCategoryChange={setCategory}
                        onProjectChange={setProject}
                        onGroupChange={setGroup}
                        onTagsChange={setTags}
                        onThumbnailChange={setThumbnail}
                    />
                )}

                {activeTab === "preview" && (
                    <Preview
                        title={title}
                        summary={summary}
                        keywords={keywords}
                        content={content}
                        category={category}
                        project={project}
                        tags={tags}
                        thumbnail={thumbnail}
                    />
                )}
            </main>
        </div>
    );
}
