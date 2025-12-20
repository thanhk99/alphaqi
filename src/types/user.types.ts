export interface UserProfile {
    id: string;
    username: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    avatar?: string;
    role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
    createdAt: string;
    updatedAt: string;
}

export interface UpdateProfileRequest {
    fullName: string;
    email: string;
    phoneNumber?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
