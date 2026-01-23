'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import ReportList from './ReportList';
import styles from './Reports.module.css';

export default function ReportsPage() {
    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                <section className={styles.hero}>
                    <div className="container">
                        <h1 className={styles.heroTitle}>Trung tâm Báo cáo</h1>
                        <p className={styles.heroSubtitle}>
                            Cung cấp cái nhìn chuyên sâu và đa chiều về thị trường tài chính, giúp bạn ra quyết định đầu tư chính xác.
                        </p>
                    </div>
                </section>

                <div className="container">
                    <ReportList />
                </div>
            </div>
        </MainLayout>
    );
}
