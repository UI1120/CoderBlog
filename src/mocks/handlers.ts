import { get_article_lists_handler } from './get_article_lists_handler';
import { get_article_handler } from './get_article_handler';
import { get_comments_handler } from './get_comments_handler';

export const handlers = [
    ...get_article_lists_handler,
    ...get_article_handler,
    ...get_comments_handler,
];
