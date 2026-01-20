import { get_article_handler } from './00_handlers/get_article_handler';
import { get_comments_handler } from './00_handlers/get_comments_handler';
import { get_headerItems_handler } from './00_handlers/get_headerItems_handler';
import { get_notices_handler } from './00_handlers/get_notices_handler';
import { get_projects_handler } from './00_handlers/get_projects_handler';
import { login_handler } from './00_handlers/login_handler';
import { get_article_lists_handler } from './00_handlers/get_article_lists_handler';
import { get_image_upload_handler } from './00_handlers/get_image_upload_handler';
import { admin_management_handler } from './00_handlers/admin_management_handler';
import { management_handlers } from './00_handlers/management_handler';
import { get_creators_handler } from './00_handlers/get_creators_handler';
import { dashboard_handler } from './00_handlers/dashboard_handler';
import { get_categories_handler } from './00_handlers/get_categories_handler';
import { get_tags_handler } from './00_handlers/get_tags_handler';

export const handlers = [
    ...get_article_handler,
    ...get_comments_handler,
    ...get_headerItems_handler,
    ...get_notices_handler,
    ...get_projects_handler,
    ...login_handler,
    ...get_article_lists_handler,
    ...get_image_upload_handler,
    ...management_handlers,
    ...admin_management_handler,
    ...get_creators_handler,
    ...dashboard_handler,
    ...get_categories_handler,
    ...get_tags_handler,
];
