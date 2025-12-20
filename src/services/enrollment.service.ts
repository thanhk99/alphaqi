import { apiService } from './api.service';
import { Enrollment, LessonProgress } from '@/types/course.types';

export const enrollmentService = {
    // Get user's enrolled courses
    getMyEnrollments: async (): Promise<Enrollment[]> => {
        const response = await apiService.get<Enrollment[]>('/enrollments/my');
        return response.data.data;
    },

    // Enroll in a course
    enroll: async (courseId: string): Promise<Enrollment> => {
        const response = await apiService.post<Enrollment>('/enrollments', { courseId });
        return response.data.data;
    },

    // Get enrollment by course ID
    getEnrollmentByCourseId: async (courseId: string): Promise<Enrollment | null> => {
        try {
            const response = await apiService.get<Enrollment>(`/enrollments/course/${courseId}`);
            return response.data.data;
        } catch (error) {
            return null;
        }
    },

    // Check if user is enrolled in a course
    isEnrolled: async (courseId: string): Promise<boolean> => {
        try {
            const response = await apiService.get<{ enrolled: boolean }>(
                `/enrollments/check/${courseId}`
            );
            return response.data.data.enrolled;
        } catch (error) {
            return false;
        }
    },

    // Get lesson progress
    getLessonProgress: async (enrollmentId: string, lessonId: string): Promise<LessonProgress> => {
        const response = await apiService.get<LessonProgress>(
            `/enrollments/${enrollmentId}/lessons/${lessonId}/progress`
        );
        return response.data.data;
    },

    // Update progress
    updateProgress: async (enrollmentId: string, progress: number): Promise<Enrollment> => {
        const response = await apiService.put<Enrollment>(`/enrollments/${enrollmentId}/progress?progress=${progress}`);
        return response.data.data;
    },

    // Cancel enrollment
    cancelEnrollment: async (enrollmentId: string): Promise<void> => {
        await apiService.delete(`/enrollments/${enrollmentId}`);
    },

    // Update lesson progress
    updateLessonProgress: async (
        enrollmentId: string,
        lessonId: string,
        progress: Partial<LessonProgress>
    ): Promise<LessonProgress> => {
        const response = await apiService.post<LessonProgress>(
            `/enrollments/${enrollmentId}/lessons/${lessonId}/progress`,
            progress
        );
        return response.data.data;
    },

    // Mark lesson as completed
    completeLesson: async (enrollmentId: string, lessonId: string): Promise<void> => {
        await apiService.post(`/enrollments/${enrollmentId}/lessons/${lessonId}/complete`);
    },
};
