// User & Authentication Types
export interface User {
    userId: string;
    username: string;
    email: string;
    fullName?: string;
    phoneNumber?: string;
    role: string;
    membershipLevel: string;
    status: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: string;
    username: string;
    email: string;
    role: string;
    membershipLevel: string;
    status: string;
    fullName?: string;
    avatar?: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber?: string;
}

export interface RegisterResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userId: string;
    username: string;
    email: string;
    role: string;
    membershipLevel: string;
    status: string;
    fullName?: string;
    avatar?: string;
}

export interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
    updateUserData: (data: Partial<User>) => void;
}
