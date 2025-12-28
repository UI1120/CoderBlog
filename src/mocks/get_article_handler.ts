import { http, HttpResponse } from 'msw';
import article001 from './articles/article_001.json';
import article002 from './articles/article_002.json';

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

        if (id && articles[id]) {
            return HttpResponse.json(articles[id]);
        }

        // id が指定されていない、または見つからない場合は404
        return new HttpResponse(null, { status: 404 });
    }),
];
