import { apiService } from './api.service';
import { Article } from '@/types/article.types';

export interface ArticleFilters {
    published?: boolean;
}

export const articleService = {
    // Get all articles
    getArticles: async (filters: ArticleFilters = {}): Promise<Article[]> => {
        const params = new URLSearchParams();

        if (filters.published !== undefined) {
            params.append('published', filters.published.toString());
        }

        const url = params.toString()
            ? `/articles?${params.toString()}`
            : '/articles';

        const response = await apiService.get<Article[]>(url);
        return response.data.data;
    },

    // Get article by ID
    getArticleById: async (id: string): Promise<Article> => {
        const response = await apiService.get<Article>(`/articles/${id}`);
        return response.data.data;
    },
};
