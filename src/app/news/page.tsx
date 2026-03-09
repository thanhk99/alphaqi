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

    const [newsList, setNewsList] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const backendPage = currentPage - 1;
                const response = await newsService.getAllNews(true, backendPage, ITEMS_PER_PAGE); 
                
                if (response && response.content) {
                    const filteredData = response.content.filter(news => news.type === 'NEWS');
                    setNewsList(filteredData);
                    setTotalPages(response.totalPages);
                } else {
                    setNewsList([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error('Failed to fetch news list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [currentPage]);

    // Client-side slice logic removed as we use server-side pagination
    const currentNewsList = newsList;

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
                ) : newsList.length > 0 ? (
                    <>
                        <div className={styles.newsGrid}>
                            {currentNewsList.map((news) => (
                                <NewsCard key={news.id} news={news} />
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
