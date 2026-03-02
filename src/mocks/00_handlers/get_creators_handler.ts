import { http, HttpResponse } from 'msw';
import creatorsData from '../admin/creators.json';

export const get_creators_handler = [
    http.get('/api/creators', ({ request }) => {
        const url = new URL(request.url);
        const cid = url.searchParams.get('cid');
        const gid = url.searchParams.get('gid');

        // Join creators with account data if individual
        // No longer needed as icon_path is in creators table.
        const enrichedCreators = creatorsData.creators;

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
