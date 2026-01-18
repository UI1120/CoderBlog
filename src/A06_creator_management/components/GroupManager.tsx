import { useRef } from "react";
import { Users, Edit2, Search, Upload, Check, Trash2, AlertTriangle, Save } from "lucide-react";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminModal } from "@/A00_common/components/AdminModal";
import { cn } from "@/P00_common/ui/utils";

interface GroupManagerProps {
    creators: any[];
    isAdmin: boolean;
    user: any;
    searchTerm: string;
    loading: boolean;
    isGroupModalOpen: boolean;
    setIsGroupModalOpen: (open: boolean) => void;
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;
    editingGroup: any;
    setEditingGroup: (group: any) => void;
    groupToDelete: any;
    setGroupToDelete: (group: any) => void;
    groupFormData: any;
    setGroupFormData: (data: any) => void;
    onGroupSubmit: (e: React.FormEvent) => void;
    onDeleteGroup: () => void;
    onIconUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GroupManager = ({
    creators,
    isAdmin,
    user,
    searchTerm,
    loading,
    isGroupModalOpen,
    setIsGroupModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editingGroup,
    setEditingGroup,
    groupToDelete,
    setGroupToDelete,
    groupFormData,
    setGroupFormData,
    onGroupSubmit,
    onDeleteGroup,
    onIconUpload,
}: GroupManagerProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filtered = creators.filter(c =>
        c.display_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        c.creator_type === 'group'
    );

    const myGroups = !isAdmin ? filtered.filter(c => c.members?.some((m: any) => m.account_id === user?.id)) : [];
    const otherGroups = !isAdmin ? filtered.filter(c => !c.members?.some((m: any) => m.account_id === user?.id)) : [];

    const handleConfirmDeleteGroup = (group: any) => {
        if (!isAdmin) return;
        setGroupToDelete(group);
        setIsDeleteModalOpen(true);
        setIsGroupModalOpen(false);
    };

    const handleGroupOpenModal = (group: any = null) => {
        setEditingGroup(group);
        if (group) {
            setGroupFormData({ ...group });
        } else {
            setGroupFormData({ display_name: "", profile: "", creator_type: "group", icon_path: "", members: [] });
        }
        setIsGroupModalOpen(true);
    };

    const renderGroupCard = (creator: any) => {
        const isJoined = creator.members?.some((m: any) => m.account_id === user?.id);
        const canEdit = isAdmin || isJoined;

        return (
            <AdminCard key={creator.creator_id} className="p-8 group hover:border-emerald-200 transition-all flex flex-col h-full bg-white relative overflow-hidden">
                {!isAdmin && isJoined && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-bl-xl shadow-sm z-10">
                        Your Group
                    </div>
                )}
                <div className="flex justify-between items-start mb-6">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-gray-100 border border-emerald-100 overflow-hidden shadow-sm">
                        {creator.icon_path ? (
                            <img src={creator.icon_path} alt={creator.display_name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-emerald-600/20">
                                <Users className="w-8 h-8" />
                            </div>
                        )}
                    </div>
                    {canEdit && (
                        <button
                            onClick={() => handleGroupOpenModal(creator)}
                            className="p-2.5 bg-gray-50 hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 rounded-xl transition-all"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                    )}
                </div>

                <div className="space-y-4 flex-1 text-sans">
                    <div>
                        <h3 className="text-xl font-black text-gray-800 tracking-tight">{creator.display_name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-600">
                                GROUP
                            </span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
                        {creator.profile || "プロフィールは未設定です"}
                    </p>

                    {creator.members && (
                        <div className="pt-4 border-t border-gray-50">
                            <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Members</label>
                            <div className="flex -space-x-2 overflow-hidden">
                                {creator.members.map((m: any, idx: number) => (
                                    <div key={idx} className="w-7 h-7 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-emerald-600 bg-emerald-50" title={m.display_name}>
                                        {m.display_name.charAt(0)}
                                    </div>
                                ))}
                                {creator.members.length === 0 && (
                                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest italic ml-1">No Members</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </AdminCard>
        );
    };

    return (
        <div className="space-y-12 pb-20">
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-8 border border-gray-100 animate-pulse space-y-4">
                            <div className="w-20 h-20 bg-gray-100 rounded-full" />
                            <div className="h-6 bg-gray-100 rounded w-1/2" />
                            <div className="h-20 bg-gray-50 rounded" />
                        </div>
                    ))}
                </div>
            ) : !isAdmin ? (
                <>
                    {myGroups.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest">所属グループ</h3>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{myGroups.length}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myGroups.map(creator => renderGroupCard(creator))}
                            </div>
                        </div>
                    )}
                    {otherGroups.length > 0 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-gray-300 rounded-full" />
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">その他のグループ</h3>
                                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{otherGroups.length}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {otherGroups.map(creator => renderGroupCard(creator))}
                            </div>
                        </div>
                    )}
                    {myGroups.length === 0 && otherGroups.length === 0 && (
                        <div className="py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                            <Search className="w-12 h-12 mb-4 opacity-20" />
                            No groups found
                        </div>
                    )}
                </>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.length > 0 ? (
                        filtered.map((creator) => renderGroupCard(creator))
                    ) : (
                        <div className="col-span-full py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                            <Search className="w-12 h-12 mb-4 opacity-20" />
                            No groups found
                        </div>
                    )}
                </div>
            )}

            {/* Modals are kept here for encapsulation as they are group-specific */}
            <AdminModal
                isOpen={isGroupModalOpen}
                onClose={() => setIsGroupModalOpen(false)}
                title={editingGroup ? "グループ編集" : "新規グループ登録"}
                subtitle="Collaborative Entity Management"
                footer={
                    <div className="flex items-center justify-between w-full gap-4">
                        {editingGroup && isAdmin && (
                            <AdminButton type="button" variant="danger" onClick={() => handleConfirmDeleteGroup(editingGroup)} icon={<Trash2 className="w-4 h-4" />} className="rounded-2xl shadow-none">
                                削除
                            </AdminButton>
                        )}
                        <div className="flex gap-4 flex-1 justify-end">
                            <AdminButton type="button" variant="ghost" onClick={() => setIsGroupModalOpen(false)} className="rounded-2xl shadow-none">
                                キャンセル
                            </AdminButton>
                            <AdminButton type="submit" form="group-form" icon={<Save className="w-4 h-4" />} className="rounded-2xl px-8">
                                保存する
                            </AdminButton>
                        </div>
                    </div>
                }
            >
                <form id="group-form" onSubmit={onGroupSubmit} className="space-y-8">
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <div className="w-24 h-24 rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                {groupFormData.icon_path ? (
                                    <img src={groupFormData.icon_path} className="w-full h-full object-cover" />
                                ) : (
                                    <Upload className="w-8 h-8 text-gray-300" />
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center text-white"
                            >
                                <Edit2 className="w-6 h-6" />
                            </button>
                            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={onIconUpload} />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black mb-2 pl-1">グループ名称</label>
                            <input
                                type="text"
                                required
                                value={groupFormData.display_name || ""}
                                onChange={(e) => setGroupFormData({ ...groupFormData, display_name: e.target.value })}
                                className="w-full bg-gray-50 border border-gray-100 shadow-inner rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700"
                                placeholder="グループ名を入力"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black pl-1">概要・活動内容</label>
                        <textarea
                            value={groupFormData.profile || ""}
                            onChange={(e) => setGroupFormData({ ...groupFormData, profile: e.target.value })}
                            rows={5}
                            className="w-full bg-gray-50 border border-gray-100 shadow-inner rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-sans text-gray-700 resize-none"
                            placeholder="グループの紹介文を入力してください"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-gray-400 uppercase tracking-widest text-[10px] font-black pl-1">メンバー管理</label>
                        <p className="text-[10px] text-gray-400 font-bold mb-4">グループに所属させる個人クリエイターを選択してください（複数選択可）</p>

                        <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto p-2 bg-gray-50 border border-gray-100 rounded-[1.5rem] shadow-inner custom-scrollbar">
                            {creators.filter(c => c.creator_type === 'individual').map(c => {
                                const isMember = groupFormData.members?.some((m: any) => m.creator_id === c.creator_id);
                                return (
                                    <button
                                        key={c.creator_id}
                                        type="button"
                                        onClick={() => {
                                            const currentMembers = groupFormData.members || [];
                                            if (isMember) {
                                                setGroupFormData({
                                                    ...groupFormData,
                                                    members: currentMembers.filter((m: any) => m.creator_id !== c.creator_id)
                                                });
                                            } else {
                                                setGroupFormData({
                                                    ...groupFormData,
                                                    members: [...currentMembers, { creator_id: c.creator_id, display_name: c.display_name }]
                                                });
                                            }
                                        }}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-xl border transition-all text-left group",
                                            isMember
                                                ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-500/10"
                                                : "bg-white border-gray-50 text-gray-600 hover:border-emerald-200 hover:bg-emerald-50/10"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-7 h-7 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border transition-colors",
                                            isMember ? "bg-white/20 border-white/40" : "bg-emerald-50 border-emerald-100"
                                        )}>
                                            {c.icon_path ? (
                                                <img src={c.icon_path} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className={cn("text-[10px] font-black", isMember ? "text-white" : "text-emerald-600")}>
                                                    {c.display_name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black truncate">{c.display_name}</p>
                                        </div>
                                        {isMember && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </form>
            </AdminModal>

            <AdminModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="グループ削除の確認"
                subtitle="Dangerous Action Warning"
                footer={
                    <>
                        <AdminButton type="button" variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-2xl shadow-none">
                            やめる
                        </AdminButton>
                        <AdminButton type="button" variant="danger" onClick={onDeleteGroup} icon={<Trash2 className="w-4 h-4" />} className="flex-1 rounded-2xl">
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
                        <p className="text-gray-700 font-bold">本当にこのグループを削除しますか？</p>
                        <p className="text-gray-400 text-sm mt-1">
                            名称: <span className="text-red-500 font-mono">
                                {groupToDelete?.display_name}
                            </span>
                        </p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-6">
                            This action cannot be undone. All linked metadata will be updated.
                        </p>
                    </div>
                </div>
            </AdminModal>
        </div>
    );
};
