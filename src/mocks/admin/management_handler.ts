import { http, HttpResponse } from 'msw';
import accountsData from './accounts.json';
import creatorsData from './creators.json';

export const management_handlers = [
    // アカウント管理
    http.get('/api/admin/accounts', () => {
        return HttpResponse.json(accountsData);
    }),
    http.post('/api/admin/accounts', async ({ request }) => {
        const data = await request.json();
        console.log('Account saved:', data);
        return HttpResponse.json({ message: 'Account saved successfully' });
    }),
    http.post('/api/admin/accounts/:id', async ({ request, params }) => {
        const data = await request.json();
        console.log('Account updated:', params.id, data);
        return HttpResponse.json({ message: 'Account updated successfully' });
    }),

    // クリエイター管理
    http.get('/api/admin/creators', () => {
        return HttpResponse.json(creatorsData);
    }),
    http.post('/api/admin/creators', async ({ request }) => {
        const data = await request.json();
        console.log('Creator saved:', data);
        return HttpResponse.json({ message: 'Creator saved successfully' });
    }),
    http.post('/api/admin/creators/:id', async ({ request, params }) => {
        const data = await request.json();
        console.log('Creator updated:', params.id, data);
        return HttpResponse.json({ message: 'Creator updated successfully' });
    }),
];
