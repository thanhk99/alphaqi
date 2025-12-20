'use client';

import React, { useState, useEffect } from 'react';
import { userService } from '@/services/user.service';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import { useNotification } from '@/store/NotificationContext';
import { CheckCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import styles from './AvatarSelector.module.css';

interface AvatarSelectorProps {
    visible: boolean;
    onClose: () => void;
    currentAvatar?: string;
    onAvatarUpdated: (newAvatarUrl: string) => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
    visible,
    onClose,
    currentAvatar,
    onAvatarUpdated
}) => {
    const [avatars, setAvatars] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const { showNotification } = useNotification();

    useEffect(() => {
        if (visible) {
            fetchDefaultAvatars();
            setSelectedAvatar(currentAvatar || null);
        }
    }, [visible, currentAvatar]);

    const fetchDefaultAvatars = async () => {
        try {
            setLoading(true);
            const avatarList = await userService.getDefaultAvatars();
            setAvatars(avatarList);
        } catch (error) {
            console.error('Failed to fetch avatars:', error);
            showNotification('error', 'Không thể tải danh sách avatar');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarSelect = (avatarUrl: string) => {
        setSelectedAvatar(avatarUrl);
    };

    const handleConfirm = async () => {
        if (!selectedAvatar) {
            showNotification('warning', 'Vui lòng chọn một avatar');
            return;
        }

        try {
            setUpdating(true);
            await userService.updateAvatar(selectedAvatar);
            showNotification('success', 'Cập nhật avatar thành công!');
            onAvatarUpdated(selectedAvatar);
            onClose();
        } catch (error) {
            console.error('Failed to update avatar:', error);
            showNotification('error', 'Có lỗi xảy ra khi cập nhật avatar');
        } finally {
            setUpdating(false);
        }
    };

    const getFullAvatarUrl = (avatarPath: string) => {
        // If it's already a full URL, return it
        if (avatarPath.startsWith('http')) {
            return avatarPath;
        }
        // Images are already in public/avt, so we can use the relative path directly
        return avatarPath;
    };

    return (
        <Modal
            title="Chọn Avatar"
            isOpen={visible}
            onClose={onClose}
            size="medium"
        >
            {loading ? (
                <div className={styles.loadingContainer}>
                    <LoadingOutlined style={{ fontSize: 32 }} />
                    <p>Đang tải avatar...</p>
                </div>
            ) : (
                <>
                    <div className={styles.avatarGrid}>
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`${styles.avatarItem} ${selectedAvatar === avatar ? styles.selected : ''
                                    }`}
                                onClick={() => handleAvatarSelect(avatar)}
                            >
                                <img
                                    src={getFullAvatarUrl(avatar)}
                                    alt={`Avatar ${index + 1}`}
                                    className={styles.avatarImage}
                                />
                                {selectedAvatar === avatar && (
                                    <div className={styles.selectedOverlay}>
                                        <CheckCircleOutlined className={styles.checkIcon} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className={styles.footer}>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            style={{ marginRight: '12px' }}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleConfirm}
                            isLoading={updating}
                        >
                            Xác nhận
                        </Button>
                    </div>
                </>
            )}
        </Modal>
    );
};

export default AvatarSelector;
