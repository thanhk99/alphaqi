'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useAuth } from '@/store/AuthContext';
import styles from './page.module.css';
import { courseService } from '@/services/course.service';
import { enrollmentService } from '@/services/enrollment.service';
import { Course, Review } from '@/types/course.types';
import { useRouter } from 'next/navigation';
import CourseHero from '@/components/features/course/CourseHero/CourseHero';
import ReviewSection from '@/components/features/course/ReviewSection/ReviewSection';
import RichText from '@/components/common/RichText/RichText';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params Promise
    const unwrappedParams = React.use(params);
    const courseId = unwrappedParams.id;

    const [course, setCourse] = useState<Course | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);
    const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();


    useEffect(() => {
        fetchCourseDetails();
    }, [courseId, user?.userId]);

    const fetchCourseDetails = async () => {
        try {
            setLoading(true);
            setReviews([]); // Clear old reviews when fetching new course details
            const courseData = await courseService.getCourseById(courseId);

            // Fetch reviews
            try {
                const reviewData = await courseService.getCourseReviews(courseId);
                setReviews(reviewData);
            } catch (revError) {
                console.error('Failed to fetch reviews:', revError);
            }

            // Check if user is enrolled
            if (isAuthenticated) {
                try {
                    const enrolled = await enrollmentService.isEnrolled(courseId);
                    courseData.isEnrolled = enrolled;
                } catch (enrollError) {
                    courseData.isEnrolled = false;
                }
            } else {
                courseData.isEnrolled = false;
            }

            setCourse(courseData);
        } catch (error) {
            console.error('Failed to fetch course details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            setIsLoginModalVisible(true);
            return;
        }
        if (!course) return;
        try {
            setEnrolling(true);
            await enrollmentService.enroll(course.id);
            await fetchCourseDetails();
            // router.push(`/learn/${course.id}`);
        } catch (error) {
            console.error('Failed to enroll:', error);
        } finally {
            setEnrolling(false);
        }
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setIsLoginModalVisible(true);
            return;
        }
        if (!course) return;
        if (!comment.trim()) {
            alert('Vui lòng nhập bình luận');
            return;
        }

        try {
            setSubmittingReview(true);
            await courseService.submitReview(course.id, rating, comment);
            setComment('');
            setRating(5);
            // Refresh reviews
            const newReviews = await courseService.getCourseReviews(courseId);
            setReviews(newReviews);
            alert('Cảm ơn bạn đã đánh giá!');
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Không thể gửi đánh giá. Vui lòng thử lại sau.');
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            setIsLoginModalVisible(true);
            return;
        }
        console.log('Add to cart');
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
                    Loading...
                </div>
            </MainLayout>
        );
    }

    if (!course) {
        return (
            <MainLayout>
                <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
                    Course not found
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className={styles.coursePage}>
                <CourseHero
                    course={course}
                    onEnroll={handleEnroll}
                    onAddToCart={handleAddToCart}
                    enrolling={enrolling}
                    isAuthenticated={isAuthenticated}
                    onScrollToReviews={() => {
                        const reviewSection = document.getElementById('reviews-section');
                        reviewSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                />

                {/* Content Section */}
                <div className="container">
                    <div className={styles.contentLayout}>
                        <div className={styles.mainContent}>
                            {course.lessons && course.lessons.length > 0 && (
                                <div className={styles.lessonsSection}>
                                    <h2>Nội dung Đào tạo</h2>
                                    <div className={styles.lessonsList}>
                                        {course.lessons.map((lesson, index) => (
                                            <div key={lesson.id} className={styles.lessonItem}>
                                                <div
                                                    className={styles.lessonHeader}
                                                    onClick={() => setExpandedLessonId(expandedLessonId === lesson.id ? null : lesson.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <span className={styles.lessonTitle}>{index + 1}. {lesson.title}</span>
                                                    <span className={styles.lessonIcon}>
                                                        {expandedLessonId === lesson.id ? <UpOutlined /> : <DownOutlined />}
                                                    </span>
                                                </div>
                                                {expandedLessonId === lesson.id && lesson.content && (
                                                    <div className={styles.lessonContent}>
                                                        <RichText content={lesson.content} />
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <ReviewSection
                                course={course}
                                reviews={reviews}
                                isEnrolled={course.isEnrolled || false}
                                user={(user as any)}
                                rating={rating}
                                comment={comment}
                                submittingReview={submittingReview}
                                setRating={setRating}
                                setComment={setComment}
                                onSubmitReview={handleSubmitReview}
                            />
                        </div>
                    </div>
                </div>

                {/* Login Modal */}
                <Modal
                    title="Đăng nhập yêu cầu"
                    isOpen={isLoginModalVisible}
                    onClose={() => setIsLoginModalVisible(false)}
                >
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ marginBottom: '20px' }}>Bạn cần đăng nhập để thực hiện chức năng này.</p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <Button variant="outline" onClick={() => setIsLoginModalVisible(false)}>
                                Hủy
                            </Button>
                            <Button
                                variant="primary"
                                onClick={() => router.push(`/auth/login?redirect=/courses/${courseId}`)}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        </MainLayout>
    );
}

