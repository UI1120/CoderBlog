import { useState, useEffect, useCallback } from "react";
import {
    FileText,
    MessageSquare,
    Plus,
    Search,
    Filter,
    LayoutGrid,
    AlertTriangle,
    Trash2
} from "lucide-react";
import { API_BASE_URL } from "@/constants";
import { AdminLayout } from "@/A00_common/components/AdminLayout";
import { AdminHeader } from "@/A00_common/components/AdminHeader";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminTabGroup, AdminTab } from "@/A00_common/components/AdminTab";
import { AdminSelect } from "@/A00_common/components/AdminSelect";
import { AdminModal } from "@/A00_common/components/AdminModal";
import { useAdminAuth } from "@/A00_common/hooks/useAdminAuth";
import { ArticleTable } from "./components/ArticleTable";
import { CommentTable } from "./components/CommentTable";

export default function App() {
    const { user, isAdmin, loading: authLoading } = useAdminAuth();
    const [activeTab, setActiveTab] = useState<'article' | 'comment'>('article');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [writerFilter, setWriterFilter] = useState("all");

    const [articles, setArticles] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [writers, setWriters] = useState<any[]>([]);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ type: 'article' | 'comment', data: any } | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            if (activeTab === 'article') {
                const params = new URLSearchParams({
                    keyword: searchTerm,
                    status: statusFilter,
                    category_id: categoryFilter,
                    writer_id: writerFilter
                });
                const res = await fetch(`${API_BASE_URL}/admin/articles?${params.toString()}`);
                const data = await res.json();
                setArticles(data.articles || []);
            } else {
                const params = new URLSearchParams({
                    keyword: searchTerm,
                    status: statusFilter
                });
                const res = await fetch(`${API_BASE_URL}/admin/comments?${params.toString()}`);
                const data = await res.json();
                setComments(data.comments || []);
            }

            // Fetch Meta data for filters if not loaded
            if (categories.length === 0) {
                const catRes = await fetch(`${API_BASE_URL}/admin/categories`);
                const catData = await catRes.json();
                setCategories(catData.categories || []);
            }
            if (writers.length === 0) {
                const writerRes = await fetch(`${API_BASE_URL}/admin/creators`);
                const writerData = await writerRes.json();
                setWriters((writerData.creators || []).filter((c: any) => c.creator_type === 'individual'));
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    }, [activeTab, searchTerm, statusFilter, categoryFilter, writerFilter, categories.length, writers.length]);

    useEffect(() => {
        if (!authLoading) {
            fetchData();
        }
    }, [authLoading, fetchData]);

    const handleStatusChange = async (type: 'article' | 'comment', id: number, newStatus: string) => {
        try {
            const endpoint = type === 'article'
                ? `${API_BASE_URL}/admin/articles/${id}/status`
                : `${API_BASE_URL}/admin/comments/${id}/status`;

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });

            if (res.ok) {
                fetchData();
            }
        } catch (error) {
            console.error(`Failed to update ${type} status:`, error);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            const { type, data } = deleteTarget;
            const id = type === 'article' ? data.article_id : data.comment_id;
            const endpoint = type === 'article'
                ? `${API_BASE_URL}/admin/articles/${id}`
                : `${API_BASE_URL}/admin/comments/${id}`;

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete" })
            });

            if (res.ok) {
                setIsDeleteModalOpen(false);
                setDeleteTarget(null);
                fetchData();
            }
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const confirmDelete = (type: 'article' | 'comment', data: any) => {
        setDeleteTarget({ type, data });
        setIsDeleteModalOpen(true);
    };

    if (authLoading) return null;

    return (
        <AdminLayout>
            <AdminHeader
                icon={activeTab === 'article' ? <FileText className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                title={activeTab === 'article' ? "記事管理" : "コメント管理"}
                subtitle={activeTab === 'article' ? "Content Management & Publishing" : "Community Interaction Control"}
                userInfo={user}
                rightElement={
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors w-4 h-4" />
                            <input
                                type="text"
                                placeholder="検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-100 border border-transparent focus:bg-white focus:border-emerald-200 rounded-full py-2 pl-10 pr-4 w-60 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm placeholder-gray-400 font-sans"
                            />
                        </div>
                        {activeTab === 'article' && (
                            <AdminButton onClick={() => window.location.href = '/editor'} icon={<Plus className="w-4 h-4" />}>
                                新規記事
                            </AdminButton>
                        )}
                    </div>
                }
                navElement={
                    <AdminTabGroup>
                        <AdminTab
                            label="記事一覧"
                            icon={<FileText className="w-4 h-4" />}
                            isActive={activeTab === 'article'}
                            onClick={() => {
                                setActiveTab('article');
                                setStatusFilter('all');
                            }}
                        />
                        <AdminTab
                            label="コメント"
                            icon={<MessageSquare className="w-4 h-4" />}
                            isActive={activeTab === 'comment'}
                            onClick={() => {
                                setActiveTab('comment');
                                setStatusFilter('pending'); // Default to pending for comments
                            }}
                        />
                    </AdminTabGroup>
                }
            />

            <main className="max-w-7xl mx-auto px-6 py-8 pb-32">
                {/* Filters Row */}
                <div className="flex flex-wrap items-center gap-4 mb-8 bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-400 mr-2">
                        <Filter className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-widest italic">Filters</span>
                    </div>

                    <AdminSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={activeTab === 'article' ? [
                            { value: 'all', label: '全てのステータス' },
                            { value: 'published', label: '公開中' },
                            { value: 'draft', label: '下書き' },
                            { value: 'scheduled', label: '予約中' },
                            { value: 'private', label: '非公開' },
                        ] : [
                            { value: 'all', label: '全ての状態' },
                            { value: 'pending', label: '承認待ち' },
                            { value: 'approved', label: '承認済み' },
                            { value: 'rejected', label: '却下' },
                        ]}
                        className="w-44"
                    />

                    {activeTab === 'article' && (
                        <>
                            <AdminSelect
                                value={categoryFilter}
                                onChange={setCategoryFilter}
                                options={[
                                    { value: 'all', label: '全てのカテゴリ' },
                                    ...categories.map(c => ({ value: String(c.category_id), label: c.category_name }))
                                ]}
                                className="w-44"
                            />
                            <AdminSelect
                                value={writerFilter}
                                onChange={setWriterFilter}
                                options={[
                                    { value: 'all', label: '全ての執筆者' },
                                    ...writers.map(w => ({ value: String(w.creator_id), label: w.display_name }))
                                ]}
                                className="w-44"
                            />
                        </>
                    )}

                    <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                        <LayoutGrid className="w-3.5 h-3.5" />
                        SHOWING {activeTab === 'article' ? articles.length : comments.length} ITEMS
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                        <p className="text-sm text-gray-400 font-bold tracking-widest animate-pulse">LOADING SYSTEM DATA...</p>
                    </div>
                ) : activeTab === 'article' ? (
                    <ArticleTable
                        articles={articles}
                        onEdit={(a) => window.location.href = `/editor?id=${a.article_id}`}
                        onChangeStatus={(a, s) => handleStatusChange('article', a.article_id, s)}
                        onDelete={(a) => confirmDelete('article', a)}
                        isAdmin={isAdmin}
                    />
                ) : (
                    <CommentTable
                        comments={comments}
                        onStatusChange={(c, s) => handleStatusChange('comment', c.comment_id, s)}
                        onDelete={(c) => confirmDelete('comment', c)}
                        isAdmin={isAdmin}
                    />
                )}
            </main>

            {/* Delete Confirmation Modal */}
            <AdminModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title={deleteTarget?.type === 'article' ? "記事の削除" : "コメントの削除"}
                subtitle="DANGEROUS ACTION"
                footer={
                    <>
                        <AdminButton variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-2xl">
                            キャンセル
                        </AdminButton>
                        <AdminButton variant="danger" onClick={handleDelete} className="flex-1 rounded-2xl" icon={<Trash2 className="w-4 h-4" />}>
                            削除する
                        </AdminButton>
                    </>
                }
            >
                <div className="flex flex-col items-center text-center space-y-4 py-4">
                    <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-700 font-bold">本当にこのアイテムを削除しますか？</p>
                        <p className="text-gray-400 text-sm mt-1">この操作は取り消せません。</p>
                        <div className="mt-6 px-4 py-3 bg-gray-50 rounded-2xl w-full">
                            <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">対象内容</p>
                            <p className="text-sm font-bold text-gray-600 line-clamp-2 italic">
                                "{deleteTarget?.type === 'article' ? deleteTarget.data.title : deleteTarget?.data.content}"
                            </p>
                        </div>
                    </div>
                </div>
            </AdminModal>
        </AdminLayout>
    );
}
