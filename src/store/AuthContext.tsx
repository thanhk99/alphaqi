'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/auth.service';
import {
    User,
    AuthContextType,
    RegisterRequest,
} from '@/types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Auto-refresh token on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const data = await authService.refreshToken();
                // After refreshing token, fetch full profile to get avatar, fullName etc.
                try {
                    const fullProfile = await authService.getCurrentUserProfile();
                    setUser({ ...data, ...fullProfile });
                } catch (profileError) {
                    console.error('Failed to fetch full profile, using basic info:', profileError);
                    setUser(data);
                }
            } catch (error) {
                console.log('No valid session found');
                localStorage.removeItem('isLoggedIn');
            } finally {
                setIsLoading(false);
            }
        };

        const handleFocus = () => {
        };
        window.addEventListener('focus', handleFocus);

        initAuth();
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await authService.login({ username, password });
            // Fetch full profile to get avatar, fullName etc.
            try {
                const fullProfile = await authService.getCurrentUserProfile();
                setUser({ ...response, ...fullProfile });
            } catch (profileError) {
                console.error('Failed to fetch full profile after login:', profileError);
                setUser(response);
            }
            localStorage.setItem('isLoggedIn', 'true');
        } catch (error) {
            throw error;
        }
    };

    const register = async (data: RegisterRequest) => {
        try {
            await authService.register(data);
            await login(data.username, data.password);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
            localStorage.removeItem('isLoggedIn');
        }
    };

    const refreshToken = async () => {
        try {
            const data = await authService.refreshToken();
            setUser(data);
        } catch (error) {
            await logout();
            throw error;
        }
    };

    const [accessToken, setAccessToken] = useState<string | null>(null);

    const updateUserData = (data: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...data } : null);
    };

    const value: AuthContextType = {
        user,
        accessToken,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshToken,
        updateUserData,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
