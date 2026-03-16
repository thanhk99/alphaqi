import { apiService } from './api.service';
import { Article } from '@/types/article.types';
import { PaginatedResponse } from '@/types/api.types';

export interface BlogFilters {
    published?: boolean;
    page?: number;
    size?: number;
    search?: string;
}

export const blogService = {
    // Lấy danh sách blog (type: BLOG) với style Admin
    getBlogs: async (filters: BlogFilters = {}): Promise<PaginatedResponse<Article>> => {
        const response = await apiService.get<PaginatedResponse<Article>>('/articles', {
            params: { ...filters, type: 'BLOG' }
        });
        return response.data.data;
    },

    // Lấy chi tiết blog theo ID
    getBlogById: async (id: string): Promise<Article> => {
        const response = await apiService.get<Article>(`/articles/${id}`);
        return response.data.data;
    },
};
