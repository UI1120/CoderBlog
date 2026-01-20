import { http, HttpResponse } from 'msw';
import statsData from '../admin/stats.json';
import { articlesList } from './get_article_handler';
import { adminComments } from './get_comments_handler';

// Helper function to generate mock weekly data
const generateGraphData = () => {
    const data = [];
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 52 * 7);

    let totalArticles = 50;
    let yourTotalArticles = 5;
    
    for (let i = 0; i < 52; i++) {
        const weekStart = new Date(startDate);
        weekStart.setDate(weekStart.getDate() + i * 7);
        
        const newArticles = Math.floor(Math.random() * 3);
        const weeklyPV = Math.floor(Math.random() * 500) + 100;
        const weeklyLikes = Math.floor(Math.random() * 50) + 5;

        const newYourArticles = Math.random() > 0.8 ? 1 : 0;
        const yourWeeklyPV = Math.floor(weeklyPV * (Math.random() * 0.3));
        const yourWeeklyLikes = Math.floor(weeklyLikes * (Math.random() * 0.3));

        totalArticles += newArticles;
        yourTotalArticles += newYourArticles;

        data.push({
            week_start: weekStart.toISOString().split('T')[0],
            articles: totalArticles,
            pv: weeklyPV,
            likes: weeklyLikes,
            your_articles: yourTotalArticles,
            your_pv: yourWeeklyPV,
            your_likes: yourWeeklyLikes
        });
    }
    return data;
};

export const dashboard_handler = [
    http.get('/api/admin/dashboard/status', () => {
        // Dynamic counts based on shared mock state
        const drafts = articlesList.filter(a => a.status === 'draft');
        const pending = adminComments.filter(c => c.status === 'pending');

        return HttpResponse.json({
            stats: {
                ...statsData,
                draft_articles_count: drafts.length,
                pending_comments_count: pending.length
            },
            graph_data: generateGraphData(),
            draft_articles: drafts.slice(0, 5).map(a => ({
                article_id: a.article_id,
                title: a.title,
                updated_at: a.published_at // Use published_at as mock updated_at
            })),
            pending_comments: pending.slice(0, 5).map(c => ({
                comment_id: c.comment_id,
                article_id: c.article_id,
                article_title: c.article_title || "Unknown Article",
                guest_name: c.guest_name,
                content: c.content,
                created_at: c.created_at
            }))
        });
    }),
];
