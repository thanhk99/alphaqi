'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/store/AuthContext';
import {
    DashboardOutlined,
    BookOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const menuItems = [
        {
            key: 'dashboard',
            label: 'Tổng quan',
            icon: <DashboardOutlined />,
            href: '/dashboard'
        },
        {
            key: 'my-courses',
            label: 'Khóa học của tôi',
            icon: <BookOutlined />,
            href: '/dashboard/my-courses'
        },
        {
            key: 'profile',
            label: 'Hồ sơ cá nhân',
            icon: <UserOutlined />,
            href: '/dashboard/profile'
        }
    ];

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <aside className={styles.sidebar}>
            {user && (
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        {(user.avatar || (user as any).avatarUrl) ? (
                            <img
                                src={user.avatar || (user as any).avatarUrl}
                                alt={user.fullName || 'User'}
                                className={styles.avatarImg}
                            />
                        ) : (
                            getInitials(user.fullName || 'User')
                        )}
                    </div>
                    <div className={styles.userDetails}>
                        <h3>{user.fullName}</h3>
                        <p>{user.email}</p>
                    </div>
                </div>
            )}

            <ul className={styles.menu}>
                {menuItems.map((item) => (
                    <li key={item.key} className={styles.menuItem}>
                        <Link
                            href={item.href}
                            className={`${styles.menuLink} ${pathname === item.href ? styles.active : ''}`}
                        >
                            <span className={styles.icon}>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className={styles.logoutButton}>
                <button
                    onClick={logout}
                    className={styles.logoutLink}
                >
                    <span className={styles.icon}><LogoutOutlined /></span>
                    <span>Đăng xuất</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
