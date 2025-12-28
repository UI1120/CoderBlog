import { Heart } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

interface ArticleHeaderProps {
  title: string;
  summary: string;
  category: string;
  categoryId: string;
  writer: string;
  group: string;
  publishedDate: string;
  goodCount: number;
}

export function ArticleHeader({
  title,
  summary,
  category,
  categoryId,
  writer,
  group,
  publishedDate,
  goodCount
}: ArticleHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* パンくず */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: category, href: `/category/${categoryId}` },
            { label: "Article", href: "#" },
          ]}
        />
      </div>

      {/* タグ */}
      <div className="mb-4">
        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {category}
        </span>
      </div>
      
      {/* タイトル */}
      <h1 className="text-5xl mb-4">{title}</h1>
      
      {/* 詳細 */}
      <p className="text-gray-700 mb-6">{summary}</p>
      
      {/* 投稿日時�EグチE�� | クリエイター */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{publishedDate}</span>
          <div className="flex items-center gap-2 text-red-500">
            <Heart className="w-5 h-5 fill-current" />
            <span>{goodCount}</span>
          </div>
        </div>
        <div className="text-gray-600">
          {writer} / {group}
        </div>
      </div>
    </div>
  );
}

