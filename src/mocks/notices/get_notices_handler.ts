import { http, HttpResponse } from 'msw';
import notices from './notices.json';

export const get_notices_handler = [
    http.get('/api/notices', () => {
        return HttpResponse.json(notices);
    }),
];
