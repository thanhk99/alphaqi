'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    BankOutlined,
    UserOutlined,
    CustomerServiceOutlined,
} from '@ant-design/icons';
import styles from './FloatingSidebar.module.css';

const FloatingSidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleTouch = () => {
        if (window.innerWidth <= 768) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div
            className={`${styles.sidebar} ${isOpen ? styles.mobileOpen : ''}`}
            onClick={handleTouch}
        >
            <div className={styles.links}>
                <Link href="https://www.6p.com.vn/" target="_blank" className={styles.linkItem}>
                    <div className={styles.iconWrapper}>
                        <BankOutlined />
                    </div>
                    <span className={styles.label}>Công ty</span>
                </Link>
                <Link href="https://nguyenminhhanh.com/" target="_blank" className={styles.linkItem}>
                    <div className={styles.iconWrapper}>
                        <UserOutlined />
                    </div>
                    <span className={styles.label}>Chuyên gia</span>
                </Link>
                <Link href="https://zalo.me/your_phone_number" target="_blank" className={styles.linkItem}>
                    <div className={styles.iconWrapper}>
                        <CustomerServiceOutlined />
                    </div>
                    <span className={styles.label}>Tư vấn</span>
                </Link>
            </div>
        </div>
    );
};

export default FloatingSidebar;
