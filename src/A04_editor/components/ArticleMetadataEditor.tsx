import { ChevronsUpDown, Upload, X, Trash2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "@/constants";
import { AdminCard } from "@/A00_common/components/AdminCard";
import { AdminButton } from "@/A00_common/components/AdminButton";
import { AdminSelect } from "@/A00_common/components/AdminSelect";
import { Popover, PopoverContent, PopoverTrigger } from "@/P00_common/ui/popover";
import { Checkbox } from "@/P00_common/ui/checkbox";

interface ArticleMetadataEditorProps {
    project: string;
    group: string;
    tags: string[];
    thumbnail: string;
    onProjectChange: (project: string) => void;
    onGroupChange: (group: string) => void;
    onTagsChange: (tags: string[]) => void;
    onThumbnailChange: (thumbnail: string) => void;
    targetId?: string; // ID for directory generation
}

export function ArticleMetadataEditor({
    project,
    group,
    tags,
    thumbnail,
    onProjectChange,
    onGroupChange,
    onTagsChange,
    onThumbnailChange,
    targetId = "",
}: ArticleMetadataEditorProps) {
    const [projects, setProjects] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [tagsList, setTagsList] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/header/projects`).then(res => res.json()).then(setProjects).catch(console.error);
        fetch(`${API_BASE_URL}/header/groups`).then(res => res.json()).then(setGroups).catch(console.error);
        fetch(`${API_BASE_URL}/header/tags`).then(res => res.json()).then(setTagsList).catch(console.error);
    }, []);

    const [isDragging, setIsDragging] = useState(false);

    const handleTagToggle = (tagLabel: string) => {
        if (tags.includes(tagLabel)) {
            onTagsChange(tags.filter((t) => t !== tagLabel));
        } else {
            onTagsChange([...tags, tagLabel]);
        }
    };

    const processFile = async (file: File) => {
        if (file && file.type.startsWith('image/')) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('purpose', 'thumbnails');
                formData.append('target_id', targetId || 'new');

                const response = await fetch(`${API_BASE_URL}/admin/media`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const data = await response.json();
                onThumbnailChange(data.url); // アップロード済みのURLをセットする
            } catch (error) {
                console.error("Thumbnail upload error:", error);
                alert('サムネイルのアップロードに失敗しました。');
            }
        }
    };

    const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    const commonInputClass = "w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 text-sm appearance-none";
    const labelClass = "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 pl-1";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-6">
                <AdminCard className="p-8 space-y-6">
                    <div>
                        <label className={labelClass}>プロジェクト</label>
                        <AdminSelect
                            value={project}
                            onChange={onProjectChange}
                            options={[{ label: "選択なし", value: "none" }, ...projects.map(p => ({ label: p.label, value: p.value || p.label }))]}
                            placeholder="プロジェクトを選択"
                            title="Select Project"
                        />
                    </div>
                    <div>
                        <label className={labelClass}>グループ</label>
                        <AdminSelect
                            value={group}
                            onChange={onGroupChange}
                            options={[{ label: "選択なし", value: "none" }, ...groups.map(g => ({ label: g.label, value: g.value || g.label }))]}
                            placeholder="グループを選択"
                            title="Select Group"
                        />
                    </div>
                </AdminCard>

                <AdminCard className="p-8">
                    <label className={labelClass}>タグ</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className={`${commonInputClass} text-left flex items-center justify-between`}>
                                <span className="truncate">{tags.length > 0 ? tags.join(", ") : "タグを選択"}</span>
                                <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0 rounded-[1.5rem] border-gray-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Select Tags</span>
                                <span className="text-[10px] font-bold text-gray-400">{tags.length} selected</span>
                            </div>
                            <div className="max-h-[300px] overflow-auto p-4 space-y-1">
                                {tagsList.map((tagItem, idx) => (
                                    <div key={idx} className={`flex items-center space-x-3 p-3 rounded-xl transition-colors cursor-pointer ${tags.includes(tagItem.label) ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50'}`} onClick={() => handleTagToggle(tagItem.label)}>
                                        <Checkbox checked={tags.includes(tagItem.label)} onCheckedChange={() => handleTagToggle(tagItem.label)} className="border-gray-200 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" />
                                        <label className="flex-1 cursor-pointer select-none font-bold text-sm text-gray-700">{tagItem.label}</label>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {tags.map((tag, idx) => (
                                <span key={idx} className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1 animate-in zoom-in duration-200">
                                    {tag} <X className="w-3 h-3 cursor-pointer hover:text-emerald-800" onClick={() => handleTagToggle(tag)} />
                                </span>
                            ))}
                        </div>
                    )}
                </AdminCard>
            </div>

            <div className="space-y-6">
                <AdminCard className="p-0 overflow-hidden">
                    <div
                        className={`w-full h-full p-8 flex flex-col items-center justify-center min-h-[400px] relative transition-colors ${isDragging ? 'border-2 border-emerald-500 bg-emerald-50/50 border-dashed m-1 rounded-2xl' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <label className={labelClass + " absolute top-8 left-8"}>サムネイル画像</label>
                        {thumbnail ? (
                            <div className="w-full h-full flex flex-col gap-6">
                                <div className="relative group w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-inner">
                                    <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <AdminButton variant="danger" onClick={() => onThumbnailChange('')} icon={<Trash2 className="w-4 h-4" />}>削除</AdminButton>
                                    </div>
                                </div>
                                <div className="flex justify-center"><AdminButton variant="secondary" icon={<Upload className="w-4 h-4" />} onClick={() => fileInputRef.current?.click()}>貼り替え</AdminButton></div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center"><Upload className="w-8 h-8 text-gray-300" /></div>
                                <div className="text-center">
                                    <p className="font-bold text-gray-400 text-sm">画像をここにドロップ</p>
                                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1">Recommended size: 1200x630px</p>
                                </div>
                                <AdminButton variant="secondary" icon={<Upload className="w-4 h-4" />} onClick={() => fileInputRef.current?.click()}>アップロード</AdminButton>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleThumbnailUpload} />
                    </div>
                </AdminCard>
            </div>
        </div>
    );
}
