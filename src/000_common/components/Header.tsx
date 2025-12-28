import { useState } from "react";
import {
  Twitter,
  Github,
  Youtube,
  Search,
  X,
} from "lucide-react";
import { DropdownMenu } from "./DropdownMenu";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const projectItems = [
    { label: "Game Dev", href: "#game-dev" },
    { label: "AI / Research", href: "#ai-research" },
    { label: "Systems / Web", href: "#systems-web" },
    { label: "Robotics", href: "#robotics" },
    { label: "すべて見る", href: "#all-projects" },
  ];

  const tagItems = [
    { label: "Unity", href: "#tag-unity" },
    { label: "React", href: "#tag-react" },
    { label: "Python", href: "#tag-python" },
    { label: "AI / ML", href: "#tag-ai" },
    { label: "TypeScript", href: "#tag-typescript" },
    { label: "すべてのタグ", href: "#all-tags" },
  ];

  const writerItems = [
    { label: "こうち", href: "#writer-kouchi" },
    { label: "山田", href: "#writer-yamada" },
    { label: "Sato", href: "#writer-sato" },
    { label: "田中", href: "#writer-tanaka" },
    { label: "佐藤", href: "#writer-satou" },
    { label: "すべてのライター", href: "#all-writers" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between backdrop-blur-md bg-[#67e0b8]/40 rounded-xl px-6 py-3 border border-[#67e0b8]/50">
          <div
            className="flex items-center gap-3 text-white"
            style={{
              textShadow:
                "2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1708634421109-18f3309dffa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwbG9nbyUyMG1pbmltYWx8ZW58MXx8fHwxNzY0NTY3MDk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Opu Coder Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
            Opu Coder Tech Blog
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/opucoder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors bg-[#2d7a5f] p-2 rounded-full"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/opucoder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors bg-[#2d7a5f] p-2 rounded-full"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@opucoder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors bg-[#2d7a5f] p-2 rounded-full"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <nav
              className="hidden md:flex items-center gap-6"
              style={{
                textShadow:
                  "2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)",
              }}
            >
              <a
                href="#home"
                className="text-white hover:text-white/80 transition-colors"
              >
                Home
              </a>
              <DropdownMenu
                label="Projects"
                items={projectItems}
              />
              <DropdownMenu label="Tags" items={tagItems} />
              <DropdownMenu
                label="Writers"
                items={writerItems}
              />
              <a
                href="#about"
                className="text-white hover:text-white/80 transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-white hover:text-white/80 transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="relative hidden md:flex items-center">
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                className="bg-white/10 text-black placeholder-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#67e0b8]/20 transition-all w-48"
              />
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchActive(false);
                }}
                className="absolute right-3 text-gray-700 hover:text-black transition-colors"
              >
                {searchQuery ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
