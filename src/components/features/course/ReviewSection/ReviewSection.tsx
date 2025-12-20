import React from 'react';
import {
    StarFilled,
    CheckCircleOutlined,
} from '@ant-design/icons';
import Button from '@/components/common/Button/Button';
import { Review, Course } from '@/types/course.types';
import { getImageUrl } from '@/utils/imageUtils';
import styles from './ReviewSection.module.css';

interface ReviewSectionProps {
    course: Course;
    reviews: Review[];
    isEnrolled: boolean;
    user: any; // Using any for now as User type is missing id in some contexts
    rating: number;
    comment: string;
    submittingReview: boolean;
    setRating: (rating: number) => void;
    setComment: (comment: string) => void;
    onSubmitReview: (e: React.FormEvent) => void;
}

export default function ReviewSection({
    course,
    reviews,
    isEnrolled,
    user,
    rating,
    comment,
    submittingReview,
    setRating,
    setComment,
    onSubmitReview
}: ReviewSectionProps) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [starFilter, setStarFilter] = React.useState<number | null>(null);
    const reviewsPerPage = 5;

    // Calculate star counts
    const starCounts = React.useMemo(() => {
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach(r => {
            const star = Math.round(r.rating) as keyof typeof counts;
            if (counts[star] !== undefined) counts[star]++;
        });
        return counts;
    }, [reviews]);

    // Filter reviews
    const filteredReviews = React.useMemo(() => {
        if (starFilter === null) return reviews;
        return reviews.filter(r => Math.round(r.rating) === starFilter);
    }, [reviews, starFilter]);

    // Reset page when filter or reviews change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filteredReviews.length]);

    // Calculate pagination
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const section = document.getElementById('reviews-section');
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="reviews-section" className={styles.section}>
            <div className={styles.sectionHeader}>
                <h2>Đánh giá từ học viên</h2>
                <div className={styles.ratingSummary}>
                    <StarFilled className={styles.starIcon} />
                    <span className={styles.averageRating}>{(course.averageRating || 0).toFixed(1)}</span>
                    <span className={styles.totalReviews}>({course.reviewCount || 0} đánh giá)</span>
                </div>
            </div>

            {isEnrolled && (
                <>
                    {reviews.some(r => r.userId === user?.userId) ? (
                        <div className={styles.reviewFormSection} style={{ textAlign: 'center', padding: '2rem' }}>
                            <CheckCircleOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '1rem' }} />
                            <h3>Bạn đã đánh giá khóa học này</h3>
                            <p style={{ color: '#666' }}>Cảm ơn bạn đã chia sẻ ý kiến của mình!</p>
                        </div>
                    ) : (
                        <div className={styles.reviewFormSection}>
                            <h3>Đánh giá của bạn</h3>
                            <form onSubmit={onSubmitReview} className={styles.reviewForm}>
                                <div className={styles.ratingInput}>
                                    <span>Số sao:</span>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            className={styles.starButton}
                                            onClick={() => setRating(s)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <StarFilled
                                                style={{
                                                    color: s <= rating ? '#fadb14' : '#d9d9d9',
                                                    fontSize: '24px',
                                                    transition: 'color 0.2s'
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    className={styles.commentInput}
                                    placeholder="Chia sẻ trải nghiệm của bạn về khóa học này..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    rows={4}
                                />
                                <div className={styles.formActions}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={submittingReview}
                                    >
                                        {submittingReview ? 'Đang gửi...' : 'Gửi đánh giá'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}
                </>
            )}

            {/* Star Filters (Shopee Style) */}
            <div className={styles.filterSection}>
                <button
                    className={`${styles.filterButton} ${starFilter === null ? styles.activeFilter : ''}`}
                    onClick={() => setStarFilter(null)}
                >
                    Tất cả ({reviews.length})
                </button>
                {[5, 4, 3, 2, 1].map(star => (
                    <button
                        key={star}
                        className={`${styles.filterButton} ${starFilter === star ? styles.activeFilter : ''}`}
                        onClick={() => setStarFilter(star)}
                    >
                        {star} Sao ({starCounts[star as keyof typeof starCounts]})
                    </button>
                ))}
            </div>

            <div className={styles.reviewList}>
                {currentReviews.length > 0 ? (
                    <>
                        {currentReviews.map((review) => (
                            <div key={review.id} className={styles.reviewItem}>
                                <div className={styles.reviewUser}>
                                    <div className={styles.userAvatar}>
                                        {(() => {
                                            const avatarUrl = review.user?.avatar || review.avatar || (review as any).avatarUrl;
                                            const displayName = review.userName || review.user?.fullName || 'User';

                                            // 10 default avatars we have in public/avt
                                            const defaultAvatars = [
                                                '/avt/z7342362649610_f5243f87485288d44e9ec0d12aed6452.jpg',
                                                '/avt/z7342362649759_01f0497e9e07c09e7ea4acd0043dc54a.jpg',
                                                '/avt/z7342362660213_9bd0de1f5a2dbe47d74fa16eb7943f60.jpg',
                                                '/avt/z7342362660349_ca9feee2a3b053e240f49fd00e64c665.jpg',
                                                '/avt/z7342362664250_0a8fff6984e742c638a5f984ec1f795f.jpg',
                                                '/avt/z7342362668779_495dda9778482e8a59113105c76a57d0.jpg',
                                                '/avt/z7342362673523_9f1d5f6cba08d10be6d2e9aa22fefb6d.jpg',
                                                '/avt/z7342362677823_e9e9ab6189d8ecac986af048b5738c57.jpg',
                                                '/avt/z7342362678817_fdc3109318b02183ff70a23333c78bcf.jpg',
                                                '/avt/z7342362682020_3925a9b021be64cc5cbfa201fc75be00.jpg'
                                            ];

                                            // Determine which avatar to use based on userId or userName
                                            const idString = review.userId || displayName;
                                            const index = Math.abs(idString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % defaultAvatars.length;
                                            const finalAvatarUrl = avatarUrl || defaultAvatars[index];

                                            return (
                                                <img
                                                    src={finalAvatarUrl}
                                                    alt={displayName}
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = defaultAvatars[0]; // Fallback to first default if even selected one fails
                                                    }}
                                                />
                                            );
                                        })()}
                                    </div>
                                    <div className={styles.userInfo}>
                                        <strong>{review.userName || review.user?.fullName}</strong>
                                        <span className={styles.reviewDate}>
                                            {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                        </span>
                                    </div>
                                    <div className={styles.userRating}>
                                        {[...Array(5)].map((_, i) => (
                                            <StarFilled
                                                key={i}
                                                style={{ color: i < review.rating ? '#fadb14' : '#f0f0f0' }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.reviewComment}>
                                    {review.comment}
                                </div>
                            </div>
                        ))}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={styles.pageButton}
                                >
                                    Trang trước
                                </button>

                                <div className={styles.pageNumbers}>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i + 1}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`${styles.pageNumber} ${currentPage === i + 1 ? styles.activePage : ''}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={styles.pageButton}
                                >
                                    Trang sau
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={styles.emptyReviews}>
                        Chưa có đánh giá nào cho mức này.
                    </div>
                )}
            </div>
        </section>
    );
}
