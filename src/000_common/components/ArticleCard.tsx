import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
  writer: string;
}

export function ArticleCard({ image, category, title, date, writer }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 min-w-[280px] max-w-[280px]">
      <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-[#67e0b8] mb-2 text-[14px]">
          {category}
        </div>
        <h3 className="text-gray-900 mb-3 text-[16px] line-clamp-2">
          {title}
        </h3>
        <div className="flex items-center justify-between text-gray-600 gap-2 text-[12px]">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1 truncate">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{writer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
