import { useState, useEffect } from 'react';
import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { API_BASE_URL } from '@/constants';
import { TAG_LIST_CONFIG } from '@/R01_config/siteConfig';
import { Hash } from 'lucide-react';

export default function App() {
    const [tags, setTags] = useState<{ id: string | number, label: string, articleCount?: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_BASE_URL}/tags`)
            .then(res => res.json())
            .then(data => {
                setTags(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch tags:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            
            <main className="flex-grow">
                {/* Hero Section */}
                <section
                    className="relative bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${TAG_LIST_CONFIG.bgImage}')`,
                    }}
                >
                    <div className="container mx-auto px-6 py-24 md:py-32">
                        <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-[#2d7a5f]/70 rounded-2xl p-8 border-2 border-[#67e0b8] shadow-lg">
                            <h1 className="text-white mb-4 text-4xl font-bold drop-shadow-lg">
                                <span className="text-[#67e0b8]">{TAG_LIST_CONFIG.title.substring(0, 2)}</span>{TAG_LIST_CONFIG.title.substring(2)}
                            </h1>
                            <p className="text-gray-200 mb-0 max-w-2xl mx-auto drop-shadow-md text-xl">
                                {TAG_LIST_CONFIG.description}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-6 py-16">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{TAG_LIST_CONFIG.loadingText}</p>
                        </div>
                    ) : tags.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
                            {tags.map((tag) => (
                                <a 
                                    key={tag.id}
                                    href={`/search?q=${encodeURIComponent(tag.label)}`}
                                    className="group relative flex items-center gap-2 bg-white px-8 py-4 rounded-full border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <Hash className="w-4 h-4 text-emerald-400 group-hover:text-emerald-500 transition-colors" />
                                    <span className="text-lg font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
                                        {tag.label}
                                    </span>
                                    {tag.articleCount !== undefined && (
                                        <span className="text-[10px] font-black text-gray-300 group-hover:text-emerald-400 ml-1">
                                            ({tag.articleCount})
                                        </span>
                                    )}
                                    <div className="absolute inset-0 rounded-full ring-2 ring-emerald-500/0 group-hover:ring-emerald-500/10 transition-all scale-105 opacity-0 group-hover:opacity-100" />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
                            <p className="text-gray-400 font-bold italic">{TAG_LIST_CONFIG.emptyMessage}</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
