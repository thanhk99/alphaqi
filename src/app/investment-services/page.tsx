'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    RiseOutlined,
    BankOutlined,
    DollarOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import styles from './page.module.css';

export default function InvestmentServicesPage() {

    const services = [
        {
            icon: <RiseOutlined />,
            title: 'Tư vấn đầu tư',
            description: 'Chiến lược đầu tư chuyên sâu, phân tích định lượng và cơ bản giúp tối ưu hóa lợi nhuận danh mục.',
            link: '/investment-services/consulting'
        },
        {
            icon: <BankOutlined />,
            title: 'Tư vấn quản lý gia sản',
            description: 'Hoạch định tài chính toàn diện, bảo toàn và phát triển tài sản bền vững cho cá nhân và gia đình.'
        },
        {
            icon: <DollarOutlined />,
            title: 'Tư vấn ngân hàng đầu tư',
            description: 'Tư vấn cấu trúc vốn, M&A, IPO và huy động vốn chiến lược cho doanh nghiệp, tối ưu hóa giá trị công ty.'
        },
        {
            icon: <DollarOutlined />,
            title: 'Dịch vụ Family Office',
            description: 'Dịch vụ setup thành lập family office, vận hành hoạt động đầu tư cho family office với vai trò CIO của Family Office, các hoạt động tư vấn về kinh doanh, vận hành, tài chính, đầu tư,... hàng ngày. Đi kèm với đó là các dịch vụ về pháp lý, thuế, bảo hiểm, đào tạo các thế hệ kế cận nối nghiệp gia đình từng bước một và đảm bảo thế hệ kế cận có thể vận hành family office thành công trong tương lai.'
        },
        {
            icon: <DollarOutlined />,
            title: 'Đào tạo doanh nghiệp',
            description: 'Chúng tôi cung cấp các khóa học đào tạo cho doanh nghiệp với sự cá nhân hóa từ ngân hàng các modul học có sẵn của chúng tôi về các chủ đề đa dạng để đem lại lợi ích thực tế cho doanh nghiệp trong quá trình phát triển của doanh nghiệp. Các khóa học đa dạng như:',
            link: '/training-services/corporate'
        }

    ];

    const steps = [
        {
            number: '01',
            title: 'Khảo sát Vị thế',
            description: 'Đánh giá hiện trạng tài chính và khẩu vị rủi ro của khách hàng.'
        },
        {
            number: '02',
            title: 'Xây dựng Chiến lược',
            description: 'Thiết kế danh mục đầu tư và kế hoạch tài chính phù hợp mục tiêu.'
        },
        {
            number: '03',
            title: 'Triển khai & Quản lý',
            description: 'Thực hiện đầu tư và giám sát danh mục liên tục bởi chuyên gia 6P Capital.'
        },
        {
            number: '04',
            title: 'Tối ưu & Tái cân bằng',
            description: 'Định kỳ đánh giá hiệu quả và điều chỉnh chiến lược theo thị trường.'
        }
    ];

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Giải pháp Quản lý Gia sản và Family Office cho các gia đình.</h1>
                        <p className={styles.heroSubtitle}>
                            Kiến tạo thịnh vượng bền vững với các giải pháp tài chính chuyên sâu từ AlphaQi.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.servicesSection}>
                <div className="container">
                    <div className={styles.sectionTitle}>
                        <span>Dịch vụ Đầu tư</span>
                        <h2>Chuyên sâu - Hiệu quả - Bền vững</h2>
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
                                <a href={service.link || '/contact'} className={styles.serviceLink}>
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
                        <h2>Sẵn sàng tối ưu hóa tài sản của bạn?</h2>
                        <p className="mt-3">
                            Kết nối với chuyên gia AlphaQi để nhận tư vấn chiến lược đầu tư phù hợp nhất.
                        </p>
                        <a href="/contact" className={styles.ctaButton}>
                            Đăng ký tư vấn ngay <ArrowRightOutlined />
                        </a>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
