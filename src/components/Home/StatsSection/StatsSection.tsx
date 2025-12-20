'use client';

import React from 'react';
import styles from './StatsSection.module.css';

export default function StatsSection() {
    const stats = [
        { number: '500+', label: 'Khách hàng tin tưởng' },
        { number: '50M USD+', label: 'Tài sản được tư vấn' },
        { number: '20+', label: 'Năm kinh nghiệm' },
        { number: '95%', label: 'Đạt mục tiêu tài chính' },
    ];

    return (
        <section className={styles.statsSection}>
            <div className="container">
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={styles.statItem}>
                            <span className={styles.statNumber}>{stat.number}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
