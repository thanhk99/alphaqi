'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { enrollmentService } from '@/services/enrollment.service';
import { Enrollment } from '@/types/course.types';
import { BookOutlined, ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import Button from '@/components/common/Button/Button';
import EnrollmentStatusBadge from '@/components/common/EnrollmentStatusBadge/EnrollmentStatusBadge';
import ConfirmModal from '@/components/common/ConfirmModal/ConfirmModal';
import Pagination from '@/components/common/Pagination/Pagination';
import { getImageUrl } from '@/utils/imageUtils';
import { useNotification } from '@/store/NotificationContext';
import styles from './page.module.css';

type FilterStatus = 'ALL' | 'ACTIVE' | 'COMPLETED' | 'PENDING' | 'CANCELLED';

export default function MyCoursesPage() {
    const { showNotification } = useNotification();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [filteredEnrollments, setFilteredEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('ALL');
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    const [selectedEnrollmentId, setSelectedEnrollmentId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 6;

    useEffect(() => {
        fetchEnrollments();
    }, [page]);

    useEffect(() => {
        filterEnrollments();
    }, [enrollments, filterStatus]);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const backendPage = page - 1;
            const data = await enrollmentService.getMyEnrollments(backendPage, pageSize);
            
            if (data && data.content) {
                setEnrollments(data.content);
                setTotalPages(data.totalPages);
            } else {
                setEnrollments([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Failed to fetch enrollments:', error);
            showNotification('error', 'Không thể tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    };

    const filterEnrollments = () => {
        if (filterStatus === 'ALL') {
            setFilteredEnrollments(enrollments);
        } else {
            setFilteredEnrollments(enrollments.filter(e => e.status === filterStatus));
        }
    };

    const handleCancelClick = (enrollmentId: string) => {
        setSelectedEnrollmentId(enrollmentId);
        setCancelModalOpen(true);
    };

    const handleConfirmCancel = async () => {
        if (!selectedEnrollmentId) return;

        try {
            await enrollmentService.cancelEnrollment(selectedEnrollmentId);
            showNotification('success', 'Đã hủy đăng ký khóa học thành công');
            // Refresh enrollments
            await fetchEnrollments();
        } catch (error) {
            console.error('Failed to cancel enrollment:', error);
            showNotification('error', 'Không thể hủy đăng ký khóa học');
        } finally {
            setCancelModalOpen(false);
            setSelectedEnrollmentId(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Đang tải...</p>
            </div>
        );
    }

    return (
        <div>

            <div className={styles.pageHeader}>
                <h1 className={styles.title}>Khóa học của tôi</h1>
                <p className={styles.subtitle}>Quản lý và theo dõi tiến độ học tập của bạn</p>
            </div>

            {enrollments.length > 0 && (
                <div className={styles.filterTabs}>
                    <button
                        className={`${styles.filterTab} ${filterStatus === 'ALL' ? styles.active : ''}`}
                        onClick={() => setFilterStatus('ALL')}
                    >
                        Tất cả ({enrollments.length})
                    </button>
                    <button
                        className={`${styles.filterTab} ${filterStatus === 'ACTIVE' ? styles.active : ''}`}
                        onClick={() => setFilterStatus('ACTIVE')}
                    >
                        Đang học ({enrollments.filter(e => e.status === 'ACTIVE').length})
                    </button>
                    <button
                        className={`${styles.filterTab} ${filterStatus === 'COMPLETED' ? styles.active : ''}`}
                        onClick={() => setFilterStatus('COMPLETED')}
                    >
                        Hoàn thành ({enrollments.filter(e => e.status === 'COMPLETED').length})
                    </button>
                </div>
            )}

            {filteredEnrollments.length > 0 ? (
                <div className={styles.courseGrid}>
                    {filteredEnrollments.map((enrollment) => (
                        // ... card content ...
                        <div key={enrollment.id} className={styles.courseCard}>
                            {/* Content clipped for brevity, same as before */}
                            <div className={styles.thumbnailWrapper}>
                                <img
                                    src={getImageUrl(enrollment.course.thumbnail) || '/placeholder-course.jpg'}
                                    alt={enrollment.course.title}
                                    className={styles.thumbnail}
                                />
                                <div className={styles.badgeContainer}>
                                    <EnrollmentStatusBadge status={enrollment.status} />
                                </div>
                            </div>

                            <div className={styles.cardContent}>
                                <h3 className={styles.courseTitle}>{enrollment.course.title}</h3>

                                <div className={styles.courseInfo}>
                                    <div className={styles.infoItem}>
                                        <BookOutlined />
                                        <span>{enrollment.course.lessonCount} bài học</span>
                                    </div>
                                </div>

                                <div className={styles.enrollmentDates}>
                                    <div className={styles.dateItem}>
                                        <span className={styles.dateLabel}>Ngày đăng ký:</span>
                                        <span className={styles.dateValue}>{formatDate(enrollment.enrolledAt)}</span>
                                    </div>
                                    {enrollment.completedAt && (
                                        <div className={styles.dateItem}>
                                            <span className={styles.dateLabel}>Hoàn thành:</span>
                                            <span className={styles.dateValue}>{formatDate(enrollment.completedAt)}</span>
                                        </div>
                                    )}
                                </div>

                                {enrollment.status !== 'CANCELLED' && (
                                    <div className={styles.progressSection}>
                                        <div className={styles.progressInfo}>
                                            <span>Hoàn thành</span>
                                            <span>{enrollment.progress}%</span>
                                        </div>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${enrollment.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                <div className={styles.actionButtons}>
                                    {enrollment.status === 'ACTIVE' && (
                                        <>
                                            <Link href={`/courses/${enrollment.courseId}`} className={styles.linkButton}>
                                                <Button variant="primary" fullWidth>
                                                    Xem chi tiết
                                                </Button>
                                            </Link>
                                            <button
                                                className={styles.cancelButton}
                                                onClick={() => handleCancelClick(enrollment.id)}
                                                title="Hủy đăng ký"
                                            >
                                                <DeleteOutlined />
                                            </button>
                                        </>
                                    )}
                                    {enrollment.status === 'COMPLETED' && (
                                        <Link href={`/courses/${enrollment.courseId}`} className={styles.linkButton}>
                                            <Button variant="outline" fullWidth>
                                                Xem chi tiết
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.paginationWrapper} style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
                        <Pagination 
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.emptyState}>
                    <BookOutlined className={styles.emptyIcon} />
                    <h3>
                        {filterStatus === 'ALL'
                            ? 'Bạn chưa đăng ký khóa học nào'
                            : `Không có khóa học ${filterStatus === 'ACTIVE' ? 'đang học' : 'hoàn thành'}`
                        }
                    </h3>
                    <p>
                        {filterStatus === 'ALL'
                            ? 'Khám phá các khóa học chất lượng để nâng cao kiến thức ngay hôm nay'
                            : 'Thử thay đổi bộ lọc để xem các khóa học khác'
                        }
                    </p>
                    {filterStatus === 'ALL' && (
                        <Link href="/courses">
                            <Button variant="primary" size="large">
                                Khám phá khóa học
                            </Button>
                        </Link>
                    )}
                </div>
            )}

            <ConfirmModal
                isOpen={cancelModalOpen}
                title="Hủy đăng ký khóa học"
                message="Bạn có chắc chắn muốn hủy đăng ký khóa học này? Hành động này không thể hoàn tác."
                confirmText="Hủy đăng ký"
                cancelText="Giữ lại"
                variant="danger"
                onConfirm={handleConfirmCancel}
                onCancel={() => {
                    setCancelModalOpen(false);
                    setSelectedEnrollmentId(null);
                }}
            />
        </div>
    );
}
