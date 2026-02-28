import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  article_id: number;
  thumbnail: string;
  project_name: string;
  project_id: number;
  title: string;
  published_at: string;
  writer_name: string;
  writer_id?: number;
  writer_icon?: string;
}

export function ArticleCard({ article_id, thumbnail, project_name, project_id, title, published_at, writer_name, writer_id, writer_icon }: ArticleCardProps) {
  const formattedDate = (() => {
    const d = new Date(published_at);
    if (isNaN(d.getTime())) return published_at;
    return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
  })();

  return (
    <div
      onClick={() => window.location.href = `/article?id=${article_id}`}
      className="flex flex-col transform hover:scale-[1.02] transition-transform h-full cursor-pointer"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 w-full max-w-[320px] h-full flex flex-col">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 flex-shrink-0">
          <ImageWithFallback
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <a
            href={`/project?pid=${project_id}`}
            className="text-[#67e0b8] mb-2 text-[14px] hover:underline transition-all z-10 w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            {project_name}
          </a>
          <h3 className="text-gray-900 mb-3 text-[16px] line-clamp-2 flex-grow">
            {title}
          </h3>
          <div className="flex items-center justify-between text-gray-600 gap-2 text-[12px] mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
            <a
              href={writer_id ? `/creator?cid=${writer_id}` : undefined}
              className="flex items-center gap-1 truncate hover:text-emerald-500 transition-colors z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {writer_icon ? (
                <img src={writer_icon} alt="" className="w-4 h-4 rounded-full object-cover flex-shrink-0" />
              ) : (
                <User className="w-3 h-3 flex-shrink-0" />
              )}
              <span className="truncate">{writer_name}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
