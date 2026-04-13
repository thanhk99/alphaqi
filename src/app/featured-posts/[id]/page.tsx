'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { ArrowLeftOutlined, CalendarOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './page.module.css';
import { featuredPostService } from '@/services/featured-post.service';
import { FeaturedPost } from '@/types/featured-post.types';
import { getImageUrl } from '@/utils/imageUtils';

export default function FeaturedPostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;

    const [post, setPost] = useState<FeaturedPost | null>(null);
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const data = await featuredPostService.getById(id);
                setPost(data);

                if (data.htmlUrl) {
                    const response = await fetch(data.htmlUrl);
                    if (response.ok) {
                        const html = await response.text();
                        setHtmlContent(html);
                    } else {
                        console.error('Failed to fetch HTML content');
                    }
                }
            } catch (err) {
                console.error('Error fetching featured post:', err);
                setError('Không thể tải bài viết. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

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
                    <div className={styles.loading}>Đang tải bài viết...</div>
                </div>
            </MainLayout>
        );
    }

    if (error || !post) {
        return (
            <MainLayout>
                <div className={styles.container}>
                    <div className={styles.error}>
                        <p>{error || 'Không tìm thấy bài viết.'}</p>
                        <Link href="/" className={styles.backLink}>
                            <ArrowLeftOutlined /> Quay lại trang chủ
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Link href="/" className={styles.backLink}>
                        <ArrowLeftOutlined /> Quay lại trang chủ
                    </Link>
                    <h1 className={styles.title}>{post.title}</h1>
                    <div className={styles.meta}>
                        <span><CalendarOutlined /> {formatDate(post.createdAt)}</span>
                    </div>
                </div>

                {post.thumbnail && !htmlContent.includes('<img') && (
                    <div className={styles.featuredImage}>
                        <img src={getImageUrl(post.thumbnail)} alt={post.title} />
                    </div>
                )}

                <div className={styles.content}>
                    {htmlContent ? (
                        <div 
                            dangerouslySetInnerHTML={{ __html: htmlContent }} 
                            className={styles.htmlContainer}
                        />
                    ) : (
                        <div className={styles.description}>
                            {post.description}
                            <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#666' }}>
                                Nội dung chi tiết bài viết đang được cập nhật...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
