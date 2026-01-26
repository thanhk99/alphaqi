'use client';

import React, { useEffect, useState } from 'react';
import { reportService } from '@/services/report.service';
import { Report } from '@/types/report.types';
import { SearchOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined, EyeOutlined, DownloadOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './Reports.module.css';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';


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
    const router = useRouter();
    const pathname = usePathname();
    const typeFromUrl = searchParams.get('type') || '';

    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState<string>(typeFromUrl);
    const [search, setSearch] = useState('');
    const [downloadingId, setDownloadingId] = useState<number | null>(null);
    const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

    const INITIAL_VISIBLE_COUNT = 6;

    // Sync selectedType with URL parameter
    useEffect(() => {
        setSelectedType(typeFromUrl);
        // Reset visible counts when type changes
        setVisibleCounts({});
    }, [typeFromUrl]);


    const fetchReports = async () => {
        setLoading(true);
        try {
            // Fetch all reports for the catalog if no specific type is selected
            const data = await reportService.getReports({
                type: selectedType || undefined,
                search: search || undefined,
                size: 1000, // Fetch all reports
                sort: 'createdAt,desc'
            });
            setReports(data.reports.content);
        } catch (error) {
            console.error('Failed to fetch reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (report: Report, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const downloadUrl = report.pdfUrl || report.externalLink;
        if (!downloadUrl) return;

        try {
            setDownloadingId(report.id);
            await reportService.downloadReport(downloadUrl, report.title);
        } catch (error) {
            console.error('Download failed:', error);
            window.open(downloadUrl, '_blank');
        } finally {
            setDownloadingId(null);
        }
    };

    useEffect(() => {
        fetchReports();
        setVisibleCounts({}); // Reset when selectedType changes
    }, [selectedType]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setVisibleCounts({}); // Reset when searching
        fetchReports();
    };

    const handleShowMore = (id: string) => {
        setVisibleCounts(prev => ({
            ...prev,
            [id]: (prev[id] || INITIAL_VISIBLE_COUNT) + 6
        }));
    };

    const getVisibleCount = (id: string) => visibleCounts[id] || INITIAL_VISIBLE_COUNT;


    const renderReportCard = (report: Report) => (
        <Link
            key={report.id}
            href={`/reports/${report.id}`}
            className={styles.reportCard}
        >
            <div className={styles.cardHeader}>
                <div className={styles.reportDateTop}>
                    Ngày đăng: {new Date(report.createdAt).toLocaleDateString('vi-VN')}
                </div>
                <div className={styles.reportTypeSmall}>
                    {report.parentTypeDisplayName || report.typeDisplayName}
                </div>
            </div>
            <h3 className={styles.reportTitle}>{report.title}</h3>
            <p className={styles.reportDesc}>{report.description}</p>
            <div className={styles.reportFooter}>
                <div className={styles.cardActions}>
                    <button
                        className={styles.cardActionBtn}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(report.pdfUrl || report.externalLink || '#', '_blank');
                        }}
                    >
                        <EyeOutlined /> Xem
                    </button>
                    <button
                        className={styles.cardActionBtn}
                        onClick={(e) => handleDownload(report, e)}
                        disabled={downloadingId === report.id}
                    >
                        {downloadingId === report.id ? <LoadingOutlined /> : <DownloadOutlined />} Tải báo cáo
                    </button>
                </div>
            </div>
        </Link>
    );

    const groupReports = () => {
        const groups: {
            label: string,
            code: string,
            reports: Report[],
            subGroups?: { label: string, code: string, reports: Report[] }[]
        }[] = [];

        REPORT_GROUPS.forEach(groupConfig => {
            const itemCodes = groupConfig.items?.map(i => i.code) || [];
            const belongReports = reports.filter(r =>
                (r.parentType === groupConfig.code) ||
                (r.type === groupConfig.code) ||
                (itemCodes.includes(r.type))
            );

            if (belongReports.length > 0) {
                if (groupConfig.code === 'MACRO' || groupConfig.code === 'COMPANY_INDUSTRY' || groupConfig.code === 'ASSET_MANAGEMENT') {
                    // Split into sub-groups
                    const subGroups: { label: string, code: string, reports: Report[] }[] = [];

                    // Track which reports have been added to a sub-group
                    const assignedReportIds = new Set<number>();

                    groupConfig.items.forEach(itemConfig => {
                        const itemReports = belongReports.filter(r => r.type === itemConfig.code);
                        if (itemReports.length > 0) {
                            subGroups.push({
                                label: itemConfig.displayName,
                                code: itemConfig.code,
                                reports: itemReports
                            });
                            itemReports.forEach(r => assignedReportIds.add(r.id));
                        }
                    });

                    // Find reports that matched the group but NOT any specific item
                    const remainingReports = belongReports.filter(r => !assignedReportIds.has(r.id));

                    if (remainingReports.length > 0) {
                        // Add them to a "General" or "Other" subgroup, or mapped to the first item if appropriate
                        // For now, let's create a "Chung" group or append to the existing list if desired.
                        // Or if the groupConfig has an item with the same code as group, we might have missed it if type match failed but parentType matched.

                        // Check if there is a "General" item (code == groupConfig.code)
                        const generalSubGroupIndex = subGroups.findIndex(sg => sg.code === groupConfig.code);

                        if (generalSubGroupIndex !== -1) {
                            subGroups[generalSubGroupIndex].reports.push(...remainingReports);
                        } else {
                            // Create a catch-all subgroup
                            subGroups.push({
                                label: `${groupConfig.label} chung`,
                                code: `${groupConfig.code}_GENERAL`,
                                reports: remainingReports
                            });
                        }
                    }

                    groups.push({
                        label: groupConfig.label,
                        code: groupConfig.code,
                        reports: [],
                        subGroups: subGroups
                    });
                } else if (groupConfig.label === 'Khác') {
                    // Handle "Khác" separately
                    groupConfig.items.forEach(itemConfig => {
                        const itemReports = reports.filter(r => r.type === itemConfig.code);
                        if (itemReports.length > 0) {
                            groups.push({
                                label: itemConfig.displayName,
                                code: itemConfig.code,
                                reports: itemReports
                            });
                        }
                    });
                } else {
                    groups.push({
                        label: groupConfig.label,
                        code: groupConfig.code || groupConfig.label,
                        reports: belongReports
                    });
                }
            }
        });

        return groups;
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
                        const newType = e.target.value;
                        setSelectedType(newType);

                        // Update URL
                        const params = new URLSearchParams(searchParams.toString());
                        if (newType) {
                            params.set('type', newType);
                        } else {
                            params.delete('type');
                        }
                        router.push(`${pathname}?${params.toString()}`);
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
            ) : (selectedType && !REPORT_GROUPS.some(g => g.code === selectedType)) ? (
                <>
                    <h2 className={styles.categoryTitle}>
                        {REPORT_GROUPS.flatMap(g => g.items).find(i => i.code === selectedType)?.displayName || "Kết quả lọc"}
                    </h2>
                    <div className={styles.reportGrid}>
                        {reports.slice(0, getVisibleCount('filtered')).map(renderReportCard)}
                    </div>
                    {reports.length > getVisibleCount('filtered') && (
                        <div className={styles.loadMoreContainer}>
                            <button className={styles.loadMoreButton} onClick={() => handleShowMore('filtered')}>
                                Xem thêm <ArrowRightOutlined />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className={styles.catalogView}>
                    {groupReports().map((group) => (
                        <section key={group.code} className={styles.categorySection}>
                            <h2 className={styles.categoryTitle}>{group.label}</h2>

                            {group.subGroups ? (
                                group.subGroups.map(sub => (
                                    <div key={sub.code} className={styles.subCategoryWrapper}>
                                        <h3 className={styles.subCategoryTitle}>{sub.label}</h3>
                                        <div className={styles.reportGrid}>
                                            {sub.reports.slice(0, getVisibleCount(sub.code)).map(renderReportCard)}
                                        </div>
                                        {sub.reports.length > getVisibleCount(sub.code) && (
                                            <div className={styles.loadMoreContainer}>
                                                <button className={styles.loadMoreButton} onClick={() => handleShowMore(sub.code)}>
                                                    Xem thêm <ArrowRightOutlined />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className={styles.reportGrid}>
                                        {group.reports.slice(0, getVisibleCount(group.code)).map(renderReportCard)}
                                    </div>
                                    {group.reports.length > getVisibleCount(group.code) && (
                                        <div className={styles.loadMoreContainer}>
                                            <button className={styles.loadMoreButton} onClick={() => handleShowMore(group.code)}>
                                                Xem thêm <ArrowRightOutlined />
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </section>
                    ))}
                </div>
            )}
        </>
    );
};

export default ReportList;
