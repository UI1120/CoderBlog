import { useState, useEffect } from "react";
import {
  Twitter,
  Github,
  Youtube,
  Search,
  X,
  Instagram,
} from "lucide-react";
import { DropdownMenu } from "./DropdownMenu";
import { FRONT_ROOT_PATH, API_BASE_URL } from "@/constants";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [projectItems, setProjectItems] = useState<any[]>([]);
  const [tagItems, setTagItems] = useState<any[]>([]);
  const [writerItems, setWriterItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch project items
    fetch(`${API_BASE_URL}/header/projects`)
      .then(res => res.json())
      .then(data => {
        setProjectItems([...data, { label: "すべて見る", href: "/project" }]);
      })
      .catch(err => console.error(err));

    // Fetch tag items
    fetch(`${API_BASE_URL}/header/tags`)
      .then(res => res.json())
      .then(data => setTagItems(data))
      .catch(err => console.error(err));

    // Fetch writer items
    fetch(`${API_BASE_URL}/header/writers`)
      .then(res => res.json())
      .then(data => setWriterItems(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between backdrop-blur-md bg-[#67e0b8]/40 rounded-xl px-6 py-3 border border-[#67e0b8]/50">
          <a
            href={FRONT_ROOT_PATH}
            className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
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
          </a>
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
                href="https://instagram.com/opucoder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 transition-colors bg-[#2d7a5f] p-2 rounded-full"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <nav
              className="hidden lg:flex items-center gap-6"
              style={{
                textShadow:
                  "2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)",
              }}
            >
              <a
                href={`${FRONT_ROOT_PATH}`}
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
                href={`${FRONT_ROOT_PATH}#about`}
                className="text-white hover:text-white/80 transition-colors"
              >
                About
              </a>
              <a
                href={`${FRONT_ROOT_PATH}#footer`}
                className="text-white hover:text-white/80 transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="relative hidden lg:flex items-center">
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `${FRONT_ROOT_PATH}/search?q=${encodeURIComponent(searchQuery.trim())}`;
                  }
                }}
                className="bg-white/10 text-black placeholder-gray-700 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#67e0b8]/20 transition-all w-48"
              />
              <button
                onClick={() => {
                  if (searchQuery) {
                    setSearchQuery("");
                    setIsSearchActive(false);
                  }
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

