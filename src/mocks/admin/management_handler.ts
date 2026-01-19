import { http, HttpResponse } from 'msw';
import accountsData from './accounts.json';
import creatorsData from './creators.json';

export const management_handlers = [
    // アカウント管理
    http.get('/api/admin/accounts', ({ request }) => {
        const url = new URL(request.url);
        const accountId = url.searchParams.get('account_id');

        if (accountId) {
            const account = accountsData.accounts.find(a =>
                a.account_id.toString() === accountId || a.login_name === accountId
            );
            return HttpResponse.json({ accounts: account ? [account] : [] });
        }
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
    http.get('/api/admin/creators', ({ request }) => {
        const url = new URL(request.url);
        const accountId = url.searchParams.get('account_id');

        if (accountId) {
            const account = accountsData.accounts.find(a =>
                a.account_id.toString() === accountId || a.login_name === accountId
            );
            const id = account ? account.account_id : parseInt(accountId);

            if (isNaN(id)) {
                return HttpResponse.json({ creators: [] });
            }

            // Return only the individual profile linked to this account, and groups they belong to
            let individual: any = creatorsData.creators.find(c => c.account_id === id);
            if (individual) {
                const account = accountsData.accounts.find(a => a.account_id === id);
                individual = { ...individual, icon_path: account?.icon_path || '' };
            }
            const groups = creatorsData.creators.filter(c =>
                c.creator_type === 'group' &&
                c.members?.some(m => m.creator_id === individual?.creator_id)
            );
            return HttpResponse.json({ creators: individual ? [individual, ...groups] : groups });
        }
        const enriched = creatorsData.creators.map(c => {
            if (c.creator_type === 'individual' && c.account_id) {
                const account = accountsData.accounts.find(a => a.account_id === c.account_id);
                return { ...c, icon_path: account?.icon_path || '' };
            }
            return c;
        });
        return HttpResponse.json({ creators: enriched });
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
