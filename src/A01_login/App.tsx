import React, { useState } from 'react';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { AdminLayout } from '@/A00_common/components/AdminLayout';
import { AdminCard } from '@/A00_common/components/AdminCard';
import { AdminButton } from '@/A00_common/components/AdminButton';

const App: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

            if (response.ok) {
                // ログイン成功時
                window.location.href = '/editor';
            } else {
                const data = await response.json();
                setError(data.message || 'ログインに失敗しました');
            }
        } catch (err) {
            setError('サーバーとの通信に失敗しました');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AdminLayout>
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 font-sans">
                <div className="w-full max-w-md space-y-8">
                    {/* Header Logo/Brand */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-emerald-600 shadow-xl shadow-emerald-200 animate-in zoom-in duration-500">
                            <ShieldCheck className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter">
                                Admin Terminal
                            </h1>
                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.3em] mt-1">
                                OPUCoder Management System
                            </p>
                        </div>
                    </div>

                    <AdminCard className="p-10 shadow-2xl relative overflow-hidden group">
                        {/* Subtle decorative background */}
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

                        <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* User ID Input */}
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
                                            placeholder="ユーザーID"
                                            value={userId}
                                            onChange={(e) => setUserId(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
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

                            {/* Error Message */}
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
