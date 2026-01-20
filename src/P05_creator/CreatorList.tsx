import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { Pagination } from '@/P00_common/components/Pagination';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';
import { Users, User, ChevronRight } from 'lucide-react';
import { CREATOR_LIST_CONFIG, COMMON_CONFIG } from '@/R01_config/siteConfig';
import { cn } from '@/P00_common/ui/utils';

export default function CreatorList() {
    const [creators, setCreators] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'individual' | 'group'>('individual');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/creators`)
            .then(res => res.json())
            .then(data => {
                setCreators(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch creators:', err);
                setLoading(false);
            });
    }, []);

    const filteredCreators = creators.filter(c => c.creator_type === activeTab);
    const totalPages = Math.ceil(filteredCreators.length / ITEMS_PER_PAGE);
    const displayedCreators = filteredCreators.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <section
                className="relative bg-cover bg-center"
                style={{
                    backgroundImage: `url('${CREATOR_LIST_CONFIG.hero.backgroundImage}')`
                }}
            >
                <div className="container mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-[#2d7a5f]/70 rounded-2xl p-8 border-2 border-[#67e0b8] shadow-lg">
                        <h1 className="text-white text-4xl font-bold mb-4 drop-shadow-lg">
                            <span className="text-[#67e0b8]">{CREATOR_LIST_CONFIG.hero.title.substring(0, 3)}</span>{CREATOR_LIST_CONFIG.hero.title.substring(3)}
                        </h1>
                        <p className="text-gray-200 text-xl font-medium leading-relaxed drop-shadow-md">
                            {CREATOR_LIST_CONFIG.hero.description}
                        </p>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-6 py-12">
                {/* Tab Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white p-1.5 rounded-[2rem] shadow-xl border border-gray-100 flex gap-2">
                        <button
                            onClick={() => { setActiveTab('individual'); setPage(1); }}
                            className={cn(
                                "flex items-center gap-2 px-8 py-3 rounded-[1.6rem] font-black transition-all text-sm uppercase tracking-widest",
                                activeTab === 'individual'
                                    ? "bg-[#2d7a5f] text-white shadow-lg shadow-emerald-900/20"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <User className="w-4 h-4" />
                            {CREATOR_LIST_CONFIG.tabs.individuals}
                        </button>
                        <button
                            onClick={() => { setActiveTab('group'); setPage(1); }}
                            className={cn(
                                "flex items-center gap-2 px-8 py-3 rounded-[1.6rem] font-black transition-all text-sm uppercase tracking-widest",
                                activeTab === 'group'
                                    ? "bg-[#2d7a5f] text-white shadow-lg shadow-emerald-900/20"
                                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                            )}
                        >
                            <Users className="w-4 h-4" />
                            {CREATOR_LIST_CONFIG.tabs.groups}
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{COMMON_CONFIG.loadingText}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {displayedCreators.map((creator) => (
                                <a
                                    key={creator.creator_id}
                                    href={`/creator?${creator.creator_type === 'group' ? 'gid' : 'cid'}=${creator.creator_id}`}
                                    className="group block bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all border border-gray-100 hover:-translate-y-2"
                                >
                                    <div className="flex items-start gap-6 mb-6">
                                        <div className={cn(
                                            "w-20 h-20 overflow-hidden border-4 border-white shadow-xl transition-transform group-hover:rotate-3",
                                            creator.creator_type === 'group' ? "rounded-[1.5rem]" : "rounded-full"
                                        )}>
                                            <img
                                                src={creator.icon_path || COMMON_CONFIG.defaultIconUrl}
                                                alt={creator.display_name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-grow pt-2">
                                            <h3 className="text-xl font-black text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                                                {creator.display_name}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                    {creator.creator_type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                        {creator.profile || "No profile description available."}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex -space-x-3">
                                            {/* Dummy avatars for groups or just a placeholder */}
                                            {creator.creator_type === 'group' && creator.members?.slice(0, 3).map((m: any, i: number) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden ring-2 ring-emerald-50/50">
                                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m.display_name}`} alt="" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:gap-2 transition-all">
                                            {CREATOR_LIST_CONFIG.creatorCard.buttonText}
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <Pagination
                                currentPage={page}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
