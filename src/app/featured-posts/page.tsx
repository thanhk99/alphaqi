'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { LeftOutlined, RightOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './page.module.css';
import { featuredPostService } from '@/services/featured-post.service';
import { FeaturedPost } from '@/types/featured-post.types';
import { getImageUrl } from '@/utils/imageUtils';

export default function FeaturedPostsPage() {
    const [posts, setPosts] = useState<FeaturedPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await featuredPostService.getPublishedPosts({ 
                    page: currentPage - 1, 
                    size: ITEMS_PER_PAGE 
                });
                
                if (response && response.content) {
                    setPosts(response.content);
                    setTotalPages(response.totalPages);
                } else {
                    setPosts([]);
                    setTotalPages(1);
                }
            } catch (err) {
                console.error('Error fetching featured posts:', err);
                setError('Không thể tải bài viết. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <MainLayout>
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>Bài viết nổi bật</h1>
                    <p className={styles.heroSubtitle}>
                        Khám phá những kiến thức chuyên sâu và cập nhật mới nhất từ AlphaQi.
                    </p>
                </div>
            </section>

            <div className="container">
                {loading ? (
                    <div className={styles.loadingWrapper}>
                        <p>Đang tải bài viết...</p>
                    </div>
                ) : error ? (
                    <div className={styles.errorWrapper}>
                        <p>{error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className={styles.emptyWrapper}>
                        <p>Chưa có bài viết nổi bật nào được xuất bản.</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.grid}>
                            {posts.map((post) => (
                                <div key={post.id} className={styles.card}>
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={getImageUrl(post.thumbnail)}
                                            alt={post.title}
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    <div className={styles.content}>
                                        <h3 className={styles.title}>
                                            <Link href={`/featured-posts/${post.id}`}>{post.title}</Link>
                                        </h3>
                                        <div className={styles.description}>
                                            {post.description}
                                        </div>
                                        <Link href={`/featured-posts/${post.id}`} className={styles.readMore}>
                                            Xem chi tiết <ArrowRightOutlined />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className={styles.pagination}>
                                <button
                                    className={styles.pageButton}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <LeftOutlined />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    className={styles.pageButton}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <RightOutlined />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </MainLayout>
    );
}
