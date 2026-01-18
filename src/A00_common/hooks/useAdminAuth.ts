import { useState, useEffect } from "react";

export interface UserInfo {
    id: string;
    name: string;
    role: "admin" | "user";
}

export function useAdminAuth() {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('/api/auth')
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                    setIsAdmin(data.user.role === 'admin');
                } else {
                    // 認証失敗時は baduser ページへ遷移
                    window.location.href = '/baduser';
                }
            })
            .catch(err => {
                console.error('Auth check failed:', err);
                window.location.href = '/baduser';
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { user, isAdmin, loading };
}
