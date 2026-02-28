import { Link, Search } from "lucide-react";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { useEffect, useState } from "react";
import { API_BASE_URL, FRONT_ROOT_PATH } from "@/constants";

interface NoticeMetadataEditorProps {
    title: string;
    category: string;
    url: string;
    expiresAt: string;
    onTitleChange: (val: string) => void;
    onCategoryChange: (val: string) => void;
    onUrlChange: (val: string) => void;
    onExpiresAtChange: (val: string) => void;
}

export function NoticeMetadataEditor({
    title,
    category,
    url,
    expiresAt,
    onTitleChange,
    onCategoryChange,
    onUrlChange,
    onExpiresAtChange,
}: NoticeMetadataEditorProps) {
    const [articles, setArticles] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/articles`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched articles for selection:", data);
                if (Array.isArray(data)) {
                    setArticles(data);
                } else if (data && Array.isArray(data.articles)) {
                    setArticles(data.articles);
                } else {
                    console.warn("Unexpected articles data format:", data);
                    setArticles([]);
                }
            })
            .catch(err => {
                console.error("Failed to fetch articles:", err);
                setArticles([]);
            });
    }, []);



    const labelClass = "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 pl-1";
    const inputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 text-sm placeholder:text-gray-300";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
                <AdminCard className="p-8 space-y-6">
                    <div>
                        <label className={labelClass}>タイトル (Title)</label>
                        <input
                            type="text"
                            value={title}
                            maxLength={100}
                            onChange={(e) => onTitleChange(e.target.value)}
                            className={inputClass}
                            placeholder="例: 学祭展示は2025年11月に開催されます"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>カテゴリ (Category)</label>
                        <input
                            type="text"
                            value={category}
                            maxLength={8}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            className={inputClass}
                            placeholder="例: イベント, 勉強会, お知らせ"
                        />
                        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                            {['イベント', '勉強会', 'お知らせ', '重要'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => onCategoryChange(cat)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors whitespace-nowrap border ${cat.includes("重要")
                                        ? "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                                        : "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </AdminCard>

                <AdminCard className="p-8 space-y-6">
                    <div>
                        <label className={labelClass}>リンク先URL (Target URL)</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => onUrlChange(e.target.value)}
                                className={`${inputClass} pl-12`}
                                placeholder="https://..."
                            />
                            <Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 pl-1 font-bold">空欄の場合、リンクなしのお知らせとして表示されます。</p>
                    </div>

                    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Search className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">記事からURLを自動入力</span>
                        </div>

                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="記事タイトルで検索..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={inputClass + " h-10 py-2 text-xs"}
                            />

                            <div className="max-h-40 overflow-y-auto border border-gray-100 rounded-xl bg-white shadow-sm scrollbar-hide">
                                {articles
                                    .filter(a =>
                                        !searchQuery ||
                                        (a.title && a.title.toLowerCase().includes(searchQuery.toLowerCase()))
                                    )
                                    .slice(0, 50) // Limit results
                                    .map(a => (
                                        <button
                                            key={a.id || a.article_id}
                                            onClick={() => {
                                                const id = String(a.id || a.article_id);
                                                // ユーザー指定: /article?id={id} 形式かつ http:// からのフルURL
                                                onUrlChange(`${FRONT_ROOT_PATH}/article?id=${id}`);
                                                setSearchQuery(a.title);
                                            }}
                                            className="w-full text-left px-4 py-2 hover:bg-emerald-50 text-xs font-bold text-gray-600 truncate transition-colors flex items-center justify-between group"
                                        >
                                            <span>{a.title}</span>
                                            <span className="text-[10px] text-gray-300 group-hover:text-emerald-400">ID: {a.id || a.article_id}</span>
                                        </button>
                                    ))}
                                {articles.length === 0 && (
                                    <div className="px-4 py-2 text-xs text-gray-400">記事が見つかりません</div>
                                )}
                            </div>
                        </div>
                    </div>
                </AdminCard>
            </div>

            <div className="space-y-6">
                <AdminCard className="p-8">
                    <div>
                        <label className={labelClass}>掲載終了日時 (Expires At)</label>
                        <div className="relative">
                            <input
                                type="datetime-local"
                                value={expiresAt}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (!val) {
                                        onExpiresAtChange("");
                                        return;
                                    }

                                    const [datePart] = val.split('T');
                                    // Basic tracking of date changes to default time to 23:59
                                    // We need to know the *previous* date. 
                                    // Since we don't have previous state easily accessible here without prop drilling or internal state,
                                    // we can check if the current `expiresAt` (prop) has a different date.

                                    const currentExpiresAt = expiresAt || "";
                                    const [prevDatePart] = currentExpiresAt.split('T');

                                    if (datePart !== prevDatePart) {
                                        // Date changed (or initial set), force 23:59
                                        onExpiresAtChange(`${datePart}T23:59`);
                                    } else {
                                        // Date is same, user probably editing time
                                        onExpiresAtChange(val);
                                    }
                                }}
                                className={inputClass}
                            />
                            {/* Calendar icon removed as requested */}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 pl-1 font-bold">設定しない場合、手動で非公開にするまで表示されます。</p>
                    </div>
                </AdminCard>

                {/* Preview Tip */}
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6">
                    <p className="text-xs font-bold text-emerald-800 leading-relaxed">
                        Top Page Preview
                    </p>
                    <p className="text-[10px] text-emerald-600/80 mt-1 font-medium">
                        プレビュースタブで実際の表示を確認できます。
                    </p>
                </div>
            </div>
        </div>
    );
}
