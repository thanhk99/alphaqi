'use client';

import React, { useEffect, useState } from 'react';
import { reportService } from '@/services/report.service';
import { Report } from '@/types/report.types';
import { SearchOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './Reports.module.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


// Định nghĩa cấu trúc phân cấp loại báo cáo cố định
const REPORT_GROUPS = [
    {
        label: 'Báo cáo Vĩ mô',
        code: 'MACRO',
        items: [
            { code: 'MACRO', displayName: 'Báo cáo Vĩ mô chung' },
            { code: 'MACRO_MONEY_MARKET_BOND', displayName: 'Thị trường Tiền tệ & Trái phiếu' },
            { code: 'MACRO_TOPICAL', displayName: 'Chuyên đề Vĩ mô' },
        ]
    },
    {
        label: 'Báo cáo Công ty & Ngành',
        code: 'COMPANY_INDUSTRY',
        items: [
            { code: 'COMPANY_INDUSTRY', displayName: 'Báo cáo Công ty & Ngành chung' },
            { code: 'COMPANY', displayName: 'Báo cáo Công ty' },
            { code: 'SECTOR', displayName: 'Báo cáo Ngành' },
        ]
    },
    {
        label: 'Quản lý tài sản',
        code: 'ASSET_MANAGEMENT',
        items: [
            { code: 'ASSET_MANAGEMENT', displayName: 'Quản lý tài sản chung' },
            { code: 'ASSET_ALLOCATION', displayName: 'Phân bổ tài sản' },
            { code: 'WEALTH_MANAGEMENT_TOPICAL', displayName: 'Chuyên đề Quản lý tài sản' },
        ]
    },
    {
        label: 'Khác',
        items: [
            { code: 'INVESTMENT_STRATEGY', displayName: 'Chiến lược đầu tư' },
            { code: 'CIO_REPORT', displayName: 'Báo cáo CIO' },
        ]
    }
];

const ReportList: React.FC = () => {
    const searchParams = useSearchParams();
    const typeFromUrl = searchParams.get('type') || '';

    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    // States
    const [selectedType, setSelectedType] = useState<string>(typeFromUrl);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [pageSize] = useState(10);

    // Sync selectedType with URL parameter
    useEffect(() => {
        setSelectedType(typeFromUrl);
        setPage(0);
    }, [typeFromUrl]);


    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await reportService.getReports({
                type: selectedType || undefined,
                search: search || undefined,
                page: page,
                size: pageSize,
                sort: 'createdAt,desc'
            });
            setReports(data.reports.content);
            setTotalPages(data.reports.totalPages);
            setTotalElements(data.reports.totalElements);
        } catch (error) {
            console.error('Failed to fetch reports:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [selectedType, page]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        fetchReports();
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderFilterBar = () => (
        <form className={styles.filterBar} onSubmit={handleSearch}>
            <div className={styles.searchGroup}>
                <label className={styles.label}>Tìm kiếm</label>
                <div className={styles.inputWrapper}>
                    <SearchOutlined className={styles.inputIcon} />
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Tiêu đề báo cáo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.filterGroup}>
                <label className={styles.label}>Loại báo cáo</label>
                <select
                    className={styles.select}
                    value={selectedType}
                    onChange={(e) => {
                        setSelectedType(e.target.value);
                        setPage(0);
                    }}
                >
                    <option value="">Tất cả loại</option>
                    {REPORT_GROUPS.map((group, idx) => (
                        group.label === 'Khác' ? (
                            group.items.map(item => (
                                <option key={item.code} value={item.code}>{item.displayName}</option>
                            ))
                        ) : (
                            <optgroup key={idx} label={group.label}>
                                {group.items.map(item => (
                                    <option key={item.code} value={item.code}>{item.displayName}</option>
                                ))}
                            </optgroup>
                        )
                    ))}
                </select>
            </div>

            <button type="submit" className={styles.searchButton}>
                Tìm kiếm
            </button>
        </form>
    );

    const renderPagination = () => {
        if (totalPages <= 1) return null;

        return (
            <div className={styles.pagination}>
                <button
                    className={styles.pageBtn}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                >
                    <LeftOutlined /> Trước
                </button>

                <div className={styles.pageInfo}>
                    Trang <span className={styles.pageNumber}>{page + 1}</span> / {totalPages}
                </div>

                <button
                    className={styles.pageBtn}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages - 1}
                >
                    Sau <RightOutlined />
                </button>
            </div>
        );
    };

    return (
        <>
            {renderFilterBar()}

            {loading ? (
                <div className={styles.loading}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={styles.skeletonCard}></div>
                    ))}
                </div>
            ) : reports.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>Chưa có báo cáo nào khớp với tìm kiếm của bạn.</p>
                </div>
            ) : (
                <>
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
                                    </div>
                                    <div className={`${styles.reportTypeSmall} ${styles['type' + (report.parentType || report.type)]}`}>
                                        {report.parentTypeDisplayName ? `${report.parentTypeDisplayName} > ` : ''}
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

                    {renderPagination()}
                </>
            )}
        </>
    );
};

export default ReportList;
