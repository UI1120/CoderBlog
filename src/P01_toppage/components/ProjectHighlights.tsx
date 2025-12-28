import { ArticleCarousel } from '@/000_common/components/ArticleCarousel';
import { useState, useEffect } from 'react';

/*
const projects = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1762742228148-f38c34ea7f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwZGV2ZWxvcG1lbnQlMjB1bml0exlbnwxfHx8fDE3NjQ0NzUzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Game Dev",
    title: "学祭向けアクションゲーム制作ログ",
    date: "2025/01/12",
    writer: "こうち"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1717501219687-ddce079f704b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzY0NDI1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI / Research",
    title: "AI ÁE数値最適化�E研究進捁E,
    date: "2025/01/10",
    writer: "山田"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjQzODYyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Systems / Web",
    title: "サークル活動ブログ構築記録",
    date: "2025/01/08",
    writer: "Sato"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1762742228148-f38c34ea7f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1lJTIwZGV2ZWxvcG1lbnQlMjB1bml0exlbnwxfHx8fDE3NjQ0NzUzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Robotics",
    title: "ロボットアーム制御プログラム開発",
    date: "2025/01/05",
    writer: "田中"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjQzODYyMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Systems / Web",
    title: "Next.js + Supabaseでアプリ開発",
    date: "2025/01/03",
    writer: "佐藤"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1717501219687-ddce079f704b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcmVzZWFyY2h8ZW58MXx8fHwxNzY0NDI1Njk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "AI / Research",
    title: "深層学習で画像認識を実裁E,
    date: "2025/01/01",
    writer: "伊藤"
  }
];
*/

export function ProjectHighlights() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/article-lists/project-highlights')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to fetch project highlights:', err));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          活動ピチE��アチE�E�E�Erojects�E�E        </h2>
        {projects.length > 0 ? (
          <ArticleCarousel articles={projects} />
        ) : (
          <div className="text-center text-gray-500">読み込み中...</div>
        )}
      </div>
    </section>
  );
}
