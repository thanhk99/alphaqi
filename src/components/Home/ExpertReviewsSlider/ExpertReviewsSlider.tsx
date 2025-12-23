'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarFilled } from '@ant-design/icons';
import styles from './ExpertReviewsSlider.module.css';
import { ExpertReview } from '@/types/expertReview.types';
import expertReviewService from '@/services/expertReview.service';
import { getImageUrl } from '@/utils/imageUtils';

export default function ExpertReviewsSlider() {
    const [reviews, setReviews] = useState<ExpertReview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const data = await expertReviewService.getAllExpertReviews();
                setReviews(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch expert reviews:', err);
                setError('Không thể tải đánh giá từ chuyên gia');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return (
            <section className={styles.sliderWrapper}>
                <div className={styles.loadingState}>
                    <p>Đang tải đánh giá...</p>
                </div>
            </section>
        );
    }

    if (error || reviews.length === 0) {
        return null; // Hide section if no reviews or error
    }

    // Duplicate the list for seamless marquee effect
    const doubleReviews = [...reviews, ...reviews];

    return (
        <section className={styles.sliderWrapper}>
            <div className={styles.marquee}>
                <div className={styles.marqueeContent}>
                    {doubleReviews.map((review, index) => (
                        <div key={`${review.id}-${index}`} className={styles.reviewCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.avatarWrapper}>
                                    <img
                                        src={review.expertAvatar ? getImageUrl(review.expertAvatar) : `https://i.pravatar.cc/150?u=${review.expertName}`}
                                        alt={review.expertName}
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.src = `https://i.pravatar.cc/150?u=${review.expertName}`;
                                        }}
                                    />
                                </div>
                                <div className={styles.expertInfo}>
                                    <h4>{review.expertName}</h4>
                                    <span>{review.expertTitle}</span>
                                </div>
                            </div>
                            <div className={styles.rating}>
                                {[...Array(review.rating || 5)].map((_, i) => (
                                    <StarFilled key={i} className={styles.starIcon} />
                                ))}
                            </div>
                            <p>"{review.content}"</p>
                            <Link href={review.courseId ? `/courses/${review.courseId}` : '/courses'} className={styles.courseLink}>
                                <span className={styles.courseLabel}>Khóa học:</span> {review.courseName || 'Tất cả khóa học'}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
