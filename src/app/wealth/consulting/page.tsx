'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    FileTextOutlined,
    LineChartOutlined,
    BarChartOutlined,
    LinkOutlined,
    SafetyCertificateOutlined,
    GlobalOutlined,
    AuditOutlined,
    CheckCircleFilled
} from '@ant-design/icons';
import styles from './page.module.css';

const services = [
    {
        icon: <FileTextOutlined />,
        title: 'Báo cáo & Chiến lược',
        description: 'Dịch vụ báo cáo, chiến lược đầu tư, thuyết trình định kỳ cho nhà đầu tư tổ chức và cá nhân chuyên nghiệp.'
    },
    {
        icon: <LineChartOutlined />,
        title: 'Khuyến nghị hàng ngày',
        description: 'Danh mục khuyến nghị đầu tư được cập nhật liên tục hàng ngày dựa trên biến động thực tế của thị trường.'
    },
    {
        icon: <BarChartOutlined />,
        title: 'Hiệu suất đầu tư',
        description: 'Bảng hiệu suất đầu tư minh bạch, theo dõi các chỉ tiêu danh mục đầu tư lũy kế một cách chính xác.'
    }
];

export default function InvestmentConsultingPage() {
    return (
        <MainLayout>
            <div className={styles.container}>
                <div className="container">
                    {/* Header Section */}
                    <div className={styles.header}>
                        <div className={styles.badge}>
                            <CheckCircleFilled className={styles.badgeIcon} />
                            PREMIUM ADVISORY
                        </div>
                        <h1 className={styles.title}>Tư vấn đầu tư</h1>
                        <p className={styles.description}>
                            Chúng tôi cung cấp sự cố vấn đầu tư cá nhân hóa theo mức độ rủi ro (risk profile) của từng khách hàng và đem lại kết quả đầu tư hiệu quả, bền vững trong thời gian dài.
                        </p>
                    </div>

                    {/* Services Cards */}
                    <div className={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <div key={index} className={styles.serviceCard}>
                                <div className={styles.iconWrapper}>
                                    {service.icon}
                                </div>
                                <h3 className={styles.cardTitle}>{service.title}</h3>
                                <p className={styles.cardDesc}>{service.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section: Chart and Connection */}
                    <div className={styles.bottomGrid}>
                        {/* Chart Card */}
                        <div className={styles.chartCard}>
                            <div className={styles.chartHeader}>
                                <div className={styles.chartTitleWrapper}>
                                    <h3>Biểu đồ hiệu suất</h3>
                                    <span className={styles.chartSubtitle}>VISUAL PERFORMANCE TRACKING</span>
                                </div>
                                <div className={styles.metricWrapper}>
                                    <span className={styles.metricValue}>+24.5%</span>
                                    <span className={styles.metricTrend}>+5.2% tháng này</span>
                                </div>
                            </div>

                            <div className={styles.chartContainer}>
                                <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1275bc" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#1275bc" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {/* Grid Lines */}
                                    <line x1="0" y1="250" x2="800" y2="250" stroke="#f0f0f0" strokeWidth="1" />
                                    <line x1="0" y1="175" x2="800" y2="175" stroke="#f0f0f0" strokeWidth="1" />
                                    <line x1="0" y1="100" x2="800" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                                    <line x1="0" y1="25" x2="800" y2="25" stroke="#f0f0f0" strokeWidth="1" />

                                    {/* Area */}
                                    <path
                                        d="M0,250 C100,220 200,100 300,150 C400,200 500,100 600,120 C700,140 800,90 800,90 L800,250 L0,250 Z"
                                        fill="url(#chartGradient)"
                                        className={styles.chartGradient}
                                    />
                                    {/* Line */}
                                    <path
                                        d="M0,250 C100,220 200,100 300,150 C400,200 500,100 600,120 C700,140 800,90 800,90"
                                        fill="none"
                                        stroke="#1275bc"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        className={styles.chartPath}
                                    />
                                </svg>
                                <div className={styles.chartLabels}>
                                    <span className={styles.chartLabel}>JAN</span>
                                    <span className={styles.chartLabel}>MAR</span>
                                    <span className={styles.chartLabel}>MAY</span>
                                    <span className={styles.chartLabel}>JUL</span>
                                    <span className={styles.chartLabel}>SEP</span>
                                    <span className={styles.chartLabel}>NOV</span>
                                </div>
                            </div>
                        </div>

                        {/* Connection Card */}
                        <div className={styles.connectionCard}>
                            <div className={styles.connIcon}>
                                <LinkOutlined />
                            </div>
                            <h2 className={styles.connTitle}>Kết nối tài khoản</h2>
                            <p className={styles.connDesc}>
                                Kết nối tài khoản giao dịch chứng khoán của bạn vào danh mục tư vấn đầu tư để tối ưu hóa quản lý và nhận cảnh báo tức thời.
                            </p>

                            <div className={styles.buttonGroup}>
                                <a href="#" className={styles.connectBtn}>
                                    <LinkOutlined /> Kết nối ngay
                                </a>
                                <a href="/about" className={styles.learnMoreBtn}>
                                    Tìm hiểu thêm
                                </a>
                            </div>

                            <div className={styles.socialProof}>
                                <div className={styles.avatars}>
                                    <img src="https://i.pravatar.cc/150?u=1" alt="Avatar" className={styles.avatar} />
                                    <img src="https://i.pravatar.cc/150?u=2" alt="Avatar" className={styles.avatar} />
                                    <div className={styles.avatarMore}>+5k</div>
                                </div>
                                <span className={styles.proofText}>
                                    Đã có <span className={styles.bold}>5,000+ nhà đầu tư</span> tham gia
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer Logos */}
                    <div className={styles.footerLogos}>
                        <div className={styles.logoItem}>
                            <SafetyCertificateOutlined /> SAFEGUARD GLOBAL
                        </div>
                        <div className={styles.logoItem}>
                            <AuditOutlined /> ELITE ADVISORY
                        </div>
                        <div className={styles.logoItem}>
                            <GlobalOutlined /> FINTECH NETWORK
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
