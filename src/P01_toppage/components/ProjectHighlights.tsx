import { ArticleCarousel } from '@/000_common/components/ArticleCarousel';
import { useState, useEffect } from 'react';

export function ProjectHighlights() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/article-lists/project-highlights')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setProjects(data))
      .catch(err => console.error('Failed to fetch project highlights:', err));
  }, []);

  return (
    <section id="projects" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-gray-900 mb-8 text-center text-[24px]">
          活動プロジェクト
        </h2>
        {projects.length > 0 ? (
          <ArticleCarousel articles={projects} />
        ) : (
          <div className="text-center text-gray-500">読み込み中...</div>
        )}
      </div>
    </section>
  );
}
