import { Calendar, User } from 'lucide-react';

interface ArticleListItemProps {
  date: string;
  title: string;
  writer: string;
}

export function ArticleListItem({ date, title, writer }: ArticleListItemProps) {
  return (
    <div className="border-b border-gray-200 py-4 px-6 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex-1 text-gray-900">
          {title}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          <span>{writer}</span>
        </div>
      </div>
    </div>
  );
}