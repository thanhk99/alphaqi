import { apiService } from './api.service';
import { Article } from '@/types/article.types';
import { PaginatedResponse } from '@/types/api.types';

export interface ArticleFilters {
    published?: boolean;
}

export const articleService = {
    // Get all articles
    getArticles: async (filters: ArticleFilters & { page?: number; size?: number } = {}): Promise<PaginatedResponse<Article>> => {
        const params = new URLSearchParams();

        if (filters.published !== undefined) {
            params.append('published', filters.published.toString());
        }
        if (filters.page !== undefined) params.append('page', filters.page.toString());
        if (filters.size !== undefined) params.append('size', filters.size.toString());

        const response = await apiService.get<PaginatedResponse<Article>>(`/articles?${params.toString()}`);
        return response.data.data;
    },

    // Get article by ID
    getArticleById: async (id: string): Promise<Article> => {
        const response = await apiService.get<Article>(`/articles/${id}`);
        return response.data.data;
    },
};
