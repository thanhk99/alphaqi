'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { reportService } from '@/services/report.service';
import { Report } from '@/types/report.types';
import { FilePdfOutlined, ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './ReportsHomeSection.module.css';

export default function ReportsHomeSection() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestReports = async () => {
            try {
                setLoading(true);
                const data = await reportService.getReports({
                    size: 3,
                    sort: 'createdAt,desc'
                });
                console.log('Reports Home Data:', data);
                setReports(data.reports.content || []);
            } catch (error) {
                console.error('Failed to fetch reports for home:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestReports();
    }, []);

    return (
        <section className={styles.reportsSection}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Báo cáo phân tích</h2>
                    <Link href="/reports" className={styles.viewAll}>
                        Xem tất cả <ArrowRightOutlined />
                    </Link>
                </div>

                {loading ? (
                    <div className={styles.loading}>
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                        <p>Đang tải báo cáo...</p>
                    </div>
                ) : reports.length === 0 ? (
                    <div className={styles.empty}>
                        Bạn chưa tạo báo cáo nào hoặc báo cáo chưa được xuất bản.
                    </div>
                ) : (
                    <div className={styles.reportGrid}>
                        {reports.map((report) => (
                            <Link key={report.id} href={`/reports/${report.id}`} className={styles.reportCard}>
                                <div className={styles.iconWrapper}>
                                    <FilePdfOutlined />
                                </div>
                                <div className={styles.cardContent}>
                                    <div className={styles.meta}>
                                        {new Date(report.createdAt).toLocaleDateString('vi-VN')}
                                    </div>
                                    <h3 className={styles.reportTitle}>{report.title}</h3>
                                    <p className={styles.reportDesc}>{report.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
