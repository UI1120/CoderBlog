import { http, HttpResponse } from 'msw';
import articlesData from '../articles/articles_list.json';

// Helper to map articles to the frontend Article interface
const mapArticle = (a: any) => {
    return {
        ...a,
        article_id: Number(a.id || a.article_id),
        writer_id: Number(a.writer_id || a.writerId),
        writer_name: a.writer_name || a.writer,
        writer_icon: a.writer_icon || a.writerIcon,
        project_id: Number(a.project_id || a.projectId || a.category_id || 1),
        project_name: a.project_name || a.project || a.category || "General",
        category_id: Number(a.category_id || a.projectId || 1),
        category_name: a.category_name || a.category || "General",
        thumbnail: a.thumbnail || a.image,
        published_at: a.published_at || a.date
    };
};

export const get_article_lists_handler = [
    // Highlighted projects articles (e.g., top 6 latest published)
    http.get('/api/article-lists/project-highlights', () => {
        const published = articlesData.filter((a: any) => a.status === 'published');
        const sorted = [...published].sort((a, b) => new Date(b.published_at || b.date).getTime() - new Date(a.published_at || a.date).getTime());
        return HttpResponse.json(sorted.slice(0, 6).map(mapArticle));
    }),

    // Related articles (e.g., just random subset for mock)
    http.get('/api/article-lists/related-articles', () => {
        const published = articlesData.filter((a: any) => a.status === 'published');
        return HttpResponse.json(published.slice(0, 4).map(mapArticle));
    }),

    // All published articles for projects view
    http.get('/api/projects-articles', () => {
        const published = articlesData.filter((a: any) => a.status === 'published');
        return HttpResponse.json(published.map(mapArticle));
    }),

    // Latest articles specifically for the top page carousel
    http.get('/api/article-lists/latest-articles', () => {
        const published = articlesData.filter((a: any) => a.status === 'published');
        const sorted = [...published].sort((a, b) => new Date(b.published_at || b.date).getTime() - new Date(a.published_at || a.date).getTime());
        return HttpResponse.json(sorted.slice(0, 10).map(mapArticle)); // Top 10 latest
    }),
];
