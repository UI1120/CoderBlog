import React from "react";
import {
    Edit2,
    Trash2,
    LinkIcon,
    Circle,
    CheckCircle2,
    Clock,
    EyeOff,
    AlertCircle,
    XCircle
} from "lucide-react";
import { cn } from "@/P00_common/ui/utils";

interface Notice {
    notice_id: number;
    title: string;
    category: string;
    url?: string;
    status: 'draft' | 'published' | 'scheduled' | 'private' | 'expired' | 'deleted';
    expires_at?: string;
}

interface NoticeTableProps {
    notices: Notice[];
    onEdit: (notice: Notice) => void;
    onChangeStatus: (notice: Notice, newStatus: string) => void;
    onDelete: (notice: Notice) => void;
    isAdmin: boolean;
}

const statusConfig = {
    published: { label: "公開中", icon: <CheckCircle2 className="w-3 h-3" />, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    draft: { label: "下書き", icon: <Circle className="w-3 h-3" />, color: "bg-gray-50 text-gray-600 border-gray-100" },
    scheduled: { label: "予約中", icon: <Clock className="w-3 h-3" />, color: "bg-blue-50 text-blue-600 border-blue-100" },
    private: { label: "非公開", icon: <EyeOff className="w-3 h-3" />, color: "bg-purple-50 text-purple-600 border-purple-100" },
    expired: { label: "掲載終了", icon: <AlertCircle className="w-3 h-3" />, color: "bg-amber-50 text-amber-600 border-amber-100" },
    deleted: { label: "削除済み", icon: <XCircle className="w-3 h-3" />, color: "bg-rose-50 text-rose-600 border-rose-100" },
};

export const NoticeTable: React.FC<NoticeTableProps> = ({ notices, onEdit, onChangeStatus, onDelete, isAdmin }) => {
    return (
        <div className="w-full overflow-x-auto bg-white rounded-3xl border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">お知らせ情報</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">ステータス</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">掲載終了日</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {notices.map((notice) => {
                        const config = statusConfig[notice.status] || statusConfig.draft;
                        return (
                            <tr key={notice.notice_id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-5">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-[9px] font-black text-gray-500 shadow-sm">
                                                {notice.category}
                                            </span>
                                            {notice.url && (
                                                <a href={notice.url} target="_blank" rel="noopener noreferrer" className="text-[10px] text-emerald-500 font-medium flex items-center gap-1 hover:underline truncate max-w-[150px]">
                                                    <LinkIcon className="w-3 h-3 shrink-0" />
                                                    <span className="truncate">{notice.url}</span>
                                                </a>
                                            )}
                                        </div>
                                        <h3 className="text-gray-900 font-bold line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                            {notice.title || "無題のお知らせ"}
                                        </h3>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-center gap-2">
                                        {isAdmin ? (
                                            <select
                                                value={notice.status}
                                                onChange={(e) => onChangeStatus(notice, e.target.value)}
                                                className={cn(
                                                    "appearance-none items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold cursor-pointer hover:border-emerald-300 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/10",
                                                    config.color
                                                )}
                                            >
                                                <option value="published">公開中</option>
                                                <option value="draft">下書き</option>
                                                <option value="scheduled">予約中</option>
                                                <option value="private">非公開</option>
                                                <option value="expired">掲載終了</option>
                                            </select>
                                        ) : (
                                            <div className={cn(
                                                "flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold",
                                                config.color
                                            )}>
                                                {config.icon}
                                                {config.label}
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    {notice.expires_at ? (
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-gray-600 border border-gray-100 bg-white rounded-md shadow-sm">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span className="text-[10px] font-bold tracking-widest">{new Date(notice.expires_at).toLocaleDateString()}</span>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] font-medium text-gray-300">無期限</span>
                                    )}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center justify-end gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(notice)}
                                            className="p-2.5 bg-white border border-gray-100 hover:border-emerald-200 text-emerald-500 rounded-xl transition-all shadow-sm"
                                            title="編集"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        {isAdmin && (
                                            <button
                                                onClick={() => onDelete(notice)}
                                                className="p-2.5 bg-white border border-gray-100 hover:border-red-200 text-red-500 rounded-xl transition-all shadow-sm"
                                                title="削除"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {notices.length === 0 && (
                <div className="p-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Circle className="w-8 h-8" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">お知らせが見つかりませんでした</p>
                </div>
            )}
        </div>
    );
};
