import { ChevronsUpDown, Upload, X, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/constants";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminSelect } from "@/A00_common/components/AdminSelect";
import { Popover, PopoverContent, PopoverTrigger } from "@/P00_common/ui/popover";
import { Checkbox } from "@/P00_common/ui/checkbox";

interface MetadataEditorProps {
    project: string;
    group: string;
    tags: string[];
    thumbnail: string;
    onProjectChange: (project: string) => void;
    onGroupChange: (group: string) => void;
    onTagsChange: (tags: string[]) => void;
    onThumbnailChange: (thumbnail: string) => void;
}

export function MetadataEditor({
    project,
    group,
    tags,
    thumbnail,
    onProjectChange,
    onGroupChange,
    onTagsChange,
    onThumbnailChange,
}: MetadataEditorProps) {
    const [projects, setProjects] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [tagsList, setTagsList] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/header/projects`).then(res => res.json()).then(setProjects).catch(console.error);
        fetch(`${API_BASE_URL}/header/groups`).then(res => res.json()).then(setGroups).catch(console.error);
        fetch(`${API_BASE_URL}/header/tags`).then(res => res.json()).then(setTagsList).catch(console.error);
    }, []);

    const handleTagToggle = (tagLabel: string) => {
        if (tags.includes(tagLabel)) {
            onTagsChange(tags.filter((t) => t !== tagLabel));
        } else {
            onTagsChange([...tags, tagLabel]);
        }
    };

    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                onThumbnailChange(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const commonInputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 text-sm appearance-none";
    const labelClass = "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 pl-1";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Left Column: Data */}
            <div className="space-y-6">
                <AdminCard className="p-8 space-y-6">

                    <div>
                        <label className={labelClass}>プロジェクト</label>
                        <AdminSelect
                            value={project}
                            onChange={onProjectChange}
                            options={[
                                { label: "選択なし", value: "none" },
                                ...projects.map(p => ({ label: p.label, value: p.label }))
                            ]}
                            placeholder="プロジェクトを選択 (任意)"
                            title="Select Project"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>グループ</label>
                        <AdminSelect
                            value={group}
                            onChange={onGroupChange}
                            options={[
                                { label: "選択なし", value: "none" },
                                ...groups.map(g => ({ label: g.label, value: g.label }))
                            ]}
                            placeholder="グループを選択 (任意)"
                            title="Select Group"
                        />
                    </div>
                </AdminCard>

                <AdminCard className="p-8">
                    <label className={labelClass}>タグ</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className={`${commonInputClass} text-left flex items-center justify-between`}>
                                <span className="truncate">
                                    {tags.length > 0 ? tags.join(", ") : "タグを選択"}
                                </span>
                                <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0 rounded-[1.5rem] border-gray-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Toggle Tags</span>
                                <span className="text-[10px] font-bold text-gray-400">{tags.length} selected</span>
                            </div>
                            <div className="max-h-[300px] overflow-auto p-4 space-y-1">
                                {tagsList.map((tagItem, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-center space-x-3 p-3 rounded-xl transition-colors cursor-pointer ${tags.includes(tagItem.label) ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50'}`}
                                        onClick={() => handleTagToggle(tagItem.label)}
                                    >
                                        <Checkbox
                                            id={`tag-${idx}`}
                                            checked={tags.includes(tagItem.label)}
                                            onCheckedChange={() => handleTagToggle(tagItem.label)}
                                            className="border-gray-200 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                                        />
                                        <label htmlFor={`tag-${idx}`} className="flex-1 cursor-pointer select-none font-bold text-sm text-gray-700 group-hover:text-emerald-700">
                                            {tagItem.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1 animate-in zoom-in duration-200">
                                    {tag}
                                    <X className="w-3 h-3 cursor-pointer hover:text-emerald-800" onClick={() => handleTagToggle(tag)} />
                                </span>
                            ))}
                        </div>
                    )}
                </AdminCard>
            </div>

            {/* Right Column: Thumbnail */}
            <div className="space-y-6">
                <AdminCard className="p-8 flex flex-col items-center justify-center min-h-[400px] relative">
                    <label className={labelClass + " absolute top-8 left-8"}>サムネイル画像</label>

                    {thumbnail ? (
                        <div className="w-full h-full flex flex-col gap-6">
                            <div className="relative group w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                                <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <AdminButton variant="danger" onClick={() => onThumbnailChange('')} icon={<Trash2 className="w-4 h-4" />}>
                                        画像を削除
                                    </AdminButton>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <AdminButton
                                    variant="secondary"
                                    icon={<Upload className="w-4 h-4" />}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    画像を貼り替える
                                </AdminButton>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center">
                                <Upload className="w-8 h-8 text-gray-300" />
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-gray-400 text-sm">画像をここにドロップまたはクリック</p>
                                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1">Recommended size: 1200x630px</p>
                            </div>
                            <AdminButton
                                variant="secondary"
                                icon={<Upload className="w-4 h-4" />}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                ファイルをアップロード
                            </AdminButton>
                        </div>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                    />
                </AdminCard>

                <div className="bg-emerald-600/5 border border-emerald-600/10 rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-xs">i</div>
                        <div>
                            <p className="text-xs font-bold text-emerald-800">ヒント</p>
                            <p className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-widest">Metadata optimization improves SEO visibility.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
