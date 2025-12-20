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
    getCourses: async (filters: CourseFilters = {}): Promise<Course[]> => {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, value.toString());
            }
        });

        const response = await apiService.get<Course[]>(
            `/courses?${params.toString()}`
        );
        // API returns { success, message, data: Course[] }
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
            `/courses/search?q=${encodeURIComponent(query)}&page=${page}&size=${size}`
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
    getCourseReviews: async (courseId: string): Promise<Review[]> => {
        const response = await apiService.get<Review[]>(`/reviews/course/${courseId}`);
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
