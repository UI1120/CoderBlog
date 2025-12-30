import { http, HttpResponse } from 'msw';
import projectMaster from './project_master.json';

export const get_projects_handler = [
    http.get('/api/projects', ({ request }) => {
        const url = new URL(request.url);
        const pid = url.searchParams.get('pid');

        if (pid) {
            const project = projectMaster.find(p => p.project_id === parseInt(pid));
            if (project) {
                return HttpResponse.json(project);
            } else {
                return new HttpResponse(null, { status: 404 });
            }
        }

        return HttpResponse.json(projectMaster);
    }),
];
