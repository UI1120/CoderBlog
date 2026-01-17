import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { CardMatrix } from '@/P00_common/components/CardMatrix';
import { Pagination } from '@/P00_common/components/Pagination';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';

export default function App() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    const urlParams = new URLSearchParams(window.location.search);
    const query = (urlParams.get('q') || '').trim();
    const isAllQuery = query.toLowerCase() === 'all';

    useEffect(() => {
        const p = parseInt(new URLSearchParams(window.location.search).get('page') || '1');
        setPage(p);

        setLoading(true);
        fetch(`${API_BASE_URL}/articles?q=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch search results:', err);
                setLoading(false);
            });
    }, [query]);

    // Handle browser back/forward navigation
    useEffect(() => {
        const handlePopState = () => {
            const p = parseInt(new URLSearchParams(window.location.search).get('page') || '1');
            setPage(p);
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

    // Simple client-side pagination for prototype
    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    const displayedArticles = articles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    {isAllQuery ? '最新記事一覧' : `「${query}」の検索結果`}
                </h1>
                {loading ? (
                    <div className="text-center text-gray-500">検索中...</div>
                ) : articles.length > 0 ? (
                    <>
                        <CardMatrix articles={displayedArticles} />
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className="text-center text-gray-500">
                        該当する記事が見つかりませんでした。
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

