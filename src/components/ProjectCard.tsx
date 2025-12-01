import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectCardProps {
  image: string;
  category: string;
  title: string;
  date: string;
}

export function ProjectCard({ image, category, title, date }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200">
      <div className="aspect-video w-full overflow-hidden bg-gray-100">
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
        <h3 className="text-gray-900 mb-3">
          {title}
        </h3>
        <div className="text-gray-500">
          {date}
        </div>
      </div>
    </div>
  );
}