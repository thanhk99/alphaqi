'use client';

import React from 'react';
import { SafetyCertificateOutlined, TeamOutlined, BookOutlined } from '@ant-design/icons';
import styles from './FeaturesSection.module.css';

export default function FeaturesSection() {
    const features = [
        {
            icon: <SafetyCertificateOutlined />,
            title: 'Thực chiến, không chỉ sách vở',
            description: 'Đến từ Wealth Manager (là người tiên phong trong dịch vụ uỷ thác đầu tư chuyên nghiệp tại Công ty Quản lý Quỹ với quy mô lớn ở Việt Nam từ cách đây hơn 10 năm), PE(là Giám đốc đầu tư quý PE đã từng làm nhiều thương vụ mua bán, đầu tư PE theo đúng nhu cầu khách hàng PRIVATE), M&A, family office,...',
        },
        {
            icon: <TeamOutlined />,
            title: 'Không xung đột lợi ích',
            description: 'Khoá học mang tính chất độc lập, khách quan',
        },
        {
            icon: <BookOutlined />,
            title: 'Đã được kiểm chứng trên thực tế',
            description: 'Đã được kiểm chứng trên khách hàng thực tế',
        },
        {
            icon: <SafetyCertificateOutlined />,
            title: 'Khoá học thiết kế riêng',
            description: 'Thiết kế dành riêng cho ngân hàng, không dùng chương trình đóng gói sẵn',
        },
    ];

    return (
        <section className={styles.featuresSection}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <h2 className={styles.sectionTitle}>Tại sao chọn AlphaQi?</h2>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureItem}>
                                <div className={styles.featureIcon}>{feature.icon}</div>
                                <div>
                                    <h4>{feature.title}</h4>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-6">
                        <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                            <img src="/imgs/dashboard-feature-16-9.png" alt="AlphaQi Financial Dashboard" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
