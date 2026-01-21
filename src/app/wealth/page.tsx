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

export default function TrainingServicesPage() {

    const services = [
        {
            icon: <SolutionOutlined />,
            title: 'Tư vấn Tài chính Cá nhân',
            description: 'Dịch vụ Coaching 1-1 giúp xây dựng lộ trình tự do tài chính, cơ cấu danh mục đầu tư an toàn và hiệu quả.'
        },
        {
            icon: <BankOutlined />,
            title: 'Gợi ý phân bố gia sản',
            description: 'Định kỳ hàng tháng chúng tôi sẽ có báo cáo gợi ý phân bổ tài sản cho khách hàng. Báo cáo được upload lên đây và phải có tài khoản mới xem được báo cáo. '
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
            title: 'Khảo sát Nhu cầu',
            description: 'Lắng nghe và phân tích mục tiêu đào tạo của doanh nghiệp/cá nhân.'
        },
        {
            number: '02',
            title: 'Thiết kế Lộ trình',
            description: 'Xây dựng nội dung, phương pháp và thời lượng tối ưu.'
        },
        {
            number: '03',
            title: 'Triển khai Đào tạo',
            description: 'Giảng dạy bởi đội ngũ chuyên gia, kết hợp lý thuyết và thực hành.'
        },
        {
            number: '04',
            title: 'Đánh giá Hiệu quả',
            description: 'Kiểm tra kiến thức, cấp chứng chỉ và hỗ trợ sau đào tạo.'
        }
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Giải pháp Đào tạo & Dữ liệu</h1>
                        <p className={styles.heroSubtitle}>
                            Nâng tầm kiến thức, tối ưu hóa lợi nhuận. AlphaQi đồng hành cùng doanh nghiệp và nhà đầu tư kiến tạo thịnh vượng bền vững.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.servicesSection}>
                <div className="container">
                    <div className={styles.sectionTitle}>
                        <span>Dịch vụ Đào tạo</span>
                        <h2>Đa dạng - Chuyên sâu - Thực chiến</h2>
                    </div>

                    <div className={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={styles.serviceCard}
                            >
                                <div className={styles.iconWrapper}>
                                    {service.icon}
                                </div>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceDesc}>{service.description}</p>
                                <a href={service.link} className={styles.serviceLink}>
                                    Tìm hiểu thêm <ArrowRightOutlined />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className={styles.processSection}>
                <div className="container">
                    <div className={styles.sectionTitle}>
                        <span>Quy trình Hợp tác</span>
                        <h2>Chuyên nghiệp & Tận tâm</h2>
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
                        <h2>Sẵn sàng nâng tầm kiến thức tài chính?</h2>
                        <p className="mt-3">
                            Liên hệ ngay với AlphaQi để được tư vấn giải pháp đào tạo phù hợp nhất cho bạn và doanh nghiệp.
                        </p>
                        <a href="/contact" className={styles.ctaButton}>
                            Đăng ký tư vấn <ArrowRightOutlined />
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
