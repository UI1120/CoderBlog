import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { CardMatrix } from '@/P00_common/components/CardMatrix';
import { Pagination } from '@/P00_common/components/Pagination';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';
import { Users, Sparkles, ArrowLeft } from 'lucide-react';
import { cn } from '@/P00_common/ui/utils';

interface CreatorDetailProps {
    cid: string | null;
    gid: string | null;
}

export default function CreatorDetail({ cid, gid }: CreatorDetailProps) {
    const [creator, setCreator] = useState<any>(null);
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 12;

    useEffect(() => {
        setLoading(true);
        const query = cid ? `cid=${cid}` : `gid=${gid}`;

        // Fetch creator info
        const fetchCreator = fetch(`${API_BASE_URL}/creators?${query}`)
            .then(res => {
                if (!res.ok) throw new Error('Creator not found');
                return res.json();
            })
            .then(data => setCreator(data));

        // Fetch articles by this creator/group
        const fetchArticles = fetch(`${API_BASE_URL}/articles?${query}`)
            .then(res => res.json())
            .then(data => setArticles(data));

        Promise.all([fetchCreator, fetchArticles])
            .then(() => setLoading(false))
            .catch(err => {
                console.error('Failed to fetch creator details:', err);
                window.location.href = '/notfound';
            });
    }, [cid, gid]);

    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    const displayedArticles = articles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Profile Header Section */}
            {/* Profile Header Section */}
            <div className="bg-white border-b border-gray-100 shadow-sm overflow-hidden pt-8 pb-12">
                <div className="container mx-auto px-6">
                    <a href="/creator" className="inline-flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest mb-12 hover:gap-3 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Creators
                    </a>

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        {/* Avatar Column */}
                        <div className="relative group">
                            <div className={cn(
                                "w-48 h-48 overflow-hidden border-8 border-gray-50 shadow-2xl relative z-10",
                                creator.creator_type === 'group' ? "rounded-[3rem]" : "rounded-full"
                            )}>
                                <img
                                    src={creator.icon_path || 'https://api.dicebear.com/7.x/avataaars/svg'}
                                    alt={creator.display_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className={cn(
                                "absolute w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl transition-transform group-hover:rotate-0 z-20",
                                creator.creator_type === 'group'
                                    ? "-bottom-6 -right-6 rotate-6"
                                    : "-bottom-4 -right-4 rotate-12"
                            )}>
                                {creator.creator_type === 'group' ? <Users className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
                            </div>
                        </div>

                        {/* Info Column */}
                        <div className="flex-grow">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                                    {creator.display_name}
                                </h1>
                                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ring-1 ring-emerald-100">
                                    {creator.creator_type}
                                </span>
                            </div>

                            <p className="text-gray-500 text-lg max-w-2xl leading-relaxed mb-8 font-medium">
                                {creator.profile || "This creator hasn't shared a profile description yet."}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {/* Links removed as per DB design constraints */}
                            </div>
                        </div>

                        {/* Stats Column (Desktop) */}
                        <div className="hidden lg:flex flex-col gap-4">
                            <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 w-48">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Articles</p>
                                <p className="text-4xl font-black text-gray-900">{articles.length}</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 w-48 text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Joined</p>
                                <p className="text-lg font-black text-gray-900">2024.12</p>
                            </div>
                        </div>
                    </div>

                    {/* Members showcase for Groups */}
                    {creator.creator_type === 'group' && creator.members && creator.members.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-gray-50">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Group Members</p>
                            <div className="flex flex-wrap gap-6">
                                {creator.members.map((member: any) => (
                                    <a
                                        key={member.creator_id}
                                        href={`/creator?cid=${member.creator_id}`}
                                        className="flex items-center gap-3 bg-white pr-6 py-1.5 pl-1.5 rounded-full border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all group"
                                    >
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.display_name}`} alt={member.display_name} />
                                        </div>
                                        <span className="text-sm font-black text-gray-700 group-hover:text-emerald-600">{member.display_name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Articles Grid */}
            <main className="container mx-auto px-6 py-20">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Recent Works</h2>
                    <div className="h-px flex-grow bg-gray-100" />
                </div>

                {articles.length > 0 ? (
                    <>
                        <CardMatrix articles={displayedArticles} />
                        {totalPages > 1 && (
                            <div className="mt-12">
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="bg-white rounded-[3rem] p-20 text-center border-4 border-dashed border-gray-100">
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No articles found for this creator.</p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
