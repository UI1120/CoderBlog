import { useMemo } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/P00_common/ui/card";
import { TrendingUp } from 'lucide-react';
import { cn } from '@/P00_common/ui/utils';

interface ActivityGraphProps {
    data: any[];
    activeMetric: 'pv' | 'likes' | 'articles';
    aggregationMode: 'weekly' | 'cumulative';
    onModeChange: (mode: 'weekly' | 'cumulative') => void;
    isAdmin: boolean;
}

export function ActivityGraph({ data, activeMetric, aggregationMode, onModeChange, isAdmin }: ActivityGraphProps) {
    const chartData = useMemo(() => {
        if (!data || data.length === 0) return [];

        let cumulativePv = 0;
        let cumulativeLikes = 0;
        let cumulativeYourPv = 0;
        let cumulativeYourLikes = 0;

        return data.map((item, index) => {
            cumulativePv += item.pv;
            cumulativeLikes += item.likes;
            cumulativeYourPv += item.your_pv || 0;
            cumulativeYourLikes += item.your_likes || 0;

            // Mock 'articles' is cumulative. Let's derive weekly.
            const weeklyArticles = index === 0 ? item.articles : item.articles - data[index - 1].articles;
            const weeklyYourArticles = index === 0 ? (item.your_articles || 0) : (item.your_articles || 0) - (data[index - 1].your_articles || 0);

            return {
                ...item,
                displayDate: new Date(item.week_start).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }),
                // Site Total values
                cumulative_pv: cumulativePv,
                cumulative_likes: cumulativeLikes,
                cumulative_articles: item.articles,
                weekly_pv: item.pv,
                weekly_likes: item.likes,
                weekly_articles: weeklyArticles,
                // Your Stats values
                cumulative_your_pv: cumulativeYourPv,
                cumulative_your_likes: cumulativeYourLikes,
                cumulative_your_articles: item.your_articles || 0,
                weekly_your_pv: item.your_pv || 0,
                weekly_your_likes: item.your_likes || 0,
                weekly_your_articles: weeklyYourArticles
            };
        }).slice(1);
    }, [data]);

    if (!data || data.length === 0) return null;

    const metricNames: Record<string, string> = {
        pv: 'PV数',
        likes: 'いいね数',
        articles: '記事数'
    };

    const metricColors: Record<string, string> = {
        pv: '#3b82f6',
        likes: '#f43f5e',
        articles: '#10b981'
    };

    const metricGradients: Record<string, string> = {
        pv: 'colorPv',
        likes: 'colorLikes',
        articles: 'colorArticles'
    };

    const activeDataKey = `${aggregationMode}_${activeMetric}`;
    const yourDataKey = `${aggregationMode}_your_${activeMetric}`;

    return (
        <Card className="col-span-full xl:col-span-3 rounded-[2rem] border-gray-100 shadow-sm overflow-hidden mb-8">
            <CardHeader className="bg-white pb-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-lg font-black text-gray-800 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-600" />
                            {metricNames[activeMetric]} {aggregationMode === 'cumulative' ? '(累積)' : '(週間)'}
                        </CardTitle>
                        <CardDescription className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                            過去1年間の推移 {!isAdmin && " (全体 vs あなた)"}
                        </CardDescription>
                    </div>

                    {/* Weekly / Cumulative Slide Button */}
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => onModeChange('cumulative')}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-black transition-all",
                                aggregationMode === 'cumulative' 
                                    ? "bg-white text-gray-800 shadow-sm" 
                                    : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            累積
                        </button>
                        <button
                            onClick={() => onModeChange('weekly')}
                            className={cn(
                                "px-4 py-1.5 rounded-lg text-xs font-black transition-all",
                                aggregationMode === 'weekly' 
                                    ? "bg-white text-gray-800 shadow-sm" 
                                    : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            週間
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="bg-gradient-to-b from-white to-gray-50/50 p-6 pt-2">
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                                    </linearGradient>
                                    <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.05} />
                                    </linearGradient>
                                    <linearGradient id="colorArticles" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                                    </linearGradient>
                                    
                                    {/* Your Specific Gradients (Lighter/Subtle) */}
                                    <linearGradient id="colorYourPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                                    </linearGradient>
                                    <linearGradient id="colorYourLikes" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.02} />
                                    </linearGradient>
                                    <linearGradient id="colorYourArticles" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="displayDate"
                                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                                    tickLine={false}
                                    axisLine={false}
                                    minTickGap={40}
                                />
                                <YAxis
                                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ 
                                        backgroundColor: 'white', 
                                        borderRadius: '16px', 
                                        border: '1px solid #f3f4f6', 
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        padding: '12px'
                                    }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                    labelStyle={{ fontSize: '10px', color: '#9ca3af', marginBottom: '4px', fontWeight: '800', textTransform: 'uppercase' }}
                                />
                                {/* Total Site Area (Bold/Primary) */}
                                <Area
                                    type="monotone"
                                    dataKey={activeDataKey}
                                    stroke={metricColors[activeMetric]}
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill={`url(#${metricGradients[activeMetric]})`}
                                    name={`全体の${metricNames[activeMetric]}`}
                                    animationDuration={1000}
                                />
                                
                                {/* Your Stats Area (Lighter/Secondary) - Only shown for non-admins */}
                                {!isAdmin && (
                                    <Area
                                        type="monotone"
                                        dataKey={yourDataKey}
                                        stroke={metricColors[activeMetric]}
                                        strokeWidth={1.5}
                                        fillOpacity={1}
                                        fill={`url(#colorYour${activeMetric[0].toUpperCase() + activeMetric.slice(1)})`}
                                        name={`あなたの${metricNames[activeMetric]}`}
                                        animationDuration={1500}
                                        strokeOpacity={0.6}
                                    />
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
