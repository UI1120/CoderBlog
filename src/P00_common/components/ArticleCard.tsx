import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  id: number;
  image: string;
  project: string;
  projectId: number;
  title: string;
  date: string;
  writer: string;
  writerId?: number;
  writerIcon?: string;
}

export function ArticleCard({ id, image, project, projectId, title, date, writer, writerId, writerIcon }: ArticleCardProps) {
  return (
    <a href={`/article?id=${id}`} className="flex flex-col transform hover:scale-[1.02] transition-transform h-full">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 w-full max-w-[320px] h-full flex flex-col">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 flex-shrink-0">
          <ImageWithFallback
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <a
            href={`/project?pid=${projectId}`}
            className="text-[#67e0b8] mb-2 text-[14px] hover:underline transition-all z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {project}
          </a>
          <h3 className="text-gray-900 mb-3 text-[16px] line-clamp-2 flex-grow">
            {title}
          </h3>
          <div className="flex items-center justify-between text-gray-600 gap-2 text-[12px] mt-auto">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <a
              href={writerId ? `/creator?cid=${writerId}` : undefined}
              className="flex items-center gap-1 truncate hover:text-emerald-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {writerIcon ? (
                <img src={writerIcon} alt="" className="w-4 h-4 rounded-full object-cover flex-shrink-0" />
              ) : (
                <User className="w-3 h-3 flex-shrink-0" />
              )}
              <span className="truncate">{writer}</span>
            </a>
          </div>
        </div>
      </div>
    </a>
  );
}
