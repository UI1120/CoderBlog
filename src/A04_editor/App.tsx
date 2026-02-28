import { useState, useEffect } from "react";
import { FileText, Settings, Eye, Save, Globe, BookOpen, Bell, Check, ChevronsUpDown } from "lucide-react";
import { Toaster } from "@/P00_common/ui/sonner";
import { toast } from "sonner";
import { AdminLayout } from "@/A00_common/components/AdminLayout";
import { AdminHeader } from "@/A00_common/components/AdminHeader";
import { AdminTabGroup, AdminTab } from "@/A00_common/components/AdminTab";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { useAdminAuth } from "@/A00_common/hooks/useAdminAuth";
import { CommonEditor } from "@/A04_editor/components/CommonEditor";
import { ArticleMetadataEditor } from "@/A04_editor/components/ArticleMetadataEditor";
import { WikiMetadataEditor } from "@/A04_editor/components/WikiMetadataEditor";
import { NoticeMetadataEditor } from "@/A04_editor/components/NoticeMetadataEditor";
import { Preview } from "@/A04_editor/components/Preview";
import { Popover, PopoverContent, PopoverTrigger } from "@/P00_common/ui/popover";
import { cn } from "@/P00_common/ui/utils";
import { API_BASE_URL } from "@/constants";

type EditorMode = "article" | "wiki" | "notice";
type Tab = "edit" | "metadata" | "preview";
type Status = "draft" | "published" | "scheduled" | "private" | "expired";

const statusConfig: Record<Status, { label: string; color: string }> = {
    draft: { label: "下書き", color: "text-gray-500" },
    published: { label: "公開", color: "text-emerald-500" },
    scheduled: { label: "予約投稿", color: "text-amber-500" },
    private: { label: "非公開", color: "text-red-500" },
    expired: { label: "期限切れ", color: "text-amber-600" },
};

