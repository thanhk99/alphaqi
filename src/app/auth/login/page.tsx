'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/AuthContext';
import { useNotification } from '@/store/NotificationContext';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { MailOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            await login(formData.username, formData.password);
            showNotification('success', 'Đăng nhập thành công!');

            // Get redirect URL from query params, default to home page
            const searchParams = new URLSearchParams(window.location.search);
            const redirectUrl = searchParams.get('redirect') || '/';
            router.push(redirectUrl);
        } catch (error: any) {
            let errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại sau.';

            if (error.response?.status === 401) {
                errorMessage = 'Tài khoản hoặc mật khẩu không đúng';
            } else {
                const errorCode = error.response?.data?.message || error.message;

                const ERROR_MAPPING: Record<string, string> = {
                    'INVALID_CREDENTIALS': 'Tên đăng nhập hoặc mật khẩu không đúng',
                    'Bad credentials': 'Tên đăng nhập hoặc mật khẩu không đúng',
                    'USER_NOT_FOUND': 'Tài khoản không tồn tại',
                    'USER_LOCKED': 'Tài khoản của bạn đã bị khóa',
                    'ACCOUNT_DISABLED': 'Tài khoản đã bị vô hiệu hóa',
                };

                errorMessage = ERROR_MAPPING[errorCode] || errorCode || errorMessage;
            }

            showNotification('error', errorMessage);
            setErrors({ username: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.container}>
                <div className={styles.authCard}>
                    <div className={styles.header}>
                        <h1>Đăng nhập</h1>
                        <p>Chào mừng bạn trở lại!</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <Input
                            label="Tên đăng nhập"
                            type="text"
                            placeholder="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            error={errors.username}
                            fullWidth
                            required
                        />

                        <Input
                            label="Mật khẩu"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                            fullWidth
                            required
                        />

                        <div className={styles.forgotPassword}>
                            <Link href="/auth/forgot-password">Quên mật khẩu?</Link>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            fullWidth
                            isLoading={isLoading}
                        >
                            Đăng nhập
                        </Button>
                    </form>

                    <div className={styles.divider}>
                        <span>Hoặc đăng nhập với</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button className={styles.socialButton}>
                            <GoogleOutlined /> Google
                        </button>
                        <button className={styles.socialButton}>
                            <FacebookOutlined /> Facebook
                        </button>
                    </div>

                    <div className={styles.footer}>
                        Chưa có tài khoản? <Link href="/auth/register">Đăng ký ngay</Link>
                    </div>
                </div>

                <div className={styles.sidePanel}>
                    <h2>Bắt đầu hành trình đầu tư của bạn</h2>
                    <ul className={styles.benefits}>
                        <li>✓ Truy cập 100+ khóa học chất lượng cao</li>
                        <li>✓ Học từ các chuyên gia hàng đầu</li>
                        <li>✓ Chứng chỉ được công nhận</li>
                        <li>✓ Hỗ trợ 24/7</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
