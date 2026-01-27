import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { CardMatrix } from '@/P00_common/components/CardMatrix';
import { Pagination } from '@/P00_common/components/Pagination';
import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '@/constants';
import { PROJECT_DETAIL_CONFIG, COMMON_CONFIG } from '@/R01_config/siteConfig';

export default function ProjectDetailApp() {
    const [projectDetails, setProjectDetails] = useState<{ project_name: string; description: string; thumbnail?: string } | null>(null);
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const ITEMS_PER_PAGE = 12;
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = urlParams.get('pid');
        const p = parseInt(urlParams.get('page') || '1');

        setPage(p);
        setLoading(true);

        if (!pid) {
           window.location.href = '/notfound'; // Basic validation
           return;
        }

        // Fetch individual project details
        const fetchProjectDetails = fetch(`${API_BASE_URL}/projects?pid=${pid}`)
            .then(res => {
                if (!res.ok) throw new Error('Project not found');
                return res.json();
            })
            .then(data => setProjectDetails(data));

        // Fetch articles associated with projects (Server-side Pagination)
        const fetchArticles = fetch(`${API_BASE_URL}/articles?pid=${pid}&page=${p}&limit=${ITEMS_PER_PAGE}`)
            .then(res => res.json())
            .then(data => {
                // Ensure backend response structure is handled (P03 style)
                if (data.articles) {
                    setArticles(data.articles);
                    setTotalItems(data.total);
                } else {
                    // Fallback if backend API is not yet updated to P03 style perfectly in all mocks (defensive)
                    setArticles(Array.isArray(data) ? data : []);
                    setTotalItems(Array.isArray(data) ? data.length : 0);
                }
            });

        Promise.all([fetchProjectDetails, fetchArticles])
            .then(() => setLoading(false))
            .catch(err => {
                console.error('Failed to fetch project data:', err);
                // window.location.href = '/notfound'; // Don't strict redirect on article fetch fail
                setLoading(false);
            });
    }, []);

    // Handle browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const p = parseInt(urlParams.get('page') || '1');
            setPage(p);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Scroll to the main content top when page changes
    useEffect(() => {
        // console.log('Page changed to:', page);
        if (mainRef.current && page > 1) {
            mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        const url = new URL(window.location.href);
        url.searchParams.set('page', newPage.toString());
        // Use pushState to update URL without refreshing
        window.history.pushState({ page: newPage }, '', url.toString());
        
        // Trigger fetch somehow? 
        // NOTE: In the current useEffect design using [] dependency with window.location, we need to trigger re-fetch.
        // Actually, the cleanest way is to add [page] dependency to the main useEffect, 
        // OR reload the page (bad UX), OR updating the useEffect dependencies.
        // Let's refactor the useEffect to depend on [page] (and pid which is stable).
        
        // However, the previous implementation relied on component mounting mostly.
        // Let's correct the useEffect dependency in the next step if strictly needed, 
        // but since I'm rewriting the whole body, I can fix the dependency array now.
        // But `window.history.pushState` does NOT trigger popstate or component update by itself unless we listen to it or use state.
        // Since `page` state updates, if I put `page` in useEffect dependency, it will fetch.
    };
    
    // Refactored useEffect to trigger on page change
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = urlParams.get('pid');

        setLoading(true);

        if (!pid) return;

        // Fetch articles only when page changes (Project detail might be static but okay to refetch or separate)
        fetch(`${API_BASE_URL}/articles?pid=${pid}&page=${page}&limit=${ITEMS_PER_PAGE}`)
            .then(res => res.json())
            .then(data => {
                 if (data.articles) {
                    setArticles(data.articles);
                    setTotalItems(data.total);
                } else {
                    setArticles(Array.isArray(data) ? data : []);
                    setTotalItems(Array.isArray(data) ? data.length : 0);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
            
    }, [page]); // Dependency on page

    // Initial load for project details (run once)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = urlParams.get('pid');
        if(pid) {
             fetch(`${API_BASE_URL}/projects?pid=${pid}`)
                .then(res => res.json())
                .then(data => setProjectDetails(data))
                .catch(err => console.error(err));
        }
    }, []);


    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center"
                style={{
                    backgroundImage: `url('${projectDetails?.thumbnail || PROJECT_DETAIL_CONFIG.hero.defaultBackgroundImage}' )`,
                }}
            >
                <div className="container mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-[#2d7a5f]/70 rounded-2xl p-8 border-2 border-[#67e0b8] shadow-lg">
                        <h1 className="text-white mb-4 text-4xl font-bold drop-shadow-lg">
                            {projectDetails?.project_name || PROJECT_DETAIL_CONFIG.hero.defaultTitle}
                        </h1>
                        <p className="text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md text-xl">
                            {projectDetails?.description || PROJECT_DETAIL_CONFIG.hero.defaultDescription}
                        </p>
                    </div>
                </div>
            </section>

            <main
                ref={mainRef}
                className="container mx-auto px-6 py-12 flex-grow"
                style={{ scrollMarginTop: '100px' }}
            >
                {loading ? (
                    <div className="text-center text-gray-500">{COMMON_CONFIG.loadingText}</div>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-[#67e0b8] pl-3">
                            関連技術記事 ({totalItems})
                        </h2>
                        {articles.length > 0 ? (
                            <>
                                <CardMatrix articles={articles} />
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        ) : (
                            <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm">
                                まだ記事がありません。
                            </div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
