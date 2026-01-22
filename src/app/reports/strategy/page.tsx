'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import ReportList from '../ReportList';
import styles from '../Reports.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StrategyReportsPage() {
    const pathname = usePathname();

    const tabs = [
        { label: 'Tất cả', href: '/reports', active: pathname === '/reports' },
        { label: 'Báo cáo CIO', href: '/reports/cio', active: pathname === '/reports/cio' },
        { label: 'Báo cáo vĩ mô', href: '/reports/macro', active: pathname === '/reports/macro' },
        { label: 'Chiến lược đầu tư', href: '/reports/strategy', active: pathname === '/reports/strategy' },
        { label: 'Công ty & Ngành', href: '/reports/industry', active: pathname === '/reports/industry' },
        { label: 'Quản lý gia sản', href: '/reports/asset-management', active: pathname === '/reports/asset-management' },
    ];

    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                <section className={styles.hero}>
                    <div className="container">
                        <h1 className={styles.heroTitle}>Báo cáo Chiến lược Đầu tư</h1>
                        <p className={styles.heroSubtitle}>Định hướng chiến lược và phân bổ tài sản tối ưu.</p>
                    </div>
                </section>

                <div className="container">
                    <div className={styles.tabsContainer}>
                        {tabs.map((tab) => (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`${styles.tab} ${tab.active ? styles.activeTab : ''}`}
                            >
                                {tab.label}
                            </Link>
                        ))}
                    </div>

                    <ReportList type="INVESTMENT_STRATEGY" />
                </div>
            </div>
        </MainLayout>
    );
}
