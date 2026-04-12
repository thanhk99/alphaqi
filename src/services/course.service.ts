import { apiService } from './api.service';
import {
    Course,
    CourseCategory,
    Review,
} from '@/types/course.types';
import { PaginatedResponse } from '@/types/api.types';

export interface CourseFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    page?: number;
    size?: number;
    sort?: string;
    published?: boolean;
}

export const courseService = {
    // Get all courses with filters and pagination
    getCourses: async (filters: CourseFilters = {}): Promise<PaginatedResponse<Course>> => {
        const { search, category, ...rest } = filters;
        let url = '/courses';
        const params = new URLSearchParams();

        if (search) {
            url = '/courses/search';
            params.append('keyword', search);
        } else if (category) {
            url = '/courses/filter';
            params.append('category', category);
        }

        Object.entries(rest).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });

        const queryString = params.toString();
        const response = await apiService.get<PaginatedResponse<Course>>(
            `${url}${queryString ? `?${queryString}` : ''}`
        );
        return response.data.data;
    },

    // Get course by ID
    getCourseById: async (id: string): Promise<Course> => {
        const response = await apiService.get<Course>(`/courses/${id}`);
        return response.data.data;
    },

    // Get home courses (courses with isShowHome = true)
    getHomeCourses: async (): Promise<Course[]> => {
        const response = await apiService.get<Course[]>('/courses/home');
        return response.data.data;
    },

    // Search courses
    searchCourses: async (query: string, page = 0, size = 12): Promise<PaginatedResponse<Course>> => {
        const response = await apiService.get<PaginatedResponse<Course>>(
            `/courses/search?keyword=${encodeURIComponent(query)}&page=${page}&size=${size}`
        );
        return response.data.data;
    },

    // Get featured courses
    getFeaturedCourses: async (limit = 6): Promise<Course[]> => {
        const response = await apiService.get<Course[]>(`/courses/featured?limit=${limit}`);
        return response.data.data;
    },

    // Get popular courses
    getPopularCourses: async (limit = 6): Promise<Course[]> => {
        const response = await apiService.get<Course[]>(`/courses/popular?limit=${limit}`);
        return response.data.data;
    },
    // Get all categories
    getCategories: async (): Promise<CourseCategory[]> => {
        const response = await apiService.get<CourseCategory[]>('/categories');
        return response.data.data;
    },

    // Get course reviews
    getCourseReviews: async (courseId: string, page = 0, size = 5): Promise<PaginatedResponse<Review>> => {
        const response = await apiService.get<PaginatedResponse<Review>>(`/reviews/course/${courseId}?page=${page}&size=${size}`);
        return response.data.data;
    },

    // Submit a new review
    submitReview: async (courseId: string, rating: number, comment: string): Promise<Review> => {
        const response = await apiService.post<Review>(`/reviews/course/${courseId}`, {
            rating,
            comment
        });
        return response.data.data;
    },
};
