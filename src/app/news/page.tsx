'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { newsService } from '@/services/news.service';
import { News } from '@/types/news.types';
import NewsCard from '@/components/common/NewsCard/NewsCard';
import styles from './page.module.css';

export default function NewsListPage() {
    const [newsList, setNewsList] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await newsService.getAllNews(true); // Get only published news
                setNewsList(data);
            } catch (error) {
                console.error('Failed to fetch news list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <MainLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Tin tức</h1>
                    <p className={styles.subtitle}>Cập nhật những thông tin mới nhất từ AlphaQi</p>
                </header>

                {loading ? (
                    <div className={styles.loadingWrapper}>
                        <div className={styles.spinner}></div>
                        <p>Đang tải danh sách tin tức...</p>
                    </div>
                ) : newsList.length > 0 ? (
                    <div className={styles.newsGrid}>
                        {newsList.map((news) => (
                            <NewsCard key={news.id} news={news} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <p>Hiện tại chưa có tin tức nào được đăng tải.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
