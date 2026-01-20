import { http, HttpResponse } from 'msw';
import projectItems from '../HeaderItems/projectItems.json';
import tagItems from '../HeaderItems/tagItems.json';
import categoryItems from '../HeaderItems/categoryItems.json';

// In-memory clones for management simulation
let categories = categoryItems.map((c: any, i: number) => ({ category_id: i + 1, category_name: c.label }));
let tags = tagItems.map((t: any, i: number) => ({ tag_id: i + 1, tag_name: t.label }));
let projects = projectItems.map((p: any, i: number) => ({ project_id: i + 1, project_name: p.label, description: "プロジェクトの説明文がここに入ります。" }));

export const admin_management_handler = [
    // GET lists
    http.get('/api/admin/categories', () => {
        return HttpResponse.json({ categories });
    }),
    http.get('/api/admin/tags', () => {
        return HttpResponse.json({ tags });
    }),
    http.get('/api/admin/projects', () => {
        return HttpResponse.json({ projects });
    }),

    // CREATE or UPDATE (POST)
    http.post('/api/admin/:resource', async ({ params, request }) => {
        const { resource } = params;
        const body = await request.json() as any;

        if (resource === 'categories') {
            const newCategory = { category_id: categories.length + 1, ...body };
            categories.push(newCategory);
            return HttpResponse.json(newCategory);
        }
        if (resource === 'tags') {
            const newTag = { tag_id: tags.length + 1, ...body };
            tags.push(newTag);
            return HttpResponse.json(newTag);
        }
        if (resource === 'projects') {
            const newProject = { project_id: projects.length + 1, ...body };
            projects.push(newProject);
            return HttpResponse.json(newProject);
        }
        return new HttpResponse(null, { status: 404 });
    }),

    // UPDATE or DELETE (POST with ID)
    http.post('/api/admin/:resource/:id', async ({ params, request }) => {
        const { resource, id } = params;
        const body = await request.json() as any;
        const targetId = parseInt(id as string);

        if (body.action === 'delete') {
            if (resource === 'categories') categories = categories.filter(c => c.category_id !== targetId);
            if (resource === 'tags') tags = tags.filter(t => t.tag_id !== targetId);
            if (resource === 'projects') projects = projects.filter(p => p.project_id !== targetId);
            return HttpResponse.json({ status: 'success' });
        } else {
            // Update
            if (resource === 'categories') {
                categories = categories.map(c => c.category_id === targetId ? { ...c, ...body } : c);
            }
            if (resource === 'tags') {
                tags = tags.map(t => t.tag_id === targetId ? { ...t, ...body } : t);
            }
            if (resource === 'projects') {
                projects = projects.map(p => p.project_id === targetId ? { ...p, ...body } : p);
            }
            return HttpResponse.json({ status: 'success' });
        }
    }),
];
