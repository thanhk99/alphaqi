'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    BankOutlined,
    SwapOutlined,
    NodeIndexOutlined,
    SafetyCertificateOutlined,
    CheckCircleFilled,
    LineChartOutlined,
    ThunderboltFilled,
    FileProtectOutlined
} from '@ant-design/icons';
import styles from './InvestmentBank.module.css';
import Image from 'next/image';

export default function InvestmentBankPage() {
    const services = [
        {
            icon: <BankOutlined />,
            title: 'Quỹ tư nhân & Phát hành riêng lẻ',
            description: 'Tư vấn và đầu tư Private Equity, Private Placement chuyên nghiệp cho doanh nghiệp.'
        },
        {
            icon: <SwapOutlined />,
            title: 'Tư vấn M&A',
            description: 'Hỗ trợ các thương vụ mua bán và sáp nhập doanh nghiệp xuyên biên giới và nội địa.'
        },
        {
            icon: <NodeIndexOutlined />,
            title: 'Tư vấn tái cấu trúc',
            description: 'Giải pháp tối ưu hóa cấu trúc vốn và vận hành doanh nghiệp trong điều kiện thị trường biến động.'
        },
        {
            icon: <SafetyCertificateOutlined />,
            title: 'Private Credit & Alternative',
            description: 'Các thương vụ phát hành công cụ nợ có cam kết lợi nhuận ổn định và tính bảo mật cao.'
        },
        {
            icon: <FileProtectOutlined />,
            title: 'Dịch vụ IR (Investor Ralation)',
            description: 'Chúng tôi với các cộng sự hàng đầu trên thị trường đã và đang triển khai dịch vụ IR cho các tổ chức niêm yết trên thị trường chứng khoán Việt Nam. Chúng tôi hiện đang cung cấp dịch vụ cho 5/10 Công ty có giá trị vốn hóa cao nhất trên thị trường chứng khoán Việt Nam với chất lượng được đánh giá cao vượt trội so với các đối thủ cạnh tranh trên thị trường hiện nay. Đội ngũ chuyên gia của chúng tôi bao gồm các chuyên gia như Giám đốc đầu tư ở Công ty Quản lý Quỹ quản lý hàng tỷ USD, CEO công ty Chứng khoán vốn hóa tỷ USD, Giám đốc Phân tích công ty chứng khoán - công ty quản lý quỹ, Giám đốc môi giới khách hàng cá nhân, Giám đốc môi giới khách hàng tổ chức, Giám đốc quản lý tài sản của dịch vụ Wealth Management, nhà báo chứng khoán kỳ cựu,...'
        }
    ];

    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <h1 className={styles.heroTitle}>Investment Bank</h1>
                        <p className={styles.heroSubtitle}>
                            Bên cạnh hoạt động đầu tư truyền thống, quản lý tài sản, phân bổ tài sản,... chúng tôi cũng bao gồm các chuyên gia hàng đầu trong lĩnh vực ngân hàng đầu tư với các thương vụ rất lớn trên thị trường và rất đa dạng ngành nghề.
                        </p>
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
                                <p className={styles.cardDesc}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Banner Section */}
                <section className="container">
                    <div className={styles.ctaBanner}>
                        <div className={styles.ctaText}>
                            <h2>Bắt đầu tối ưu hóa danh mục của bạn</h2>
                            <p>Kết nối với tài khoản chứng khoán và nhận tư vấn từ chuyên gia hàng đầu ngay hôm nay.</p>
                        </div>
                        <a href="/contact" className={styles.ctaButton}>Liên hệ chuyên gia</a>
                    </div>
                </section>

                {/* Expert Team Section */}
                <section className="container">
                    <div className={styles.expertSection}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src="/imgs/ib_team_office.png"
                                alt="Đội ngũ chuyên gia AlphaQi"
                                width={800}
                                height={600}
                                className={styles.expertImage}
                            />
                        </div>
                        <div className={styles.expertContent}>
                            <h2>Đội ngũ chuyên gia giàu kinh nghiệm</h2>
                            <p className={styles.expertDesc}>
                                Chúng tôi không chỉ cung cấp dữ liệu, chúng tôi cung cấp sự thấu hiểu. Mỗi khuyến nghị đều được sàng lọc qua hệ thống phân tích định lượng tiên tiến và kinh nghiệm thực chiến của các chuyên gia tư vấn hàng đầu.
                            </p>
                            <div className={styles.checkGrid}>
                                <div className={styles.checkItem}>
                                    <CheckCircleFilled className={styles.checkIcon} /> Tin cậy
                                </div>
                                <div className={styles.checkItem}>
                                    <ThunderboltFilled className={styles.checkIcon} /> Nhanh chóng
                                </div>
                                <div className={styles.checkItem}>
                                    <LineChartOutlined className={styles.checkIcon} /> Hiệu quả
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
