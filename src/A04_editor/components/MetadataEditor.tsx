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

interface MetadataEditorProps {
    category: string;
    project: string;
    tags: string[];
    thumbnail: string;
    onCategoryChange: (category: string) => void;
    onProjectChange: (project: string) => void;
    onTagsChange: (tags: string[]) => void;
    onThumbnailChange: (thumbnail: string) => void;
}

const CATEGORIES = [
    "技術",
    "デザイン",
    "ビジネス",
    "ライフスタイル",
    "その他",
];

const PROJECTS = [
    "プロジェクトA",
    "プロジェクトB",
    "プロジェクトC",
    "プロジェクトD",
    "個人プロジェクト",
];

const TAGS = [
    "React",
    "TypeScript",
    "CSS",
    "デザイン",
    "UI/UX",
    "パフォーマンス",
    "セキュリティ",
    "アクセシビリティ",
    "テスト",
    "ドキュメント",
];

export function MetadataEditor({
    category,
    project,
    tags,
    thumbnail,
    onCategoryChange,
    onProjectChange,
    onTagsChange,
    onThumbnailChange,
}: MetadataEditorProps) {
    const handleTagToggle = (tag: string) => {
        if (tags.includes(tag)) {
            onTagsChange(tags.filter((t) => t !== tag));
        } else {
            onTagsChange([...tags, tag]);
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
            <div className="flex flex-col gap-2">
                <Label htmlFor="category">カテゴリー</Label>
                <Select value={category} onValueChange={onCategoryChange}>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="カテゴリーを選択" />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="project">プロジェクト</Label>
                <Select value={project} onValueChange={onProjectChange}>
                    <SelectTrigger id="project">
                        <SelectValue placeholder="プロジェクトを選択" />
                    </SelectTrigger>
                    <SelectContent>
                        {PROJECTS.map((proj) => (
                            <SelectItem key={proj} value={proj}>
                                {proj}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

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
                                {TAGS.map((tag) => (
                                    <div
                                        key={tag}
                                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                                        onClick={() => handleTagToggle(tag)}
                                    >
                                        <Checkbox
                                            id={tag}
                                            checked={tags.includes(tag)}
                                            onCheckedChange={() => handleTagToggle(tag)}
                                        />
                                        <label
                                            htmlFor={tag}
                                            className="flex-1 cursor-pointer select-none"
                                        >
                                            {tag}
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
        </div>
    );
}
