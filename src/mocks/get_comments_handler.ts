import { http, HttpResponse } from 'msw';
import comments001 from './comments/article_001.json';
import comments002 from './comments/article_002.json';

const commentsMap: Record<string, any> = {
    '1': comments001,
    '2': comments002,
};

export const get_comments_handler = [
    http.get('/api/articles/:id/comments', ({ params }) => {
        const { id } = params;
        const comments = commentsMap[id as string];

        if (comments) {
            return HttpResponse.json(comments);
        }

        return HttpResponse.json([]);
    }),
];
