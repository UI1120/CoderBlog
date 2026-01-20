import { http, HttpResponse } from 'msw';
import tagItems from '../tags/tagItems.json';

export const get_tags_handler = [
    http.get('/api/tags', () => {
        return HttpResponse.json(tagItems);
    }),
];
