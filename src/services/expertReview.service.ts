import apiService from './api.service';
import { ExpertReview } from '@/types/expertReview.types';
import { ApiResponse } from '@/types/api.types';

export const expertReviewService = {
    // Get all expert reviews
    getAllExpertReviews: async (): Promise<ExpertReview[]> => {
        const response = await apiService.get<ApiResponse<ExpertReview[]>>('/expert-reviews');
        return response.data.data;
    },

    // Get expert review by ID
    getExpertReviewById: async (id: string): Promise<ExpertReview> => {
        const response = await apiService.get<ApiResponse<ExpertReview>>(`/expert-reviews/${id}`);
        return response.data.data;
    }
};

export default expertReviewService;
