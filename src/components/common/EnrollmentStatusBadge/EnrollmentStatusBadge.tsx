import React from 'react';
import styles from './EnrollmentStatusBadge.module.css';

interface EnrollmentStatusBadgeProps {
    status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

const EnrollmentStatusBadge: React.FC<EnrollmentStatusBadgeProps> = ({ status }) => {
    const getStatusConfig = () => {
        switch (status) {
            case 'PENDING':
                return { label: 'Chờ xử lý', className: styles.pending };
            case 'ACTIVE':
                return { label: 'Đang học', className: styles.active };
            case 'COMPLETED':
                return { label: 'Hoàn thành', className: styles.completed };
            case 'CANCELLED':
                return { label: 'Đã hủy', className: styles.cancelled };
            default:
                return { label: status, className: styles.default };
        }
    };

    const config = getStatusConfig();

    return (
        <span className={`${styles.badge} ${config.className}`}>
            {config.label}
        </span>
    );
};

export default EnrollmentStatusBadge;
