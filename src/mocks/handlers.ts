import { get_article_handler } from './articles/get_article_handler';
import { get_comments_handler } from './comments/get_comments_handler';
import { get_headerItems_handler } from './HeaderItems/get_headerItems_handler';
import { get_notices_handler } from './notices/get_notices_handler';
import { get_projects_handler } from './projects/get_projects_handler';
import { login_handler } from './auth/login_handler';
import { get_article_lists_handler } from './articleLists/get_article_lists_handler';
import { get_image_upload_handler } from './image/get_image_upload_handler';
import { admin_management_handler } from './admin/admin_management_handler';
import { management_handlers } from './admin/management_handler';

export const handlers = [
    ...get_article_handler,
    ...get_comments_handler,
    ...get_headerItems_handler,
    ...get_notices_handler,
    ...get_projects_handler,
    ...login_handler,
    ...get_article_lists_handler,
    ...get_image_upload_handler,
    ...admin_management_handler,
    ...management_handlers,
];

