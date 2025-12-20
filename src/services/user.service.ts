import { apiService } from './api.service';
import { User } from '@/types/auth.types';
import { UserProfile, UpdateProfileRequest, ChangePasswordRequest } from '@/types/user.types';
import { DefaultAvatarsResponse, UpdateAvatarRequest, UpdateAvatarResponse } from '@/types/avatar.types';

export const userService = {
    // Get current user profile
    getProfile: async (): Promise<UserProfile> => {
        const response = await apiService.get<UserProfile>('/users/me');
        return response.data.data;
    },

    // Update user profile
    updateProfile: async (data: UpdateProfileRequest): Promise<UserProfile> => {
        const response = await apiService.put<UserProfile>('/users/me/profile', data);
        return response.data.data;
    },

    // Change password
    changePassword: async (data: ChangePasswordRequest): Promise<void> => {
        await apiService.put('/users/me/password', data);
    },

    // Get default avatars
    getDefaultAvatars: async (): Promise<string[]> => {
        const response = await apiService.get<string[]>('/avatars/default');
        return response.data.data;
    },

    // Update user avatar
    updateAvatar: async (avatarUrl: string): Promise<UpdateAvatarResponse> => {
        const response = await apiService.put<UpdateAvatarResponse>('/users/me/avatar', { avatarUrl });
        return response.data.data;
    },

    // Upload avatar (legacy endpoint - keep for backward compatibility)
    uploadAvatar: async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await apiService.post<{ url: string }>(
            '/users/avatar',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data.data.url;
    },
};
