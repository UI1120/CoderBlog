import React from "react";
import { cn } from "@/P00_common/ui/utils";

interface AdminTabGroupProps {
    children: React.ReactNode;
    className?: string;
}

export function AdminTabGroup({ children, className }: AdminTabGroupProps) {
    return (
        <div className={cn(
            "flex items-center gap-1 bg-gray-100/50 p-1 rounded-2xl border border-gray-100/50 shadow-inner",
            className
        )}>
            {children}
        </div>
    );
}

interface AdminTabProps {
    label: string;
    icon?: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
    className?: string;
}

export function AdminTab({ label, icon, isActive, onClick, className }: AdminTabProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5",
                isActive
                    ? "bg-white text-emerald-600 shadow-md shadow-emerald-500/5 border border-emerald-100/50"
                    : "text-gray-400 hover:text-gray-600 hover:bg-white/50",
                className
            )}
        >
            {icon && <div className={cn("w-4 h-4", isActive ? "text-emerald-500" : "text-gray-400")}>{icon}</div>}
            {label}
        </button>
    );
}
