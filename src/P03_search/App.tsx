import { Header } from '@/000_common/components/Header';
import { Footer } from '@/000_common/components/Footer';
import { CardMatrix } from '@/000_common/components/CardMatrix';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';

export default function App() {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q') || '';

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`)
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

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    「{query}」の検索結果
                </h1>
                {loading ? (
                    <div className="text-center text-gray-500">検索中...</div>
                ) : articles.length > 0 ? (
                    <CardMatrix articles={articles} />
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
