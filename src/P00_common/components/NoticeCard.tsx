import { cn } from "@/P00_common/ui/utils";

export interface Notice {
    date: string;
    category: string;
    title: string;
    url?: string;
}

interface NoticeCardProps {
    notices: Notice[];
    className?: string;
}

export function NoticeCard({ notices, className }: NoticeCardProps) {
    if (!notices || notices.length === 0) return null;

    return (
        <div className={cn("bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-6 shadow-sm", className)}>
            {notices.map((notice, index) => (
                <div
                    key={index}
                    className={cn(
                        "flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4",
                        index > 0 && "mt-4 pt-4 border-t border-[#67e0b8]/20"
                    )}
                >
                    <div className="flex items-center gap-3 shrink-0 sm:w-40">
                        <time className="text-sm text-gray-500 font-mono tracking-wide">
                            {notice.date}
                        </time>
                        <span className={cn(
                            "px-2.5 py-0.5 text-[11px] font-medium rounded-full border",
                            notice.category.includes("重要")
                                ? "bg-red-50 text-red-600 border-red-100"
                                : "bg-emerald-50 text-emerald-600 border-emerald-100"
                        )}>
                            {notice.category}
                        </span>
                    </div>
                    <div className="text-gray-700 text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap flex-1 min-w-0">
                        {notice.url ? (
                            <a
                                href={notice.url}
                                className="hover:text-[#4cd4a3] hover:underline transition-colors decoration-[#4cd4a3]/50 underline-offset-4"
                            >
                                {notice.title}
                            </a>
                        ) : (
                            notice.title
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
