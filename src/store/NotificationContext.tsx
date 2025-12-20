'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
    id: string;
    type: NotificationType;
    message: string;
    duration?: number;
}

interface NotificationContextType {
    notifications: Notification[];
    showNotification: (type: NotificationType, message: string, duration?: number) => void;
    hideNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const hideNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const showNotification = useCallback((type: NotificationType, message: string, duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newNotification: Notification = { id, type, message, duration };

        setNotifications((prev) => [...prev, newNotification]);

        if (duration > 0) {
            setTimeout(() => {
                hideNotification(id);
            }, duration);
        }
    }, [hideNotification]);

    return (
        <NotificationContext.Provider value={{ notifications, showNotification, hideNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};
