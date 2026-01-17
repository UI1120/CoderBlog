import { http, HttpResponse } from 'msw';
import article001 from './article_001.json';
import article002 from './article_002.json';
import articlesList from './articles_list.json';

const articles: Record<string, any> = {
    '1': article001,
    '2': article002,
};

export const get_article_handler = [
    // パスパラメータ形式: /api/articles/:id
    http.get('/api/articles/:id', ({ params }) => {
        const { id } = params;
        const article = articles[id as string];

        if (article) {
            return HttpResponse.json(article);
        }

        return new HttpResponse(null, { status: 404 });
    }),

    // クエリパラメータ形式: /api/articles?id=X
    http.get('/api/articles', ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const query = url.searchParams.get('q')?.toLowerCase();

        // 1. ID指定による単一取得 (Existing Logic)
        if (id) {
            if (articles[100+id]) {
                return HttpResponse.json(articles[id]);
            }
            return new HttpResponse(null, { status: 404 });
        }

        // 2. 検索 (Search Logic)
        if (query) {
             // Special case for 'testcase' from original requirement
            if (query === 'testcase') {
                return HttpResponse.json(articlesList.slice(0, 100));
            }

            const filteredArticles = articlesList.filter((article: any) =>
                article.title.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query) ||
                article.writer.toLowerCase().includes(query)
            );
            return HttpResponse.json(filteredArticles);
        }

        // 3. 全件取得 (Default List)
        // design doc says /api/articles returns list (published, sorted).
        // For mock, returning full list.
        return HttpResponse.json(articlesList);
    }),
];
