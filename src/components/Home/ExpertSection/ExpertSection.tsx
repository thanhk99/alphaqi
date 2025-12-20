'use client';

import React from 'react';
import styles from './ExpertSection.module.css';

export default function ExpertSection() {
    return (
        <section className={styles.expertSection}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Gặp gỡ Chuyên gia</h2>
                <div className={styles.expertGrid}>
                    <div className={styles.expertContent}>
                        <h3>Ông Nguyễn Minh Hạnh - Chairman & CIO</h3>
                        <p>
                            Ông Hạnh có 20 năm kinh nghiệm quản lý tài sản và đầu tư chuyên nghiệp.
                            Từng quản lý danh mục đầu tư trị giá gần 200 triệu USD tại SSIAM với hiệu suất vượt trội.
                        </p>
                        <p>
                            Với triết lý "Quản lý tài sản bền vững", ông đã giúp hàng nghìn cá nhân và doanh nghiệp
                            xây dựng lộ trình tài chính vững chắc, đạt được các cột mốc từ tiết kiệm đến tự do tài chính.
                        </p>
                    </div>
                    <div className={styles.expertImage}>
                        <img src="/imgs/profile 1.png" alt="AlphaQi Logo" className={styles.expertBgLogo} />
                        <img src="/imgs/avt-Photoroom.png" alt="Nguyen Minh Hanh" className={styles.expertAvatar} />
                    </div>
                </div>
            </div>
        </section>
    );
}
