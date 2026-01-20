import React from "react";
import { User, ShieldCheck, FileText, Settings, UserCircle, Users, LogOut, Menu } from "lucide-react";
import { UserInfo } from "../hooks/useAdminAuth";
import { cn } from "@/P00_common/ui/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/P00_common/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/P00_common/ui/sheet";

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

    const handleLogout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navLinks = [
        { label: "記事・コメント管理", path: "/article_management", icon: <FileText className="w-3.5 h-3.5" /> },
        { label: "マスタ管理", path: "/master_management", icon: <Settings className="w-3.5 h-3.5" /> },
        { label: "クリエイター管理", path: "/creator_management", icon: <UserCircle className="w-3.5 h-3.5" />, adminOnly: true },
        { label: "アカウント管理", path: "/account_management", icon: <Users className="w-3.5 h-3.5" />, adminOnly: true },
    ];

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-4 sm:gap-5">
                {/* Top Row: Brand & Profile */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 lg:gap-6">
                        {/* Mobile Menu Trigger */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <button className="p-2 hover:bg-emerald-50 rounded-xl text-emerald-600 transition-colors">
                                        <Menu className="w-6 h-6" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[280px] p-0 border-r-emerald-100 bg-white shadow-2xl">
                                    <SheetHeader className="p-6 border-b border-emerald-50 bg-emerald-50/30">
                                        <SheetTitle className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                                <ShieldCheck className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <h2 className="text-sm font-black text-gray-800 uppercase tracking-tighter">Admin Menu</h2>
                                                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest leading-none mt-0.5">Terminal System</p>
                                            </div>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <div className="p-4 space-y-2">
                                        <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Main Navigation</p>
                                        {navLinks.map((link) => {
                                            const isActive = currentPath === link.path || (link.path === "/article_management" && currentPath.startsWith("/editor"));
                                            if (link.adminOnly && userInfo?.role !== 'admin') return null;

                                            return (
                                                <a
                                                    key={link.path}
                                                    href={link.path}
                                                    className={cn(
                                                        "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm",
                                                        isActive
                                                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                                                            : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
                                                    )}
                                                >
                                                    {link.icon}
                                                    {link.label}
                                                </a>
                                            );
                                        })}
                                        <div className="pt-4 mt-4 border-t border-emerald-50">
                                            <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Settings</p>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm text-red-500 hover:bg-red-50"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                ログアウト
                                            </button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200 transition-transform hover:rotate-3 shrink-0">
                                {icon}
                            </div>
                            <div>
                                <h1 className="text-base sm:text-lg lg:text-xl font-black text-gray-800 uppercase tracking-tighter leading-none">
                                    {title}
                                </h1>
                                <p className="text-[8px] sm:text-[10px] text-emerald-600 font-black uppercase tracking-widest leading-none mt-1">
                                    {subtitle}
                                </p>
                            </div>
                        </div>

                        {/* PC Navigation Items (Hidden on mobile) */}
                        <nav className="hidden lg:flex items-center gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-100/50">
                            {navLinks.map((link) => {
                                const isActive = currentPath === link.path || (link.path === "/article_management" && currentPath.startsWith("/editor"));
                                if (link.adminOnly && userInfo?.role !== 'admin') return null;

                                return (
                                    <a
                                        key={link.path}
                                        href={link.path}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all text-[11px] font-black uppercase tracking-widest",
                                            isActive
                                                ? "bg-white text-emerald-600 shadow-sm border border-emerald-100/50"
                                                : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                                        )}
                                    >
                                        <span className={cn(isActive ? "text-emerald-500" : "text-gray-400")}>{link.icon}</span>
                                        {link.label}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Profile & Session Status */}
                    <div className="flex items-center gap-2 sm:gap-6 font-sans">
                        {userInfo && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="outline-none">
                                    <div className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100/50 rounded-2xl px-2 sm:px-4 py-2 transition-all hover:bg-emerald-50 hover:border-emerald-200 cursor-pointer">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm overflow-hidden shrink-0">
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
                                        <div className="text-left hidden sm:block">
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
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 border-emerald-100 shadow-xl shadow-emerald-500/5 bg-white">
                                    <DropdownMenuLabel className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">Account Options</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-emerald-50" />
                                    <DropdownMenuItem
                                        onClick={() => window.location.href = "/creator_management"}
                                        className="rounded-xl px-3 py-2.5 flex items-center gap-3 focus:bg-emerald-50 transition-colors cursor-pointer"
                                    >
                                        <UserCircle className="w-4 h-4 text-emerald-600" />
                                        <span className="text-xs font-bold text-gray-700">アカウント管理</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="rounded-xl px-3 py-2.5 flex items-center gap-3 focus:bg-red-50 text-red-600 transition-colors cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-xs font-bold">ログアウト</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                {/* Bottom Row: Local Navigation & Actions */}
                {(navElement || rightElement) && (
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8 border-t lg:border-none border-gray-50 pt-3 lg:pt-0">
                        {navElement && (
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
                                {navElement}
                            </div>
                        )}
                        {rightElement && (
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 lg:ml-auto">
                                {rightElement}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

