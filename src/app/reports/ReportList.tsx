'use client';

import React, { useEffect, useState } from 'react';
import { reportService } from '@/services/report.service';
import { Report, ReportType } from '@/types/report.types';
import { FilePdfOutlined, CalendarOutlined, SearchOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './Reports.module.css';
import Link from 'next/link';

interface ReportListProps {
    type?: ReportType;
    limit?: number;
}

const ReportList: React.FC<ReportListProps> = ({ type, limit = 10 }) => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [keyword, setKeyword] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await reportService.getReports({
                type,
                keyword: keyword || undefined,
                fromDate: fromDate || undefined,
                toDate: toDate || undefined,
                size: limit,
                sort: 'createdAt,desc'
            });
            setReports(data.content);
        } catch (error) {
            console.error('Failed to fetch reports:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [type, limit]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchReports();
    };

    const renderFilterBar = () => (
        <form className={styles.filterBar} onSubmit={handleSearch}>
            <div className={styles.searchGroup}>
                <label className={styles.label}>Từ khóa</label>
                <div className={styles.inputWrapper}>
                    <SearchOutlined className={styles.inputIcon} />
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Tiêu đề, nội dung báo cáo..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.filterGroup}>
                <label className={styles.label}>Từ ngày</label>
                <input
                    type="date"
                    className={styles.input}
                    style={{ paddingLeft: '12px' }}
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />
            </div>

            <div className={styles.filterGroup}>
                <label className={styles.label}>Đến ngày</label>
                <input
                    type="date"
                    className={styles.input}
                    style={{ paddingLeft: '12px' }}
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />
            </div>

            <button type="submit" className={styles.searchButton}>
                Tìm kiếm
            </button>
        </form>
    );

    return (
        <>
            {renderFilterBar()}

            {loading ? (
                <div className={styles.loading}>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className={styles.skeletonCard}></div>
                    ))}
                </div>
            ) : reports.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>Chưa có báo cáo nào khớp với tìm kiếm của bạn.</p>
                </div>
            ) : (
                <div className={styles.reportGrid}>
                    {reports.map((report) => (
                        <Link
                            key={report.id}
                            href={`/reports/${report.id}`}
                            className={styles.reportCard}
                        >
                            <div className={styles.cardHeader}>
                                <div className={styles.reportDateTop}>
                                    Ngày đăng: {new Date(report.createdAt).toLocaleDateString('vi-VN')}
                                    {report.updatedAt && report.updatedAt !== report.createdAt && (
                                        <span className={styles.updateDate}>
                                            | Cập nhật: {new Date(report.updatedAt).toLocaleDateString('vi-VN')}
                                        </span>
                                    )}
                                </div>
                                <div className={`${styles.reportTypeSmall} ${styles['type' + report.type]}`}>
                                    {report.typeDisplayName}
                                </div>
                            </div>
                            <h3 className={styles.reportTitle}>{report.title}</h3>
                            <p className={styles.reportDesc}>{report.description}</p>
                            <div className={styles.reportFooter}>
                                <span className={styles.viewButton}>
                                    Chi tiết <ArrowRightOutlined />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default ReportList;
