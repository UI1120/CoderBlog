import React from "react";
import { User, ShieldCheck, FileText, Settings, UserCircle, Users } from "lucide-react";
import { UserInfo } from "../hooks/useAdminAuth";
import { cn } from "@/P00_common/ui/utils";

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
    const currentPath = window.location.pathname;

    const navLinks = [
        { label: "エディター", path: "/editor", icon: <FileText className="w-3.5 h-3.5" /> },
        { label: "マスタ管理", path: "/master_management", icon: <Settings className="w-3.5 h-3.5" /> },
        { label: "クリエイター", path: "/creator_management", icon: <UserCircle className="w-3.5 h-3.5" /> },
        { label: "アカウント", path: "/account_management", icon: <Users className="w-3.5 h-3.5" />, adminOnly: true },
    ];

    return (
        <div className="border-b border-emerald-100 bg-white sticky top-0 z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                                {icon}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent leading-none font-sans">
                                    {title}
                                </h1>
                                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1 font-sans">
                                    {subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="hidden lg:flex items-center gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100/50">
                            {navLinks.map((link) => {
                                if (link.adminOnly && userInfo?.role !== 'admin') return null;
                                const isActive = currentPath === link.path;
                                return (
                                    <a
                                        key={link.path}
                                        href={link.path}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-[10px] font-black uppercase tracking-widest",
                                            isActive
                                                ? "bg-white text-emerald-600 shadow-sm border border-emerald-100/50"
                                                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                                        )}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-6 font-sans">
                        {userInfo && (
                            <div className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl px-4 py-2 transition-all hover:bg-emerald-50 hover:border-emerald-200">
                                <div className="w-8 h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm overflow-hidden">
                                    {userInfo.icon_path ? (
                                        <img
                                            src={userInfo.icon_path}
                                            alt={userInfo.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        userInfo.role === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />
                                    )}
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

