import { apiService } from './api.service';
import { News } from '@/types/news.types';
import { PaginatedResponse } from '@/types/api.types';

export const newsService = {
    // Get all news with optional published filter
    getAllNews: async (published?: boolean, page = 0, size = 10): Promise<PaginatedResponse<News>> => {
        let url = `/news?page=${page}&size=${size}`;
        if (published !== undefined) {
            url += `&published=${published}`;
        }
        const response = await apiService.get<PaginatedResponse<News>>(url);
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
