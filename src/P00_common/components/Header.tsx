import { useState, useEffect } from "react";
import {
  Twitter,
  Github,
  Search,
  X,
  Instagram,
  Menu,
  ChevronDown
} from "lucide-react";
import { DropdownMenu } from "./DropdownMenu";
import { FRONT_ROOT_PATH, API_BASE_URL } from "@/constants";

function MobileSection({ label, items, isOpen, onToggle }: { label: string, items: any[], isOpen: boolean, onToggle: () => void }) {
  return (
    <div className="border-b border-white/20 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-xl font-bold py-2"
      >
        {label}
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-2 flex flex-col gap-3 pl-4">
          {items.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-gray-300 hover:text-white py-1 block text-base"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenSections, setMobileOpenSections] = useState<Record<string, boolean>>({});

  const [projectItems, setProjectItems] = useState<any[]>([]);
  const [tagItems, setTagItems] = useState<any[]>([]);
  const [writerItems, setWriterItems] = useState<any[]>([]);
  const [categoryItems, setCategoryItems] = useState<any[]>([]);

  const toggleSection = (section: string) => {
    setMobileOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `${FRONT_ROOT_PATH}/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

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

    // Fetch category items
    fetch(`${API_BASE_URL}/header/categories`)
      .then(res => res.json())
      .then(data => setCategoryItems(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

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
            <span className="hidden sm:inline">Opu Coder Tech Blog</span>
            <span className="sm:hidden">Opu Coder</span>
          </a>

          {/* Desktop Nav & Socials */}
          <div className="hidden lg:flex items-center gap-4">
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
              className="flex items-center gap-6"
              style={{
                textShadow:
                  "2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)",
              }}
            >
              <DropdownMenu label="Categories" items={categoryItems} />
              <DropdownMenu
                label="Projects"
                items={projectItems}
              />
              <DropdownMenu label="Tags" items={tagItems} />
              <DropdownMenu
                label="Writers"
                items={writerItems}
              />
            </nav>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="記事を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
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
                type="button"
              >
                {searchQuery ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="メニューを開く"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#1a1a1a]/95 backdrop-blur-xl overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2"
                aria-label="メニューを閉じる"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex flex-col gap-8 text-white max-w-lg mx-auto">
              {/* Search Bar for Mobile */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="記事を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className="w-full bg-white/10 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#67e0b8] transition-all"
                />
                <button
                  onClick={() => {
                    handleSearch();
                    setIsMobileMenuOpen(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Sections */}
              <div className="flex flex-col gap-2">
                <MobileSection
                  label="Categories"
                  items={categoryItems}
                  isOpen={mobileOpenSections['categories']}
                  onToggle={() => toggleSection('categories')}
                />
                <MobileSection
                  label="Projects"
                  items={projectItems}
                  isOpen={mobileOpenSections['projects']}
                  onToggle={() => toggleSection('projects')}
                />
                <MobileSection
                  label="Tags"
                  items={tagItems}
                  isOpen={mobileOpenSections['tags']}
                  onToggle={() => toggleSection('tags')}
                />
                <MobileSection
                  label="Writers"
                  items={writerItems}
                  isOpen={mobileOpenSections['writers']}
                  onToggle={() => toggleSection('writers')}
                />
              </div>

              {/* Social Icons */}
              <div className="mt-4 flex justify-center gap-8">
                <a
                  href="https://twitter.com/opucoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#67e0b8] transition-colors"
                >
                  <Twitter className="w-8 h-8" />
                </a>
                <a
                  href="https://github.com/opucoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#67e0b8] transition-colors"
                >
                  <Github className="w-8 h-8" />
                </a>
                <a
                  href="https://instagram.com/opucoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#67e0b8] transition-colors"
                >
                  <Instagram className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

