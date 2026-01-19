import { http, HttpResponse } from 'msw';
import article001 from './article_001.json';
import article002 from './article_002.json';
import articlesData from './articles_list.json';

const articles: Record<string, any> = {
    '1': article001,
    '2': article002,
};

let articlesList = [...articlesData];

export const get_article_handler = [
    // --- 一般・公開用 API ---

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
        const cid = url.searchParams.get('cid');
        const gid = url.searchParams.get('gid');
        const query = url.searchParams.get('q')?.toLowerCase();

        // 1. ID指定による単一取得
        if (id) {
            const found = articlesList.find(a => a.article_id === parseInt(id));
            if (found) return HttpResponse.json(found);
            return new HttpResponse(null, { status: 404 });
        }

        let filtered = [...articlesList];

        // 2. Creator ID による絞り込み
        if (cid) {
            // Mock logic: some articles match specific cid
            filtered = filtered.filter((a: any) => a.writer_id === parseInt(cid) || a.writer_id === cid);
        }

        // 3. Group ID による絞り込み
        if (gid) {
            filtered = filtered.filter((a: any) => a.group_id === parseInt(gid) || a.group_id === gid);
        }

        // 4. 検索 (公開済みのみ返すのが本来だが、モックなので全件)
        if (query) {
            filtered = filtered.filter((article: any) =>
                article.title.toLowerCase().includes(query) ||
                article.category_name.toLowerCase().includes(query) ||
                article.writer_name.toLowerCase().includes(query)
            );
        }

        return HttpResponse.json(filtered);
    }),

    // --- 管理画面用 API ---

    // 記事一覧取得 (詳細なフィルタリング対応)
    http.get('/api/admin/articles', ({ request }) => {
        const url = new URL(request.url);
        const keyword = url.searchParams.get('keyword')?.toLowerCase();
        const status = url.searchParams.get('status');
        // const categoryId = url.searchParams.get('category_id');
        // const writerId = url.searchParams.get('writer_id');

        let filtered = [...articlesList];

        if (keyword) {
            filtered = filtered.filter(a =>
                a.title.toLowerCase().includes(keyword) ||
                a.writer_name.toLowerCase().includes(keyword)
            );
        }

        if (status && status !== 'all') {
            filtered = filtered.filter(a => a.status === status);
        }

        // Note: articles_list.json currently doesn't have numeric IDs for categories/writers, 
        // so we just return filtered for now or add dummy logic if needed.

        return HttpResponse.json({
            articles: filtered,
            total_count: filtered.length,
            page: 1
        });
    }),

    // ステータス変更
    http.post('/api/admin/articles/:id/status', async ({ params, request }) => {
        const { id } = params;
        const { status } = await request.json() as { status: string };

        const index = articlesList.findIndex(a => a.article_id === parseInt(id as string));
        if (index !== -1) {
            articlesList[index] = { ...articlesList[index], status };
            return HttpResponse.json({ status: 'success', message: 'Status updated' });
        }

        return new HttpResponse(null, { status: 404 });
    }),

    // 記事操作（削除等）
    http.post('/api/admin/articles/:id', async ({ params, request }) => {
        const { id } = params;
        const { action } = await request.json() as { action: string };

        if (action === 'delete') {
            const index = articlesList.findIndex(a => a.article_id === parseInt(id as string));
            if (index !== -1) {
                articlesList.splice(index, 1);
                return HttpResponse.json({ status: 'success', message: 'Article deleted' });
            }
        }

        return new HttpResponse(null, { status: 404 });
    }),
];
