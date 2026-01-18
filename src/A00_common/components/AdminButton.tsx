import React from "react";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export function AdminButton({
    variant = "primary",
    icon,
    children,
    className = "",
    ...props
}: AdminButtonProps) {
    const baseStyles = "flex items-center justify-center gap-2 font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 shadow-lg";

    const variants = {
        primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/10",
        secondary: "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 shadow-emerald-50/50",
        danger: "bg-red-50 hover:bg-red-100 text-red-600 shadow-red-50/50",
        ghost: "bg-transparent hover:bg-gray-50 text-gray-500 shadow-none border border-transparent hover:border-gray-100"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            {children}
        </button>
    );
}
