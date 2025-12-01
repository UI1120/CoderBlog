import { ProjectCard } from './ProjectCard';

const projects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1762742228148-f38c34ea7f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwZGV2ZWxvcG1lbnQlMjB1bml0exlbnwxfHx8fDE3NjQ0NzUzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Game Dev",
    title: "学祭向けアクションゲーム制作ログ",
    date: "2025/01/12"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1717501219687-ddce079f704b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzY0NDI1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI / Research",
    title: "AI × 数値最適化の研究進捗",
    date: "2025/01/10"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjQzODYyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Systems / Web",
    title: "サークル活動ブログ構築記録",
    date: "2025/01/08"
  }
];

export function ProjectHighlights() {
  return (
    <section className="bg-[#e8f9f4] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-12 text-center text-[24px]">
          活動ピックアップ（Projects）
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.image}
              category={project.category}
              title={project.title}
              date={project.date}
            />
          ))}
        </div>
      </div>
    </section>
  );
}