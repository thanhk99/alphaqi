'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/store/AuthContext';
import { enrollmentService } from '@/services/enrollment.service';
import { Enrollment } from '@/types/course.types';
import { BookOutlined, CheckCircleOutlined, ClockCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Button from '@/components/common/Button/Button';
import { getImageUrl } from '@/utils/imageUtils';
import styles from './page.module.css';

export default function DashboardPage() {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const data = await enrollmentService.getMyEnrollments();
                setEnrollments(data);
            } catch (error) {
                console.error('Failed to fetch enrollments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    const stats = {
        total: enrollments.length,
        completed: enrollments.filter(e => e.progress === 100).length,
        inProgress: enrollments.filter(e => e.progress > 0 && e.progress < 100).length
    };

    return (
        <div>
            <div className={styles.welcomeSection}>
                <h1 className={styles.welcomeTitle}>Xin chào, {user?.fullName}! 👋</h1>
                <p className={styles.welcomeText}>Chào mừng bạn quay trở lại. Hãy tiếp tục hành trình học tập của mình nhé.</p>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.blue}`}>
                        <BookOutlined />
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{stats.total}</h3>
                        <p>Khóa học đã đăng ký</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.orange}`}>
                        <ClockCircleOutlined />
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{stats.inProgress}</h3>
                        <p>Đang học</p>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.statIcon} ${styles.green}`}>
                        <CheckCircleOutlined />
                    </div>
                    <div className={styles.statInfo}>
                        <h3>{stats.completed}</h3>
                        <p>Đã hoàn thành</p>
                    </div>
                </div>
            </div>

            <div>
                <div className={styles.sectionTitle}>
                    <h2>Khóa học gần đây</h2>
                    <Link href="/dashboard/my-courses" className={styles.link}>
                        Xem tất cả <ArrowRightOutlined />
                    </Link>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : enrollments.length > 0 ? (
                    <div className="row">
                        {enrollments.slice(0, 2).map((enrollment) => (
                            <div key={enrollment.id} className="col-md-6 mb-4">
                                <div style={{
                                    background: '#fff',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    height: '100%'
                                }}>
                                    <img
                                        src={getImageUrl(enrollment.course.thumbnail) || '/placeholder-course.jpg'}
                                        alt={enrollment.course.title}
                                        style={{ width: '100%', height: '160px', objectFit: 'contain' }}
                                    />
                                    <div style={{ padding: '16px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                                            {enrollment.course.title}
                                        </h3>
                                        <div style={{ marginBottom: '16px' }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '4px',
                                                fontSize: '12px',
                                                color: '#666'
                                            }}>
                                                <span>Hoàn thành</span>
                                                <span>{enrollment.progress}%</span>
                                            </div>
                                            <div style={{
                                                width: '100%',
                                                height: '6px',
                                                background: '#f0f0f0',
                                                borderRadius: '3px',
                                                overflow: 'hidden'
                                            }}>
                                                <div style={{
                                                    width: `${enrollment.progress}%`,
                                                    height: '100%',
                                                    background: '#1890ff',
                                                    borderRadius: '3px'
                                                }}></div>
                                            </div>
                                        </div>
                                        <Link href={`/courses/${enrollment.courseId}`}>
                                            <Button variant="primary" fullWidth size="small">
                                                Xem chi tiết
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>Bạn chưa đăng ký khóa học nào.</p>
                        <Link href="/courses">
                            <Button variant="primary">Khám phá khóa học ngay</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
