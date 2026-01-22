import { http, HttpResponse } from 'msw';
import tagItems from '../HeaderItems/tagItems.json';
import categoryItems from '../HeaderItems/categoryItems.json';

import masterData from '../admin/admin_master.json';

// In-memory clones for management simulation
let categories = categoryItems.map((c: any, i: number) => ({ category_id: i + 1, category_name: c.label }));
let tags = tagItems.map((t: any, i: number) => ({ tag_id: i + 1, tag_name: t.label }));

let accounts = [...masterData.accounts];
let projects = [...masterData.projects];

export const admin_management_handler = [
    // --- CATEGORIES ---
    http.get('/api/admin/categories', () => {
        return HttpResponse.json({ categories });
    }),
    http.post('/api/admin/categories', async ({ request }) => {
        const body = await request.json() as any;
        const newCategory = { category_id: categories.length + 1, ...body };
        categories.push(newCategory);
        return HttpResponse.json(newCategory);
    }),
    http.post('/api/admin/categories/:id', async ({ params, request }) => {
        const { id } = params;
        const body = await request.json() as any;
        const targetId = parseInt(id as string);
        categories = categories.map(c => c.category_id === targetId ? { ...c, ...body } : c);
        return HttpResponse.json({ status: 'success' });
    }),
    http.post('/api/admin/categories/:id/delete', async ({ params }) => {
        const { id } = params;
        const targetId = parseInt(id as string);
        categories = categories.filter(c => c.category_id !== targetId);
        return HttpResponse.json({ status: 'success' });
    }),

    // --- TAGS ---
    http.get('/api/admin/tags', () => {
        return HttpResponse.json({ tags });
    }),
    http.post('/api/admin/tags', async ({ request }) => {
        const body = await request.json() as any;
        const newTag = { tag_id: tags.length + 1, ...body };
        tags.push(newTag);
        return HttpResponse.json(newTag);
    }),
    http.post('/api/admin/tags/:id', async ({ params, request }) => {
        const { id } = params;
        const body = await request.json() as any;
        const targetId = parseInt(id as string);
        tags = tags.map(t => t.tag_id === targetId ? { ...t, ...body } : t);
        return HttpResponse.json({ status: 'success' });
    }),
    http.post('/api/admin/tags/:id/delete', async ({ params }) => {
        const { id } = params;
        const targetId = parseInt(id as string);
        tags = tags.filter(t => t.tag_id !== targetId);
        return HttpResponse.json({ status: 'success' });
    }),

    // --- PROJECTS ---
    http.get('/api/admin/projects', () => {
        // Simulating join for the list view
        const projectsWithCategory = projects.map(p => {
            const cat = categories.find(c => c.category_id === p.category_id);
            return { ...p, category_name: cat?.category_name || '未分類' };
        });
        return HttpResponse.json({ projects: projectsWithCategory });
    }),
    http.post('/api/admin/projects', async ({ request }) => {
        const body = await request.json() as any;
        const newProject = { project_id: projects.length + 1, ...body };
        projects.push(newProject);
        return HttpResponse.json(newProject);
    }),
    http.post('/api/admin/projects/:id', async ({ params, request }) => {
        const { id } = params;
        const body = await request.json() as any;
        const targetId = parseInt(id as string);
        projects = projects.map(p => p.project_id === targetId ? { ...p, ...body } : p);
        return HttpResponse.json({ status: 'success' });
    }),
    http.post('/api/admin/projects/:id/delete', async ({ params }) => {
        const { id } = params;
        const targetId = parseInt(id as string);
        projects = projects.filter(p => p.project_id !== targetId);
        return HttpResponse.json({ status: 'success' });
    }),

    // --- ACCOUNTS ---
    http.get('/api/admin/accounts', () => {
        return HttpResponse.json({ accounts });
    }),
    http.post('/api/admin/accounts', async ({ request }) => {
        const body = await request.json() as any;
        const newAccount = { 
            account_id: accounts.length + 1, 
            ...body, 
            status: 'active',
            needs_password_change: true // New account requires change after OTP login
        };
        delete newAccount.password; // Don't store plain password, simulate OTP sending
        accounts.push(newAccount);
        return HttpResponse.json(newAccount);
    }),
    http.post('/api/admin/accounts/:id', async ({ params, request }) => {
        const { id } = params;
        const body = await request.json() as any;
        const targetId = parseInt(id as string);
        
        // Simulating password complexity check if updating password
        if (body.password) {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
            if (!passwordRegex.test(body.password)) {
                return new HttpResponse(JSON.stringify({ message: "Password must be 8-12 alphanumeric" }), { status: 400 });
            }
        }

        accounts = accounts.map(a => a.account_id === targetId ? { ...a, ...body } : a);
        return HttpResponse.json({ status: 'success' });
    }),
];
