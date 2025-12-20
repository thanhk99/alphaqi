'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { useCart } from '@/store/CartContext';
import Button from '@/components/common/Button/Button';
import { DeleteOutlined, ShoppingOutlined, ArrowRightOutlined } from '@ant-design/icons';
import styles from './page.module.css';

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCart();

    if (cart.totalItems === 0) {
        return (
            <MainLayout>
                <div className={styles.emptyCart}>
                    <ShoppingOutlined className={styles.emptyIcon} />
                    <h2>Giỏ hàng trống</h2>
                    <p>Bạn chưa thêm khóa học nào vào giỏ hàng</p>
                    <Link href="/courses">
                        <Button variant="primary" size="large">
                            Khám phá khóa học
                        </Button>
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className={styles.cartPage}>
                <div className="container">
                    <h1 className={styles.title}>Giỏ hàng của bạn</h1>

                    <div className={styles.content}>
                        <div className={styles.cartItems}>
                            {cart.items.map((item) => (
                                <div key={item.courseId} className={styles.cartItem}>
                                    <img
                                        src={item.course.thumbnail || ""}
                                        alt={item.course.title}
                                        className={styles.thumbnail}
                                    />
                                    <div className={styles.itemInfo}>
                                        <h3>{item.course.title}</h3>
                                        <p className={styles.instructor}>
                                            Giảng viên: {item.course.instructorName}
                                        </p>
                                        <div className={styles.itemFooter}>
                                            <div className={styles.price}>
                                                {item.discountPrice && (
                                                    <span className={styles.originalPrice}>
                                                        {item.price.toLocaleString('vi-VN')}₫
                                                    </span>
                                                )}
                                                <span className={styles.currentPrice}>
                                                    {(item.discountPrice || item.price).toLocaleString('vi-VN')}₫
                                                </span>
                                            </div>
                                            <button
                                                className={styles.removeButton}
                                                onClick={() => removeFromCart(item.courseId)}
                                            >
                                                <DeleteOutlined /> Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.summary}>
                            <div className={styles.summaryCard}>
                                <h3>Tổng kết đơn hàng</h3>

                                <div className={styles.summaryRow}>
                                    <span>Tổng phụ:</span>
                                    <span>{cart.totalPrice.toLocaleString('vi-VN')}₫</span>
                                </div>

                                <div className={styles.summaryRow}>
                                    <span>Giảm giá:</span>
                                    <span className={styles.discount}>0₫</span>
                                </div>

                                <div className={styles.divider}></div>

                                <div className={styles.totalRow}>
                                    <span>Tổng cộng:</span>
                                    <span className={styles.totalPrice}>
                                        {cart.totalPrice.toLocaleString('vi-VN')}₫
                                    </span>
                                </div>

                                <Link href="/checkout">
                                    <Button variant="primary" size="large" fullWidth>
                                        Thanh toán <ArrowRightOutlined />
                                    </Button>
                                </Link>

                                <button
                                    className={styles.clearButton}
                                    onClick={clearCart}
                                >
                                    Xóa tất cả
                                </button>
                            </div>

                            <div className={styles.benefits}>
                                <h4>Lợi ích khi mua khóa học</h4>
                                <ul>
                                    <li>✓ Truy cập trọn đời</li>
                                    <li>✓ Học mọi lúc mọi nơi</li>
                                    <li>✓ Chứng chỉ hoàn thành</li>
                                    <li>✓ Hỗ trợ 24/7</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
