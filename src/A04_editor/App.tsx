import { useState } from "react";
import { Button } from "@/P00_common/ui/button";
import { ArticleEditor } from "@/A04_editor/components/ArticleEditor";
import { MetadataEditor } from "@/A04_editor/components/MetadataEditor";
import { Preview } from "@/A04_editor/components/Preview";

type Tab = "edit" | "metadata" | "preview";

export default function App() {
    const [activeTab, setActiveTab] = useState<Tab>("edit");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [keywords, setKeywords] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [project, setProject] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState("");

    const handleSave = () => {
        console.log("保存しました", {
            title,
            summary,
            keywords,
            content,
            category,
            project,
            tags,
            thumbnail,
        });
        alert("記事を保存しました！");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* ヘッダ */}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex gap-2 justify-center">
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
                        onSave={handleSave}
                    />
                )}

                {activeTab === "metadata" && (
                    <MetadataEditor
                        category={category}
                        project={project}
                        tags={tags}
                        thumbnail={thumbnail}
                        onCategoryChange={setCategory}
                        onProjectChange={setProject}
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
