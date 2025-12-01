import { ReactNode } from "react";
import { X, Github, Youtube } from "lucide-react";

interface IconButtonProps {
  href: string;
  label: string;
  children: ReactNode;
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#e8f9f4] py-5">
      <div className="container mx-auto px-8 flex items-center justify-between">

        {/* LEFT group */}
        <div className="flex items-center gap-4">

          {/* Logo block */}
          <div className="flex items-center gap-4 bg-white/30 backdrop-blur-md px-4 py-2 rounded-2xl border-4 border-[#67e0b8] shadow-lg">
            <div className="h-14 w-14 overflow-hidden rounded-md">
              <img
                src="/logo.jpg"
                alt="OpuCoder Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-gray-900 font-semibold text-lg">
              Opu Coder Blog
            </span>
          </div>
        </div>

        {/* RIGHT group */}
        <div className="flex items-center gap-4">

          {/* SNS icons */}
          <IconButton href="#x" label="X">
            <X className="w-5 h-5 text-gray-700" />
          </IconButton>

          <IconButton href="#github" label="GitHub">
            <Github className="w-5 h-5 text-gray-700" />
          </IconButton>

          <IconButton href="#youtube" label="YouTube">
            <Youtube className="w-5 h-5 text-gray-700" />
          </IconButton>

          {/* Navigation buttons */}
          {["Home", "Projects", "Tags", "Writers", "About", "Contact"].map(
            (item) => (
              <div
                key={item}
                className="bg-white/30 backdrop-blur-md px-8 py-2 rounded-2xl border-4 border-[#67e0b8] shadow-lg"
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-800 hover:text-gray-900 font-medium px-4 py-2"
                >
                  {item}
                </a>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}

function IconButton({ href, label, children }: IconButtonProps) {
  return (
    <a
      href={href}
      aria-label={label}
      className="
        w-12 h-12 flex items-center justify-center
        bg-white/30 backdrop-blur-md rounded-2xl
        border-4 border-[#67e0b8] shadow-lg
        hover:bg-white transition
      "
    >
      {children}
    </a>
  );
}
