import { Label } from "@/P00_common/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/P00_common/ui/select";
import { Button } from "@/P00_common/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/P00_common/ui/popover";
import { Checkbox } from "@/P00_common/ui/checkbox";
import { ChevronsUpDown, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/constants";

interface MetadataEditorProps {
    category: string;
    project: string;
    group: string;
    tags: string[];
    thumbnail: string;
    onCategoryChange: (category: string) => void;
    onProjectChange: (project: string) => void;
    onGroupChange: (group: string) => void;
    onTagsChange: (tags: string[]) => void;
    onThumbnailChange: (thumbnail: string) => void;
}

export function MetadataEditor({
    category,
    project,
    group,
    tags,
    thumbnail,
    onCategoryChange,
    onProjectChange,
    onGroupChange,
    onTagsChange,
    onThumbnailChange,
}: MetadataEditorProps) {
    const [categories, setCategories] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [tagsList, setTagsList] = useState<any[]>([]);

    useEffect(() => {
        // Fetch categories
        fetch(`${API_BASE_URL}/header/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error(err));

        // Fetch projects
        fetch(`${API_BASE_URL}/header/projects`)
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error(err));

        // Fetch groups
        fetch(`${API_BASE_URL}/header/groups`)
            .then(res => res.json())
            .then(data => setGroups(data))
            .catch(err => console.error(err));

        // Fetch tags
        fetch(`${API_BASE_URL}/header/tags`)
            .then(res => res.json())
            .then(data => setTagsList(data))
            .catch(err => console.error(err));
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

    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            {/* 1. サムネイル (Top Priority) */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="thumbnail">サムネイル画像</Label>
                <input
                    type="file"
                    id="thumbnail-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                />
                <label htmlFor="thumbnail-upload">
                    <Button asChild variant="outline" className="w-full">
                        <span className="cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" />
                            サムネイル画像をアップロード
                        </span>
                    </Button>
                </label>

                {thumbnail && (
                    <div className="mt-2 relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden">
                        <img
                            src={thumbnail}
                            alt="サムネイルプレビュー"
                            className="w-full h-full object-cover"
                        />
                        <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => onThumbnailChange('')}
                        >
                            削除
                        </Button>
                    </div>
                )}
            </div>

            {/* 2. カテゴリー */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="category">カテゴリー</Label>
                <Select value={category} onValueChange={onCategoryChange}>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="カテゴリーを選択" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat, idx) => (
                            <SelectItem key={idx} value={cat.label}>
                                {cat.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* 3. プロジェクト */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="project">プロジェクト</Label>
                <Select value={project} onValueChange={onProjectChange}>
                    <SelectTrigger id="project">
                        <SelectValue placeholder="プロジェクトを選択 (任意)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">選択なし</SelectItem>
                        {projects.map((proj, idx) => (
                            <SelectItem key={idx} value={proj.label}>
                                {proj.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* 4. グループ */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="group">グループ (任意)</Label>
                <Select value={group} onValueChange={onGroupChange}>
                    <SelectTrigger id="group">
                        <SelectValue placeholder="グループを選択 (任意)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">選択なし</SelectItem>
                        {groups.map((grp, idx) => (
                            <SelectItem key={idx} value={grp.label}>
                                {grp.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* 5. タグ */}
            <div className="flex flex-col gap-2">
                <Label htmlFor="tags">タグ</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="tags"
                            variant="outline"
                            role="combobox"
                            className="justify-between"
                        >
                            {tags.length > 0 ? (
                                <span className="truncate">
                                    {tags.join(", ")}
                                </span>
                            ) : (
                                "タグを選択"
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                        <div className="max-h-[300px] overflow-auto p-4">
                            <div className="flex flex-col gap-2">
                                {tagsList.map((tagItem, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                                        onClick={() => handleTagToggle(tagItem.label)}
                                    >
                                        <Checkbox
                                            id={`tag-${idx}`}
                                            checked={tags.includes(tagItem.label)}
                                            onCheckedChange={() => handleTagToggle(tagItem.label)}
                                        />
                                        <label
                                            htmlFor={`tag-${idx}`}
                                            className="flex-1 cursor-pointer select-none"
                                        >
                                            {tagItem.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                {tags.length > 0 && (
                    <p className="text-sm text-gray-600">
                        {tags.length}個のタグが選択されています
                    </p>
                )}
            </div>
        </div>
    );
}
