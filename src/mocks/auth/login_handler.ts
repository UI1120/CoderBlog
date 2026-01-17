import { http, HttpResponse } from 'msw';

export const login_handler = [
    http.post('/api/login', async ({ request }) => {
        const { userId, password } = await request.json() as { userId?: string, password?: string };

        // 簡易的な認証ロジック (モック)
        if (userId === 'admin' && password === 'password') {
            return HttpResponse.json({
                message: 'Login successful',
                user: {
                    id: 'admin',
                    name: 'Admin User',
                    role: 'admin',
                    token: 'admin_token',
                },
            });
        } else if (userId === 'user' && password === 'password') {
            return HttpResponse.json({
                message: 'Login successful',
                user: {
                    id: 'user',
                    name: 'User',
                    role: 'user',
                    token: 'user_token',
                },
            });
        }

        return HttpResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 }
        );
    }),
];
