import { Header } from '@/P00_common/components/Header';
import { Footer } from '@/P00_common/components/Footer';
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '@/constants';
import { PROJECT_LIST_CONFIG, COMMON_CONFIG } from '@/R01_config/siteConfig';

export default function ProjectListApp() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/projects`)
            .then(res => res.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch projects:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
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

            <main className="container mx-auto px-6 py-12">
                {loading ? (
                    <div className="text-center text-gray-500">{COMMON_CONFIG.loadingText}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
                        {projects.map((project) => (
                            <a
                                key={project.project_id}
                                href={`/project?pid=${project.project_id}`}
                                className="block transform hover:scale-[1.02] transition-transform"
                            >
                                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col md:flex-row h-full md:h-[250px]">
                                    {/* Left: Thumbnail */}
                                    <div className="md:w-1/3 lg:w-1/4 relative overflow-hidden">
                                        <img
                                            src={project.thumbnail || PROJECT_LIST_CONFIG.hero.backgroundImage}
                                            alt={project.project_name}
                                            className="w-full h-48 md:h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>

                                    {/* Right: Content */}
                                    <div className="md:w-2/3 lg:w-3/4 p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="bg-[#e8f5f1] text-[#2d7a5f] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                                    Project {project.project_id}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#2d7a5f] transition-colors line-clamp-1">
                                                {project.project_name}
                                            </h3>
                                            <p className="text-gray-600 text-lg leading-relaxed line-clamp-2 md:line-clamp-3">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div className="mt-6 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[#2d7a5f] font-bold text-lg group-hover:translate-x-1 transition-transform">
                                                <span>{PROJECT_LIST_CONFIG.projectCard.detailText}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
