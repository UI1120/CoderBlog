import { ChevronsUpDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/P00_common/ui/popover";
import { cn } from "@/P00_common/ui/utils";

interface AdminMultiSelectProps {
    values: string[];
    onChange: (values: string[]) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
    className?: string;
    popoverWidth?: string;
    title?: string;
}

export function AdminMultiSelect({
    values,
    onChange,
    options,
    placeholder = "選択してください",
    className,
    popoverWidth = "w-[300px]",
    title = "Select Option"
}: AdminMultiSelectProps) {

    // Toggle logic for multiple options
    const toggleOption = (optValue: string) => {
        // If clicking 'all', we might want to toggle all, 
        // but typically 'all' is handled separately.
        if (optValue === "all") {
            onChange(["all"]);
            return;
        }

        let newValues = values.filter(v => v !== "all");

        if (newValues.includes(optValue)) {
            newValues = newValues.filter(v => v !== optValue);
        } else {
            newValues.push(optValue);
        }

        if (newValues.length === 0) {
            onChange(["all"]);
        } else {
            onChange(newValues);
        }
    };

    // Calculate display strings
    let displayString = placeholder;
    if (values.includes("all")) {
        const allOpt = options.find(o => o.value === "all");
        displayString = allOpt ? allOpt.label : "すべて";
    } else if (values.length > 0) {
        if (values.length === 1) {
            displayString = options.find(o => o.value === values[0])?.label || placeholder;
        } else {
            displayString = `${values.length}個選択中`;
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-200 transition-all font-bold text-gray-700 text-sm flex items-center justify-between group",
                        className
                    )}
                >
                    <span className={cn("truncate", values.length === 0 && "text-gray-400 font-normal")}>
                        {displayString}
                    </span>
                    <ChevronsUpDown className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                </button>
            </PopoverTrigger>
            <PopoverContent className={cn("p-0 rounded-[1.8rem] border-gray-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200", popoverWidth)}>
                <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                        {title}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{values.includes('all') ? 'ALL' : `${values.length} SELECTED`}</span>
                </div>
                <div className="max-h-[300px] overflow-auto p-2 space-y-1">
                    {options.map((option) => {
                        const isSelected = values.includes("all") ? option.value === "all" : values.includes(option.value);
                        return (
                            <div
                                key={option.value}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer group/item",
                                    isSelected
                                        ? "bg-emerald-50 text-emerald-700 shadow-sm"
                                        : "hover:bg-gray-50 text-gray-600 hover:text-emerald-600"
                                )}
                                onClick={() => toggleOption(option.value)}
                            >
                                <span className={cn("font-bold text-sm transition-all", isSelected ? "translate-x-1" : "group-hover/item:translate-x-1")}>
                                    {option.label}
                                </span>
                                {isSelected && (
                                    <Check className="w-4 h-4 text-emerald-600 animate-in zoom-in duration-300" />
                                )}
                            </div>
                        );
                    })}
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
