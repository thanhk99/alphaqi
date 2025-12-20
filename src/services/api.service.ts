import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenManager } from '@/utils/tokenManager';
import { ApiResponse, ApiError } from '@/types/api.types';

// Base API URL - using relative path to leverage Next.js proxy
const API_BASE_URL = '/api';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for HttpOnly cookies
});

// Request interceptor - Add access token to headers
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = tokenManager.getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle token refresh
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                        }
                        return apiClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Call refresh token endpoint
                const response = await axios.post<ApiResponse<{ accessToken: string }>>(
                    `${API_BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = response.data.data.accessToken;
                tokenManager.setAccessToken(newAccessToken);

                processQueue(null, newAccessToken);

                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                }

                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError as Error, null);
                tokenManager.clearAccessToken();

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// API Service
export const apiService = {
    get: <T>(url: string, config = {}) => {
        return apiClient.get<ApiResponse<T>>(url, config);
    },

    post: <T>(url: string, data?: unknown, config = {}) => {
        return apiClient.post<ApiResponse<T>>(url, data, config);
    },

    put: <T>(url: string, data?: unknown, config = {}) => {
        return apiClient.put<ApiResponse<T>>(url, data, config);
    },

    patch: <T>(url: string, data?: unknown, config = {}) => {
        return apiClient.patch<ApiResponse<T>>(url, data, config);
    },

    delete: <T>(url: string, config = {}) => {
        return apiClient.delete<ApiResponse<T>>(url, config);
    },
};

export default apiClient;
