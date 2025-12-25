'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/store/AuthContext';
import { userService } from '@/services/user.service';
import { ChangePasswordRequest } from '@/types/user.types';
import Button from '@/components/common/Button/Button';
import AvatarSelector from '@/components/common/AvatarSelector/AvatarSelector';
import { CameraOutlined, CheckCircleOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function ProfilePage() {
    const { user, isAuthenticated, updateUserData } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: ''
    });
    const [passwordForm, setPasswordForm] = useState<ChangePasswordRequest>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [passwordChanging, setPasswordChanging] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [avatarSelectorVisible, setAvatarSelectorVisible] = useState(false);
    const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
            return;
        }
        // Fetch profile from API instead of using user from context
        fetchProfile();
    }, [isAuthenticated]);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await userService.getProfile();
            setFormData({
                fullName: data.fullName || '',
                email: data.email || '',
                phoneNumber: data.phoneNumber || ''
            });
            setCurrentAvatar(data.avatar);

            // Sync with global auth state
            updateUserData(data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            setMessage({ type: 'error', text: 'Không thể tải thông tin cá nhân' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email: string) => {
        // Must contain @ and . and follows general email format
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(formData.email)) {
            setMessage({ type: 'error', text: 'Email không hợp lệ (phải có @ và .)' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const updatedUser = await userService.updateProfile({
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phoneNumber
            });
            setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
        } catch (error) {
            console.error('Update profile error:', error);
            setMessage({ type: 'error', text: 'Có lỗi xảy ra khi cập nhật thông tin.' });
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarClick = () => {
        setAvatarSelectorVisible(true);
    };

    const handleAvatarUpdated = (newAvatarUrl: string) => {
        setCurrentAvatar(newAvatarUrl);
        updateUserData({ avatar: newAvatarUrl });
        // Optionally refresh the profile to get updated data
        fetchProfile();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        try {
            const avatarUrl = await userService.uploadAvatar(file);
            // Ideally update user context here with new avatar
            setMessage({ type: 'success', text: 'Cập nhật ảnh đại diện thành công!' });
            // Refresh page or update context to show new avatar immediately if context doesn't auto-update
            window.location.reload();
        } catch (error) {
            console.error('Upload avatar error:', error);
            setMessage({ type: 'error', text: 'Có lỗi xảy ra khi tải ảnh lên.' });
        } finally {
            setUploading(false);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getFullAvatarUrl = (avatarPath?: string) => {
        if (!avatarPath) return null;
        if (avatarPath.startsWith('http')) return avatarPath;
        // Images are stored locally in public/avt
        return avatarPath;
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu mới không khớp' });
            return;
        }

        if (passwordForm.newPassword.length < 8) {
            setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 8 ký tự' });
            return;
        }

        try {
            setPasswordChanging(true);
            await userService.changePassword(passwordForm);
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setMessage({ type: 'success', text: 'Đổi mật khẩu thành công!' });
        } catch (error: any) {
            console.error('Change password error:', error);
            const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi đổi mật khẩu';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setPasswordChanging(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Hồ sơ cá nhân</h1>
                <p className={styles.subtitle}>Quản lý thông tin cá nhân và bảo mật</p>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Thông tin cá nhân
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'security' ? styles.active : ''}`}
                    onClick={() => setActiveTab('security')}
                >
                    Bảo mật
                </button>
            </div>

            {message && (
                <div className={message.type === 'success' ? styles.successMessage : styles.errorMessage}>
                    {message.type === 'success' ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}
                    {message.text}
                </div>
            )}

            {activeTab === 'profile' && (
                <>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatarWrapper} onClick={handleAvatarClick}>
                            {currentAvatar ? (
                                <img src={getFullAvatarUrl(currentAvatar) || ''} alt="Avatar" className={styles.avatar} />
                            ) : (
                                <div className={styles.placeholderAvatar}>
                                    {getInitials(user?.fullName || 'User')}
                                </div>
                            )}
                            <div className={styles.overlay}>
                                {uploading ? <LoadingOutlined /> : <CameraOutlined />}
                            </div>
                        </div>
                        <div className={styles.uploadButton} onClick={handleAvatarClick}>
                            Thay đổi ảnh đại diện
                        </div>
                        <AvatarSelector
                            visible={avatarSelectorVisible}
                            onClose={() => setAvatarSelectorVisible(false)}
                            currentAvatar={currentAvatar}
                            onAvatarUpdated={handleAvatarUpdated}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Họ và tên</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Nhập họ và tên của bạn"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="example@domain.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Số điện thoại</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="Nhập số điện thoại"
                            />
                        </div>

                        <div className={styles.actions}>
                            <Button
                                variant="primary"
                                size="large"
                                type="submit"
                                disabled={loading || uploading}
                            >
                                {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </Button>
                        </div>
                    </form>
                </>
            )}

            {activeTab === 'security' && (
                <form onSubmit={handlePasswordSubmit} className={styles.form}>
                    <h2 className={styles.sectionTitle}>Đổi mật khẩu</h2>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mật khẩu hiện tại *</label>
                        <input
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Mật khẩu mới *</label>
                        <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className={styles.input}
                            required
                            minLength={8}
                        />
                        <small className={styles.hint}>Mật khẩu phải có ít nhất 8 ký tự</small>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Xác nhận mật khẩu mới *</label>
                        <input
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.actions}>
                        <Button
                            variant="primary"
                            size="large"
                            type="submit"
                            disabled={passwordChanging}
                        >
                            {passwordChanging ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
