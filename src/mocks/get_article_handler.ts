import { http, HttpResponse } from 'msw';
import article001 from './articles/airticle_001.json';

export const get_article_handler = [
    http.get('/api/articles/:id', ({ params }) => {
        const { id } = params;

        // 現在は ID 1 のみモックが対応
        if (id === '1') {
            return HttpResponse.json(article001);
        }

        return new HttpResponse(null, { status: 404 });
    }),
];
