'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { reportService } from '@/services/report.service';
import { Report } from '@/types/report.types';
import {
    CalendarOutlined,
    FilePdfOutlined,
    ArrowLeftOutlined,
    DownloadOutlined,
    ShareAltOutlined,
    EyeOutlined,
    FileTextOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import styles from '../Reports.module.css';
import ReportList from '../ReportList';
import Link from 'next/link';

export default function ReportDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [report, setReport] = useState<Report | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        const downloadUrl = report?.pdfUrl || report?.externalLink;
        if (!downloadUrl) return;

        try {
            setDownloading(true);
            await reportService.downloadReport(downloadUrl, report!.title);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback to direct link if API download fails
            window.open(downloadUrl, '_blank');
        } finally {
            setDownloading(false);
        }
    };

    useEffect(() => {
        const fetchReportData = async () => {
            setLoading(true);
            try {
                const reportId = parseInt(id);
                const data = await reportService.getReportById(reportId);
                setReport(data);

                // Fetch related reports
                const relatedData = await reportService.getReports({
                    type: data.type,
                    size: 6
                });
                setReports(relatedData.content);
            } catch (error) {
                console.error('Failed to fetch report detail:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchReportData();
        }
    }, [id]);

    if (loading) {
        return (
            <MainLayout>
                <div className={styles.pageContainer}>
                    <div className="container">
                        <div className={styles.skeletonDetail}></div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (!report) {
        return (
            <MainLayout>
                <div className={styles.pageContainer}>
                    <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                        <h2>Không tìm thấy báo cáo</h2>
                        <button onClick={() => router.back()} className={styles.searchButton} style={{ marginTop: '20px' }}>
                            Quay lại
                        </button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                <div className="container">
                    <div className={styles.detailWrapper}>
                        <button onClick={() => router.back()} className={styles.backButtonDetail}>
                            <ArrowLeftOutlined /> Quay lại danh sách
                        </button>

                        <div className={styles.detailHeader}>
                            <h1 className={styles.detailTitle}>{report.title}</h1>
                        </div>

                        <div className={styles.detailBody}>
                            <div className={styles.reportContent}>
                                {report.description}
                                {/* If there's more content from API, it would go here */}
                            </div>

                            <div className={styles.documentActions}>
                                <button
                                    className={styles.primaryActionButton}
                                    onClick={() => window.open(report.externalLink || report.pdfUrl, '_blank')}
                                >
                                    <EyeOutlined /> Xem tài liệu
                                </button>
                                <button
                                    onClick={handleDownload}
                                    disabled={downloading}
                                    className={styles.secondaryActionButton}
                                >
                                    {downloading ? <LoadingOutlined /> : <DownloadOutlined />}
                                    {downloading ? 'Đang tải...' : 'Tải tài liệu'}
                                </button>
                            </div>
                        </div>

                        <div className={styles.relatedSectionList}>
                            <h3 className={styles.relatedTitle}>Các bài viết liên quan</h3>
                            <div className={styles.relatedList}>
                                {reports.filter((r: Report) => r.id !== report.id).slice(0, 5).map((related: Report) => (
                                    <Link
                                        key={related.id}
                                        href={`/reports/${related.id}`}
                                        className={styles.relatedListItem}
                                    >
                                        <span className={styles.relatedItemTitle}>{related.title}</span>
                                        <span className={styles.relatedItemDate}>
                                            - {new Date(related.createdAt).toLocaleDateString('vi-VN')}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
