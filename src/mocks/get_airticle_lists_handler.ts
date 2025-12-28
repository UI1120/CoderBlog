import { http, HttpResponse } from 'msw';
import projectHighlights from './airticleLists/ProjectHighlights.json';
import relatedArticles from './airticleLists/RelatedArticles.json';

export const get_airticle_lists_handler = [
    http.get('/api/article-lists/project-highlights', () => {
        return HttpResponse.json(projectHighlights);
    }),
    http.get('/api/article-lists/related-articles', () => {
        return HttpResponse.json(relatedArticles);
    }),
];
