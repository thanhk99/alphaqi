import { apiService } from './api.service';
import { tokenManager } from '@/utils/tokenManager';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    User,
} from '@/types/auth.types';
import axios from 'axios';
import { ApiResponse } from '@/types/api.types';
import Cookies from 'js-cookie';

export const authService = {
    // Login
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        const response = await apiService.post<LoginResponse>('/auth/login/user', credentials);
        const data = response.data.data;

        // Store access token in memory
        tokenManager.setAccessToken(data.accessToken);

        return data;
    },

    // Register
    register: async (data: RegisterRequest): Promise<RegisterResponse> => {
        const response = await apiService.post<RegisterResponse>('/auth/register', data);
        return response.data.data;
    },

    // Logout
    logout: async (): Promise<void> => {
        try {
            await apiService.post('/auth/logout');
        } finally {
            // Clear access token from memory
            tokenManager.clearAccessToken();

            // Redirect to login with logout parameter to ensure HttpOnly cookie is cleared by middleware
            if (typeof window !== 'undefined') {
                window.location.href = '/auth/login?logout=true';
            }
        }
    },

    // Refresh token
    refreshToken: async (): Promise<LoginResponse> => {
        try {
            // Use axios directly to avoid interceptor redirect loops
            const API_BASE_URL = '/api';
            const response = await axios.post<ApiResponse<LoginResponse>>(
                `${API_BASE_URL}/auth/refresh`,
                {},
                { withCredentials: true }
            );
            const data = response.data.data;

            // Store new access token in memory
            tokenManager.setAccessToken(data.accessToken);

            return data;
        } catch (error) {
            tokenManager.clearAccessToken();
            if (typeof window !== 'undefined') {
                localStorage.removeItem('isLoggedIn');
            }

            // Gọi API logout để dọn dẹp phía Backend
            try {
                const API_BASE_URL = '/api';
                await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
            } catch (e) {
                // Bỏ qua lỗi logout
            }

            throw error;
        }
    },

    // Get current user profile
    getCurrentUserProfile: async (): Promise<User> => {
        const response = await apiService.get<User>('/users/me');
        return response.data.data;
    },

    // Get user profile by ID
    getUserProfile: async (userId: string): Promise<User> => {
        const response = await apiService.get<User>(`/users/${userId}`);
        return response.data.data;
    },

    // Get current user (deprecated, use getUserProfile or data from login/refresh)
    getCurrentUser: async (): Promise<User> => {
        // This might not work if we don't have ID, but for compatibility
        // we might need to rely on stored user data or a /me endpoint if available.
        // Since API doc only mentions /users/{id}, we'll assume we get user data from login/refresh.
        throw new Error('Use getUserProfile with ID');
    },

    // Change password
    changePassword: async (oldPassword: string, newPassword: string): Promise<void> => {
        await apiService.post('/auth/change-password', {
            oldPassword,
            newPassword,
        });
    },

    // Forgot password
    forgotPassword: async (email: string): Promise<void> => {
        await apiService.post('/auth/forgot-password', { email });
    },

    // Reset password
    resetPassword: async (token: string, newPassword: string): Promise<void> => {
        await apiService.post('/auth/reset-password', {
            token,
            newPassword,
        });
    },
};
