'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    DatabaseOutlined,
    CheckCircleFilled,
    ThunderboltFilled,
    CodeOutlined,
    CloudServerOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import styles from './DataReports.module.css';
import Image from 'next/image';

export default function DataReportsPage() {
    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <div className={styles.heroTag}>
                            <DatabaseOutlined /> Giải pháp cấp độ doanh nghiệp
                        </div>
                        <h1 className={styles.heroTitle}>Dịch vụ dữ liệu & báo cáo</h1>
                        <p className={styles.heroSubtitle}>
                            Hệ sinh thái dữ liệu chuẩn hóa, được thiết kế chuyên biệt cho các chiến lược giao dịch định lượng (Quant) và hạ tầng thực thi thuật toán (Algo Trading) tốc độ cao.
                        </p>
                    </div>
                </section>

                {/* Services Section */}
                <section className={styles.serviceSection}>
                    <div className="container">
                        <div className={styles.serviceGrid}>
                            {/* Service 1 */}
                            <div className={styles.serviceCard}>
                                <div className={styles.cardImageWrapper}>
                                    <Image
                                        src="/imgs/quant_data_hero.png"
                                        alt="Dữ liệu thứ cấp cho giao dịch định lượng"
                                        width={600}
                                        height={240}
                                        className={styles.cardImage}
                                    />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Dữ liệu thứ cấp cho giao dịch định lượng</h3>
                                    <p className={styles.cardDesc}>
                                        Dữ liệu thô từ các sàn giao dịch được làm sạch (data cleaning), xử lý các điểm dị thường và chuẩn hóa cấu trúc, sẵn sàng cho việc kiểm thử chiến lược.
                                    </p>
                                </div>
                            </div>

                            {/* Service 2 */}
                            <div className={styles.serviceCard}>
                                <div className={styles.cardImageWrapper}>
                                    <Image
                                        src="/imgs/algo_trading_hero.png"
                                        alt="Dịch vụ dữ liệu cho Algo Trading"
                                        width={600}
                                        height={240}
                                        className={styles.cardImage}
                                    />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>Dịch vụ dữ liệu cho Algo Trading</h3>
                                    <p className={styles.cardDesc}>
                                        Cung cấp luồng dữ liệu thời gian thực (L1/L2/L3) với độ trễ cực thấp, hỗ trợ tích hợp trực tiếp vào hệ thống thực thi lệnh tự động của bạn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Specs Section */}
                <section className={styles.specsSection}>
                    <div className="container">
                        <div className={styles.sectionDivider}>
                            <span>Thông số kỹ thuật & Tiêu chuẩn</span>
                        </div>

                        <div className={styles.specsGrid}>
                            <div className={styles.specCard}>
                                <div className={styles.specIcon}><CodeOutlined /></div>
                                <h4 className={styles.specTitle}>Định dạng chuẩn hóa</h4>
                                <p className={styles.specDesc}>
                                    Tương thích hoàn toàn với Python, R, và các nền tảng Backtesting phổ biến.
                                </p>
                            </div>
                            <div className={styles.specCard}>
                                <div className={styles.specIcon}><CloudServerOutlined /></div>
                                <h4 className={styles.specTitle}>Uptime 99.99%</h4>
                                <p className={styles.specDesc}>
                                    Hệ thống phân tán đa vùng đảm bảo dòng chảy dữ liệu không bị gián đoạn.
                                </p>
                            </div>
                            <div className={styles.specCard}>
                                <div className={styles.specIcon}><SafetyCertificateOutlined /></div>
                                <h4 className={styles.specTitle}>Bảo mật đa tầng</h4>
                                <p className={styles.specDesc}>
                                    Mã hóa dữ liệu đầu cuối và cơ chế xác thực OAuth 2.0 nghiêm ngặt.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="container">
                    <div className={styles.ctaBox}>
                        <div className={styles.ctaInfo}>
                            <h2>Sẵn sàng để khai thác tiềm năng dữ liệu?</h2>
                            <p>Liên hệ với đội ngũ kỹ sư của chúng tôi để nhận tài liệu API mẫu hoặc yêu cầu bản dùng thử dữ liệu lịch sử.</p>
                        </div>
                        <div className={styles.ctaActions}>
                            <a href="/contact" className={styles.btnPrimary}>Nhận tư vấn ngay</a>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
