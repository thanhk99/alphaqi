'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    TeamOutlined,
    SolutionOutlined,
    BankOutlined,
    ArrowRightOutlined,
    DatabaseOutlined,
    DollarOutlined
} from '@ant-design/icons';
import styles from './page.module.css';

import { useRouter } from 'next/navigation';

export default function WealthPage() {
    const router = useRouter();

    const services = [
        {
            icon: <SolutionOutlined />,
            title: 'Tư vấn Tài chính Cá nhân',
            description: 'Dịch vụ Coaching 1-1 giúp xây dựng lộ trình tự do tài chính, cơ cấu danh mục đầu tư an toàn và hiệu quả.',
            link: '/investment-services/consulting'
        },
        {
            icon: <BankOutlined />,
            title: 'Gợi ý phân bổ gia sản',
            description: 'Định kỳ hàng tháng chúng tôi sẽ có báo cáo gợi ý phân bổ tài sản cho khách hàng. Báo cáo được cập nhật vào ngày làm việc đầu tiên của mỗi tháng.',
            link: '/reports/asset-allocation'
        },
        {
            icon: <BankOutlined />,
            title: 'Tư vấn quản lý gia sản',
            description: 'Hoạch định tài chính toàn diện, bảo toàn và phát triển tài sản bền vững cho cá nhân và gia đình.',
            link: '/wealth/asset-manage'
        },
        {
            icon: <DollarOutlined />,
            title: 'Dịch vụ Family Office',
            description: 'Dịch vụ setup thành lập family office, vận hành hoạt động đầu tư cho family office với vai trò CIO của Family Office, các hoạt động tư vấn về kinh doanh, vận hành, tài chính, đầu tư,... hàng ngày.',
            link: '/wealth/family-office'
        },

    ];

    const steps = [
        {
            number: '01',
            title: 'Thấu hiểu Mục tiêu',
            description: 'Phân tích thực trạng tài chính và mong muốn phát triển tài sản của khách hàng.'
        },
        {
            number: '02',
            title: 'Thiết kế Giải pháp',
            description: 'Xây dựng danh mục đầu tư và lộ trình quản lý gia sản tối ưu, bền vững.'
        },
        {
            number: '03',
            title: 'Thực thi & Giám sát',
            description: 'Triển khai các hoạt động đầu tư và theo dõi sát sao biến động thị trường.'
        },
        {
            number: '04',
            title: 'Báo cáo & Tối ưu',
            description: 'Định kỳ đánh giá hiệu quả và điều chỉnh danh mục để đạt mục tiêu đề ra.'
        }
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Quản lý Gia sản & Đầu tư</h1>
                        <p className={styles.heroSubtitle}>
                            Bảo toàn giá trị, kiến tạo thịnh vượng. AlphaQi đồng hành cùng quý khách hàng trên con đường tự do tài chính và truyền giữ gia sản.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.servicesSection}>
                <div className="container">
                    <div className={styles.sectionTitle}>
                        <span>Giải pháp Chuyên biệt</span>
                        <h2>Wealth Management & Personal Finance</h2>
                    </div>

                    <div className={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`${styles.serviceCard} ${service.link ? styles.clickableCard : ''}`}
                                onClick={() => service.link && router.push(service.link)}
                            >
                                <div className={styles.iconWrapper}>
                                    {service.icon}
                                </div>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceDesc}>{service.description}</p>
                                {service.link ? (
                                    <div className={styles.serviceLink}>
                                        Tìm hiểu thêm <ArrowRightOutlined />
                                    </div>
                                ) : (
                                    <div className={styles.lockedMessage}>
                                        Sắp ra mắt
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className={styles.processSection}>
                <div className="container">
                    <div className={styles.sectionTitle}>
                        <span>Quy trình Tư vấn</span>
                        <h2>Chuyên nghiệp & Minh bạch</h2>
                    </div>

                    <div className={styles.processSteps}>
                        {steps.map((step, index) => (
                            <div key={index} className={styles.step}>
                                <div className={styles.stepNumber}>{step.number}</div>
                                <h4 className={styles.stepTitle}>{step.title}</h4>
                                <p className={styles.stepDesc}>{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.ctaSection}>
                <div className="container">
                    <div className={styles.ctaContent}>
                        <h2>Sẵn sàng bắt đầu hành trình thịnh vượng?</h2>
                        <p className="mt-3">
                            Liên hệ ngay với đội ngũ cố vấn của AlphaQi để được tư vấn lộ trình tài chính cá nhân hóa dành riêng cho bạn.
                        </p>
                        <a href="/contact" className={styles.ctaButton}>
                            Đặt lịch tư vấn ngay <ArrowRightOutlined />
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
