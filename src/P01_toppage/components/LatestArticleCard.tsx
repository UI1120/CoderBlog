import { ImageWithFallback } from "@/000_common/components/figma/ImageWithFallback";
import { Calendar, User } from "lucide-react";
import { ArticleCard } from "@/000_common/components/ArticleCard";

interface LatestArticleCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
  writer: string;
}

export function LatestArticleCard({
  image,
  category,
  title,
  date,
  writer,
}: LatestArticleCardProps) {
  return (
    <ArticleCard
      image={image}
      category={category}
      title={title}
      date={date}
      writer={writer}
    />
  );

  {
    /*  ミント�EチE��スカーチE */
  }
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow min-w-[280px] max-w-[280px] h-[240px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Content with Mint Overlay */}
      <div className="absolute inset-0 p-4 flex flex-col justify-end">
        <div className="backdrop-blur-md bg-[#67e0b8]/50 rounded-lg p-4 border-2 border-[#67e0b8]">
          <div className="text-[#67e0b8] mb-2 text-[14px]">
            {category}
          </div>
          <h3 className="text-white-900 mb-3 text-[16px] line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center justify-between text-white-800 gap-2 text-[12px]">
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
    </div>
  );
}
