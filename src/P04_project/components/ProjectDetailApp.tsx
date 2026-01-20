import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { CardMatrix } from '@/P00_common/components/CardMatrix';
import { Pagination } from '@/P00_common/components/Pagination';
import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '@/constants';
import { PROJECT_DETAIL_CONFIG, COMMON_CONFIG } from '@/R01_config/siteConfig';

export default function ProjectDetailApp() {
    const [projectDetails, setProjectDetails] = useState<{ project_name: string; description: string; thumbnail?: string } | null>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12;
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pid = urlParams.get('pid');
        const p = parseInt(urlParams.get('page') || '1');

        setPage(p);

        setLoading(true);

        // Fetch individual project details
        const fetchProjectDetails = fetch(`${API_BASE_URL}/projects?pid=${pid}`)
            .then(res => {
                if (!res.ok) throw new Error('Project not found');
                return res.json();
            })
            .then(data => setProjectDetails(data));

        // Fetch articles associated with projects
        const fetchArticles = fetch(`${API_BASE_URL}/articles`)
            .then(res => res.json())
            .then(data => setProjects(data));

        Promise.all([fetchProjectDetails, fetchArticles])
            .then(() => setLoading(false))
            .catch(err => {
                console.error('Failed to fetch project data:', err);
                window.location.href = '/notfound';
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
        // We use a flag to skip the very first render if we don't want to jump on initial load
        // But usually, if page > 1, it's definitely a user action or back navigation.
        console.log('Page changed to:', page);
        if (mainRef.current) {
            mainRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [page]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        const url = new URL(window.location.href);
        url.searchParams.set('page', newPage.toString());
        // Use pushState to update URL without refreshing
        window.history.pushState({ page: newPage }, '', url.toString());
    };

    // Simple client-side pagination for prototype
    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
    const displayedProjects = projects.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

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
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {/* <button className="bg-[#67e0b8] text-gray-900 px-6 py-3 rounded-lg hover:bg-[#55c9a3] transition-colors">
                                活動紹介を見る
                            </button>
                            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/30 hover:bg-white/30 transition-colors">
                                お問い合わせ
                            </button> */}
                        </div>
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
                        <CardMatrix articles={displayedProjects} />
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
