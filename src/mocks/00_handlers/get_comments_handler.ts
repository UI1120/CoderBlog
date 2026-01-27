import { http, HttpResponse } from 'msw';
import comments001 from '../comments/article_001.json';
import comments002 from '../comments/article_002.json';
import adminCommentsData from '../admin/comments.json';

const commentsMap: Record<string, any> = {
    '1': comments001,
    '2': comments002,
};

export let adminComments = [...adminCommentsData];

export const get_comments_handler = [
    // 一般公開用：記事ごとのコメント取得
    http.get('/api/articles/:id/comments', ({ params }) => {
        const { id } = params;
        const comments = commentsMap[id as string];

        if (comments) {
            return HttpResponse.json(comments);
        }

        return HttpResponse.json([]);
    }),

    // 一般公開用：コメント投稿
    http.post('/api/articles/:id/comments', async ({ params, request }) => {
        const { id } = params;
        const body = await request.json() as any;
        
        const newComment = {
            id: Date.now().toString(),
            comment_id: Date.now(), // admin uses number
            article_id: parseInt(id as string),
            user: body.guest_name,
            guest_name: body.guest_name,
            comment: body.content,
            content: body.content,
            date: new Date().toISOString(),
            created_at: new Date().toISOString(),
            status: 'pending', // Default status
            article_title: "Mock Article Title", // Placeholder
            ip_address: "127.0.0.1" // Placeholder
        };

        // Add to Mock storage (adminComments acts as master)
        adminComments.push(newComment);
        
        // Also add to public view map for immediate feedback if we want (or wait for approval)
        // Ideally P02 only shows approved, but for UX 'optimistic update' or 'showing pending' might be desired.
        // For simple mock, let's push to the map so it appears on reload/re-fetch.
        if (!commentsMap[id as string]) {
            commentsMap[id as string] = [];
        }
        commentsMap[id as string].push(newComment);

        return HttpResponse.json({ status: 'success', message: 'Comment submitted', comment: newComment });
    }),

    // 管理画面用：全コメント取得
    http.get('/api/admin/comments', ({ request }) => {
        const url = new URL(request.url);
        const keyword = url.searchParams.get('keyword')?.toLowerCase();
        const articleId = url.searchParams.get('article_id');
        const status = url.searchParams.get('status');

        let filtered = [...adminComments];

        if (keyword) {
            filtered = filtered.filter(c =>
                c.content.toLowerCase().includes(keyword) ||
                c.guest_name.toLowerCase().includes(keyword)
            );
        }

        if (articleId) {
            filtered = filtered.filter(c => c.article_id === parseInt(articleId));
        }

        if (status && status !== 'all') {
            filtered = filtered.filter(c => c.status === status);
        }

        return HttpResponse.json({
            comments: filtered,
            total_count: filtered.length,
            page: 1
        });
    }),

    // 管理画面用：ステータス更新（承認・拒否）
    http.post('/api/admin/comments/:id/status', async ({ params, request }) => {
        const { id } = params;
        const { status } = await request.json() as { status: string };

        const index = adminComments.findIndex(c => c.comment_id === parseInt(id as string));
        if (index !== -1) {
            adminComments[index] = { ...adminComments[index], status };
            return HttpResponse.json({ status: 'success', message: 'Comment status updated' });
        }

        return new HttpResponse(null, { status: 404 });
    }),

    // 管理画面用：コメント削除
    http.post('/api/admin/comments/:id', async ({ params, request }) => {
        const { id } = params;
        const { action } = await request.json() as { action: string };

        if (action === 'delete') {
            const index = adminComments.findIndex(c => c.comment_id === parseInt(id as string));
            if (index !== -1) {
                adminComments.splice(index, 1);
                return HttpResponse.json({ status: 'success', message: 'Comment deleted' });
            }
        }

        return new HttpResponse(null, { status: 404 });
    }),
];
