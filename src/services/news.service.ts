import { apiService } from './api.service';
import { News } from '@/types/news.types';

export const newsService = {
    // Get all news with optional published filter
    getAllNews: async (published?: boolean): Promise<News[]> => {
        const url = published !== undefined
            ? `/news?published=${published}`
            : '/news';
        const response = await apiService.get<News[]>(url);
        return response.data.data;
    },

    // Get news by ID
    getNewsById: async (id: string): Promise<News> => {
        const response = await apiService.get<News>(`/news/${id}`);
        return response.data.data;
    },

    // Get featured news for homepage (max 8)
    getFeaturedNews: async (): Promise<News[]> => {
        const response = await apiService.get<News[]>('/news/home');
        return response.data.data;
    },
};
