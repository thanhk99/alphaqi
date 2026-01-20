'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    TeamOutlined,
    LineChartOutlined,
    SafetyCertificateOutlined,
    ReadOutlined,
    BankOutlined
} from '@ant-design/icons';
import styles from './page.module.css';

export default function CorporateTrainingPage() {

    const services = [
        {
            icon: <TeamOutlined />,
            title: 'Đào tạo tài chính cá nhân cho nhân viên',
            description: 'Giúp nhân viên an tâm tài chính để tập trung cống hiến, nâng cao hiệu suất làm việc và sự gắn bó với doanh nghiệp.'
        },
        {
            icon: <LineChartOutlined />,
            title: 'Quản lý đầu tư cơ bản/nâng cao',
            description: 'Trang bị kiến thức phân tích thị trường, quản trị rủi ro và các chiến lược đầu tư đa lớp tài sản chuyên sâu.'
        },
        {
            icon: <BankOutlined />,
            title: 'Wealth Management cơ bản/nâng cao',
            description: 'Quy trình quản lý tài sản toàn diện theo tiêu chuẩn quốc tế dành cho các tổ chức tài chính và ngân hàng.'
        },
        {
            icon: <SafetyCertificateOutlined />,
            title: 'Chương trình CFP',
            description: 'Lộ trình chuẩn bị cho chứng chỉ Certified Financial Planner (CFP) uy tín nhất toàn cầu trong lĩnh vực hoạch định tài chính.'
        },
        {
            icon: <ReadOutlined />,
            title: 'Private Banker chuyên nghiệp',
            description: 'Phát triển kỹ năng tư vấn khách hàng cao cấp và xây dựng mối quan hệ bền vững dựa trên sự tin cậy và chuyên môn.'
        }
    ];

    return (
        <MainLayout>
            <div className="container">
                <div className={styles.heroSection}>
                    <div className={styles.heroLeft}>
                        <span className={styles.tag}>DỊCH VỤ TƯ VẤN</span>
                        <h1 className={styles.heroTitle}>
                            Đào tạo <span className={styles.highlightText}>doanh nghiệp</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Chúng tôi cung cấp các giải pháp đào tạo tài chính tùy chỉnh, được thiết kế theo dạng module linh hoạt nhằm nâng cao năng lực chuyên môn và nhận thức tài chính cho đội ngũ nhân sự của bạn.
                        </p>
                        <p className={styles.heroSubtitle}>
                            Với đội ngũ chuyên gia giàu kinh nghiệm thực chiến, chương trình của chúng tôi không chỉ dừng lại ở lý thuyết mà tập trung vào việc áp dụng thực tế, giúp doanh nghiệp tối ưu hóa nguồn lực con người.
                        </p>
                        <br />
                        <a href="/contact" className={styles.advisorButton}>
                            Tư vấn lộ trình
                        </a>
                    </div>

                    <div className={styles.heroRight}>
                        {services.map((service, index) => (
                            <div key={index} className={styles.serviceCard}>
                                <div className={styles.iconWrapper}>
                                    {service.icon}
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{service.title}</h3>
                                    <p className={styles.cardDesc}>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaBox}>
                        <div className={styles.ctaText}>
                            <h2>Bắt đầu chương trình đào tạo của bạn</h2>
                            <p>
                                Liên hệ với chuyên gia của chúng tôi để thiết kế lộ trình đào tạo phù hợp nhất với mục tiêu chiến lược của doanh nghiệp bạn.
                            </p>
                        </div>
                        <a href="/contact" className={styles.ctaButton}>
                            NHẬN TƯ VẤN NGAY
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
