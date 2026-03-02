import { ArrowRight, LinkIcon, AlertCircle, Bell } from "lucide-react";

interface Notice {
    id: number;
    title: string;
    category: string;
    url?: string;
    status: string;
    expires_at?: string;
}

interface RecentNoticesProps {
    notices: Notice[];
    isAdmin: boolean;
}

export function RecentNotices({ notices, isAdmin }: RecentNoticesProps) {
    if (!isAdmin) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'text-emerald-500 border-emerald-200 bg-emerald-50';
            case 'draft': return 'text-gray-500 border-gray-200 bg-gray-50';
            case 'scheduled': return 'text-amber-500 border-amber-200 bg-amber-50';
            case 'private': return 'text-purple-500 border-purple-200 bg-purple-50';
            case 'expired':
            case 'deleted': return 'text-red-500 border-red-200 bg-red-50';
            default: return 'text-gray-500 border-gray-200 bg-gray-50';
        }
    };

    return (
        <div className="mt-8">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-gray-800 flex items-center gap-3">
                        <span className="w-2 h-7 bg-emerald-400 rounded-full" />
                        <Bell className="w-5 h-5 text-emerald-500" />
                        お知らせ管理
                    </h3>
                    <a href="/article_management?tab=notice" className="text-xs font-black text-gray-400 hover:text-emerald-600 flex items-center gap-1.5 transition-all group">
                        全て見る <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notices.length > 0 ? notices.map((notice) => (
                        <div
                            key={notice.id}
                            className="p-5 bg-gray-50/50 rounded-2xl hover:bg-emerald-50/50 transition-all group cursor-pointer border border-transparent hover:border-emerald-100 flex flex-col justify-between"
                            onClick={() => window.location.href = `/editor?mode=notice&id=${notice.id}`}
                        >
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <span className={`px-2 py-0.5 border rounded text-[9px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(notice.status)}`}>
                                        {notice.status}
                                    </span>
                                    <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-black text-gray-500 shadow-sm">
                                        {notice.category}
                                    </span>
                                </div>
                                <h4 className="text-sm font-black text-gray-700 group-hover:text-emerald-800 transition-colors line-clamp-2 mb-3">
                                    {notice.title || "無題のお知らせ"}
                                </h4>
                            </div>

                            <div className="flex items-center justify-between gap-2 border-t border-gray-200/50 pt-3 mt-auto">
                                {notice.url ? (
                                    <span className="text-[10px] text-gray-400 font-medium flex items-center gap-1 truncate max-w-[60%]" title={notice.url}>
                                        <LinkIcon className="w-3 h-3 shrink-0" />
                                        <span className="truncate">{notice.url}</span>
                                    </span>
                                ) : (
                                    <span className="text-[10px] text-gray-300 italic">No Link</span>
                                )}

                                {notice.expires_at ? (
                                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100 shrink-0">
                                        <AlertCircle className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                                        期限: {new Date(notice.expires_at).toLocaleDateString()}
                                    </span>
                                ) : (
                                    <span className="text-[10px] text-gray-300 bg-white px-2 py-1 rounded-md border border-gray-50">無期限</span>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-12 bg-gray-50/30 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">お知らせはありません</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
