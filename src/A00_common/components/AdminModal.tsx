import React from "react";
import { X } from "lucide-react";

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    maxWidth?: string;
}

export function AdminModal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    footer,
    maxWidth = "max-w-lg"
}: AdminModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-gray-900/10" onClick={onClose}></div>

            {/* Modal Content */}
            <div className={`relative bg-white border border-gray-100 rounded-[2rem] sm:rounded-[2.5rem] w-full ${maxWidth} shadow-2xl overflow-hidden animate-in zoom-in duration-300 font-sans mx-4`}>
                {/* Header */}
                <div className="bg-gray-50/50 border-b border-gray-100 px-6 sm:px-10 py-6 sm:py-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg sm:text-xl font-black text-gray-800 uppercase tracking-tighter">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-emerald-600 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mt-1">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 sm:p-3 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-10 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 sm:px-10 pb-6 sm:pb-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
