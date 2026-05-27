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
