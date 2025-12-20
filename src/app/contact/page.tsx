'use client'

import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    SendOutlined
} from '@ant-design/icons';
import styles from './page.module.css';

export default function ContactPage() {
    return (
        <MainLayout>
            <div className={styles.contactPage}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <div className={styles.container}>
                        <h1 className={styles.heroTitle}>Liên Hệ Với Chúng Tôi</h1>
                        <p className={styles.heroSubtitle}>
                            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trên hành trình đầu tư tài chính.
                        </p>
                    </div>
                </div>

                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Contact Info */}
                        <div className={styles.infoCard}>
                            <h2 className={styles.infoTitle}>Thông Tin Liên Hệ</h2>

                            <div className={styles.infoItem}>
                                <div className={styles.iconWrapper}>
                                    <EnvironmentOutlined />
                                </div>
                                <div className={styles.itemContent}>
                                    <h4>Địa chỉ</h4>
                                    <p>Tầng 18, Tòa nhà 789, 147 Hoàng Quốc Việt, Nghĩa Đô, Cầu Giấy, Hà Nội</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.iconWrapper}>
                                    <MailOutlined />
                                </div>
                                <div className={styles.itemContent}>
                                    <h4>Email</h4>
                                    <p>6pcapital@6p.com.vn</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.iconWrapper}>
                                    <PhoneOutlined />
                                </div>
                                <div className={styles.itemContent}>
                                    <h4>Hotline</h4>
                                    <p>09xx xxx xxx</p>
                                </div>
                            </div>

                            <div className={styles.infoItem}>
                                <div className={styles.iconWrapper}>
                                    <ClockCircleOutlined />
                                </div>
                                <div className={styles.itemContent}>
                                    <h4>Giờ làm việc</h4>
                                    <p>Thứ 2 - Thứ 6: 8:30 - 17:30</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formCard}>
                            <h2 className={styles.formTitle}>Gửi Tin Nhắn</h2>
                            <p className={styles.formSubtitle}>
                                Để lại thông tin, đội ngũ tư vấn của AlphaQi sẽ liên hệ lại với bạn sớm nhất.
                            </p>

                            <form>
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Họ và tên</label>
                                    <input type="text" className={styles.input} placeholder="Nhập họ tên của bạn" />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Email</label>
                                        <input type="email" className={styles.input} placeholder="example@email.com" />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Số điện thoại</label>
                                        <input type="tel" className={styles.input} placeholder="Nhập số điện thoại" />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Chủ đề quan tâm</label>
                                    <select className={styles.input}>
                                        <option>Tư vấn khóa học</option>
                                        <option>Hợp tác đào tạo</option>
                                        <option>Hỗ trợ học viên</option>
                                        <option>Khác</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Nội dung</label>
                                    <textarea className={styles.textarea} placeholder="Nội dung cần hỗ trợ..."></textarea>
                                </div>

                                <button type="submit" className={styles.submitButton}>
                                    Gửi tin nhắn <SendOutlined />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
