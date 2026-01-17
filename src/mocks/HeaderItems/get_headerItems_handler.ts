import { http, HttpResponse } from 'msw';
import projectItems from './projectItems.json';
import tagItems from './tagItems.json';
import writerItems from './writerItems.json';
import categoryItems from './categoryItems.json';

export const get_headerItems_handler = [
    http.get('/api/header/projects', () => {
        return HttpResponse.json(projectItems);
    }),
    http.get('/api/header/tags', () => {
        return HttpResponse.json(tagItems);
    }),
    http.get('/api/header/writers', () => {
        return HttpResponse.json(writerItems);
    }),
    http.get('/api/header/categories', () => {
        return HttpResponse.json(categoryItems);
    }),
];
