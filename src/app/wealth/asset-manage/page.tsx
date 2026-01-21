'use client';

import React from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    BankOutlined,
    TeamOutlined,
    FileTextOutlined
} from '@ant-design/icons';
import styles from './WealthManagement.module.css';
import Image from 'next/image';

export default function WealthManagementPage() {
    return (
        <MainLayout>
            <div className={styles.pageContainer}>
                {/* Hero Header Section */}
                <section className={styles.hero}>
                    <div className="container">
                        <div className={styles.heroContent}>
                            <div className={styles.heroLeft}>
                                <span className={styles.heroTag}>6P — ALPHAQI</span>
                                <h1 className={styles.heroTitle}>Quản lý gia sản</h1>
                                <p className={styles.heroSubtitle}>
                                    Tầm nhìn dài hạn và chuyển giao tài sản bền vững qua các thế hệ. Giải pháp tài chính thượng lưu cho các gia tộc thịnh vượng.
                                </p>
                            </div>
                            <a href="/contact" className={styles.heroCTA}>Tư vấn riêng tư</a>
                        </div>
                    </div>
                </section>

                {/* Private Services Section */}
                <section className={styles.serviceSection}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Dịch vụ quản lý gia sản cao cấp</h2>
                        <p className={styles.sectionDesc}>
                            Chúng tôi thiết lập những tiêu chuẩn mới trong việc bảo vệ và phát triển tài sản, kết hợp giữa trí tuệ đầu tư và sự thấu hiểu sâu sắc về giá trị gia đình.
                        </p>

                        <div className={styles.serviceGrid}>
                            <div className={styles.serviceCard}>
                                <div className={styles.iconWrapper}><BankOutlined /></div>
                                <h3 className={styles.cardTitle}>Family Office Advisor/CIO</h3>
                                <p className={styles.cardDesc}>
                                    Vai trò cố vấn độc lập bên ngoài, quản lý danh mục đầu tư phức tạp và phân bổ tài sản chiến lược dựa trên khẩu vị rủi ro đặc thù của gia tộc.
                                </p>
                            </div>
                            <div className={styles.serviceCard}>
                                <div className={styles.iconWrapper}><TeamOutlined /></div>
                                <h3 className={styles.cardTitle}>Next-Gen 1-1 Coaching</h3>
                                <p className={styles.cardDesc}>
                                    Lộ trình huấn luyện cá nhân hóa từ quản trị kinh doanh đến quy trình chuyển giao tài sản thừa kế, chuẩn bị cho thế hệ cận sẵn sàng tiếp quản di sản.
                                </p>
                            </div>
                            <div className={styles.serviceCard}>
                                <div className={styles.iconWrapper}><FileTextOutlined /></div>
                                <h3 className={styles.cardTitle}>Báo cáo Monthly CIO View</h3>
                                <p className={styles.cardDesc}>
                                    Báo cáo chuyên sâu hàng tháng cung cấp cái nhìn chiến lược và phân tích thị trường vĩ mô dành riêng cho giới tinh hoa, hỗ trợ ra quyết định chính xác.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className={styles.philosophySection}>
                    <div className="container">
                        <div className={styles.philosophyCard}>
                            <div className={styles.philosophyImageWrapper}>
                                <Image
                                    src="/imgs/wealth_mgmt_philosophy.png"
                                    alt="Triết lý đồng hành"
                                    width={600}
                                    height={800}
                                    className={styles.philosophyImage}
                                />
                            </div>
                            <div className={styles.philosophyContent}>
                                <h2 className={styles.philosophyTitle}>Triết lý đồng hành</h2>
                                <p className={styles.philosophyQuote}>
                                    "Tại 6P – Alphaqi, chúng tôi không chỉ quản lý con số, chúng tôi quản trị di sản. Sự tin cậy và tính bảo mật là nền tảng trong mọi mối quan hệ đối tác, giúp gia đình bạn an tâm chuyển giao giá trị qua nhiều thế hệ."
                                </p>

                                <div className={styles.philosophyGrid}>
                                    <div className={styles.philosophyItem}>
                                        <span className={styles.itemLabel}>Đối tượng</span>
                                        <span className={styles.itemValue}>UHNWI & Gia tộc</span>
                                    </div>
                                    <div className={styles.philosophyItem}>
                                        <span className={styles.itemLabel}>Phương pháp</span>
                                        <span className={styles.itemValue}>Cá nhân hóa tuyệt đối</span>
                                    </div>
                                    <div className={styles.philosophyItem}>
                                        <span className={styles.itemLabel}>Cam kết</span>
                                        <span className={styles.itemValue}>Minh bạch & Độc lập</span>
                                    </div>
                                    <div className={styles.philosophyItem}>
                                        <span className={styles.itemLabel}>Thời hạn</span>
                                        <span className={styles.itemValue}>Đồng hành trọn đời</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Note */}
                <section className="container">
                    <div className={styles.footerNote}>
                        <div className={styles.footerDivider}></div>
                        <p>Dịch vụ được thiết kế riêng biệt để phù hợp với văn hóa và mục tiêu tài chính của từng gia tộc tại Việt Nam và Khu vực.</p>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
