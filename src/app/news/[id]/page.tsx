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
    const [news, setNews] = useState<News | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const id = params.id as string;
                const data = await newsService.getNewsById(id);
                setNews(data);
            } catch (err) {
                console.error('Failed to fetch news:', err);
                setError('Không thể tải tin tức. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchNews();
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

    if (error || !news) {
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
                    {news.thumbnail && (
                        <div className={styles.featuredImage}>
                            <img
                                src={news.thumbnail}
                                alt={news.title}
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    )}

                    {/* Article Header */}
                    <header className={styles.header}>
                        <h1 className={styles.title}>{news.title}</h1>
                        <div className={styles.meta}>
                            <span className={styles.date}>
                                <CalendarOutlined /> {formatDate(news.createdAt)}
                            </span>
                            {news.updatedAt !== news.createdAt && (
                                <span className={styles.updated}>
                                    (Cập nhật: {formatDate(news.updatedAt)})
                                </span>
                            )}
                        </div>
                    </header>

                    {/* Article Content */}
                    <div className={styles.content}>
                        <RichText content={news.content || news.description} />
                    </div>
                </article>
            </div>
        </MainLayout>
    );
}
