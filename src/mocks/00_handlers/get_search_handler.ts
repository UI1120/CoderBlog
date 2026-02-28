import { http, HttpResponse } from 'msw';
import articlesData from '../articles/articles_list.json';
import projectsArticles from '../articleLists/projectsArticles.json';

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

export const get_search_handler = [
    http.get('/api/search', ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q')?.toLowerCase() || '';

        if (!query) {
            return HttpResponse.json([]);
        }

        // Article overview (latest articles list)
        if (query === 'all') {
            return HttpResponse.json(projectsArticles.map(mapArticle));
        }

        // Return only 100 items if query is 'testcase'
        if (query === 'testcase') {
            return HttpResponse.json(articlesData.slice(0, 100).map(mapArticle));
        }

        // Filter only published articles for search
        const publishedArticles = articlesData.filter((a: any) => a.status === 'published');

        const filteredArticles = publishedArticles.filter((article: any) =>
            article.title.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query) ||
            article.writer.toLowerCase().includes(query) ||
            (article.tags && article.tags.some((t: string) => t.toLowerCase().includes(query)))
        );

        return HttpResponse.json(filteredArticles.map(mapArticle));
    }),
];
