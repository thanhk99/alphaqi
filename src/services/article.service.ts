import { apiService } from './api.service';
import { Article, ArticleType } from '@/types/article.types';
import { PaginatedResponse } from '@/types/api.types';

export interface ArticleFilters {
    published?: boolean;
    type?: ArticleType;
    page?: number;
    size?: number;
    search?: string;
}

export const articleService = {
    // Get all articles with filters and pagination
    getArticles: async (filters: ArticleFilters = {}): Promise<PaginatedResponse<Article>> => {
        // Sử dụng pattern truyền params trực tiếp vào axios (giống style trang admin)
        const response = await apiService.get<PaginatedResponse<Article>>('/articles', {
            params: filters
        });
        return response.data.data;
    },

    // Get featured articles (max 8)
    getFeaturedArticles: async (): Promise<Article[]> => {
        const response = await apiService.get<Article[]>('/articles/home');
        return response.data.data;
    },

    // Get article by ID
    getArticleById: async (id: string): Promise<Article> => {
        const response = await apiService.get<Article>(`/articles/${id}`);
        return response.data.data;
    },

    // Get latest articles
    getLatestArticles: async (type?: ArticleType, size = 4): Promise<Article[]> => {
        const response = await apiService.get<PaginatedResponse<Article>>('/articles', {
            params: { published: true, type, page: 0, size }
        });
        return response.data.data.content;
    }
};
