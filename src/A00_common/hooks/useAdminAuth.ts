import { useState, useEffect } from "react";

export interface UserInfo {
    id: string;
    name: string;
    role: "admin" | "user";
    icon_path?: string;
}

export function useAdminAuth(requireAdmin: boolean = false) {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('/api/auth')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Server returned status ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data.user) {
                    const isAdm = data.user.role === 'admin';
                    setUser(data.user);
                    setIsAdmin(isAdm);
                    if (requireAdmin && !isAdm) {
                        window.location.href = '/baduser';
                    }
                } else {
                    // 認証失敗時は baduser ページへ遷移
                    window.location.href = '/baduser';
                }
            })
            .catch(err => {
                console.error('Auth check failed:', err);
                // Do not redirect immediately on fetch error (might be temporary network issue or MSW init)
                // window.location.href = '/baduser';
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { user, isAdmin, loading };
}
