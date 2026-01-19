import { useState } from "react";
import { FileEdit, Settings, Eye, Save, AlertCircle, Clock, Globe, ChevronsUpDown, Check } from "lucide-react";
import { ArticleEditor } from "@/A04_editor/components/ArticleEditor";
import { MetadataEditor } from "@/A04_editor/components/MetadataEditor";
import { Preview } from "@/A04_editor/components/Preview";
import { Toaster } from "@/P00_common/ui/sonner";
import { toast } from "sonner";
import { AdminLayout } from "@/A00_common/components/AdminLayout";
import { AdminHeader } from "@/A00_common/components/AdminHeader";
import { AdminTabGroup, AdminTab } from "@/A00_common/components/AdminTab";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminModal } from "@/A00_common/components/AdminModal";
import { Popover, PopoverContent, PopoverTrigger } from "@/P00_common/ui/popover";
import { cn } from "@/P00_common/ui/utils";
import { useAdminAuth } from "@/A00_common/hooks/useAdminAuth";

type Tab = "edit" | "metadata" | "preview";
type Status = "draft" | "published" | "scheduled" | "private";

const statusConfig: Record<Status, { label: string; color: string }> = {
    draft: { label: "下書き", color: "text-gray-500" },
    published: { label: "公開", color: "text-emerald-500" },
    scheduled: { label: "予約投稿", color: "text-amber-500" },
    private: { label: "非公開", color: "text-red-500" },
};

export default function App() {
    const { user, isAdmin, loading: authLoading } = useAdminAuth();
    const [activeTab, setActiveTab] = useState<Tab>("edit");

    // Article States
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [keywords, setKeywords] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [project, setProject] = useState("");
    const [group, setGroup] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState("");

    // Admin specific states according to design spec
    const [status, setStatus] = useState<Status>("draft");
    const [publishedAt, setPublishedAt] = useState("");

    // Modal state for validation
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [missingFields, setMissingFields] = useState<string[]>([]);

    const handleSave = () => {
        const missing: string[] = [];

        if (!title.trim()) missing.push("タイトル");
        if (!content.trim()) missing.push("本文");
        if (!category) missing.push("カテゴリー");

        if (missing.length > 0) {
            setMissingFields(missing);
            setIsAlertOpen(true);
            return;
        }

        const formData = {
            title,
            summary,
            keywords,
            content,
            category_id: category,
            project_ids: [project],
            group_creator_id: group,
            tag_ids: tags,
            status,
            published_at: publishedAt || null,
            thumbnail_url: thumbnail,
        };

        console.log("Saving article data:", formData);
        toast.success("記事を保存しました！");
    };

    if (authLoading) return null;

    // A04: published_at or status change is only allowed for Admin.
    // However, status selection is ALREADY disabled if publishedAt is set.
    // Now we add role-based restriction.
    const canChangePublishSettings = isAdmin;

    return (
        <AdminLayout>
            <Toaster richColors position="top-center" />

            <AdminHeader
                icon={<FileEdit className="w-6 h-6" />}
                title="記事エディター"
                subtitle="Article Editor Terminal"
                userInfo={user}
                rightElement={
                    <>
                        <div className={cn(
                            "flex flex-col sm:flex-row sm:items-center gap-3 bg-gray-50 border border-emerald-100/30 rounded-3xl px-4 py-2 transition-all",
                            canChangePublishSettings && "focus-within:ring-4 focus-within:ring-emerald-500/5 hover:border-emerald-100"
                        )}>
                            {/* Status Select with Premium Styling */}
                            <Popover>
                                <PopoverTrigger asChild disabled={!canChangePublishSettings || !!publishedAt}>
                                    <button
                                        disabled={!canChangePublishSettings || !!publishedAt}
                                        className={cn(
                                            "flex items-center gap-2 hover:bg-white p-2 rounded-xl transition-colors group",
                                            (!canChangePublishSettings || !!publishedAt) && "opacity-80 cursor-not-allowed"
                                        )}
                                    >
                                        <Globe className={cn("w-3.5 h-3.5", statusConfig[status].color)} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                                            {statusConfig[status].label}
                                        </span>
                                        {canChangePublishSettings && !publishedAt && <ChevronsUpDown className="w-3 h-3 text-gray-400 group-hover:text-emerald-500" />}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-0 rounded-2xl border-gray-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                                    <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Publish Status</span>
                                    </div>
                                    <div className="p-1.5 space-y-1">
                                        {(Object.entries(statusConfig) as [Status, typeof statusConfig[Status]][]).map(([key, cfg]) => (
                                            <div
                                                key={key}
                                                className={cn(
                                                    "flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all",
                                                    status === key ? "bg-emerald-50 text-emerald-700" : "hover:bg-gray-50 text-gray-600"
                                                )}
                                                onClick={() => setStatus(key)}
                                            >
                                                <span className="text-[10px] font-bold uppercase tracking-widest">{cfg.label}</span>
                                                {status === key && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <div className="hidden sm:block w-px h-6 bg-gray-200" />
                            <div className="sm:hidden w-full h-px bg-gray-100" />

                            <div className={cn("flex items-center gap-3 px-2 py-1 group", !canChangePublishSettings && "cursor-not-allowed opacity-60")}>
                                <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                                <input
                                    type="datetime-local"
                                    value={publishedAt}
                                    disabled={!canChangePublishSettings}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setPublishedAt(val);
                                        if (val) {
                                            setStatus("scheduled");
                                        }
                                    }}
                                    className={cn(
                                        "bg-transparent border-none focus:outline-none text-[10px] font-black uppercase tracking-widest text-gray-600 w-full",
                                        canChangePublishSettings ? "cursor-pointer" : "cursor-not-allowed"
                                    )}
                                />
                            </div>
                        </div>

                        <AdminButton onClick={handleSave} icon={<Save className="w-4 h-4" />}>
                            完成/保存
                        </AdminButton>
                    </>
                }
                navElement={
                    <AdminTabGroup>
                        <AdminTab
                            label="記事編集"
                            icon={<FileEdit className="w-4 h-4" />}
                            isActive={activeTab === "edit"}
                            onClick={() => setActiveTab("edit")}
                        />
                        <AdminTab
                            label="メタデータ編集"
                            icon={<Settings className="w-4 h-4" />}
                            isActive={activeTab === "metadata"}
                            onClick={() => setActiveTab("metadata")}
                        />
                        <AdminTab
                            label="プレビュー"
                            icon={<Eye className="w-4 h-4" />}
                            isActive={activeTab === "preview"}
                            onClick={() => setActiveTab("preview")}
                        />
                    </AdminTabGroup>
                }
            />

            {/* メインコンテンツ */}
            <main className="max-w-7xl mx-auto px-6 py-8">
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

            {/* Validation Alert Modal */}
            <AdminModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                title="入力不備があります"
                subtitle="Validation Error"
                footer={
                    <AdminButton onClick={() => setIsAlertOpen(false)} className="w-full rounded-2xl">
                        確認しました
                    </AdminButton>
                }
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <div className="w-full">
                        <p className="text-gray-700 font-bold mb-4">以下の必須項目が入力されていません：</p>
                        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
                            <ul className="grid grid-cols-2 gap-2">
                                {missingFields.map((field) => (
                                    <li key={field} className="text-amber-800 font-bold text-sm flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                        {field}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </AdminModal>
        </AdminLayout>
    );
}
