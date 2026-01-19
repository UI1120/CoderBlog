import React from "react";
import {
    Edit2,
    Trash2,
    ExternalLink,
    MessageSquare,
    Circle,
    CheckCircle2,
    Clock,
    EyeOff
} from "lucide-react";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { cn } from "@/P00_common/ui/utils";

interface Article {
    article_id: number;
    title: string;
    writer_name: string;
    category_name: string;
    status: 'draft' | 'published' | 'scheduled' | 'private';
    published_at: string | null;
    updated_at: string;
    comment_count: number;
    image?: string;
}

interface ArticleTableProps {
    articles: Article[];
    onEdit: (article: Article) => void;
    onChangeStatus: (article: Article, newStatus: string) => void;
    onDelete: (article: Article) => void;
    isAdmin: boolean;
}

const statusConfig = {
    published: { label: "公開中", icon: <CheckCircle2 className="w-3 h-3" />, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    draft: { label: "下書き", icon: <Circle className="w-3 h-3" />, color: "bg-gray-50 text-gray-600 border-gray-100" },
    scheduled: { label: "予約中", icon: <Clock className="w-3 h-3" />, color: "bg-blue-50 text-blue-600 border-blue-100" },
    private: { label: "非公開", icon: <EyeOff className="w-3 h-3" />, color: "bg-rose-50 text-rose-600 border-rose-100" },
};

export const ArticleTable: React.FC<ArticleTableProps> = ({ articles, onEdit, onChangeStatus, onDelete, isAdmin }) => {
    return (
        <div className="w-full overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">記事情報</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">ステータス</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">反響</th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {articles.map((article) => {
                        const config = statusConfig[article.status];
                        return (
                            <tr key={article.article_id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                                            {article.image ? (
                                                <img src={article.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-gray-900 font-bold line-clamp-1 group-hover:text-emerald-600 transition-colors">
                                                {article.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-500 font-medium">{article.writer_name}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{article.category_name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col items-center gap-2">
                                        {isAdmin ? (
                                            <select
                                                value={article.status}
                                                onChange={(e) => onChangeStatus(article, e.target.value)}
                                                className={cn(
                                                    "appearance-none items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold cursor-pointer hover:border-emerald-300 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/10",
                                                    config.color
                                                )}
                                            >
                                                <option value="published">公開中</option>
                                                <option value="draft">下書き</option>
                                                <option value="scheduled">予約中</option>
                                                <option value="private">非公開</option>
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
                                        <span className="text-[10px] text-gray-400 font-medium">
                                            {article.published_at ? new Date(article.published_at).toLocaleDateString() : '---'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-center">
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full text-gray-600 border border-gray-100">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span className="text-xs font-bold font-mono">{article.comment_count}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center justify-end gap-2">
                                        <AdminButton
                                            variant="ghost"
                                            onClick={() => onEdit(article)}
                                            className="w-10 h-10 p-0 rounded-xl"
                                        >
                                            <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-amber-500" />
                                        </AdminButton>
                                        {isAdmin && (
                                            <AdminButton
                                                variant="ghost"
                                                onClick={() => onDelete(article)}
                                                className="w-10 h-10 p-0 rounded-xl hover:bg-rose-50"
                                            >
                                                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-rose-500" />
                                            </AdminButton>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {articles.length === 0 && (
                <div className="p-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <Circle className="w-8 h-8" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">記事が見つかりませんでした</p>
                </div>
            )}
        </div>
    );
};
