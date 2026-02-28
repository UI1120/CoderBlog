import { useState, useEffect } from 'react';
import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { HeroSection } from '@/P00_common/components/HeroSection';
import { API_BASE_URL } from '@/constants';
import { CATEGORY_LIST_CONFIG } from '@/R01_config/siteConfig';
import { LayoutGrid, ArrowRight } from 'lucide-react';

export default function App() {
    const [categories, setCategories] = useState<{ id: string | number, label: string, articleCount?: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/categories`)
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch categories:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <HeroSection
                    title={CATEGORY_LIST_CONFIG.title}
                    description={CATEGORY_LIST_CONFIG.description}
                    bgImage={CATEGORY_LIST_CONFIG.bgImage}
                    highlightCount={5}
                />

                <div className="container mx-auto px-6 py-16">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{CATEGORY_LIST_CONFIG.loadingText}</p>
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((cat) => (
                                <a
                                    key={cat.id}
                                    href={`/search?q=${encodeURIComponent(cat.label)}`}
                                    className="group bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                            <LayoutGrid className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl font-black text-gray-800 tracking-tight group-hover:text-emerald-700 transition-colors">
                                                    {cat.label}
                                                </span>
                                                {cat.articleCount !== undefined && (
                                                    <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-black text-gray-400 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                                        {cat.articleCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold italic">{CATEGORY_LIST_CONFIG.emptyMessage}</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
