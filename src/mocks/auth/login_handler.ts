import { http, HttpResponse } from 'msw';
import adminRole from './adminRole.json';
import userRole from './userRole.json';
import badRole from './badRole.json';

export const login_handler = [
    http.post('/api/login', async ({ request }) => {
        const { userId, password } = await request.json() as { userId?: string, password?: string };

        // 簡易的な認証ロジック (モック)
        if (userId === 'admin' && password === 'password') {
            return HttpResponse.json({
                message: 'Login successful',
                user: adminRole.user,
            });
        } else if (userId === 'user' && password === 'password') {
            return HttpResponse.json({
                message: 'Login successful',
                user: userRole.user,
            });
        }

        return HttpResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 }
        );
    }),
    http.get('/api/auth', () => {
        // --- モックデータの切り替え ---
        const roleid = 1;
        const role = ["admin", "user", "bad"];
        switch (role[roleid]) {
            case "admin":
                return HttpResponse.json(adminRole); // 管理者としてログイン中
            case "user":
                return HttpResponse.json(userRole);  // 一般ユーザーとしてログイン中
            case "bad":
            default:
                return HttpResponse.json(badRole);   // 未認証・エラー状態
        }
    }),
    http.post('/api/logout', () => {
        return HttpResponse.json({ message: 'Logout successful' });
    }),
];
