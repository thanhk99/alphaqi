'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    CalendarOutlined,
    ShareAltOutlined,
    FacebookFilled,
    TwitterOutlined,
    LinkedinFilled,
    ArrowLeftOutlined,
    LinkOutlined,
    FileTextOutlined,
    ExportOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import styles from './page.module.css';
import { articleService } from '@/services/article.service';
import { Article } from '@/types/article.types';
import RichText from '@/components/common/RichText/RichText';

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params
    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;

    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await articleService.getArticleById(id);
                setArticle(data);
            } catch (err) {
                console.error('Error fetching article:', err);
                setError('Không thể tải bài viết. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    // Format date to Vietnamese format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <MainLayout>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p>Đang tải bài viết...</p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    if (error || !article) {
        return (
            <MainLayout>
                <div className={styles.container}>
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#ff4d4f' }}>
                        <p>{error || 'Không tìm thấy bài viết.'}</p>
                        <Link href="/blog" style={{ marginTop: '1rem', display: 'inline-block' }}>
                            <ArrowLeftOutlined /> Quay lại trang Blog
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // For EXTERNAL articles, redirect to the external link
    if (article.type === 'EXTERNAL' && article.link) {
        return (
            <MainLayout>
                <div className={styles.container}>
                    <div className="mb-4">
                        <Link href="/blog" className={styles.navLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
                            <ArrowLeftOutlined /> Quay lại trang Blog
                        </Link>
                    </div>

                    <div className={styles.header}>
                        <span className={styles.category}>
                            <LinkOutlined /> Bài viết liên kết
                        </span>
                        <h1 className={styles.title}>{article.title}</h1>
                        <div className={styles.meta}>
                            <span><CalendarOutlined /> {formatDate(article.createdAt)}</span>
                        </div>
                    </div>

                    {article.thumbnail && (
                        <div className={styles.featuredImage}>
                            <img src={article.thumbnail} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}

                    <div className={styles.content}>
                        <div dangerouslySetInnerHTML={{ __html: article.description }} />
                        <div style={{
                            marginTop: '2rem',
                            padding: '2rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '12px',
                            textAlign: 'center',
                            color: 'white'
                        }}>
                            <h3 style={{ marginBottom: '1rem', color: 'white' }}>Bài viết này được lưu trữ bên ngoài</h3>
                            <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                                Nhấn vào nút bên dưới để đọc toàn bộ bài viết tại nguồn gốc
                            </p>
                            <a
                                href={article.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '12px 24px',
                                    background: 'white',
                                    color: '#667eea',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Đọc bài viết đầy đủ <ExportOutlined />
                            </a>
                        </div>
                    </div>

                    <div className={styles.navigation}>
                        <div>
                            <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '5px' }}>Chia sẻ bài viết</p>
                            <div style={{ display: 'flex', gap: '15px', fontSize: '1.2rem', color: 'var(--blue-primary)' }}>
                                <FacebookFilled />
                                <TwitterOutlined />
                                <LinkedinFilled />
                                <ShareAltOutlined />
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    // For INTERNAL articles, display the content
    return (
        <MainLayout>
            <div className={styles.container}>
                <div className="mb-4">
                    <Link href="/blog" className={styles.navLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
                        <ArrowLeftOutlined /> Quay lại trang Blog
                    </Link>
                </div>

                <div className={styles.header}>
                    <span className={styles.category}>
                        <FileTextOutlined /> Bài viết nội bộ
                    </span>
                    <h1 className={styles.title}>{article.title}</h1>
                    <div className={styles.meta}>
                        <span><CalendarOutlined /> {formatDate(article.createdAt)}</span>
                    </div>
                </div>

                {article.thumbnail && (
                    <div className={styles.featuredImage}>
                        <img src={article.thumbnail} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                )}

                <div className={styles.content}>
                    <RichText content={article.content || article.description} />
                </div>

                <div className={styles.navigation}>
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '5px' }}>Chia sẻ bài viết</p>
                        <div style={{ display: 'flex', gap: '15px', fontSize: '1.2rem', color: 'var(--blue-primary)' }}>
                            <FacebookFilled />
                            <TwitterOutlined />
                            <LinkedinFilled />
                            <ShareAltOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
