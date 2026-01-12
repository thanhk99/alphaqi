import React, { useState } from 'react';
import {
    ClockCircleOutlined,
    BookOutlined,
    TeamOutlined,
    SafetyCertificateOutlined,
    PlayCircleOutlined,
    StarFilled,
    LinkedinOutlined,
} from '@ant-design/icons';
import Button from '@/components/common/Button/Button';
import { Course } from '@/types/course.types';
import { getImageUrl } from '@/utils/imageUtils';
import RichText from '@/components/common/RichText/RichText';
import styles from './CourseHero.module.css';

interface CourseHeroProps {
    course: Course;
    onEnroll: () => void;
    onAddToCart: () => void;
    enrolling: boolean;
    isAuthenticated: boolean;
    onScrollToReviews: () => void;
}

export default function CourseHero({
    course,
    onEnroll,
    onAddToCart,
    enrolling,
    onScrollToReviews
}: CourseHeroProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const description = course.content || course.description;
    const hasLongDescription = description && description.length > 300; // Heuristic check for "long" content
    return (
        <div className={styles.hero}>
            <div className="container">
                <div className={styles.heroContent}>
                    <div className={styles.heroInfo}>
                        <div className={styles.badges}>
                            <span className={styles.badge}>Mới nhất</span>
                            {(course.enrollmentCount || 0) > 1000 && <span className={styles.badge}>Bán chạy</span>}
                        </div>
                        <h1>{course.title}</h1>
                        <RichText
                            content={description}
                            className={`${styles.heroDesc} ${!isExpanded ? styles.collapsed : ''}`}
                        />
                        {hasLongDescription && (
                            <button
                                className={styles.toggleDesc}
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        )}

                        <div className={styles.meta}>
                            <div className={styles.metaItem}>
                                <StarFilled className={styles.starIcon} />
                                <span>{(course.averageRating || 0).toFixed(1)} ({course.reviewCount || 0} đánh giá)</span>
                            </div>
                            <div className={styles.metaItem}>
                                <TeamOutlined />
                                <span>{course.enrollmentCount || 0} học viên</span>
                            </div>
                            <div className={styles.metaItem}>
                                <ClockCircleOutlined />
                                <span>Cập nhật {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString('vi-VN') : 'N/A'}</span>
                            </div>
                        </div>

                        <div className={styles.instructorMini}>
                            <img
                                src="/imgs/avt-Photoroom.png"
                                alt={course.instructorName || 'Nguyễn Minh Hạnh'}
                                className={styles.instructorAvatar}
                                onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.src = 'https://ui-avatars.com/api/?name=' + (course.instructorName || 'Nguyễn Minh Hạnh') + '&background=random';
                                }}
                            />
                            <div className={styles.instructorDetails}>
                                <span className={styles.instructorLabel}>Giảng viên</span>
                                <div className={styles.instructorNameWrapper}>
                                    <strong className={styles.instructorName}>{course.instructorName || 'Nguyễn Minh Hạnh'}</strong>
                                    <a
                                        href="https://www.linkedin.com/in/hanhnm/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.linkedinLink}
                                        title="LinkedIn Profile"
                                    >
                                        <LinkedinOutlined />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.heroCard}>
                        <div className={styles.videoPreview}>
                            {course.introVideoUrl ? (
                                <video
                                    controls
                                    poster={getImageUrl(course.thumbnail)}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                >
                                    <source src={course.introVideoUrl} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ video.
                                </video>
                            ) : course.thumbnail ? (
                                <img
                                    src={getImageUrl(course.thumbnail)}
                                    alt={course.title}
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.style.display = 'none';
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#999',
                                    fontSize: '24px',
                                    fontWeight: 'bold'
                                }}>
                                    Khóa học
                                </div>
                            )}
                            {!course.introVideoUrl && (
                                <div className={styles.playButton}>
                                    <PlayCircleOutlined />
                                </div>
                            )}
                        </div>
                        <div className={styles.cardBody}>
                            <div className={styles.priceWrapper}>
                                <span className={styles.currentPrice}>
                                    {(course.price || 0).toLocaleString('vi-VN')}₫
                                </span>
                            </div>

                            {course.isEnrolled ? (
                                <Button
                                    variant="primary"
                                    size="large"
                                    fullWidth
                                    onClick={onScrollToReviews}
                                >
                                    Đánh giá khóa học
                                </Button>
                            ) : (
                                <>
                                    <Button variant="primary" size="large" fullWidth onClick={onEnroll} disabled={enrolling}>
                                        {enrolling ? 'Đang xử lý...' : 'Đăng ký ngay'}
                                    </Button>
                                    <Button variant="outline" size="large" fullWidth onClick={onAddToCart}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                </>
                            )}

                            <ul className={styles.featuresList}>
                                <li><BookOutlined /> {course.lessonCount || 0} bài giảng</li>
                                <li><SafetyCertificateOutlined /> Chứng chỉ hoàn thành</li>
                                <li><TeamOutlined /> Hỗ trợ 24/7</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
