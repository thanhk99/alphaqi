'use client';

import React from 'react';
import Link from 'next/link';
import {
    LineChartOutlined,
    SafetyCertificateOutlined,
    ReadOutlined,
    BankOutlined
} from '@ant-design/icons';
import styles from './ServicesNavSection.module.css';

export default function ServicesNavSection() {
    return (
        <section className={styles.navSectionWrapper}>
            <div className={styles.navGrid}>
                {/* Tư vấn đầu tư */}
                <Link href="/investment-services" className={styles.navItem}>
                    <div className={styles.iconWrapper}>
                        <LineChartOutlined />
                    </div>
                    <span className={styles.title}>Tư vấn Tái cấu trúc</span>
                </Link>

                {/* Quản lý tài sản */}
                <Link href="/wealth/asset-manage" className={styles.navItem}>
                    <div className={styles.iconWrapper}>
                        <SafetyCertificateOutlined />
                    </div>
                    <span className={styles.title}>Quản lý gia sản</span>
                </Link>

                {/* Ngân hàng đầu tư */}
                <Link href="/investment-bank" className={styles.navItem}>
                    <div className={styles.iconWrapper}>
                        <BankOutlined />
                    </div>
                    <span className={styles.title}>Tư vấn quản lý </span>
                </Link>

                {/* Đào tạo */}
                <Link href="/investment-services/corporate" className={styles.navItem}>
                    <div className={styles.iconWrapper}>
                        <ReadOutlined />
                    </div>
                    <span className={styles.title}>Đào tạo doanh nghiệp</span>
                </Link>
            </div>
        </section>
    );
}
