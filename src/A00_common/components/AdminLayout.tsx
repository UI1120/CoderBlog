import React from "react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-[#f8faf9] text-gray-800 font-sans">
            {children}
        </div>
    );
}
