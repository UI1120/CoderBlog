import { http, HttpResponse } from 'msw';
import notices from '../notices/notices.json';

type Notice = {
    notice_id?: number;
    date: string;
    category: string;
    title: string;
    url?: string;
    status?: string;
    expires_at?: string;
};

// ソート用関数: category "重要" が最優先で表示され、その後 date の降順
const sortNotices = (a: Notice, b: Notice) => {
    if (a.category === '重要' && b.category !== '重要') return -1;
    if (a.category !== '重要' && b.category === '重要') return 1;
    return b.date.localeCompare(a.date);
};

export const get_notices_handler = [
    // B72: 一般向け・お知らせ履歴取得
    http.get('*/api/notices', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '20', 10);

        // B72: 公開済みまたは期限切れのもののみを取得対象とする
        const filteredNotices = notices.filter(n => n.status === 'published' || n.status === 'expired');
        const sortedNotices = [...filteredNotices].sort(sortNotices);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedNotices = sortedNotices.slice(startIndex, endIndex);
        const totalPages = Math.ceil(sortedNotices.length / limit);

        return HttpResponse.json({
            notices: paginatedNotices,
            total: sortedNotices.length,
            page,
            limit,
            total_pages: totalPages
        });
    }),

    // B29: 最新お知らせ一覧取得
    http.get('*/api/notices/latest', ({ request }) => {
        const url = new URL(request.url);
        const split = url.searchParams.get('split');

        // B29: 現在公開中のもの（publishedのみ）に限定する
        const filteredNotices = notices.filter(n => n.status === 'published');
        const sortedNotices = [...filteredNotices].sort(sortNotices);

        let result = sortedNotices;
        if (split) {
            const limit = parseInt(split, 10);
            if (!isNaN(limit) && limit > 0) {
                result = sortedNotices.slice(0, limit);
            }
        }

        return HttpResponse.json(result);
    }),

    // B71: 管理者用・全お知らせ取得 (モックとしてはB72と概ね同じように振る舞わせる)
    http.get('*/api/admin/notices', ({ request }) => {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1', 10);
        const limit = parseInt(url.searchParams.get('limit') || '20', 10);

        const sortedNotices = [...notices].sort(sortNotices);

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedNotices = sortedNotices.slice(startIndex, endIndex);
        const totalPages = Math.ceil(sortedNotices.length / limit);

        return HttpResponse.json({
            notices: paginatedNotices,
            total: sortedNotices.length,
            page,
            limit,
            total_pages: totalPages
        });
    }),

    // 単一のお知らせデータ取得用 (ダッシュボードからの編集遷移など)
    http.get('*/api/admin/notices/:id', ({ params }) => {
        const id = parseInt(params.id as string, 10);
        const notice = notices.find(n => n.notice_id === id);
        if (notice) {
            return HttpResponse.json(notice);
        }
        return new HttpResponse(null, { status: 404 });
    }),
];
