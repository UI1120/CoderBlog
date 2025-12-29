import { get_article_lists_handler } from './articleLists/get_article_lists_handler';
import { get_article_handler } from './articles/get_article_handler';
import { get_comments_handler } from './comments/get_comments_handler';
import { get_headerItems_handler } from './HeaderItems/get_headerItems_handler';
import { get_notices_handler } from './notices/get_notices_handler';
import { get_search_handler } from './search/get_search_handler';

export const handlers = [
    ...get_article_lists_handler,
    ...get_article_handler,
    ...get_comments_handler,
    ...get_headerItems_handler,
    ...get_notices_handler,
    ...get_search_handler,
];

