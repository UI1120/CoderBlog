import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { CardMatrix } from '@/P00_common/components/CardMatrix';
import { Pagination } from '@/P00_common/components/Pagination';
import { ArticleCarousel } from "@/P00_common/components/ArticleCarousel";
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';
import { Home, Search } from 'lucide-react';

export default function App() {
    const [articles, setArticles] = useState<any[]>([]);
    const [latestArticles, setLatestArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchInputValue, setSearchInputValue] = useState('');
    const ITEMS_PER_PAGE = 12;

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';
    const trimmedQuery = query.trim();
    const isAllQuery = query === '' || trimmedQuery.toLowerCase() === 'all';

    useEffect(() => {
        setSearchInputValue('');
        const p = parseInt(new URLSearchParams(window.location.search).get('page') || '1');
        setPage(p);

        setLoading(true);
        fetch(`${API_BASE_URL}/articles?q=${encodeURIComponent(trimmedQuery)}`)
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch search results:', err);
                setLoading(false);
            });

        // 検索結果が空の場合に備えて最新記事も取得しておく
        fetch(`${API_BASE_URL}/article-lists/latest-articles`)
            .then(res => res.json())
            .then(data => setLatestArticles(data))
            .catch(err => console.error('Failed to fetch latest articles:', err));
    }, [query]);

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.set('q', searchInputValue);
        url.searchParams.set('page', '1');
        window.location.href = url.toString();
    };

    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    const displayedArticles = articles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="container mx-auto px-6 py-12 flex-grow">
                <h1 className="text-3xl font-black text-gray-900 mb-12 text-center tracking-tight">
                    {isAllQuery ? '最新記事一覧' : `「${trimmedQuery}」の検索結果`}
                </h1>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">検索中...</p>
                    </div>
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
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-gray-100 text-center mb-16">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                該当する記事が見つかりませんでした
                            </h2>
                            <p className="text-gray-500 mb-10">
                                キーワードを変えて再度検索するか、トップページに戻ってみてください。
                            </p>
                            
                            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                                <a
                                    href="/"
                                    className="inline-flex items-center gap-2 bg-[#67e0b8] text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-[#55c9a3] transition-all whitespace-nowrap shadow-md hover:shadow-lg"
                                >
                                    <Home className="w-5 h-5" />
                                    トップページに戻る
                                </a>
                                
                                <form onSubmit={handleSearch} className="relative w-full max-w-md group">
                                    <input
                                        type="text"
                                        value={searchInputValue}
                                        onChange={(e) => setSearchInputValue(e.target.value)}
                                        placeholder="別のキーワードで検索..."
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl px-5 py-3 pr-12 transition-all outline-none font-medium"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 group-focus-within:text-emerald-500 transition-colors"
                                    >
                                        <Search className="w-6 h-6" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {latestArticles.length > 0 && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-emerald-500 rounded-full" />
                                    こちらの最新記事はいかがですか？
                                </h3>
                                <ArticleCarousel articles={latestArticles} />
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
