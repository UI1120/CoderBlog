import { http, HttpResponse } from 'msw';
import articlesData from '../articles/articles_list.json';
import projectsArticles from '../articleLists/projectsArticles.json';

export const get_search_handler = [
    http.get('/api/search', ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q')?.toLowerCase() || '';

        if (!query) {
            return HttpResponse.json([]);
        }

        // Article overview (latest articles list)
        if (query === 'all') {
            return HttpResponse.json(projectsArticles);
        }

        // Return only 100 items if query is 'testcase'
        if (query === 'testcase') {
            return HttpResponse.json(articlesData.slice(0, 100));
        }

        // Filter only published articles for search
        const publishedArticles = articlesData.filter((a: any) => a.status === 'published');

        const filteredArticles = publishedArticles.filter((article: any) =>
            article.title.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query) ||
            article.writer.toLowerCase().includes(query) ||
            (article.tags && article.tags.some((t: string) => t.toLowerCase().includes(query)))
        );

        return HttpResponse.json(filteredArticles);
    }),
];
