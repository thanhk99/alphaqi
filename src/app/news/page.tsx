'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { newsService } from '@/services/news.service';
import { News } from '@/types/news.types';
import NewsCard from '@/components/common/NewsCard/NewsCard';
import Pagination from '@/components/common/Pagination/Pagination';
import styles from './page.module.css';

const ITEMS_PER_PAGE = 6;

export default function NewsListPage() {
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const [articles, setArticles] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const response = await newsService.getAllNews({
                    published: true,
                    page: currentPage - 1,
                    size: ITEMS_PER_PAGE
                });
                
                if (response && response.content) {
                    setArticles(response.content);
                    setTotalPages(response.totalPages);
                } else {
                    setArticles([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error('Failed to fetch news list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [currentPage]);

    // Client-side slice logic removed as we use server-side pagination
    const currentArticles = articles;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                ) : articles.length > 0 ? (
                    <>
                        <div className={styles.newsGrid}>
                            {currentArticles.map((newsItem) => (
                                <NewsCard key={newsItem.id} news={newsItem} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                ) : (
                    <div className={styles.emptyState}>
                        <p>Hiện tại chưa có tin tức nào được đăng tải.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
