import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle, KeyRound, CheckCircle2 } from 'lucide-react';
import { AdminLayout } from '@/A00_common/components/AdminLayout';
import { AdminCard } from '@/A00_common/components/AdminCard';
import { AdminButton } from '@/A00_common/components/AdminButton';
import { Toaster, toast } from 'sonner';

const App: React.FC = () => {
    // Login States
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    
    // UI/Flow States
    const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
    const [accountId, setAccountId] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Password Change States
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.needs_password_change) {
                    setNeedsPasswordChange(true);
                    setAccountId(data.user.account_id);
                    toast.info('初回ログインのためパスワードの変更が必要です');
                } else {
                    toast.success('ログインに成功しました');
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 1000);
                }
            } else {
                setError(data.message || 'ログインに失敗しました');
            }
        } catch (err) {
            setError('サーバーとの通信に失敗しました');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (newPassword !== confirmPassword) {
            setError('パスワードが一致しません');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
        if (!passwordRegex.test(newPassword)) {
            setError('パスワードは8-12文字の英数混合である必要があります');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/admin/accounts/${accountId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    password: newPassword,
                    needs_password_change: false 
                }),
            });

            if (response.ok) {
                toast.success('パスワードを設定しました。ログインを完了します。');
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1500);
            } else {
                const data = await response.json();
                setError(data.message || 'パスワードの更新に失敗しました');
            }
        } catch (err) {
            setError('サーバーとの通信に失敗しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AdminLayout>
            <Toaster position="top-center" richColors />
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 font-sans">
                <div className="w-full max-w-md space-y-8">
                    {/* Header Logo/Brand */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-emerald-600 shadow-xl shadow-emerald-200 animate-in zoom-in duration-500">
                            {needsPasswordChange ? <KeyRound className="w-10 h-10 text-white" /> : <ShieldCheck className="w-10 h-10 text-white" />}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                                {needsPasswordChange ? "Security Setup" : "Admin Terminal"}
                            </h1>
                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.3em] mt-1">
                                {needsPasswordChange ? "Update your credentials" : "OPUCoder Management System"}
                            </p>
                        </div>
                    </div>

                    <AdminCard className="p-10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

                        {!needsPasswordChange ? (
                            <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                            Account ID
                                        </label>
                                        <div className="relative group/field">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/field:text-emerald-500 transition-colors">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <input
                                                id="userId"
                                                name="userId"
                                                type="text"
                                                required
                                                disabled={isSubmitting}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 placeholder-gray-300 shadow-inner"
                                                placeholder="ユーザーID / OTP"
                                                value={userId}
                                                onChange={(e) => setUserId(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                            Password Key
                                        </label>
                                        <div className="relative group/field">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/field:text-emerald-500 transition-colors">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                disabled={isSubmitting}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 placeholder-gray-300 shadow-inner"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div>
                                    <AdminButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 rounded-2xl text-base shadow-xl shadow-emerald-600/20"
                                        icon={<ArrowRight className={isSubmitting ? "animate-pulse" : ""} />}
                                    >
                                        {isSubmitting ? "Authenticating..." : "ログイン"}
                                    </AdminButton>
                                </div>
                            </form>
                        ) : (
                            <form className="space-y-8 relative z-10" onSubmit={handlePasswordChange}>
                                <div className="space-y-6">
                                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 text-xs font-medium leading-relaxed">
                                        セキュリティ保護のため、新しいパスワードを設定してください。
                                        <div className="mt-1 text-[10px] opacity-70 font-bold">※ 8-12文字・英数混合</div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                            New Password
                                        </label>
                                        <div className="relative group/field">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/field:text-emerald-500 transition-colors">
                                                <KeyRound className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                disabled={isSubmitting}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 placeholder-gray-300 shadow-inner"
                                                placeholder="新しいパスワード"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                                            Confirm Password
                                        </label>
                                        <div className="relative group/field">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/field:text-emerald-500 transition-colors">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                disabled={isSubmitting}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 placeholder-gray-300 shadow-inner"
                                                placeholder="パスワード（確認）"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div>
                                    <AdminButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 rounded-2xl text-base shadow-xl shadow-emerald-600/20"
                                        icon={<ArrowRight className={isSubmitting ? "animate-pulse" : ""} />}
                                    >
                                        {isSubmitting ? "Setting Up..." : "パスワードを設定して完了"}
                                    </AdminButton>
                                </div>
                            </form>
                        )}
                    </AdminCard>

                    {/* Footer System Info */}
                    <div className="text-center space-y-6 pt-4">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] leading-relaxed">
                            Authorized personnel only.<br />
                            Unauthorized access will be logged and monitored.
                        </p>
                        <div className="h-[2px] w-8 bg-emerald-100 mx-auto rounded-full" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default App;
