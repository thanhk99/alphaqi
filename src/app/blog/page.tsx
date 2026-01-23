'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { CalendarOutlined, ArrowRightOutlined, LeftOutlined, RightOutlined, LinkOutlined, FileTextOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './page.module.css';
import { articleService } from '@/services/article.service';
import { Article } from '@/types/article.types';
import RichText from '@/components/common/RichText/RichText';
import { getImageUrl, getPlaceholderImage } from '@/utils/imageUtils';

export default function BlogPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch only published articles for public view
                const data = await articleService.getArticles({ published: true });
                const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setArticles(sortedData);
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError('Không thể tải bài viết. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Format date to Vietnamese format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Pagination Logic
    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const featuredArticle = articles.length > 0 ? articles[0] : null;
    const regularArticles = articles.slice(1);
    const paginatedRegularArticles = regularArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <MainLayout>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.heroTitle}>AlphaQi Insights</h1>
                    <p className={styles.heroSubtitle}>
                        Cập nhật kiến thức mới nhất về Marketing, Tài chính và Công nghệ từ đội ngũ chuyên gia của chúng tôi.
                    </p>
                </div>
            </section>

            <div className="container">
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p>Đang tải bài viết...</p>
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#ff4d4f' }}>
                        <p>{error}</p>
                    </div>
                ) : articles.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p>Chưa có bài viết nào được xuất bản.</p>
                    </div>
                ) : (
                    <>
                        {/* Featured Article */}
                        {featuredArticle && (
                            <div className={styles.featuredSection}>
                                <div className={styles.featuredCard}>
                                    <div className={styles.featuredImage}>
                                        <img
                                            src={getImageUrl(featuredArticle.thumbnail)}
                                            alt={featuredArticle.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => {
                                                const img = e.target as HTMLImageElement;
                                                img.src = getPlaceholderImage('Bài viết');
                                            }}
                                        />
                                    </div>
                                    <div className={styles.featuredContent}>
                                        <div className={styles.category}>
                                            {featuredArticle.type === 'EXTERNAL' ? (
                                                <><LinkOutlined /> Bài viết liên kết</>
                                            ) : (
                                                <><FileTextOutlined /> Bài viết nội bộ</>
                                            )}
                                        </div>
                                        <h2 className={styles.featuredTitle}>
                                            <Link href={`/blog/${featuredArticle.id}`}>{featuredArticle.title}</Link>
                                        </h2>
                                        <RichText
                                            className={styles.featuredExcerpt}
                                            content={featuredArticle.description}
                                            clampLines={2}
                                        />
                                        <div className={styles.cardMeta}>
                                            <span><CalendarOutlined /> {formatDate(featuredArticle.createdAt)}</span>
                                        </div>
                                        <Link href={`/blog/${featuredArticle.id}`} className={styles.readMore}>
                                            Đọc tiếp <ArrowRightOutlined />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Blog Grid */}
                        {regularArticles.length > 0 && (
                            <>
                                <h3 className="mb-4">Bài viết mới nhất</h3>
                                <div className={styles.blogGrid}>
                                    {paginatedRegularArticles.map((article) => (
                                        <div key={article.id} className={styles.blogCard}>
                                            <div className={styles.cardImage}>
                                                <img
                                                    src={getImageUrl(article.thumbnail)}
                                                    alt={article.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        const img = e.target as HTMLImageElement;
                                                        img.src = getPlaceholderImage('Bài viết');
                                                    }}
                                                />
                                            </div>
                                            <div className={styles.cardContent}>
                                                <div className={styles.category} style={{ fontSize: '0.7rem' }}>
                                                    {article.type === 'EXTERNAL' ? (
                                                        <><LinkOutlined /> Liên kết</>
                                                    ) : (
                                                        <><FileTextOutlined /> Nội bộ</>
                                                    )}
                                                </div>
                                                <h4 className={styles.cardTitle}>
                                                    <Link href={`/blog/${article.id}`}>{article.title}</Link>
                                                </h4>
                                                <div className={styles.cardMeta}>
                                                    <span><CalendarOutlined /> {formatDate(article.createdAt)}</span>
                                                </div>
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
                    </>
                )}

                {/* Newsletter */}
                <div className={styles.newsletter}>
                    <h3>Đăng ký nhận bản tin</h3>
                    <p>Nhận những bài viết hay nhất được gửi trực tiếp vào email của bạn hàng tuần.</p>
                    <form className={styles.subscribeForm}>
                        <input type="email" placeholder="Nhập email của bạn..." className={styles.input} required />
                        <button type="submit" className={styles.subscribeBtn}>Đăng ký ngay</button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
