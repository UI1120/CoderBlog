import React from "react";
import {
    Trash2,
    User,
    Calendar,
    Globe,
    ExternalLink
} from "lucide-react";
import { AdminSelect } from "@/A00_common/components/AdminSelect";
import { cn } from "@/P00_common/ui/utils";

interface Comment {
    id: number;
    article_id: number;
    article_title: string;
    guest_name: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    ip_address: string;
    created_at: string;
}

interface CommentTableProps {
    comments: Comment[];
    onStatusChange: (comment: Comment, status: 'approved' | 'rejected' | 'pending') => void;
    onDelete: (comment: Comment) => void;
    isAdmin: boolean;
}

const statusConfig = {
    pending: { label: "承認待ち", color: "bg-amber-50 text-amber-600 border-amber-100", dot: "bg-amber-400" },
    approved: { label: "承認済み", color: "bg-emerald-50 text-emerald-600 border-emerald-100", dot: "bg-emerald-400" },
    rejected: { label: "却下", color: "bg-rose-50 text-rose-600 border-rose-100", dot: "bg-rose-400" },
};

export const CommentTable: React.FC<CommentTableProps> = ({ comments, onStatusChange, onDelete, isAdmin }) => {
    return (
        <div className="w-full space-y-4">
            {comments.map((comment) => {
                const config = statusConfig[comment.status];
                return (
                    <div
                        key={comment.id}
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-emerald-100 transition-all group"
                    >
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left: Metadata */}
                            <div className="md:w-64 flex-shrink-0 space-y-4">
                                <div>
                                    <div className={cn(
                                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold mb-3",
                                        config.color
                                    )}>
                                        <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
                                        {config.label}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                                        <User className="w-4 h-4 text-gray-400" />
                                        {comment.guest_name || "名無しさん"}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 text-[11px] mt-1 font-medium">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(comment.created_at).toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400 text-[10px] mt-1 font-mono">
                                        <Globe className="w-3.5 h-3.5" />
                                        {comment.ip_address}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50">
                                    <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">対象記事</div>
                                    <h4 className="text-xs font-bold text-gray-600 line-clamp-2 leading-relaxed">
                                        {comment.article_title}
                                    </h4>
                                    <a
                                        href={`/article?id=${comment.article_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-2 hover:underline"
                                    >
                                        表示 <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>

                            {/* Center: Content */}
                            <div className="flex-1 bg-gray-50/50 rounded-2xl p-5 border border-gray-50">
                                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                    {comment.content}
                                </p>
                                {comment.status === 'pending' && (
                                    <div className="mt-4 p-3 bg-amber-50/50 rounded-xl border border-amber-100/50 flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 animate-pulse" />
                                        <p className="text-[11px] text-amber-700 font-medium">
                                            このコメントは現在承認待ちです。承認するまで一般ユーザーには表示されません。
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Right: Actions */}
                            <div className="flex md:flex-col gap-2 justify-end md:justify-start">
                                {isAdmin ? (
                                    <div className="w-full">
                                        <AdminSelect
                                            value={comment.status}
                                            onChange={(val) => onStatusChange(comment, val as any)}
                                            options={[
                                                { label: "承認待ち", value: "pending" },
                                                { label: "承認済み", value: "approved" },
                                                { label: "却下", value: "rejected" }
                                            ]}
                                            className={cn(
                                                "w-32 py-1.5 h-auto text-[10px] border-transparent",
                                                config.color.split(" ")[0], config.color.split(" ")[1],
                                                "hover:opacity-80"
                                            )}
                                            popoverWidth="w-40"
                                            title="ステータス管理"
                                        />
                                    </div>
                                ) : (
                                    <div className={cn("text-[10px] font-bold px-3 py-1.5 rounded-full", config.color.split(" ")[0], config.color.split(" ")[1])}>
                                        {config.label}
                                    </div>
                                )}
                                {isAdmin && (
                                    <div className="md:mt-auto opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onDelete(comment)}
                                            className="p-2.5 bg-white border border-gray-100 hover:border-red-200 text-red-500 rounded-xl transition-all shadow-sm"
                                            title="削除"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            {comments.length === 0 && (
                <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center">
                    <p className="text-gray-400 text-sm font-medium">表示するコメントはありません</p>
                </div>
            )}
        </div>
    );
};
