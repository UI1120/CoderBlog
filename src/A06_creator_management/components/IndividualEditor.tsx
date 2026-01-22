import { useRef } from "react";
import { UserCircle2, ChevronRight, Upload, Edit2, Mail, Lock, ShieldCheck, CheckCircle2, AlertCircle, Save, Loader2 } from "lucide-react";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminSelect } from "@/A00_common/components/AdminSelect";
import { cn } from "@/P00_common/ui/utils";

interface IndividualEditorProps {
    creators: any[];
    accounts: any[];
    selectedIndividual: any;
    individualFormData: any;
    confirmPassword: string;
    passwordError: string;
    isAdmin: boolean;
    user: any;
    onSelect: (creator: any) => void;
    onSubmit: (e: React.FormEvent) => void;
    onFormChange: (data: any) => void;
    onConfirmPasswordChange: (val: string) => void;
    onIconUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}

export const IndividualEditor = ({
    creators,
    accounts,
    selectedIndividual,
    individualFormData,
    confirmPassword,
    passwordError,
    isAdmin,
    user,
    onSelect,
    onSubmit,
    onFormChange,
    onConfirmPasswordChange,
    onIconUpload,
    searchTerm
}: IndividualEditorProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const filtered = creators.filter(c => {
        const matchesSearch = c.display_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = c.creator_type === 'individual';
        if (!isAdmin && user) {
            return matchesSearch && matchesTab && c.account_id === user.id;
        }
        return matchesSearch && matchesTab;
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-250px)]">
            {/* List Area */}
            <div className={cn(
                "lg:col-span-4 flex flex-col gap-3 h-fit lg:h-full lg:overflow-y-auto lg:pr-2 no-scrollbar rounded-[2rem] transition-all",
                isAdmin && filtered.length > 0 ? "lg:bg-emerald-50/30 lg:p-4 lg:border lg:border-emerald-100/50" : ""
            )}>
                {/* Mobile Selector */}
                <div className="lg:hidden">
                    <AdminSelect
                        value={selectedIndividual?.creator_id?.toString() || ""}
                        onChange={(val) => {
                            const selected = filtered.find(c => c.creator_id.toString() === val);
                            if (selected) onSelect(selected);
                        }}
                        options={filtered.map(c => ({
                            label: c.display_name,
                            value: c.creator_id.toString()
                        }))}
                        title="Select Account"
                        placeholder="アカウントを選択..."
                        className="bg-white shadow-md border-emerald-100/50"
                    />
                </div>

                {/* PC List Items */}
                <div className="hidden lg:flex flex-col gap-3">
                    {filtered.map((creator) => (
                        <button
                            key={creator.creator_id}
                            onClick={() => onSelect(creator)}
                            className={cn(
                                "w-full text-left p-4 rounded-[1.5rem] border transition-all flex items-center gap-4 group",
                                selectedIndividual?.creator_id === creator.creator_id
                                    ? "bg-white border-emerald-200 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-100"
                                    : "bg-gray-50/50 border-transparent hover:border-gray-200"
                            )}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                                {creator.icon_path ? (
                                    <img src={creator.icon_path} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-emerald-600/20">
                                        <UserCircle2 className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-700 truncate">{creator.display_name}</h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 truncate">
                                    {accounts.find(a => a.account_id === creator.account_id)?.email || "No Account"}
                                </p>
                            </div>
                            <ChevronRight className={cn(
                                "w-4 h-4 transition-all",
                                selectedIndividual?.creator_id === creator.creator_id ? "text-emerald-500 translate-x-1" : "text-gray-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                            )} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Detail Area */}
            <div className="lg:col-span-8 overflow-y-auto no-scrollbar pb-10">
                {selectedIndividual ? (
                    <AdminCard className="p-10">
                        <form onSubmit={onSubmit} className="space-y-12">
                            <div className="flex items-center gap-8 pb-10 border-b border-gray-50">
                                <div className="relative group">
                                    <div className="w-32 h-32 rounded-[2.5rem] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                        {individualFormData.icon_path ? (
                                            <img src={individualFormData.icon_path} className="w-full h-full object-cover" />
                                        ) : (
                                            <Upload className="w-10 h-10 text-gray-300" />
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center text-white"
                                    >
                                        <Edit2 className="w-8 h-8" />
                                    </button>
                                    <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={onIconUpload} />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600/60">Unified Profile integration</span>
                                    </div>

                                    <div className="relative group/name">
                                        <input
                                            type="text"
                                            required
                                            value={individualFormData.display_name || ""}
                                            onChange={(e) => onFormChange({ ...individualFormData, display_name: e.target.value })}
                                            className="text-3xl font-black text-gray-800 tracking-tight bg-gray-50/50 border-b-2 border-transparent focus:border-emerald-200 focus:bg-white focus:ring-0 p-2 -ml-2 rounded-xl w-full placeholder:text-gray-200 transition-all hover:bg-gray-100/50"
                                            placeholder="表示名を入力..."
                                        />
                                        <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 opacity-0 group-hover/name:opacity-100 transition-opacity pointer-events-none" />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex-1 min-w-[280px] flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm focus-within:border-emerald-200 transition-all">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={individualFormData.email || ""}
                                                    onChange={(e) => onFormChange({ ...individualFormData, email: e.target.value })}
                                                    className="flex-1 text-sm font-bold text-gray-600 bg-transparent border-none focus:ring-0 p-0 placeholder:text-gray-300"
                                                    placeholder="メールアドレスを入力"
                                                />
                                            </div>
                                            <AdminButton
                                                type="submit"
                                                icon={<Save className="w-4 h-4" />}
                                                className="h-[52px] px-8 rounded-2xl shadow-lg shadow-emerald-500/10 whitespace-nowrap"
                                            >
                                                保存する
                                            </AdminButton>
                                        </div>

                                        <div className="flex items-center gap-3 pl-1">
                                            <div className={cn(
                                                "px-3 py-1.5 rounded-xl shadow-sm font-black text-[10px] uppercase tracking-widest border border-transparent",
                                                individualFormData.role === 'admin' ? "bg-indigo-50 text-indigo-700 border-indigo-100/50" : "bg-cyan-50 text-cyan-700 border-cyan-100/50"
                                            )}>
                                                {individualFormData.role}
                                            </div>
                                            <div className={cn(
                                                "px-3 py-1.5 rounded-xl border shadow-sm font-black text-[10px] uppercase tracking-widest",
                                                individualFormData.status === 'active' ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-red-50 border-red-100 text-red-600"
                                            )}>
                                                {individualFormData.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Left: Public Profile */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-2 text-emerald-600">
                                        <UserCircle2 className="w-4 h-4" />
                                        <h5 className="text-[10px] font-black uppercase tracking-widest">Public Branding</h5>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="block text-gray-400 uppercase tracking-widest text-[9px] font-black pl-1">自己紹介文</label>
                                        <textarea
                                            value={individualFormData.profile || ""}
                                            onChange={(e) => onFormChange({ ...individualFormData, profile: e.target.value })}
                                            rows={6}
                                            className="w-full bg-gray-50/50 border border-gray-100 shadow-inner rounded-3xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-sans text-gray-700 resize-none leading-relaxed"
                                            placeholder="ブログ等で公開される活動内容を入力してください"
                                        />
                                    </div>
                                </div>

                                {/* Right: Account Security */}
                                <div className="space-y-8">
                                    <div className="flex items-center gap-2 text-teal-600">
                                        <Lock className="w-4 h-4" />
                                        <h5 className="text-[10px] font-black uppercase tracking-widest">System Security</h5>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-gray-400 uppercase tracking-widest text-[9px] font-black mb-2 pl-1">システムID</label>
                                            <div className="w-full bg-gray-100/50 border border-gray-100 rounded-2xl px-5 py-3.5 font-bold text-gray-400 cursor-not-allowed flex items-center justify-between">
                                                {individualFormData.login_name}
                                                <Lock className="w-3.5 h-3.5 opacity-50" />
                                            </div>
                                        </div>
                                        <div className="space-y-4 pt-2">
                                            <div className="flex items-center justify-between mb-0 pl-1">
                                                <label className="block text-gray-400 uppercase tracking-widest text-[9px] font-black">パスワード変更</label>
                                                <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">8-12文字・英数混合</span>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        autoComplete="new-password"
                                                        value={individualFormData.password || ""}
                                                        onChange={(e) => onFormChange({ ...individualFormData, password: e.target.value })}
                                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 placeholder:font-normal"
                                                        placeholder="新しいパスワード"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="password"
                                                        autoComplete="new-password"
                                                        value={confirmPassword}
                                                        onChange={(e) => onConfirmPasswordChange(e.target.value)}
                                                        className={cn(
                                                            "w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 placeholder:font-normal",
                                                            passwordError && "border-red-200 ring-4 ring-red-500/5"
                                                        )}
                                                        placeholder="パスワード（確認）"
                                                    />
                                                    {passwordError && (
                                                        <div className="absolute -bottom-6 left-1 text-[9px] font-bold text-red-500 flex items-center gap-1">
                                                            <AlertCircle className="w-3 h-3" /> {passwordError}
                                                        </div>
                                                    )}
                                                    {!passwordError && confirmPassword && (individualFormData.password === confirmPassword) && (
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500 transition-all scale-110">
                                                            <CheckCircle2 className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-gray-50 opacity-20 pointer-events-none">
                                {/* Button moved to top row */}
                            </div>
                        </form>
                    </AdminCard>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-300 font-bold uppercase tracking-[0.3em]">
                        <Loader2 className="w-12 h-12 mb-4 animate-spin opacity-20" />
                        Loading Profile Data...
                    </div>
                )}
            </div>
        </div>
    );
};
