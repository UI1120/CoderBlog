import { http, HttpResponse } from 'msw';
import { get_airticle_lists_handler } from './get_airticle_lists_handler';
import { get_article_handler } from './get_article_handler';

export const handlers = [
    ...get_airticle_lists_handler,
    ...get_article_handler,
    // ここにAPIリクエストのハンドラーを記述します
    // 例:
    // http.get('/api/articles', () => {
    //   return HttpResponse.json([
    //     { id: '1', title: 'Mocked Article' }
    //   ]);
    // }),
];
