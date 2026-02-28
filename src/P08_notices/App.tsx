import { useState, useEffect } from "react";
import { Header } from "@/P00_common/components/Header";
import { Footer } from "@/P00_common/components/Footer";
import { HeroSection } from "@/P00_common/components/HeroSection";
import { NoticeCard, Notice } from "@/P00_common/components/NoticeCard";
import { Pagination } from "@/P00_common/components/Pagination";
import { API_BASE_URL } from "@/constants";
import { NOTICE_LIST_CONFIG } from "@/R01_config/siteConfig";

function App() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [page, setPage] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const p = parseInt(params.get('page') || '1', 10);
        return isNaN(p) ? 1 : p;
    });
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const limit = 10;

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = () => {
            const p = parseInt(new URLSearchParams(window.location.search).get('page') || '1', 10);
            setPage(isNaN(p) ? 1 : p);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        const url = new URL(window.location.href);
        url.searchParams.set('page', newPage.toString());
        window.history.pushState({ page: newPage }, '', url.toString());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API_BASE_URL}/notices?page=${page}&limit=${limit}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.notices) {
                    setNotices(data.notices);
                    setTotalPages(data.total_pages || 1);
                } else if (Array.isArray(data)) {
                    // Fallback in case backend just returns an array
                    setNotices(data);
                    setTotalPages(1);
                }
            })
            .catch((err) => console.error("Failed to fetch notices:", err))
            .finally(() => setIsLoading(false));
    }, [page]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <HeroSection
                    title={NOTICE_LIST_CONFIG.title}
                    description={NOTICE_LIST_CONFIG.description}
                    bgImage={NOTICE_LIST_CONFIG.bgImage}
                    highlightCount={4}
                />

                <div className="container mx-auto px-6 py-16">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{NOTICE_LIST_CONFIG.loadingText}</p>
                        </div>
                    ) : notices.length > 0 ? (
                        <div className="space-y-8">
                            <NoticeCard notices={notices} className="shadow-md" />

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold italic">{NOTICE_LIST_CONFIG.emptyMessage}</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;
