'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    BankOutlined,
    GlobalOutlined,
    RocketOutlined,
    SafetyCertificateOutlined,
    SolutionOutlined,
    LineChartOutlined
} from '@ant-design/icons';
import styles from './FamilyOffice.module.css';
import Image from 'next/image';

export default function FamilyOfficePage() {
    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <span className={styles.heroTag}>Premium Solutions</span>
                        <h1 className={styles.heroTitle}>Dịch vụ Family Office</h1>
                        <p className={styles.heroSubtitle}>
                            Chúng tôi cung cấp giải pháp toàn diện từ thiết lập, vận hành đến quản lý đầu tư cho Family Office, đảm bảo sự phát triển bền vững và kế thừa di sản qua nhiều thế hệ. Một đối tác tin cậy cho sự thịnh vượng vĩnh cửu.
                        </p>
                    </div>
                </section>

                {/* Service Highlights Grid */}
                <section className="container">
                    <div className={styles.serviceGrid}>
                        {/* Service Item 1 */}
                        <div className={styles.serviceCard}>
                            <div className={styles.cardImageWrapper}>
                                <Image
                                    src="/imgs/fo_office_setup.png"
                                    alt="Thiết lập & Vận hành CIO"
                                    fill
                                    className={styles.cardImage}
                                />
                            </div>
                            <div className={styles.cardTag}>
                                <BankOutlined /> INVESTMENT & SETUP
                            </div>
                            <h3 className={styles.cardTitle}>Thiết lập & Vận hành CIO</h3>
                            <p className={styles.cardDesc}>
                                Dịch vụ setup thành lập và đóng vai trò CIO vận hành hoạt động đầu tư hàng ngày, tối ưu hóa danh mục tài sản gia đình.
                            </p>
                        </div>

                        {/* Service Item 2 */}
                        <div className={styles.serviceCard}>
                            <div className={styles.cardImageWrapper}>
                                <Image
                                    src="/imgs/fo_advisory_desk.png"
                                    alt="Quản trị & Cố vấn Toàn diện"
                                    fill
                                    className={styles.cardImage}
                                />
                            </div>
                            <div className={styles.cardTag}>
                                <GlobalOutlined /> COMPREHENSIVE ADVISORY
                            </div>
                            <h3 className={styles.cardTitle}>Quản trị & Cố vấn Toàn diện</h3>
                            <p className={styles.cardDesc}>
                                Tư vấn chiến lược kinh doanh, vận hành, tài chính, pháp lý, thuế và bảo hiểm để bảo vệ cấu trúc tài sản bền vững.
                            </p>
                        </div>

                        {/* Service Item 3 */}
                        <div className={styles.serviceCard}>
                            <div className={styles.cardImageWrapper}>
                                <Image
                                    src="/imgs/wealth_mgmt_philosophy.png"
                                    alt="Đào tạo Thế hệ Kế cận"
                                    fill
                                    className={styles.cardImage}
                                />
                            </div>
                            <div className={styles.cardTag}>
                                <RocketOutlined /> SUCCESSION PLANNING
                            </div>
                            <h3 className={styles.cardTitle}>Đào tạo Thế hệ Kế cận</h3>
                            <p className={styles.cardDesc}>
                                Lộ trình đào tạo nối nghiệp gia đình từng bước, trang bị tư duy và kỹ năng lãnh đạo để đảm bảo vận hành thành công trong tương lai.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className={styles.valuesSection}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Giá trị cốt lõi</h2>
                        <p className={styles.sectionSubtitle}>
                            Alphaqi đồng hành cùng gia tộc bạn kiến tạo tương lai bền vững qua nhiều thế hệ dựa trên nền tảng đạo đức và chuyên môn cao.
                        </p>

                        <div className={styles.valueGrid}>
                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}><SafetyCertificateOutlined /></div>
                                <h4 className={styles.valueTitle}>Sự tin cậy</h4>
                                <p className={styles.valueDesc}>
                                    Bảo mật thông tin tuyệt đối và cam kết đồng hành tận tâm như một người quản gia trung thành của gia đình.
                                </p>
                            </div>
                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}><SolutionOutlined /></div>
                                <h4 className={styles.valueTitle}>Tính chuyên nghiệp</h4>
                                <p className={styles.valueDesc}>
                                    Đội ngũ chuyên gia quốc tế giàu kinh nghiệm thực chiến trong lĩnh vực quản lý tài sản và đầu tư mạo hiểm.
                                </p>
                            </div>
                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}><LineChartOutlined /></div>
                                <h4 className={styles.valueTitle}>Tầm nhìn dài hạn</h4>
                                <p className={styles.valueDesc}>
                                    Chiến lược đầu tư không chỉ vì lợi nhuận ngắn hạn mà hướng tới sự kế thừa và thịnh vượng xuyên thế hệ.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main CTA Section */}
                <section className="container">
                    <div className={styles.ctaBox}>
                        <h2 className={styles.ctaTitle}>Bắt đầu hành trình kế thừa di sản</h2>
                        <p className={styles.ctaDesc}>
                            Liên hệ với đội ngũ Alphaqi ngay hôm nay để được tư vấn chuyên sâu về giải pháp Family Office được thiết kế riêng cho gia tộc của bạn.
                        </p>
                        <div className={styles.ctaButtons}>
                            <a href="/contact" className={styles.primaryBtn}>Đặt lịch tư vấn</a>
                        </div>
                    </div>
                </section>

                {/* Footer Quote */}
                <p className={styles.footerNote}>
                    © 2026 Alphaqi Family Office Advisory. Bảo mật & Chuyên nghiệp.
                </p>
            </div>
        </MainLayout>
    );
}
