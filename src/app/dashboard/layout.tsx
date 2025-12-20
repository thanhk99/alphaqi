'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import { useAuth } from '@/store/AuthContext';
import { useRouter } from 'next/navigation';

import styles from './layout.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <MainLayout>
                <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    Loading...
                </div>
            </MainLayout>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <MainLayout>
            <div className="container">
                <div className={styles.dashboardContainer}>
                    <aside className={styles.sidebarWrapper}>
                        <Sidebar />
                    </aside>
                    <main className={styles.contentWrapper}>
                        {children}
                    </main>
                </div>
            </div>
        </MainLayout>
    );
}
