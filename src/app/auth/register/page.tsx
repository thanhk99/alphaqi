'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/store/AuthContext';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from '../login/page.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validation
        const newErrors: any = {};
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }
        if (formData.password.length < 8) {
            newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullName: formData.fullName,
                phoneNumber: formData.phone
            });
            router.push('/dashboard');
        } catch (error: any) {
            console.log('Registration error details:', error.response?.data);
            const errorData = error.response?.data;
            const detailErrors = errorData?.details;

            if (Array.isArray(detailErrors) && detailErrors.length > 0) {
                const mappedErrors: any = {};
                detailErrors.forEach((detail: string) => {
                    const [field, message] = detail.split(': ').map(s => s.trim());
                    if (field && message) {
                        // Map backend field names to frontend form keys
                        const fieldMap: Record<string, string> = {
                            'username': 'username',
                            'email': 'email',
                            'fullName': 'fullName',
                            'phoneNumber': 'phone',
                            'password': 'password'
                        };
                        const formField = fieldMap[field] || field;
                        mappedErrors[formField] = message;
                    }
                });
                setErrors(mappedErrors);
            } else {
                const errorCode = errorData?.message || error.message;
                const ERROR_MAPPING: Record<string, string> = {
                    'USER_EXISTED': 'Tên đăng nhập đã tồn tại',
                    'USERNAME_EXISTED': 'Tên đăng nhập đã tồn tại',
                    'EMAIL_EXISTED': 'Email đã được đăng ký',
                    'PHONE_EXISTED': 'Số điện thoại đã được đăng ký',
                    'User already exists': 'Tài khoản đã tồn tại',
                    'Bad credentials': 'Thông tin không hợp lệ',
                };
                const errorMessage = ERROR_MAPPING[errorCode] || errorCode || 'Đăng ký thất bại. Vui lòng thử lại sau.';
                setErrors({ email: errorMessage });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.container}>
                <div className={styles.authCard}>
                    <div className={styles.header}>
                        <h1>Đăng ký</h1>
                        <p>Tạo tài khoản để bắt đầu học</p>
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
                            label="Họ và tên"
                            type="text"
                            placeholder="Nguyễn Văn A"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            error={errors.fullName}
                            fullWidth
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                            fullWidth
                            required
                        />

                        <Input
                            label="Số điện thoại"
                            type="tel"
                            placeholder="0123456789"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            error={errors.phone}
                            fullWidth
                        />

                        <Input
                            label="Mật khẩu"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                            helperText="Tối thiểu 8 ký tự"
                            fullWidth
                            required
                        />

                        <Input
                            label="Xác nhận mật khẩu"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            error={errors.confirmPassword}
                            fullWidth
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            fullWidth
                            isLoading={isLoading}
                        >
                            Đăng ký
                        </Button>
                    </form>

                    <div className={styles.footer}>
                        Đã có tài khoản? <Link href="/auth/login">Đăng nhập ngay</Link>
                    </div>
                </div>

                <div className={styles.sidePanel}>
                    <h2>Tham gia cộng đồng học viên</h2>
                    <ul className={styles.benefits}>
                        <li>✓ Hơn 10,000+ học viên đã tin tưởng</li>
                        <li>✓ Học từ các chuyên gia hàng đầu</li>
                        <li>✓ Cập nhật kiến thức liên tục</li>
                        <li>✓ Cộng đồng hỗ trợ nhiệt tình</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
