import { useState, useEffect } from "react";
import {
    UserCircle2,
    Users,
    Plus,
    Search,
} from "lucide-react";
import { API_BASE_URL } from "@/constants";
import { AdminLayout } from "@/A00_common/components/AdminLayout";
import { AdminHeader } from "@/A00_common/components/AdminHeader";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminTabGroup, AdminTab } from "@/A00_common/components/AdminTab";
import { useAdminAuth } from "@/A00_common/hooks/useAdminAuth";
import { IndividualEditor } from "./components/IndividualEditor";
import { GroupManager } from "./components/GroupManager";

export default function App() {
    const { user, isAdmin, loading: authLoading } = useAdminAuth();
    const [creators, setCreators] = useState<any[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');

    // Individual view state
    const [selectedIndividual, setSelectedIndividual] = useState<any>(null);
    const [individualFormData, setIndividualFormData] = useState<any>({});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Group state
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<any>(null);
    const [groupToDelete, setGroupToDelete] = useState<any>(null);
    const [groupFormData, setGroupFormData] = useState<any>({});

    const fetchData = async () => {
        setLoading(true);
        try {
            const creRes = await fetch(`${API_BASE_URL}/admin/creators`);
            const creData = await creRes.json();
            const allCreators = creData.creators || [];
            setCreators(allCreators);

            const accRes = await fetch(`${API_BASE_URL}/admin/accounts`);
            const accData = await accRes.json();
            const allAccounts = accData.accounts || [];
            setAccounts(allAccounts);

            // Refresh selection
            if (activeTab === 'individual') {
                if (selectedIndividual) {
                    const refreshed = allCreators.find((c: any) => c.creator_id === selectedIndividual.creator_id);
                    if (refreshed) {
                        handleSelectIndividual(refreshed, allAccounts);
                    }
                } else if (allCreators.length > 0) {
                    const myProfile = allCreators.find((c: any) => c.account_id === user?.id && c.creator_type === 'individual');
                    if (myProfile) {
                        handleSelectIndividual(myProfile, allAccounts);
                    } else {
                        const firstIndiv = allCreators.find((c: any) => c.creator_type === 'individual');
                        if (firstIndiv) handleSelectIndividual(firstIndiv, allAccounts);
                    }
                }
            }
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
    }, [authLoading, activeTab]);

    const handleSelectIndividual = (creator: any, allAcc: any[] = accounts) => {
        if (!creator) return;
        const linkedAcc = allAcc.find(acc => acc.account_id === creator.account_id);
        setSelectedIndividual(creator);
        setIndividualFormData({
            ...creator,
            login_name: linkedAcc?.login_name || "",
            email: linkedAcc?.email || "",
            role: linkedAcc?.role || "user",
            status: linkedAcc?.status || "active",
            password: ""
        });
        setConfirmPassword("");
        setPasswordError("");
    };

    const handleIndividualSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdmin && selectedIndividual?.account_id !== user?.id) return;

        if (individualFormData.password || confirmPassword) {
            if (individualFormData.password !== confirmPassword) {
                setPasswordError("パスワードが一致しません");
                return;
            }
        }

        try {
            const response = await fetch(`${API_BASE_URL}/admin/creators/${selectedIndividual.creator_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(individualFormData),
            });

            if (response.ok) {
                alert("プロフィール情報を保存しました");
                setPasswordError("");
                setConfirmPassword("");
                fetchData();
            }
        } catch (error) {
            console.error("Failed to save individual profile:", error);
        }
    };

    const handleGroupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = editingGroup
            ? `${API_BASE_URL}/admin/creators/${editingGroup.creator_id}`
            : `${API_BASE_URL}/admin/creators`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(groupFormData),
            });

            if (response.ok) {
                fetchData();
                setIsGroupModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to save group:", error);
        }
    };

    const handleDeleteGroup = async () => {
        if (!groupToDelete || !isAdmin) return;
        try {
            const response = await fetch(`${API_BASE_URL}/admin/creators/${groupToDelete.creator_id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "delete" })
            });

            if (response.ok) {
                fetchData();
                setIsDeleteModalOpen(false);
                setGroupToDelete(null);
            }
        } catch (error) {
            console.error("Failed to delete group:", error);
        }
    };

    const handleIconUpload = (e: React.ChangeEvent<HTMLInputElement>, isGroup: boolean) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                if (isGroup) {
                    setGroupFormData({ ...groupFormData, icon_path: result });
                } else {
                    setIndividualFormData({ ...individualFormData, icon_path: result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    if (authLoading) return null;

    return (
        <AdminLayout>
            <AdminHeader
                icon={activeTab === 'individual' ? <UserCircle2 className="w-6 h-6" /> : <Users className="w-6 h-6" />}
                title="クリエイター管理"
                subtitle={activeTab === 'individual' ? "Identity & Profile Integration" : "Group Collaboration"}
                userInfo={user}
                rightElement={
                    <div className="flex items-center gap-4">
                        <div className="relative group text-sans">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors w-4 h-4" />
                            <input
                                type="text"
                                placeholder="検索..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-100 border border-transparent focus:bg-white focus:border-emerald-200 rounded-full py-2 pl-10 pr-4 w-60 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all text-sm placeholder-gray-400 font-sans"
                            />
                        </div>
                        {isAdmin && activeTab === 'group' && (
                            <AdminButton onClick={() => {
                                setEditingGroup(null);
                                setGroupFormData({ display_name: "", profile: "", creator_type: "group", icon_path: "", members: [] });
                                setIsGroupModalOpen(true);
                            }} icon={<Plus className="w-4 h-4" />}>
                                新規グループ
                            </AdminButton>
                        )}
                    </div>
                }
                navElement={
                    <AdminTabGroup>
                        <AdminTab
                            label="個人プロフ"
                            icon={<UserCircle2 className="w-4 h-4" />}
                            isActive={activeTab === 'individual'}
                            onClick={() => setActiveTab('individual')}
                        />
                        <AdminTab
                            label="グループ"
                            icon={<Users className="w-4 h-4" />}
                            isActive={activeTab === 'group'}
                            onClick={() => setActiveTab('group')}
                        />
                    </AdminTabGroup>
                }
            />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {activeTab === 'individual' ? (
                    <IndividualEditor
                        creators={creators}
                        accounts={accounts}
                        selectedIndividual={selectedIndividual}
                        individualFormData={individualFormData}
                        confirmPassword={confirmPassword}
                        passwordError={passwordError}
                        isAdmin={isAdmin}
                        user={user}
                        onSelect={handleSelectIndividual}
                        onSubmit={handleIndividualSubmit}
                        onFormChange={setIndividualFormData}
                        onConfirmPasswordChange={setConfirmPassword}
                        onIconUpload={(e) => handleIconUpload(e, false)}
                        searchTerm={searchTerm}
                    />
                ) : (
                    <GroupManager
                        creators={creators}
                        isAdmin={isAdmin}
                        user={user}
                        searchTerm={searchTerm}
                        loading={loading}
                        isGroupModalOpen={isGroupModalOpen}
                        setIsGroupModalOpen={setIsGroupModalOpen}
                        isDeleteModalOpen={isDeleteModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        editingGroup={editingGroup}
                        setEditingGroup={setEditingGroup}
                        groupToDelete={groupToDelete}
                        setGroupToDelete={setGroupToDelete}
                        groupFormData={groupFormData}
                        setGroupFormData={setGroupFormData}
                        onGroupSubmit={handleGroupSubmit}
                        onDeleteGroup={handleDeleteGroup}
                        onIconUpload={(e) => handleIconUpload(e, true)}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
