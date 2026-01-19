import { useState, useEffect } from "react";
import {
    Users,
    UserPlus,
    Mail,
    Clock,
    Search,
    Lock,
    Trash2,
    Save,
    AlertTriangle,
} from "lucide-react";
import { API_BASE_URL } from "@/constants";
import { AdminLayout } from "@/A00_common/components/AdminLayout";
import { AdminHeader } from "@/A00_common/components/AdminHeader";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminSelect } from "@/A00_common/components/AdminSelect";
import { useAdminAuth } from "@/A00_common/hooks/useAdminAuth";
import { AdminModal } from "@/A00_common/components/AdminModal";
import { cn } from "@/P00_common/ui/utils";

export default function App() {
    const { user, isAdmin, loading: authLoading } = useAdminAuth();
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // For creation only (since modal for editing is abolished, but we still need a way to add new ones?)
    // Actually, "アカウント は 必ず1つのクリエイター を作成することにします" 
    // suggests creation might be unified. But let's keep a simplified creation modal for now or follow the "abolish" strictly.
    // If I follow "abolish modal" strictly for everything, creation must be inline or on a new page.
    // However, usually "abolish modal" refers to the editing flow in this context.
    // Let's keep a minimal creation modal for now, or just remove it if the user insists.
    // The user said "アカウントでは ... モーダルは廃止してください". 
    // I will remove the edit modal and keep a simple creation form if needed, 
    // but the user also said "個人の方は 現在の クリエイター編集モーダルと アカウント編集モーダルを統合して モーダル無しに表示してください" in A06.
    // This strongly suggests creation/full editing happens in A06.

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState<any>(null);
    const [newAccountData, setNewAccountData] = useState({ login_name: "", email: "", password: "", role: "user" });

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/admin/accounts`);
            const data = await response.json();
            setAccounts(data.accounts || []);
        } catch (error) {
            console.error("Failed to fetch accounts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            fetchData();
        }
    }, [authLoading]);

    const handleUpdateField = async (accountId: number, field: string, value: any) => {
        if (!isAdmin) return;
        try {
            const response = await fetch(`${API_BASE_URL}/admin/accounts/${accountId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [field]: value }),
            });
            if (response.ok) {
                setAccounts(accounts.map(acc => acc.account_id === accountId ? { ...acc, [field]: value } : acc));
            }
        } catch (error) {
            console.error("Failed to update account:", error);
        }
    };

    const handleConfirmDeleteAccount = (account: any) => {
        if (!isAdmin) return;
        setAccountToDelete(account);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteAccount = async () => {
        if (!accountToDelete || !isAdmin) return;

        try {
            const response = await fetch(`${API_BASE_URL}/admin/accounts/${accountToDelete.account_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete" }),
            });
            if (response.ok) {
                fetchData();
                setIsDeleteModalOpen(false);
                setAccountToDelete(null);
            }
        } catch (error) {
            console.error("Failed to delete account:", error);
        }
    };

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/admin/accounts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAccountData),
            });
            if (response.ok) {
                fetchData();
                setIsCreateModalOpen(false);
                setNewAccountData({ login_name: "", email: "", password: "", role: "user" });
            }
        } catch (error) {
            console.error("Failed to create account:", error);
        }
    };

    const filteredAccounts = accounts.filter(acc =>
        acc.login_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        acc.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (authLoading) return null;

    return (
        <AdminLayout>
            <AdminHeader
                icon={<Users className="w-6 h-6" />}
                title="アカウント管理"
                subtitle="Identity & Access Management"
                userInfo={user}
                rightElement={
                    <>
                        <div className="relative group text-sans">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors w-4 h-4" />
                            <input
                                type="text"
                                placeholder="ユーザー検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-100 border border-transparent focus:bg-white focus:border-emerald-200 rounded-full py-2 pl-10 pr-4 w-full sm:w-64 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm placeholder-gray-400 font-sans"
                            />
                        </div>
                        {isAdmin && (
                            <AdminButton onClick={() => setIsCreateModalOpen(true)} icon={<UserPlus className="w-4 h-4" />}>
                                新規登録
                            </AdminButton>
                        )}
                    </>
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
                                    <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">Security Restriction</h2>
                                    <p className="text-xs font-bold text-emerald-600/80 uppercase tracking-widest mt-1">
                                        System permissions are required to manage accounts.
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
                                        <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black">User</th>
                                        <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black w-48">Role</th>
                                        <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black w-48">Status</th>
                                        <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black">Last Login</th>
                                        {isAdmin && (
                                            <th className="px-8 py-5 text-gray-400 uppercase tracking-widest text-[10px] font-black text-right">Actions</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={isAdmin ? 5 : 4} className="px-8 py-20 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
                                                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Verifying Records...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredAccounts.length > 0 ? (
                                        filteredAccounts.map((acc) => (
                                            <tr key={acc.account_id} className="group hover:bg-emerald-50/30 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 border border-emerald-100/50 overflow-hidden flex-shrink-0">
                                                            {acc.icon_path ? (
                                                                <img src={acc.icon_path} alt={acc.login_name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-emerald-600/30">
                                                                    <Users className="w-5 h-5" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-700">{acc.login_name}</p>
                                                            <p className="text-xs text-gray-400 flex items-center gap-1"><Mail className="w-3 h-3" /> {acc.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-sans">
                                                    {isAdmin ? (
                                                        <AdminSelect
                                                            value={acc.role}
                                                            onChange={(val) => handleUpdateField(acc.account_id, "role", val)}
                                                            options={[
                                                                { label: "ADMIN", value: "admin" },
                                                                { label: "USER", value: "user" }
                                                            ]}
                                                            className={cn(
                                                                "w-32 py-1.5 h-auto text-[10px] border-transparent",
                                                                acc.role === 'admin' ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100/50" : "bg-cyan-50 text-cyan-700 hover:bg-cyan-100/50"
                                                            )}
                                                            title="Role Management"
                                                        />
                                                    ) : (
                                                        <span className={cn(
                                                            "text-[10px] font-black uppercase px-3 py-1.5 rounded-lg inline-block",
                                                            acc.role === 'admin' ? "bg-indigo-50 text-indigo-700" : "bg-cyan-50 text-cyan-700"
                                                        )}>
                                                            {acc.role}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6 text-sans">
                                                    {isAdmin ? (
                                                        <AdminSelect
                                                            value={acc.status}
                                                            onChange={(val) => handleUpdateField(acc.account_id, "status", val)}
                                                            options={[
                                                                { label: "ACTIVE", value: "active" },
                                                                { label: "BANNED", value: "banned" }
                                                            ]}
                                                            className={cn(
                                                                "w-32 py-1.5 h-auto text-[10px] border-transparent",
                                                                acc.status === 'active' ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100/50" : "bg-red-50 text-red-700 hover:bg-red-100/50"
                                                            )}
                                                            title="Status Management"
                                                        />
                                                    ) : (
                                                        <span className={cn(
                                                            "text-[10px] font-black uppercase px-3 py-1.5 rounded-lg inline-block",
                                                            acc.status === 'active' ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                                                        )}>
                                                            {acc.status}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                                                        <Clock className="w-3 h-3" />
                                                        {acc.last_login_at ? new Date(acc.last_login_at).toLocaleString() : 'Never'}
                                                    </div>
                                                </td>
                                                {isAdmin && (
                                                    <td className="px-8 py-6 text-right">
                                                        <button
                                                            onClick={() => handleConfirmDeleteAccount(acc)}
                                                            className="p-2.5 bg-white border border-gray-100 hover:border-red-200 text-red-500 rounded-xl transition-all shadow-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                                                            title="Delete Account"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={isAdmin ? 5 : 4} className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                                No matches found in database
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
                    <AdminModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        title="新規アカウント登録"
                        subtitle="Create new authentication record"
                        footer={
                            <>
                                <AdminButton type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="flex-1 rounded-2xl shadow-none">
                                    キャンセル
                                </AdminButton>
                                <AdminButton type="submit" form="create-account-form" icon={<Save className="w-4 h-4" />} className="flex-1 rounded-2xl">
                                    登録する
                                </AdminButton>
                            </>
                        }
                    >
                        <form id="create-account-form" onSubmit={handleCreateAccount} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black mb-2 pl-1">ログインID</label>
                                    <input
                                        type="text"
                                        required
                                        value={newAccountData.login_name}
                                        onChange={(e) => setNewAccountData({ ...newAccountData, login_name: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700"
                                        placeholder="ユーザーIDを入力"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black mb-2 pl-1">メールアドレス</label>
                                    <input
                                        type="email"
                                        required
                                        value={newAccountData.email}
                                        onChange={(e) => setNewAccountData({ ...newAccountData, email: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700"
                                        placeholder="example@opucoder.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black mb-2 pl-1">パスワード</label>
                                    <input
                                        type="password"
                                        required
                                        value={newAccountData.password}
                                        onChange={(e) => setNewAccountData({ ...newAccountData, password: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black mb-2 pl-1">ロール</label>
                                    <AdminSelect
                                        value={newAccountData.role}
                                        onChange={(val) => setNewAccountData({ ...newAccountData, role: val })}
                                        options={[
                                            { label: "ADMIN", value: "admin" },
                                            { label: "USER", value: "user" }
                                        ]}
                                        placeholder="ロールを選択"
                                    />
                                </div>
                            </div>
                        </form>
                    </AdminModal>

                    {/* Delete Confirmation Modal */}
                    <AdminModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        title="アカウント削除の確認"
                        subtitle="Dangerous Action Warning"
                        footer={
                            <>
                                <AdminButton type="button" variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-2xl shadow-none">
                                    やめる
                                </AdminButton>
                                <AdminButton type="button" variant="danger" onClick={handleDeleteAccount} icon={<Trash2 className="w-4 h-4" />} className="flex-1 rounded-2xl">
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
                                <p className="text-gray-700 font-bold">本当にこのアカウントを削除しますか？</p>
                                <p className="text-red-500 text-xs font-black uppercase tracking-widest mt-2 px-4 py-2 bg-red-50 rounded-xl inline-block">
                                    ※ 紐付いているクリエイター情報も完全に削除されます
                                </p>
                                <p className="text-gray-400 text-sm mt-4">
                                    対象: <span className="text-gray-800 font-mono font-bold">
                                        {accountToDelete?.login_name} ({accountToDelete?.email})
                                    </span>
                                </p>
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-6 italic">
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
