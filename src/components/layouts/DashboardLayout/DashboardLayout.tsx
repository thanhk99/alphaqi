'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/store/AuthContext';
import {
    DashboardOutlined,
    BookOutlined,
    UserOutlined,
    ShoppingOutlined,
    HomeOutlined
} from '@ant-design/icons';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const { user } = useAuth();

    const menuItems = [
        { href: '/dashboard', label: 'Tổng quan', icon: <DashboardOutlined /> },
        { href: '/dashboard/my-courses', label: 'Khóa học của tôi', icon: <BookOutlined /> },
        { href: '/dashboard/profile', label: 'Hồ sơ', icon: <UserOutlined /> },
        { href: '/dashboard/orders', label: 'Đơn hàng', icon: <ShoppingOutlined /> },
    ];

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        {(user?.avatar || (user as any)?.avatarUrl) ? (
                            <img
                                src={user?.avatar || (user as any)?.avatarUrl}
                                alt={user?.fullName}
                                className={styles.avatarImg}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const icon = document.createElement('span');
                                    icon.className = 'anticon anticon-user';
                                    (e.target as HTMLImageElement).parentElement!.appendChild(icon);
                                }}
                            />
                        ) : (
                            <UserOutlined />
                        )}
                    </div>
                    <div className={styles.userDetails}>
                        <h3 className={styles.userName}>{user?.fullName}</h3>
                        <p className={styles.userEmail}>{user?.email}</p>
                    </div>
                </div>

                <nav className={styles.nav}>
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                            >
                                <span className={styles.icon}>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <Link href="/" className={styles.backButton}>
                    <HomeOutlined /> Về trang chủ
                </Link>
            </aside>

            <main className={styles.main}>{children}</main>
        </div>
    );
};

export default DashboardLayout;
