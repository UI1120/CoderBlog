import { ChevronsUpDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/P00_common/ui/popover";
import { cn } from "@/P00_common/ui/utils";

interface AdminSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
    className?: string;
    popoverWidth?: string;
    title?: string;
}

export function AdminSelect({
    value,
    onChange,
    options,
    placeholder = "選択してください",
    className,
    popoverWidth = "w-[300px]",
    title = "Select Option"
}: AdminSelectProps) {
    const selectedOption = options.find((opt) => opt.value === value);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 text-sm flex items-center justify-between group",
                        className
                    )}
                >
                    <span className={cn("truncate", !selectedOption && "text-gray-400 font-normal")}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronsUpDown className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                </button>
            </PopoverTrigger>
            <PopoverContent className={cn("p-0 rounded-[1.8rem] border-gray-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200", popoverWidth)}>
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        {title}
                    </span>
                    {selectedOption && (
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active</span>
                    )}
                </div>
                <div className="max-h-[300px] overflow-auto p-2 space-y-1">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={cn(
                                "flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group/item",
                                value === option.value
                                    ? "bg-emerald-50 text-emerald-700 shadow-sm"
                                    : "hover:bg-gray-50 text-gray-600 hover:text-emerald-600"
                            )}
                            onClick={() => onChange(option.value)}
                        >
                            <span className={cn("font-bold text-sm transition-all", value === option.value ? "translate-x-1" : "group-hover/item:translate-x-1")}>
                                {option.label}
                            </span>
                            {value === option.value && (
                                <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in duration-300" />
                            )}
                        </div>
                    ))}
                    {options.length === 0 && (
                        <div className="px-6 py-8 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                            No options available
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
