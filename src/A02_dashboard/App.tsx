import { useState, useEffect } from "react";
import { LayoutDashboard } from "lucide-react";
import { AdminLayout } from "@/A00_common/components/AdminLayout";
import { AdminHeader } from "@/A00_common/components/AdminHeader";
import { useAdminAuth } from "@/A00_common/hooks/useAdminAuth";
import { API_BASE_URL } from "@/constants";
import { DashboardStats } from "./components/DashboardStats";
import { RecentActivity } from "./components/RecentActivity";
import { ActivityGraph } from "./components/ActivityGraph";

export default function App() {
    const { user, isAdmin, loading: authLoading } = useAdminAuth();
    const [stats, setStats] = useState<any>(null);
    const [graphData, setGraphData] = useState<any[]>([]);
    const [drafts, setDrafts] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMetric, setActiveMetric] = useState<'pv' | 'likes' | 'articles'>('pv');
    const [aggregationMode, setAggregationMode] = useState<'weekly' | 'cumulative'>('weekly');

    useEffect(() => {
        if (!authLoading && user) {
            setLoading(true);
            fetch(`${API_BASE_URL}/admin/dashboard/status`)
                .then(res => res.json())
                .then(data => {
                    setStats(data.stats);
                    setGraphData(data.graph_data || []);
                    setDrafts(data.draft_articles || []);
                    setComments(data.pending_comments || []);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch dashboard data:", err);
                    setLoading(false);
                });
        }
    }, [authLoading, user]);

    if (authLoading) return null;

    return (
        <AdminLayout>
            <AdminHeader
                icon={<LayoutDashboard className="w-6 h-6" />}
                title="ダッシュボード"
                subtitle="System Overview & Statistics"
                userInfo={user}
            />

            <main className="max-w-7xl mx-auto px-6 py-8 pb-32">
                {/* Greeting Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">
                        Hello, <span className="text-emerald-600">{user?.name}</span>.
                    </h2>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">
                        Here's what's happening today.
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Dashboard...</p>
                    </div>
                ) : (
                    <>
                        <DashboardStats 
                            stats={stats} 
                            isAdmin={isAdmin} 
                            activeMetric={activeMetric}
                            onMetricChange={setActiveMetric}
                        />
                        <ActivityGraph 
                            data={graphData} 
                            activeMetric={activeMetric}
                            aggregationMode={aggregationMode}
                            onModeChange={setAggregationMode}
                            isAdmin={isAdmin}
                        />
                        <RecentActivity drafts={drafts} comments={comments} isAdmin={isAdmin} />
                    </>
                )}
            </main>
        </AdminLayout>
    );
}
