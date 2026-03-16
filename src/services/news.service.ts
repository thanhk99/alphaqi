import { apiService } from './api.service';
import { News } from '@/types/news.types';
import { PaginatedResponse } from '@/types/api.types';

export interface NewsFilters {
    published?: boolean;
    page?: number;
    size?: number;
}

export const newsService = {
    // Lấy danh sách tin tức với style truyền params của Admin
    getAllNews: async (filters: NewsFilters = {}): Promise<PaginatedResponse<News>> => {
        const response = await apiService.get<PaginatedResponse<News>>('/news', {
            params: filters
        });
        return response.data.data;
    },

    // Lấy chi tiết tin tức theo ID
    getNewsById: async (id: string): Promise<News> => {
        const response = await apiService.get<News>(`/news/${id}`);
        return response.data.data;
    },

    // Lấy tin tức nổi bật cho trang chủ
    getFeaturedNews: async (): Promise<News[]> => {
        const response = await apiService.get<News[]>('/news/home');
        return response.data.data;
    },
};
