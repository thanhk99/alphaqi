'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import { useCart } from '@/store/CartContext';
import {
    CreditCardOutlined,
    BankOutlined,
    QrcodeOutlined,
    SafetyOutlined,
    CheckCircleFilled
} from '@ant-design/icons';
import styles from './page.module.css';

export default function CheckoutPage() {
    const { cart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState('qr');
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = () => {
        // Simulate payment processing
        setTimeout(() => {
            setIsSuccess(true);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <MainLayout>
                <div className={styles.successPage}>
                    <div className={styles.successCard}>
                        <CheckCircleFilled className={styles.successIcon} />
                        <h1>Thanh toán thành công!</h1>
                        <p>Cảm ơn bạn đã đăng ký khóa học. Bạn có thể bắt đầu học ngay bây giờ.</p>
                        <div className={styles.successActions}>
                            <Button variant="primary" size="large" href="/dashboard/my-courses">
                                Vào học ngay
                            </Button>
                            <Button variant="outline" size="large" href="/">
                                Về trang chủ
                            </Button>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className={styles.checkoutPage}>
                <div className="container">
                    <h1 className={styles.title}>Thanh toán</h1>

                    <div className={styles.content}>
                        <div className={styles.mainColumn}>
                            {/* Billing Info */}
                            <section className={styles.section}>
                                <h2>Thông tin thanh toán</h2>
                                <div className={styles.formGrid}>
                                    <Input label="Họ và tên" placeholder="Nguyễn Văn A" fullWidth />
                                    <Input label="Email" placeholder="email@example.com" fullWidth />
                                    <Input label="Số điện thoại" placeholder="0912345678" fullWidth />
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section className={styles.section}>
                                <h2>Phương thức thanh toán</h2>
                                <div className={styles.paymentMethods}>
                                    <div
                                        className={`${styles.methodCard} ${paymentMethod === 'qr' ? styles.active : ''}`}
                                        onClick={() => setPaymentMethod('qr')}
                                    >
                                        <QrcodeOutlined className={styles.methodIcon} />
                                        <div className={styles.methodInfo}>
                                            <h3>Quét mã QR</h3>
                                            <p>Thanh toán qua ứng dụng ngân hàng/ví điện tử</p>
                                        </div>
                                        <div className={styles.radio}></div>
                                    </div>

                                    <div
                                        className={`${styles.methodCard} ${paymentMethod === 'card' ? styles.active : ''}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <CreditCardOutlined className={styles.methodIcon} />
                                        <div className={styles.methodInfo}>
                                            <h3>Thẻ quốc tế</h3>
                                            <p>Visa, Mastercard, JCB</p>
                                        </div>
                                        <div className={styles.radio}></div>
                                    </div>

                                    <div
                                        className={`${styles.methodCard} ${paymentMethod === 'bank' ? styles.active : ''}`}
                                        onClick={() => setPaymentMethod('bank')}
                                    >
                                        <BankOutlined className={styles.methodIcon} />
                                        <div className={styles.methodInfo}>
                                            <h3>Chuyển khoản</h3>
                                            <p>Chuyển khoản trực tiếp tới ngân hàng</p>
                                        </div>
                                        <div className={styles.radio}></div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className={styles.sidebar}>
                            <div className={styles.orderSummary}>
                                <h3>Đơn hàng của bạn</h3>
                                <div className={styles.itemList}>
                                    {cart.items.map((item) => (
                                        <div key={item.courseId} className={styles.item}>
                                            <img
                                                src={item.course.thumbnail || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EKhóa học%3C/text%3E%3C/svg%3E'}
                                                alt={item.course.title}
                                            />
                                            <div>
                                                <h4>{item.course.title}</h4>
                                                <span>{(item.discountPrice || item.price).toLocaleString('vi-VN')}₫</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.divider}></div>

                                <div className={styles.summaryRow}>
                                    <span>Tạm tính</span>
                                    <span>{cart.totalPrice.toLocaleString('vi-VN')}₫</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Giảm giá</span>
                                    <span className={styles.discount}>0₫</span>
                                </div>

                                <div className={styles.divider}></div>

                                <div className={styles.totalRow}>
                                    <span>Tổng cộng</span>
                                    <span className={styles.totalPrice}>
                                        {cart.totalPrice.toLocaleString('vi-VN')}₫
                                    </span>
                                </div>

                                <Button
                                    variant="primary"
                                    size="large"
                                    fullWidth
                                    onClick={handlePayment}
                                >
                                    Thanh toán ngay
                                </Button>

                                <div className={styles.securityNote}>
                                    <SafetyOutlined />
                                    <span>Thông tin thanh toán được bảo mật an toàn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
