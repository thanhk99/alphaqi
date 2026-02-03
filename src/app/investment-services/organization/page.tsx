'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    BankOutlined,
    GlobalOutlined,
    FileProtectOutlined,
    ApartmentOutlined,
    CheckCircleFilled,
    LineChartOutlined,
    ThunderboltFilled
} from '@ant-design/icons';
import styles from './Organization.module.css';
import Image from 'next/image';

export default function OrganizationPage() {
    const services = [
        {
            icon: <BankOutlined />,
            title: 'Tư vấn phát hành & niêm yết',
            description: 'Tư vấn phát hành trái phiếu, cổ phiếu và các công cụ tài chính giúp doanh nghiệp huy động vốn hiệu quả.'
        },
        {
            icon: <GlobalOutlined />,
            title: 'Tư vấn đầu tư cho khách hàng tổ chức',
            description: 'Xây dựng kế hoạch phân bổ tổng thể định kỳ hàng năm, hàng quý, kế hoạch phân bổ hàng tháng, các buổi thuyết trình chiến lược đầu tư định kỳ hàng tháng, các báo cáo chuyên sâu theo yêu cầu của khách hàng về vĩ mô, thị trường, ngành, doanh nghiệp, các buổi thuyết trình cơ hội đầu tư định kỳ hoặc bất thường theo yêu cầu của khách hàng.'
        },
        {
            icon: <ApartmentOutlined />,
            title: 'Tái cấu trúc doanh nghiệp',
            description: 'Đánh giá, xây dựng lại mô hình tài chính và hoạt động để tối ưu hóa hiệu quả kinh doanh.'
        },
        {
            icon: <FileProtectOutlined />,
            title: 'Quan hệ nhà đầu tư (IR)',
            description: 'Xây dựng chiến lược IR chuyên nghiệp, nâng cao uy tín và giá trị doanh nghiệp trong mắt cổ đông.'
        }
    ];

    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <h1 className={styles.heroTitle}>Tư vấn đầu tư tổ chức</h1>
                        <div className={styles.heroSubtitle}>
                            AlphaQi cung cấp các giải pháp tài chính toàn diện cho doanh nghiệp và tổ chức, từ huy động vốn, tái cấu trúc đến tư vấn niêm yết và quan hệ nhà đầu tư. Chúng tôi đồng hành cùng sự phát triển bền vững của doanh nghiệp.
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="container">
                    <div className={styles.serviceGrid}>
                        {services.map((service, index) => (
                            <div key={index} className={styles.serviceCard}>
                                <div className={styles.iconWrapper}>
                                    {service.icon}
                                </div>
                                <h3 className={styles.cardTitle}>{service.title}</h3>
                                <div className={styles.cardDesc}>{service.description}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Banner Section */}
                <section className="container">
                    <div className={styles.ctaBanner}>
                        <div className={styles.ctaText}>
                            <h2>Đối tác tin cậy của doanh nghiệp</h2>
                            <div>Liên hệ ngay để nhận tư vấn chi tiết về các giải pháp tài chính cho tổ chức của bạn.</div>
                        </div>
                        <a href="/contact" className={styles.ctaButton}>Liên hệ tư vấn</a>
                    </div>
                </section>

                {/* Expert Team Section */}
                <section className="container">
                    <div className={styles.expertSection}>
                        <div className={styles.imageWrapper}>
                            {/* Placeholder image, assuming same image or need a new one. Using same one for now or generic office */}
                            <Image
                                src="/imgs/ib_team_office.png"
                                alt="Đội ngũ tư vấn doanh nghiệp"
                                width={800}
                                height={600}
                                className={styles.expertImage}
                            />
                        </div>
                        <div className={styles.expertContent}>
                            <h2>Giải pháp chuyên biệt và chuyên sâu</h2>
                            <div className={styles.expertDesc}>
                                Đội ngũ chuyên gia của chúng tôi sở hữu kinh nghiệm dày dặn trong lĩnh vực tài chính doanh nghiệp, cam kết mang lại các giải pháp được "may đo" riêng, phù hợp nhất với mục tiêu và bối cảnh của từng tổ chức.
                            </div>
                            <div className={styles.checkGrid}>
                                <div className={styles.checkItem}>
                                    <CheckCircleFilled className={styles.checkIcon} /> Chuyên nghiệp
                                </div>
                                <div className={styles.checkItem}>
                                    <ThunderboltFilled className={styles.checkIcon} /> Toàn diện
                                </div>
                                <div className={styles.checkItem}>
                                    <LineChartOutlined className={styles.checkIcon} /> Bền vững
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
