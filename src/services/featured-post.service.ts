import { apiService } from './api.service';
import { FeaturedPost } from '@/types/featured-post.types';

export const featuredPostService = {
    getActivePosts: async (): Promise<FeaturedPost[]> => {
        const response = await apiService.get<FeaturedPost[]>('/featured-posts/active');
        return response.data.data;
    },

    getById: async (id: string): Promise<FeaturedPost> => {
        const response = await apiService.get<FeaturedPost>(`/featured-posts/${id}`);
        return response.data.data;
    }
};
