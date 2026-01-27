import { http, HttpResponse } from 'msw';
import adminRole from '../auth/adminRole.json';
import userRole from '../auth/userRole.json';
import badRole from '../auth/badRole.json';

export const login_handler = [
    http.post('/api/login', async ({ request }) => {
        const { userId, password } = await request.json() as { userId?: string, password?: string };

        // 簡易的な認証ロジック (モック)
        if (userId === 'admin' && password === 'password') {
            return HttpResponse.json({
                message: 'Login successful',
                user: adminRole.user,
                needs_password_change: false
            });
        } else if (userId === 'user' && password === 'password') {
            return HttpResponse.json({
                message: 'Login successful',
                user: userRole.user,
                needs_password_change: false
            });
        } else if (userId === 'otp' && password === 'otp') {
            return HttpResponse.json({
                message: 'Login successful',
                user: {
                    account_id: 100,
                    login_name: 'otp',
                    display_name: 'OTP User',
                    role: 'user'
                },
                needs_password_change: true
            });
        }

        return HttpResponse.json(
            { message: 'Invalid credentials' },
            { status: 401 }
        );
    }),
    http.get('/api/auth', () => {
        // --- モックデータの切り替え ---
        const roleid = 0;
        const role = ["admin", "user", "bad"];
        switch (role[roleid]) {
            case "admin":
                return HttpResponse.json({ ...adminRole, needs_password_change: false }); // 管理者としてログイン中
            case "user":
                return HttpResponse.json({ ...userRole, needs_password_change: false });  // 一般ユーザーとしてログイン中
            case "bad":
            default:
                return HttpResponse.json(badRole);   // 未認証・エラー状態
        }
    }),
    http.post('/api/logout', () => {
        return HttpResponse.json({ message: 'Logout successful' });
    }),
];
