import { http, HttpResponse } from 'msw';
import projectItems from '../HeaderItems/projectItems.json';
import tagItems from '../HeaderItems/tagItems.json';
import writerItems from '../HeaderItems/writerItems.json';
import categoryItems from '../HeaderItems/categoryItems.json';
import groupItems from '../HeaderItems/groupItems.json';

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
    http.get('/api/header/groups', () => {
        return HttpResponse.json(groupItems);
    }),
];