export default function App() {
    const { user, loading: authLoading } = useAdminAuth();
    const [mode, setMode] = useState<EditorMode>("article");
    const [activeTab, setActiveTab] = useState<Tab>("edit");

    // Common States
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState<Status>("draft");
    const [publishedAt, setPublishedAt] = useState("");

    // Article Specifics
    const [summary, setSummary] = useState("");
    const [keywords, setKeywords] = useState("");
    const [project, setProject] = useState("");
    const [group, setGroup] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [thumbnail, setThumbnail] = useState("");

    // Wiki Specifics
    const [slug, setSlug] = useState("");
    const [parentPageId, setParentPageId] = useState("");
    const [wikiProjectId, setWikiProjectId] = useState("none");

    // Notice Specifics
    const [url, setUrl] = useState("");
    const [category, setCategory] = useState("お知らせ");
    const [expiresAt, setExpiresAt] = useState("");

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id");
        const urlMode = searchParams.get("mode") as EditorMode | null;

        if (urlMode && (['article', 'wiki', 'notice'] as EditorMode[]).includes(urlMode)) {
            setMode(urlMode);
            if (urlMode === 'notice') setActiveTab('metadata');
        }

        if (id) {
            const currentMode = urlMode || "article";
            const abortController = new AbortController();

            if (currentMode === "article") {
                fetch(`${API_BASE_URL}/articles/${id}`, { signal: abortController.signal })
                    .then(res => {
                        if (!res.ok) throw new Error("Failed to fetch article");
                        return res.json();
                    })
                    .then(data => {
                        setTitle(data.title || "");
                        setContent(data.content || "");
                        setStatus((data.status as Status) || "draft");
                        let pubDate = data.published_at || data.published_date || "";
                        if (pubDate && pubDate.includes("T")) pubDate = pubDate.slice(0, 16);
                        setPublishedAt(pubDate);

                        setSummary(data.summary || "");
                        setKeywords(data.keywords || "");
                        const proj = Array.isArray(data.project_ids) ? data.project_ids[0] : (data.project_id || "");
                        setProject(data.project || String(proj || ""));
                        setGroup(String(data.group_id || data.group_creator_id || ""));
                        setTags(data.tag_ids || data.tags || []);
                        setThumbnail(data.thumbnail_url || data.thumbnail || data.image || "");

                        toast.success("記事データを読み込みました", { id: 'fetch-success' });
                    })
                    .catch(e => {
                        if (e.name === 'AbortError') return;
                        console.error(e);
                        toast.error("記事の読み込みに失敗しました");
                    });
            } else if (currentMode === "notice") {
                fetch(`${API_BASE_URL}/admin/notices/${id}`, { signal: abortController.signal })
                    .then(res => {
                        if (!res.ok) throw new Error("Failed to fetch notice");
                        return res.json();
                    })
                    .then(data => {
                        setTitle(data.title || "");
                        setStatus((data.status as Status) || "draft");
                        setCategory(data.category || "お知らせ");
                        setUrl(data.url || "");
                        let expDate = data.expires_at || "";
                        if (expDate && expDate.includes("T")) expDate = expDate.slice(0, 16);
                        setExpiresAt(expDate);

                        toast.success("お知らせデータを読み込みました", { id: 'fetch-success' });
                    })
                    .catch(e => {
                        if (e.name === 'AbortError') return;
                        console.error(e);
                        toast.error("お知らせの読み込みに失敗しました");
                    });
            }

            return () => {
                abortController.abort();
            };
        }
    }, []);

    const handleSave = () => {
        // Validation logic based on mode...
        if (!title.trim()) { toast.error("タイトルを入力してください"); return; }
        if (title.length > 100) { toast.error("タイトルは100文字以内で入力してください"); return; }

        const payload: any = {
            mode,
            title,
            status,
            published_at: publishedAt || null
        };

        if (mode === "article") {
            if (!content.trim()) { toast.error("本文を入力してください"); return; }
            if (summary && summary.length > 300) { toast.error("概要は300文字以内で入力してください"); return; }
            payload.content = content;
            payload.summary = summary;
            payload.keywords = keywords;
            payload.project_id = project;
            payload.group_id = group;
            payload.tag_ids = tags;
            payload.thumbnail_url = thumbnail;
        } else if (mode === "wiki") {
            if (!content.trim()) { toast.error("本文を入力してください"); return; }
            payload.content = content;
            payload.slug = slug;
            payload.parent_page_id = parentPageId;
            payload.project_id = wikiProjectId;
        } else if (mode === "notice") {
            if (!category.trim()) { toast.error("カテゴリを入力してください"); return; }
            if (category.length > 8) { toast.error("カテゴリは8文字以内で入力してください"); return; }
            if (url) {
                if (!/^https?:\/\//.test(url) && !url.startsWith('/')) {
                    toast.error("有効なURL形式で入力してください (http://, https:// またはルート相対 /)"); return;
                }
            }
            if (publishedAt && expiresAt) {
                if (new Date(expiresAt) <= new Date(publishedAt)) {
                    toast.error("掲載終了日時は公開日時より未来に設定してください"); return;
                }
            }
            payload.url = url;
            payload.category = category;
            payload.expires_at = expiresAt || null;
        }

        console.log("Saving...", payload);

        const searchParams = new URLSearchParams(window.location.search);
        const id = searchParams.get("id");

        if (mode === "notice") {
            const method = id ? 'PUT' : 'POST';
            const endpoint = id ? `${API_BASE_URL}/admin/notices/${id}` : `${API_BASE_URL}/admin/notices`;

            fetch(endpoint, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to save notice");
                    return res.json();
                })
                .then(() => {
                    toast.success(`お知らせを${id ? '更新' : '作成'}しました`);
                    // 保存完了後に管理画面トップ（もしくは記事・コメント管理）へ遷移
                    setTimeout(() => {
                        window.location.href = "/article_management?tab=notices";
                    }, 1000);
                })
                .catch(e => {
                    console.error(e);
                    toast.error("お知らせの保存に失敗しました");
                });
        } else {
            // 他のモードの保存ロジック（未実装・または既存Mock）
            toast.success(`${mode.toUpperCase()} を保存しました`);
        }
    };

    if (authLoading) return null;
    if (!user) return null;

    return (
        <AdminLayout>
            <Toaster richColors position="top-center" />

            <AdminHeader
                icon={
                    mode === 'article' ? <FileText className="w-6 h-6" /> :
                        mode === 'wiki' ? <BookOpen className="w-6 h-6" /> :
                            <Bell className="w-6 h-6" />
                }
                title={
                    mode === 'article' ? "記事エディター" :
                        mode === 'wiki' ? "Wikiエディター" :
                            "お知らせエディター"
                }
                subtitle={`${mode.toUpperCase()} EDITOR TERMINAL`}
                userInfo={user}
                rightElement={
                    <div className="flex items-center gap-4">
                        {/* Mode Switcher */}
                        <div className="hidden md:flex bg-gray-100 p-1 rounded-xl">
                            {(['article', 'wiki', 'notice'] as EditorMode[]).map((m) => (
                                <button
                                    key={m}
                                    onClick={() => {
                                        setMode(m);
                                        if (m === 'notice') {
                                            setActiveTab('metadata');
                                        } else {
                                            setActiveTab('edit');
                                        }
                                    }}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                                        mode === m ? "bg-white text-emerald-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                    )}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>

                        <div className="h-6 w-px bg-gray-200 hidden md:block" />

                        {/* Status Select */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <button className="flex items-center gap-2 bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 p-2 rounded-xl transition-all">
                                    <Globe className={cn("w-3.5 h-3.5", statusConfig[status].color)} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                                        {statusConfig[status].label}
                                    </span>
                                    <ChevronsUpDown className="w-3 h-3 text-gray-400" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-1.5 rounded-2xl">
                                {(Object.entries(statusConfig) as [Status, typeof statusConfig[Status]][])
                                    .filter(([key]) => mode === 'notice' || key !== 'expired')
                                    .map(([key, cfg]) => (
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
                            </PopoverContent>
                        </Popover>

                        {/* Published Date Input (Optional) */}
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-transparent hover:border-gray-200 transition-all">
                            <input
                                type="datetime-local"
                                value={publishedAt}
                                onChange={(e) => setPublishedAt(e.target.value)}
                                className="bg-transparent text-[10px] font-black uppercase tracking-widest text-gray-600 focus:outline-none"
                            />
                        </div>

                        <AdminButton onClick={handleSave} icon={<Save className="w-4 h-4" />}>
                            保存
                        </AdminButton>
                    </div>
                }
                navElement={
                    <AdminTabGroup>
                        {(mode === 'notice' ? ['metadata', 'preview'] : ['edit', 'metadata', 'preview']).map(tabKey => (
                            <AdminTab
                                key={tabKey}
                                label={tabKey === 'edit' ? "本文編集" : tabKey === 'metadata' ? (mode === 'notice' ? "お知らせ編集" : "設定") : "プレビュー"}
                                icon={tabKey === 'edit' ? <FileText className="w-4 h-4" /> : tabKey === 'metadata' ? <Settings className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                isActive={activeTab === tabKey}
                                onClick={() => setActiveTab(tabKey as Tab)}
                            />
                        ))}
                    </AdminTabGroup>
                }
            />

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Notice Mode: Edit tab is hidden via navigation, but logic handles renders */}
                {(activeTab === "edit" && mode !== "notice") && (
                    <CommonEditor
                        title={title}
                        content={content}
                        onTitleChange={setTitle}
                        onContentChange={setContent}
                        summary={summary}
                        keywords={keywords}
                        onSummaryChange={setSummary}
                        onKeywordsChange={setKeywords}
                        hideSummary={mode !== 'article'}
                        hideKeywords={mode !== 'article'}
                    />
                )}

                {activeTab === "metadata" && (
                    mode === "article" ? (
                        <ArticleMetadataEditor
                            project={project}
                            group={group}
                            tags={tags}
                            thumbnail={thumbnail}
                            onProjectChange={setProject}
                            onGroupChange={setGroup}
                            onTagsChange={setTags}
                            onThumbnailChange={setThumbnail}
                        />
                    ) : mode === "wiki" ? (
                        <WikiMetadataEditor
                            slug={slug}
                            parentPageId={parentPageId}
                            projectId={wikiProjectId}
                            onSlugChange={setSlug}
                            onParentPageChange={setParentPageId}
                            onProjectChange={setWikiProjectId}
                        />
                    ) : (
                        <NoticeMetadataEditor
                            title={title}
                            category={category}
                            url={url}
                            expiresAt={expiresAt}
                            onTitleChange={setTitle}
                            onCategoryChange={setCategory}
                            onUrlChange={setUrl}
                            onExpiresAtChange={setExpiresAt}
                        />
                    )
                )}

                {activeTab === "preview" && (
                    <Preview
                        title={title}
                        summary={summary}
                        content={content}
                        project={project}
                        tags={tags}
                        thumbnail={thumbnail}
                        typeLabel={`${mode.toUpperCase()} PREVIEW`}
                        category={category}
                        url={url}
                    />
                )}
            </main>
        </AdminLayout>
    );
}
