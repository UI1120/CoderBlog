import React from "react";
import { User, ShieldCheck } from "lucide-react";
import { UserInfo } from "../hooks/useAdminAuth";

interface AdminHeaderProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    rightElement?: React.ReactNode;
    navElement?: React.ReactNode;
    userInfo?: UserInfo | null;
}

export function AdminHeader({
    icon,
    title,
    subtitle,
    rightElement,
    navElement,
    userInfo
}: AdminHeaderProps) {
    return (
        <div className="border-b border-emerald-100 bg-white sticky top-0 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                            {icon}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-none font-sans">
                                {title}
                            </h1>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 font-sans">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 font-sans">
                        {userInfo && (
                            <div className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl px-4 py-2 transition-all hover:bg-emerald-50 hover:border-emerald-200">
                                <div className="w-8 h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
                                    {userInfo.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-gray-800 uppercase tracking-tight leading-none">
                                            {userInfo.name}
                                        </span>
                                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${userInfo.role === 'admin' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                            {userInfo.role}
                                        </span>
                                    </div>
                                    <p className="text-[8px] text-emerald-600/60 font-bold uppercase tracking-widest mt-0.5">
                                        Authorized Session
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="hidden md:block">
                            <div className="text-[10px] font-black text-emerald-600/20 uppercase tracking-[0.3em]">
                                System Terminal // Active
                            </div>
                        </div>
                    </div>
                </div>

                {(navElement || rightElement) && (
                    <div className="flex items-center justify-between gap-8">
                        {navElement && (
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                                {navElement}
                            </div>
                        )}
                        {rightElement && (
                            <div className="flex items-center gap-4 ml-auto">
                                {rightElement}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
