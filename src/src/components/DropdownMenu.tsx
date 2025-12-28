import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownMenuItem {
  label: string;
  href: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownMenuItem[];
}

export function DropdownMenu({ label, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-white hover:text-white/80 transition-colors">
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg py-2 min-w-[200px] z-50">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
