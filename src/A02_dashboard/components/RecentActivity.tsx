import { Calendar, MessageSquare, ArrowRight, ExternalLink, PenTool } from "lucide-react";
import { AdminButton } from "@/A00_common/components/AdminButton";

interface ActivityProps {
    drafts: any[];
    comments: any[];
    isAdmin: boolean;
}

export function RecentActivity({ drafts, comments, isAdmin }: ActivityProps) {
    if (!isAdmin) {
        return (
            <div className="bg-emerald-50 rounded-[2rem] p-8 border border-emerald-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                <div className="shrink-0">
                    <AdminButton 
                        onClick={() => window.location.href = '/editor'} 
                        icon={<PenTool className="w-5 h-5" />}
                        className="py-6 px-10 rounded-[1.5rem] shadow-lg shadow-emerald-200"
                    >
                        新規記事を作成
                    </AdminButton>
                </div>
                <div className="text-center md:text-left">
                    <h3 className="text-emerald-800 font-black text-xl mb-2">Welcome Back!</h3>
                    <p className="text-emerald-600/80 font-bold text-sm leading-relaxed max-w-md">
                        新しい知識を共有しましょう。あなたの最新の執筆活動を再開したり、新しい記事を投稿することができます。
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Drafts Section */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-gray-800 flex items-center gap-3">
                        <span className="w-2 h-7 bg-amber-400 rounded-full" />
                        最近の下書き
                    </h3>
                    <a href="/article_management" className="text-xs font-black text-gray-400 hover:text-emerald-600 flex items-center gap-1.5 transition-all group">
                        全て見る <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
                <div className="space-y-4">
                    {drafts.length > 0 ? drafts.map((draft) => (
                        <div key={draft.article_id} className="p-5 bg-gray-50/50 rounded-2xl hover:bg-amber-50/50 transition-all group cursor-pointer border border-transparent hover:border-amber-100" onClick={() => window.location.href = `/editor?id=${draft.article_id}`}>
                            <div className="flex justify-between items-start mb-3">
                                <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-black text-gray-500 uppercase tracking-widest shadow-sm">Draft Item</span>
                                <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full shadow-sm">
                                    <Calendar className="w-3 h-3 text-amber-500" />
                                    {new Date(draft.updated_at).toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className="text-sm font-black text-gray-700 group-hover:text-amber-800 transition-colors line-clamp-1">
                                {draft.title || "無題の記事"}
                            </h4>
                        </div>
                    )) : (
                        <div className="text-center py-12 bg-gray-50/30 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">No drafts found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-gray-800 flex items-center gap-3">
                        <span className="w-2 h-7 bg-purple-400 rounded-full" />
                        承認待ちコメント
                    </h3>
                    <a href="/article_management?tab=comment" className="text-xs font-black text-gray-400 hover:text-emerald-600 flex items-center gap-1.5 transition-all group">
                        全て見る <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
                <div className="space-y-3">
                    {comments.length > 0 ? comments.map((comment) => (
                        <div key={comment.comment_id} className="p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-purple-100 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-gray-700 flex items-center gap-2">
                                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                                    {comment.guest_name || "名無し"}
                                </span>
                                <span className="text-[10px] text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-3 bg-white p-2 rounded-lg italic">
                                "{comment.content}"
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 bg-white px-2 py-1 rounded inline-flex">
                                <span className="font-bold uppercase tracking-wider text-gray-300">Target:</span>
                                <span className="font-medium text-gray-500 truncate max-w-[150px]">{comment.article_title}</span>
                                <a href={`/article?id=${comment.article_id}`} target="_blank" rel="noreferrer" className="text-emerald-500 hover:underline">
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    )) : (
                        <p className="text-center text-gray-400 text-xs py-8">承認待ちコメントはありません</p>
                    )}
                </div>
            </div>
        </div>
    );
}
