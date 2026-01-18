import { useState, useEffect } from "react";
import {
    FolderTree,
    Tag as TagIcon,
    Rocket,
    Plus,
    Edit2,
    Trash2,
    Save,
    Search,
    AlertTriangle,
    Lock
} from "lucide-react";
import { API_BASE_URL } from "@/constants";
import { AdminLayout } from "@/A00_common/components/AdminLayout";
import { AdminHeader } from "@/A00_common/components/AdminHeader";
import { AdminTabGroup, AdminTab } from "@/A00_common/components/AdminTab";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminModal } from "@/A00_common/components/AdminModal";
import { useAdminAuth } from "@/A00_common/hooks/useAdminAuth";

type ResourceType = "categories" | "tags" | "projects";

export default function App() {
    const { user, isAdmin, loading: authLoading } = useAdminAuth();
    const [activeTab, setActiveTab] = useState<ResourceType>("categories");
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modals state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [itemToDelete, setItemToDelete] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});

    // Fetch data
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/admin/${activeTab}`);
            const data = await response.json();
            setItems(data[activeTab] || []);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            fetchData();
        }
    }, [activeTab, authLoading]);

    const handleOpenModal = (item: any = null) => {
        if (!isAdmin) return; // Guard for extra safety
        setEditingItem(item);
        if (item) {
            setFormData({ ...item });
        } else {
            setFormData(activeTab === "projects" ? { project_name: "", description: "" } :
                activeTab === "categories" ? { category_name: "" } : { tag_name: "" });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdmin) return;

        const isUpdate = !!editingItem;
        const idField = activeTab === "projects" ? "project_id" :
            activeTab === "categories" ? "category_id" : "tag_id";

        const url = isUpdate
            ? `${API_BASE_URL}/admin/${activeTab}/${editingItem[idField]}`
            : `${API_BASE_URL}/admin/${activeTab}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchData();
                handleCloseModal();
            }
        } catch (error) {
            console.error("Failed to save item:", error);
        }
    };

    const handleConfirmDelete = (item: any) => {
        if (!isAdmin) return;
        setItemToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!itemToDelete || !isAdmin) return;
        const idField = activeTab === "projects" ? "project_id" :
            activeTab === "categories" ? "category_id" : "tag_id";
        const id = itemToDelete[idField];

        try {
            const response = await fetch(`${API_BASE_URL}/admin/${activeTab}/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete" })
            });

            if (response.ok) {
                fetchData();
                setIsDeleteModalOpen(false);
                setItemToDelete(null);
            }
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const filteredItems = items.filter(item => {
        const name = item.category_name || item.tag_name || item.project_name || "";
        return name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const tabConfig = [
        { id: "categories", label: "カテゴリー", icon: FolderTree },
        { id: "tags", label: "タグ", icon: TagIcon },
        { id: "projects", label: "プロジェクト", icon: Rocket },
    ];

    const getResourceLabel = () => {
        return activeTab === "projects" ? "プロジェクト" : activeTab === "categories" ? "カテゴリー" : "タグ";
    };

    if (authLoading) return null;

    return (
        <AdminLayout>
            <AdminHeader
                icon={<FolderTree className="w-6 h-6" />}
                title="分類・マスタ管理"
                subtitle="Management System"
                userInfo={user}
                rightElement={
                    <>
                        <div className="relative group text-sans">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors w-4 h-4" />
                            <input
                                type="text"
                                placeholder="検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-100 border border-transparent focus:bg-white focus:border-emerald-200 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm placeholder-gray-400 font-sans"
                            />
                        </div>
                        {isAdmin && (
                            <AdminButton onClick={() => handleOpenModal()} icon={<Plus className="w-4 h-4" />}>
                                新規追加
                            </AdminButton>
                        )}
                    </>
                }
                navElement={
                    <AdminTabGroup>
                        {tabConfig.map((tab) => (
                            <AdminTab
                                key={tab.id}
                                label={tab.label}
                                icon={<tab.icon className="w-4 h-4" />}
                                isActive={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id as ResourceType)}
                            />
                        ))}
                    </AdminTabGroup>
                }
            />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <main>
                    {!isAdmin && (
                        <div className="mb-8 bg-emerald-600/5 border border-emerald-600/10 rounded-[2rem] p-8 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">ReadOnly Mode</h2>
                                    <p className="text-xs font-bold text-emerald-600/80 uppercase tracking-widest mt-1">
                                        You have view-only access. Actions are restricted to administrators.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <AdminCard>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-sans">
                                <thead>
                                    <tr className="border-b border-gray-50 bg-gray-50/50">
                                        <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black">ID</th>
                                        <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black">
                                            {activeTab === "projects" ? "プロジェクト名" :
                                                activeTab === "categories" ? "カテゴリー名" : "タグ名"}
                                        </th>
                                        {activeTab === "projects" && (
                                            <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black">説明</th>
                                        )}
                                        {isAdmin && (
                                            <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black text-right">アクション</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={isAdmin ? 4 : 3} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Loading Data...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredItems.length > 0 ? (
                                        filteredItems.map((item) => {
                                            const id = item.category_id || item.tag_id || item.project_id;
                                            const name = item.category_name || item.tag_name || item.project_name;
                                            return (
                                                <tr key={id} className="group hover:bg-emerald-50/30 transition-colors">
                                                    <td className="px-8 py-6 font-mono text-emerald-600/60 text-sm">#{id}</td>
                                                    <td className="px-8 py-6 font-bold text-gray-700">{name}</td>
                                                    {activeTab === "projects" && (
                                                        <td className="px-8 py-6 text-gray-500 text-sm max-w-2xl truncate">{item.description}</td>
                                                    )}
                                                    {isAdmin && (
                                                        <td className="px-8 py-6 text-right">
                                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => handleOpenModal(item)}
                                                                    className="p-2.5 bg-white border border-gray-100 hover:border-emerald-200 text-emerald-500 rounded-xl transition-all shadow-sm"
                                                                    title="編集"
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleConfirmDelete(item)}
                                                                    className="p-2.5 bg-white border border-gray-100 hover:border-red-200 text-red-500 rounded-xl transition-all shadow-sm"
                                                                    title="削除"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={isAdmin ? 4 : 3} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                                データが見つかりません
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </AdminCard>
                </main>
            </div>

            {isAdmin && (
                <>
                    {/* Editor Modal */}
                    <AdminModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        title={editingItem ? "アイテムを編集" : "新規アイテム追加"}
                        subtitle="Database Entry System"
                        footer={
                            <>
                                <AdminButton type="button" variant="ghost" onClick={handleCloseModal} className="flex-1 rounded-2xl shadow-none">
                                    キャンセル
                                </AdminButton>
                                <AdminButton type="submit" form="master-form" icon={<Save className="w-4 h-4" />} className="flex-1 rounded-2xl">
                                    保存する
                                </AdminButton>
                            </>
                        }
                    >
                        <form id="master-form" onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black mb-3 pl-1">名称</label>
                                <input
                                    type="text"
                                    required
                                    value={activeTab === "projects" ? formData.project_name :
                                        activeTab === "categories" ? formData.category_name : formData.tag_name}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        [activeTab === "projects" ? "project_name" :
                                            activeTab === "categories" ? "category_name" : "tag_name"]: e.target.value
                                    })}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 font-sans"
                                    placeholder="名称を入力してください"
                                />
                            </div>

                            {activeTab === "projects" && (
                                <div>
                                    <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black mb-3 pl-1">説明文</label>
                                    <textarea
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={4}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all resize-none text-gray-700 font-sans"
                                        placeholder="プロジェクトの詳細を入力してください"
                                    />
                                </div>
                            )}
                        </form>
                    </AdminModal>

                    {/* Delete Confirmation Modal */}
                    <AdminModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        title="削除の確認"
                        subtitle="Dangerous Action Warning"
                        footer={
                            <>
                                <AdminButton type="button" variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-2xl shadow-none">
                                    やめる
                                </AdminButton>
                                <AdminButton type="button" variant="danger" onClick={handleDelete} icon={<Trash2 className="w-4 h-4" />} className="flex-1 rounded-2xl">
                                    削除する
                                </AdminButton>
                            </>
                        }
                    >
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                <AlertTriangle className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-gray-700 font-bold">本当にこの{getResourceLabel()}を削除しますか？</p>
                                <p className="text-gray-400 text-sm mt-1">
                                    名称: <span className="text-red-500 font-mono">
                                        {itemToDelete?.category_name || itemToDelete?.tag_name || itemToDelete?.project_name}
                                    </span>
                                </p>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-6">
                                    This action cannot be undone. System records will be updated immediately.
                                </p>
                            </div>
                        </div>
                    </AdminModal>
                </>
            )}
        </AdminLayout>
    );
}
