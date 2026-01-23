import React from 'react';
import Link from 'next/link';
import {
    FacebookOutlined,
    YoutubeOutlined,
    TwitterOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3 className={styles.title}>AlphaQi Investment Consulting Firm</h3>
                        <p className={styles.description}>
                            Cung cấp các giải pháp đầu tư và tư vấn cho các doanh nghiệp và cá nhân.
                        </p>
                        <div className={styles.contact}>
                            <div className={styles.contactItem}>
                                <MailOutlined />6pcapital@6p.com.vn
                            </div>
                            <div className={styles.contactItem}>
                                <EnvironmentOutlined /> Tầng 18, Tòa nhà 789, 147 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
                            </div>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Dịch vụ</h4>
                        <ul className={styles.links}>
                            <li><Link href="/wealth/consulting">Tư vấn đầu tư</Link></li>
                            <li><Link href="/investment-services/investment-bank">Ngân hàng đầu tư </Link></li>
                            <li><Link href="/investment-services/asset-management">Quản lý tài sản </Link></li>
                            <li><Link href="/wealth">Đào tạo tài chính  </Link></li>
                            <li><Link href="/wealth">Dữ liệu & Quantitative Trading  </Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Về chúng tôi</h4>
                        <ul className={styles.links}>
                            <li><Link href="/about">Giới thiệu</Link></li>
                            <li><Link href="/instructors">Giảng viên</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Liên hệ</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4 className={styles.columnTitle}>Hỗ trợ</h4>
                        <ul className={styles.links}>
                            <li><Link href="/">Câu hỏi thường gặp</Link></li>
                            <li><Link href="/">Điều khoản sử dụng</Link></li>
                            <li><Link href="/">Chính sách bảo mật</Link></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © 2021 AlphaQi. All rights reserved.
                    </p>
                    <div className={styles.social}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <FacebookOutlined />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <YoutubeOutlined />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                            <TwitterOutlined />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
