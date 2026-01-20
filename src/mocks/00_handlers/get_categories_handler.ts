import { http, HttpResponse } from 'msw';
import categoryItems from '../categories/categoryItems.json';

export const get_categories_handler = [
    http.get('/api/categories', () => {
        return HttpResponse.json(categoryItems);
    }),
];
