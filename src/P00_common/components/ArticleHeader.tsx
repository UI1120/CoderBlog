import { Heart, Tag } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

interface ArticleHeaderProps {
  title: string;
  summary: string;
  category: string;
  categoryId: string | number;
  project: string;
  projectId: string | number;
  tags: string[];
  writer: string;
  writerId?: string | number;
  writerIcon?: string;
  group: string;
  groupId?: string | number;
  groupIcon?: string;
  publishedDate: string;
  goodCount: number;
}

export function ArticleHeader({
  title,
  summary,
  category,
  categoryId,
  project,
  projectId,
  tags,
  writer,
  writerId,
  writerIcon,
  group,
  groupId,
  groupIcon,
  publishedDate,
  goodCount
}: ArticleHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* パンくず */}
      <div className="mb-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: category, href: `/project?category=${categoryId}` },
            { label: project, href: `/project?pid=${projectId}` },
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
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{publishedDate}</span>
          <div className="flex items-center gap-2 text-red-500">
            <Heart className="w-5 h-5 fill-current" />
            <span>{goodCount}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-3">
            <a
              href={groupId ? `/creator?gid=${groupId}` : undefined}
              className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
            >
              {groupIcon ? (
                <img src={groupIcon} alt="" className="w-6 h-6 rounded-lg object-cover border border-gray-100 shadow-sm" />
              ) : (
                <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold">G</span>
                </div>
              )}
              <span className="font-bold">{group}</span>
            </a>
            <span className="text-gray-300">/</span>
            <a
              href={writerId ? `/creator?cid=${writerId}` : undefined}
              className="flex items-center gap-2 hover:text-emerald-500 transition-colors"
            >
              {writerIcon ? (
                <img src={writerIcon} alt="" className="w-6 h-6 rounded-full object-cover border border-gray-100 shadow-sm" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <span className="text-[10px] font-bold">W</span>
                </div>
              )}
              <span className="font-bold">{writer}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
