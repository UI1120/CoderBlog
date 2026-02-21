import { ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminSelect } from "@/A00_common/components/AdminSelect";
import { Popover, PopoverContent, PopoverTrigger } from "@/P00_common/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/P00_common/ui/command";

interface WikiMetadataEditorProps {
    slug: string;
    parentPageId: string;
    projectId: string; // Optional
    onSlugChange: (slug: string) => void;
    onParentPageChange: (id: string) => void;
    onProjectChange: (id: string) => void;
}

// Mock Wiki Pages for Parent Selection
const MOCK_WIKI_PAGES = [
    { id: "1", title: "Home", slug: "home" },
    { id: "2", title: "Development Guide", slug: "dev-guide" },
    { id: "3", title: "Python Setup", slug: "python-setup" },
];

export function WikiMetadataEditor({
    slug,
    parentPageId,
    projectId,
    onSlugChange,
    onParentPageChange,
    onProjectChange,
}: WikiMetadataEditorProps) {
    const [projects, setProjects] = useState<any[]>([]);
    const [openParentSelect, setOpenParentSelect] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE_URL}/header/projects`).then(res => res.json()).then(setProjects).catch(console.error);
    }, []);

    const labelClass = "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 pl-1";
    const inputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 text-sm";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
                <AdminCard className="p-8 space-y-6">
                    <div>
                        <label className={labelClass}>URL Slug (Path)</label>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 font-bold text-sm">/wiki/</span>
                            <input
                                value={slug}
                                onChange={(e) => onSlugChange(e.target.value)}
                                placeholder="example-page"
                                className={inputClass}
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-2 pl-1 font-bold">半角英数字とハイフンのみ使用可能です</p>
                    </div>

                    <div>
                        <label className={labelClass}>親ページ (Parent)</label>
                        <Popover open={openParentSelect} onOpenChange={setOpenParentSelect}>
                            <PopoverTrigger asChild>
                                <button className={`flex justify-between items-center ${inputClass} text-left`}>
                                    <span className={!parentPageId ? "text-gray-400" : ""}>
                                        {parentPageId
                                            ? MOCK_WIKI_PAGES.find(p => p.id === parentPageId)?.title || "Unknown Page"
                                            : "親ページを選択 (ルートの場合は選択なし)"}
                                    </span>
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-0 rounded-xl">
                                <Command>
                                    <CommandInput placeholder="ページを検索..." />
                                    <CommandList>
                                        <CommandEmpty>No page found.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandItem onSelect={() => { onParentPageChange(""); setOpenParentSelect(false); }}>
                                                <span className="font-bold text-gray-400">Root (No Parent)</span>
                                            </CommandItem>
                                            {MOCK_WIKI_PAGES.map((page) => (
                                                <CommandItem
                                                    key={page.id}
                                                    onSelect={() => {
                                                        onParentPageChange(page.id);
                                                        setOpenParentSelect(false);
                                                    }}
                                                >
                                                    <span className="font-bold">{page.title}</span>
                                                    <span className="ml-2 text-xs text-gray-400">({page.slug})</span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </AdminCard>


                <AdminCard className="p-8">
                    <div>
                        <label className={labelClass}>関連プロジェクト (Optional)</label>
                        <AdminSelect
                            value={projectId}
                            onChange={onProjectChange}
                            options={[{ label: "選択なし", value: "none" }, ...projects.map(p => ({ label: p.label, value: p.label }))]}
                            placeholder="プロジェクトを選択"
                            title="Select Project"
                        />
                    </div>
                </AdminCard>
            </div>

            <div className="space-y-6">
                <div className="bg-emerald-600/5 border border-emerald-600/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs">W</div>
                        <div>
                            <p className="text-xs font-bold text-emerald-800">Wiki Tips</p>
                            <p className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-widest">
                                Structure content hierarchically using Parent Pages.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
