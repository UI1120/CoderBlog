import React from "react";

interface AdminTabProps {
    label: string;
    icon?: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}

export function AdminTab({ label, icon, isActive, onClick }: AdminTabProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm border ${isActive
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                    : "bg-white border-gray-100 text-gray-500 hover:border-emerald-200 hover:text-emerald-600"
                }`}
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            {label}
        </button>
    );
}
