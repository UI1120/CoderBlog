import { http, HttpResponse } from 'msw';
import searchResults from './search_results.json';

export const get_search_handler = [
    http.get('/api/search', ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q')?.toLowerCase() || '';

        if (!query) {
            return HttpResponse.json([]);
        }

        // Return only 2 items if query is 'testcase'
        if (query === 'testcase') {
            return HttpResponse.json(searchResults.slice(0, 100));
        }

        const filteredArticles = searchResults.filter((article: any) =>
            article.title.toLowerCase().includes(query) ||
            article.category.toLowerCase().includes(query) ||
            article.writer.toLowerCase().includes(query)
        );

        return HttpResponse.json(filteredArticles);
    }),
];
