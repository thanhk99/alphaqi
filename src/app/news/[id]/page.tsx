'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { newsService } from '@/services/news.service';
import { News } from '@/types/news.types';
import RichText from '@/components/common/RichText/RichText';
import { CalendarOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styles from './page.module.css';

export default function NewsDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [article, setArticle] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                const id = params.id as string;
                const data = await newsService.getNewsById(id);
                setArticle(data);
            } catch (err) {
                console.error('Failed to fetch article:', err);
                setError('Không thể tải tin tức. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchArticle();
        }
    }, [params.id]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <MainLayout>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải tin tức...</p>
                </div>
            </MainLayout>
        );
    }

    if (error || !article) {
        return (
            <MainLayout>
                <div className={styles.errorContainer}>
                    <h2>Có lỗi xảy ra</h2>
                    <p>{error || 'Không tìm thấy tin tức'}</p>
                    <button onClick={() => router.push('/')} className={styles.backButton}>
                        <ArrowLeftOutlined /> Về trang chủ
                    </button>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className={styles.container}>
                <button onClick={() => router.back()} className={styles.backLink}>
                    <ArrowLeftOutlined /> Quay lại
                </button>

                <article className={styles.article}>
                    {/* Featured Image */}
                    {article.thumbnail && (
                        <div className={styles.featuredImage}>
                            <img
                                src={article.thumbnail}
                                alt={article.title}
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    )}

                    {/* Article Header */}
                    <header className={styles.header}>
                        <h1 className={styles.title}>{article.title}</h1>
                        <div className={styles.meta}>
                            <span className={styles.date}>
                                <CalendarOutlined /> {formatDate(article.createdAt)}
                            </span>
                            {article.updatedAt !== article.createdAt && (
                                <span className={styles.updated}>
                                    (Cập nhật: {formatDate(article.updatedAt)})
                                </span>
                            )}
                        </div>
                    </header>

                    {/* Article Content */}
                    <div className={styles.content}>
                        <RichText content={article.content || article.description} />
                    </div>
                </article>
            </div>
        </MainLayout>
    );
}
