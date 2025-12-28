import { http, HttpResponse } from 'msw';
import projectHighlights from './articleLists/ProjectHighlights.json';
import relatedArticles from './articleLists/RelatedArticles.json';

export const get_article_lists_handler = [
    http.get('/api/article-lists/project-highlights', () => {
        return HttpResponse.json(projectHighlights);
    }),
    http.get('/api/article-lists/related-articles', () => {
        return HttpResponse.json(relatedArticles);
    }),
];
