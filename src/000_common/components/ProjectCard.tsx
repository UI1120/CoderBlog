import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
}

export function ProjectCard({ image, category, title, date }: ProjectCardProps) {
  return (
    <div className="bg-[#2d6b57] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-[#67e0b8]/30">
      <div className="aspect-video w-full overflow-hidden bg-gray-800">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="text-[#67e0b8]">
          {category}
        </div>
        <h3 className="text-white mb-3">
          {title}
        </h3>
        <div className="text-gray-300">
          {date}
        </div>
      </div>
    </div>
  );
}
