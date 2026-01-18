import React from "react";

interface AdminCardProps {
    children: React.ReactNode;
    className?: string;
}

export function AdminCard({ children, className = "" }: AdminCardProps) {
    return (
        <div className={`bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-xl shadow-gray-200/50 ${className}`}>
            {children}
        </div>
    );
}
