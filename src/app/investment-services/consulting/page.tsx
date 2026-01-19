'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    TeamOutlined,
    PieChartOutlined,
    AuditOutlined,
    SafetyCertificateOutlined,
    StarOutlined,
    ApartmentOutlined
} from '@ant-design/icons';
import styles from './page.module.css';

export default function PersonalConsultingPage() {

    const services = [
        {
            icon: <TeamOutlined />,
            title: 'Coaching 1-1',
            description: 'Đồng hành xây dựng lộ trình tự do tài chính, kiểm soát rủi ro và thiết lập thói quen quản lý tiền bạc thông minh. Tư vấn sát sao theo từng mục tiêu riêng biệt.',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop'
        },
        {
            icon: <PieChartOutlined />,
            title: 'Cơ cấu danh mục đầu tư',
            description: 'Tối ưu hóa lợi nhuận dựa trên chu kỳ thị trường và khẩu vị rủi ro thông qua việc phân bổ tài sản đa kênh (Chứng khoản, Bất động sản, Vàng) chuyên nghiệp.',
            image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop'
        },
        {
            icon: <AuditOutlined />,
            title: 'Quản trị kinh doanh & Thuế',
            description: 'Tối ưu hóa dòng tiền và hiệu quả thuế cho chủ doanh nghiệp SME, đảm bảo sự phát triển hài hòa giữa tài sản cá nhân và sức mạnh doanh nghiệp.',
            image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop'
        }
    ];

    const features = [
        {
            icon: <SafetyCertificateOutlined />,
            title: 'Độc quyền & Riêng tư',
            description: 'Mọi kế hoạch tài chính được bảo mật tuyệt đối và thiết kế riêng biệt cho từng hồ sơ khách hàng cao cấp.'
        },
        {
            icon: <StarOutlined />,
            title: 'Chuyên gia giàu kinh nghiệm',
            description: 'Đội ngũ cố vấn có thâm niên trên 15 năm trong lĩnh vực ngân hàng đầu tư và quản lý tài sản.'
        },
        {
            icon: <ApartmentOutlined />,
            title: 'Tiếp cận hệ sinh thái',
            description: 'Kết nối trực tiếp với các định chế tài chính quốc tế và các cơ hội đầu tư Private Equity độc quyền.'
        }
    ];

    return (
        <MainLayout>
            <div className="container">
                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>
                            Tư vấn tài chính <span className={styles.highlightText}>cá nhân</span>
                        </h1>
                        <p className={styles.heroDesc}>
                            Kiến tạo lộ trình tăng trưởng tài sản và sự nghiệp cá nhân hóa, giúp bạn làm chủ tương lai tài chính một cách bền vững thông qua các giải pháp chuyên sâu.
                        </p>
                        <a href="/contact" className={styles.primaryBtn}>
                            Đăng ký tư vấn ngay
                        </a>
                    </div>
                </section>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: 0 }} />

                {/* Core Services */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Dịch vụ cốt lõi dành cho bạn</h2>
                    <div className={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <div key={index} className={styles.serviceCard}>
                                <div className={styles.cardImageWrapper}>
                                    {service.image && (
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className={styles.cardImage}
                                        />
                                    )}
                                    {!service.image && (
                                        <div style={{ fontSize: 60, color: '#d9d9d9', opacity: 0.5 }}>
                                            {service.icon}
                                        </div>
                                    )}
                                </div>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardHeader}>
                                        <span className={styles.cardIcon}>{service.icon}</span>
                                        <h3 className={styles.cardTitle}>{service.title}</h3>
                                    </div>
                                    <p className={styles.cardDesc}>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Tại sao chọn chúng tôi?</h2>
                    <div className={styles.whyChooseGrid}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.featureIconWrapper}>
                                    {feature.icon}
                                </div>
                                <h3 className={styles.featureTitle}>{feature.title}</h3>
                                <p className={styles.featureDesc}>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className={styles.ctaSection}>
                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>Bắt đầu hành trình thịnh vượng của bạn</h2>
                        <p className={styles.ctaDesc}>
                            Liên hệ với chuyên gia của chúng tôi ngay hôm nay để nhận bản đánh giá sức khỏe tài chính sơ bộ hoàn toàn miễn phí.
                        </p>
                        <div className={styles.ctaButtons}>
                            <a href="/contact" className={styles.primaryBtn}>
                                Đặt lịch hẹn tư vấn
                            </a>
                            <a href="/about" className={styles.secondaryBtn}>
                                Tìm hiểu quy trình
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
