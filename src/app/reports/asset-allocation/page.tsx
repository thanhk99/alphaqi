'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import styles from './AssetAllocation.module.css';
import commonStyles from '../Reports.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FilePdfOutlined, LineChartOutlined } from '@ant-design/icons';

import { chartService } from '@/services/chart.service';
import { ChartItemResponse } from '@/types/chart.types';

interface ChartItemUI extends ChartItemResponse {
    label: string;
    color: string;
}

export default function AssetAllocationPage() {
    const pathname = usePathname();
    const [chartData, setChartData] = React.useState<ChartItemUI[]>([]);
    const [loading, setLoading] = React.useState(true);

    // Default colors for chart segments
    const COLORS = ['#1890ff', '#722ed1', '#52c41a', '#faad14', '#f5222d', '#13c2c2'];

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await chartService.getChartItems();
                // Map API data to include colors if missing
                const formattedData = data.map((item, index) => ({
                    ...item,
                    label: item.name, // Map API 'name' to 'label' for UI compatibility
                    color: item.color || COLORS[index % COLORS.length]
                }));
                setChartData(formattedData);
            } catch (error) {
                console.error('Failed to fetch chart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Use API data or fallback to empty array (or initial state)
    const data = chartData;

    const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
    let cumulativePercentage = 0;

    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                <section className={styles.hero}>
                    <div className="container">
                        <h1 className={styles.heroTitle}>Gợi ý phân bổ tài sản</h1>
                    </div>
                </section>

                <div className="container">


                    <div className={styles.allocationCard}>
                        <div className={styles.contentSection}>
                            <div className={styles.badge}>
                                <LineChartOutlined /> Dịch vụ tư vấn đầu tư
                            </div>
                            <h2 className={styles.title}>
                                Gợi ý phân bổ tài sản
                                <span className={styles.titleStrong}>— CIO View</span>
                            </h2>
                            <p className={styles.description}>
                                Định kỳ hàng tháng chúng tôi xin gửi tới quý khách hàng gợi ý phân bổ hàng tháng cho quý khách ở báo cáo CIO View theo link sau:
                            </p>

                            <Link href="/reports/cio" className={styles.cioViewButton}>
                                <FilePdfOutlined /> Xem báo cáo CIO View
                            </Link>

                            <p className={styles.note}>
                                * Báo cáo được cập nhật vào ngày làm việc đầu tiên của mỗi tháng.
                            </p>
                        </div>

                        <div className={styles.chartSection}>
                            <div className={styles.chartHeader}>
                                <span className={styles.chartSubtitle}>Minh họa phân bổ</span>
                                <div className={styles.chartTitle}></div>
                            </div>

                            <div className={styles.chartContainer}>
                                <svg width="100%" height="100%" viewBox="0 0 42 42" className={styles.donutSvg}>
                                    <circle className={styles.donutHole} cx="21" cy="21" r="15.91549430918954" fill="white"></circle>
                                    <circle className={styles.donutRing} cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#f0f2f5" strokeWidth="4"></circle>

                                    {data.map((item, index) => {
                                        const percentage = (item.value / totalValue) * 100;
                                        const dashArray = `${percentage} ${100 - percentage}`;
                                        const dashOffset = 100 - cumulativePercentage + 25;
                                        cumulativePercentage += percentage;

                                        return (
                                            <circle
                                                key={index}
                                                className={styles.donutSegment}
                                                cx="21"
                                                cy="21"
                                                r="15.91549430918954"
                                                fill="transparent"
                                                stroke={item.color}
                                                strokeWidth="4"
                                                strokeDasharray={dashArray}
                                                strokeDashoffset={dashOffset}
                                            ></circle>
                                        );
                                    })}
                                </svg>
                                <div className={styles.chartCenterText}>
                                    <span className={styles.centerLabel}>Danh mục</span>
                                    <span className={styles.centerValue}>Chiến lược</span>
                                </div>
                            </div>

                            <div className={styles.legend}>
                                {data.map((item, index) => {
                                    const percentage = ((item.value / totalValue) * 100).toFixed(1);
                                    return (
                                        <div key={index} className={styles.legendItem}>
                                            <div className={styles.legendColor} style={{ backgroundColor: item.color }}></div>
                                            <span>{item.label}: {item.value} ({percentage}%)</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
