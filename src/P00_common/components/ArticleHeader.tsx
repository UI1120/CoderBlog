import { Heart, Tag } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

interface ArticleHeaderProps {
  title: string;
  summary: string;
  category_name: string;
  category_id: string | number;
  project_name: string;
  project_id: string | number;
  tags: string[];
  writer_name: string;
  writer_id?: string | number;
  writer_icon?: string;
  group_name: string;
  group_id?: string | number;
  group_icon?: string;
  published_at: string;
  updated_at?: string;
  good_count: number;
}

export function ArticleHeader({
  title,
  summary,
  category_name,
  category_id,
  project_name,
  project_id,
  tags,
  writer_name,
  writer_id,
  writer_icon,
  group_name,
  group_id,
  group_icon,
  published_at,
  updated_at,
  good_count
}: ArticleHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* パンくず */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: category_name, href: `/project?category=${category_id}` },
            { label: project_name, href: `/project?pid=${project_id}` },
            { label: "", href: "#" },
          ]}
        />
      </div>

      {/* タグ */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags && tags.map((tag, index) => (
          <a
            key={index}
            href={`/search?q=${tag}`}
            className="px-3 py-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-1.5"
          >
            <Tag className="w-3 h-3" />
            {tag}
          </a>
        ))}
      </div>

      {/* タイトル */}
      <h1 className="text-5xl mb-4">{title}</h1>

      {/* 詳細 */}
      <p className="text-gray-700 mb-6">{summary}</p>

      {/* 投稿日時・グループ | クリエイター */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">
              {updated_at && updated_at !== published_at
                ? `更新: ${updated_at}`
                : `公開: ${published_at}`}
            </span>
            <div className="flex items-center gap-2 text-red-500">
              <Heart className="w-5 h-5 fill-current" />
              <span>{good_count}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-3">
            <a
              href={group_id ? `/creator?gid=${group_id}` : undefined}
              className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
            >
              {group_icon ? (
                <img src={group_icon} alt="" className="w-6 h-6 rounded-lg object-cover border border-gray-100 shadow-sm" />
              ) : (
                <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold">G</span>
                </div>
              )}
              <span className="font-bold">{group_name}</span>
            </a>
            <span className="text-gray-300">/</span>
            <a
              href={writer_id ? `/creator?cid=${writer_id}` : undefined}
              className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
            >
              {writer_icon ? (
                <img src={writer_icon} alt="" className="w-6 h-6 rounded-full object-cover border border-gray-100 shadow-sm" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold">W</span>
                </div>
              )}
              <span className="font-bold">{writer_name}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
