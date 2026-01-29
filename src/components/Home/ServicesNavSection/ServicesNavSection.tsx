'use client';

import React from 'react';
import Link from 'next/link';
import {
    LineChartOutlined,
    SafetyCertificateOutlined,
    ReadOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import styles from './ServicesNavSection.module.css';

export default function ServicesNavSection() {
    return (
        <section className={styles.servicesNavSection}>
            <div className={styles.gridContainer}>
                {/* Top Row: Investment & Asset Management */}
                <div className={styles.topRow}>
                    <Link href="/investment-services" className={styles.serviceCard}>
                        <div className={styles.iconWrapper}>
                            <LineChartOutlined />
                        </div>
                        <h3 className={styles.title}>Tư vấn đầu tư</h3>
                        <p className={styles.description}>
                            Chiến lược đầu tư thông minh, tối ưu hóa lợi nhuận và giảm thiểu rủi ro cho danh mục của bạn.
                        </p>
                        <span className={styles.linkText}>
                            Giới thiệu <ArrowRightOutlined />
                        </span>
                    </Link>

                    <Link href="/wealth" className={styles.serviceCard}>
                        <div className={styles.iconWrapper}>
                            <SafetyCertificateOutlined />
                        </div>
                        <h3 className={styles.title}>Quản lý tài sản</h3>
                        <p className={styles.description}>
                            Giải pháp quản lý, bảo vệ và gia tăng tài sản bền vững cho tương lai thịnh vượng.
                        </p>
                        <span className={styles.linkText}>
                            Giới thiệu <ArrowRightOutlined />
                        </span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
