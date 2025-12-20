'use client';

import React from 'react';
import { useNotification, NotificationType } from '@/store/NotificationContext';
import {
    CheckCircleFilled,
    CloseCircleFilled,
    InfoCircleFilled,
    ExclamationCircleFilled,
    CloseOutlined
} from '@ant-design/icons';
import styles from './Notification.module.css';

const IconMap: Record<NotificationType, React.ReactNode> = {
    success: <CheckCircleFilled className={styles.icon} />,
    error: <CloseCircleFilled className={styles.icon} />,
    info: <InfoCircleFilled className={styles.icon} />,
    warning: <ExclamationCircleFilled className={styles.icon} />
};

export const Notification: React.FC = () => {
    const { notifications, hideNotification } = useNotification();

    if (notifications.length === 0) return null;

    return (
        <div className={styles.container}>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`${styles.notification} ${styles[notification.type]}`}
                >
                    <div className={styles.content}>
                        {IconMap[notification.type]}
                        <span className={styles.message}>{notification.message}</span>
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={() => hideNotification(notification.id)}
                    >
                        <CloseOutlined />
                    </button>
                    <div
                        className={styles.progressBar}
                        style={{
                            animationDuration: `${notification.duration}ms`
                        }}
                    ></div>
                </div>
            ))}
        </div>
    );
};
