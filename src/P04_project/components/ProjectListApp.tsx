import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';
import { PROJECT_LIST_CONFIG, COMMON_CONFIG } from '@/R01_config/siteConfig';
import { Tag, Filter, Grid } from 'lucide-react';

export default function ProjectListApp() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [categories, setCategories] = useState<{label: string, id: string}[]>([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const categoryParam = queryParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }

        setLoading(true);
        fetch(`${API_BASE_URL}/projects`)
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                
                // Extract unique categories from projects
                const uniqueCats = Array.from(new Set(data.map((p: any) => p.category_id)))
                    .filter(Boolean)
                    .map(id => {
                        const project = data.find((p: any) => p.category_id === id);
                        return { label: project.category, id: id as string };
                    });
                setCategories(uniqueCats);
                
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch projects:', err);
                setLoading(false);
            });
    }, []);

    const filteredProjects = selectedCategory === "all" 
        ? projects 
        : projects.filter(p => p.category_id === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center"
                style={{
                    backgroundImage: `url('${PROJECT_LIST_CONFIG.hero.backgroundImage}')`,
                }}
            >
                <div className="container mx-auto px-6 py-24 md:py-32">
                    <div className="max-w-3xl mx-auto text-center backdrop-blur-md bg-[#2d7a5f]/70 rounded-2xl p-8 border-2 border-[#67e0b8] shadow-lg">
                        <h1 className="text-white mb-4 text-4xl font-bold drop-shadow-lg">
                            <span className="text-[#67e0b8]">{PROJECT_LIST_CONFIG.hero.title.substring(0, 6)}</span>{PROJECT_LIST_CONFIG.hero.title.substring(6)}
                        </h1>
                        <p className="text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md text-xl">
                            {PROJECT_LIST_CONFIG.hero.description}
                        </p>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-6 py-12 flex-grow max-w-[80%]">
                {/* Filter UI */}
                <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 pb-8">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                        <button
                            onClick={() => setSelectedCategory("all")}
                            className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${selectedCategory === "all" ? "bg-[#2d7a5f] text-white shadow-lg shadow-emerald-900/10" : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"}`}
                        >
                            <Grid className="w-3.5 h-3.5" />
                            All Projects
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 ${selectedCategory === cat.id ? "bg-[#2d7a5f] text-white shadow-lg shadow-emerald-900/10" : "bg-white text-gray-400 hover:bg-gray-50 border border-gray-100"}`}
                            >
                                <Tag className="w-3.5 h-3.5" />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <Filter className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Showing {filteredProjects.length} Projects</span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-8 h-8 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{COMMON_CONFIG.loadingText}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-12">
                        {filteredProjects.map((project) => (
                            <a
                                key={project.project_id}
                                href={`/project?pid=${project.project_id}`}
                                className="group block transform hover:scale-[1.01] transition-all duration-300"
                            >
                                <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all overflow-hidden border border-gray-100 flex flex-col md:flex-row h-full md:h-[350px]">
                                    {/* Left: Thumbnail */}
                                    <div className="md:w-2/5 lg:w-1/3 relative overflow-hidden">
                                        <img
                                            src={project.thumbnail || PROJECT_LIST_CONFIG.hero.backgroundImage}
                                            alt={project.project_name}
                                            className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white/90 backdrop-blur-md text-[#2d7a5f] text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-[0.2em] shadow-sm border border-white/50">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
 
                                    {/* Right: Content */}
                                    <div className="md:w-3/5 lg:w-2/3 p-10 md:p-12 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-1 bg-emerald-500 rounded-full group-hover:w-20 transition-all duration-500" />
                                                <span className="text-[10px] font-black text-emerald-600/50 uppercase tracking-[0.3em]">
                                                    Project Spec 0{project.project_id}
                                                </span>
                                            </div>
                                            <h3 className="text-4xl font-black text-gray-900 mb-6 group-hover:text-[#2d7a5f] transition-colors leading-tight">
                                                {project.project_name}
                                            </h3>
                                            <p className="text-gray-500 text-xl leading-relaxed line-clamp-2 md:line-clamp-3 font-medium">
                                                {project.description}
                                            </p>
                                        </div>
 
                                        <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-8">
                                            <div className="flex items-center gap-4 text-[#2d7a5f] font-black text-xs uppercase tracking-[0.2em] group-hover:gap-6 transition-all">
                                                <span>{PROJECT_LIST_CONFIG.projectCard.detailText}</span>
                                                <div className="w-10 h-10 rounded-full border border-emerald-100 flex items-center justify-center group-hover:bg-[#2d7a5f] group-hover:text-white transition-all shadow-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        {filteredProjects.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No projects found in this category</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
