export interface DefaultAvatarsResponse {
    avatars: string[];
}

export interface UpdateAvatarRequest {
    avatarUrl: string;
}

export interface UpdateAvatarResponse {
    id: string;
    username: string;
    email: string;
    fullName: string;
    phoneNumber?: string;
    avatar: string;
    membershipLevel: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}
