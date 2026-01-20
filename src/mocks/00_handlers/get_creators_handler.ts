import { http, HttpResponse } from 'msw';
import creatorsData from '../admin/creators.json';
import accountsData from '../admin/accounts.json';

export const get_creators_handler = [
    http.get('/api/creators', ({ request }) => {
        const url = new URL(request.url);
        const cid = url.searchParams.get('cid');
        const gid = url.searchParams.get('gid');

        // Join creators with account data if individual
        // Note: according to DB design, individual icons are in accounts table.
        // Private data like email/role should not be exposed in the public API.
        const enrichedCreators = creatorsData.creators.map(creator => {
            if (creator.creator_type === 'individual' && creator.account_id) {
                const account = accountsData.accounts.find(a => a.account_id === creator.account_id);
                return {
                    creator_id: creator.creator_id,
                    creator_type: creator.creator_type,
                    display_name: creator.display_name,
                    profile: creator.profile,
                    icon_path: account?.icon_path || '',
                    // DO NOT expose email, role, status, last_login_at here
                };
            }
            // For groups, return as is (plus members if applicable)
            return creator;
        });

        if (cid) {
            const creator = enrichedCreators.find(c => c.creator_id.toString() === cid && c.creator_type === 'individual');
            if (creator) return HttpResponse.json(creator);
            return new HttpResponse(null, { status: 404 });
        }

        if (gid) {
            const group = enrichedCreators.find(c => c.creator_id.toString() === gid && c.creator_type === 'group');
            if (group) return HttpResponse.json(group);
            return new HttpResponse(null, { status: 404 });
        }

        return HttpResponse.json(enrichedCreators);
    }),
];
