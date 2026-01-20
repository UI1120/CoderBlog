import { http, HttpResponse } from 'msw';
import articlesData from '../articles/articles_list.json';

// Helper to map articles to the frontend Article interface
const mapArticle = (a: any) => ({
    ...a,
    writerId: a.writer_id // Ensure camelCase for React components
});

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
