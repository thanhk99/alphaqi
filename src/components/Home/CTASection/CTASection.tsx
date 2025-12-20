'use client';

import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './CTASection.module.css';

export default function CTASection() {
    return (
        <section className={styles.cta}>
            <div className="container text-center">
                <h2>Làm chủ tài sản, Kiến tạo tương lai</h2>
                <p>Bắt đầu hành trình quản lý tài sản chuyên nghiệp cùng AlphaQi ngay hôm nay.</p>
                <a href="/courses" className={styles.ctaButton}>
                    Khám phá lộ trình của bạn <ArrowRightOutlined />
                </a>
            </div>
        </section>
    );
}
