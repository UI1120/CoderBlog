import { FileText, Eye, Heart, PenTool, LayoutTemplate } from "lucide-react";
import { cn } from "@/P00_common/ui/utils";

interface StatsProps {
    stats: {
        site_total_articles: number;
        site_total_pv: number;
        site_total_likes: number;
        user_total_articles: number;
        user_total_pv: number;
        user_total_likes: number;
        draft_articles_count: number;
        pending_comments_count: number;
    } | null;
    isAdmin: boolean;
    activeMetric: 'pv' | 'likes' | 'articles';
    onMetricChange: (metric: 'pv' | 'likes' | 'articles') => void;
}

export function DashboardStats({ stats, isAdmin, activeMetric, onMetricChange }: StatsProps) {
    if (!stats) return null;

    const statItems = [
        {
            id: 'articles' as const,
            label: "総記事数",
            value: stats.site_total_articles,
            icon: <FileText className="w-5 h-5 text-emerald-600" />,
            subValue: `あなたの執筆: ${stats.user_total_articles}`,
            color: "bg-emerald-50 border-emerald-100",
            activeColor: "bg-emerald-100 border-emerald-300 ring-2 ring-emerald-500/20"
        },
        {
            id: 'pv' as const,
            label: "総PV数",
            value: stats.site_total_pv.toLocaleString(),
            icon: <Eye className="w-5 h-5 text-blue-600" />,
            subValue: `あなたの記事: ${stats.user_total_pv.toLocaleString()}`,
            color: "bg-blue-50 border-blue-100",
            activeColor: "bg-blue-100 border-blue-300 ring-2 ring-blue-500/20"
        },
        {
            id: 'likes' as const,
            label: "総いいね数",
            value: stats.site_total_likes.toLocaleString(),
            icon: <Heart className="w-5 h-5 text-rose-600" />,
            subValue: `あなたの記事: ${stats.user_total_likes}`,
            color: "bg-rose-50 border-rose-100",
            activeColor: "bg-rose-100 border-rose-300 ring-2 ring-rose-500/20"
        }
    ];

    const adminOnlyItems = [
        {
            label: "下書き記事",
            value: stats.draft_articles_count,
            icon: <PenTool className="w-5 h-5 text-amber-600" />,
            subValue: "公開待ち",
            color: "bg-amber-50 border-amber-100"
        },
        {
            label: "承認待ちコメント",
            value: stats.pending_comments_count,
            icon: <LayoutTemplate className="w-5 h-5 text-purple-600" />,
            subValue: "要確認",
            color: "bg-purple-50 border-purple-100"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {statItems.map((item) => (
                <button 
                    key={item.id} 
                    onClick={() => onMetricChange(item.id)}
                    className={cn(
                        "p-6 rounded-3xl border shadow-sm transition-all hover:-translate-y-1 text-left",
                        activeMetric === item.id ? item.activeColor : item.color
                    )}
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm">
                            {item.icon}
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                        <h3 className="text-3xl font-black text-gray-800 tracking-tight mb-2">{item.value}</h3>
                        <p className="text-xs font-medium text-gray-500 bg-white/50 inline-block px-2 py-1 rounded-lg">
                            {item.subValue}
                        </p>
                    </div>
                </button>
            ))}
            
            {isAdmin && adminOnlyItems.map((item, idx) => (
                <div key={idx} className={cn("p-6 rounded-3xl border shadow-sm transition-all", item.color)}>
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white rounded-2xl shadow-sm">
                            {item.icon}
                        </div>
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</p>
                        <h3 className="text-3xl font-black text-gray-800 tracking-tight mb-2">{item.value}</h3>
                        <p className="text-xs font-medium text-gray-500 bg-white/50 inline-block px-2 py-1 rounded-lg">
                            {item.subValue}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
