import React from 'react';
import Link from 'next/link';
import { CalendarOutlined } from '@ant-design/icons';
import { News } from '@/types/news.types';
import RichText from '@/components/common/RichText/RichText';
import styles from './NewsCard.module.css';

interface NewsCardProps {
    news: News;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Link href={`/news/${news.id}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <img
                    src={news.thumbnail}
                    alt={news.title}
                    className={styles.image}
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className={styles.content}>
                <div className={styles.meta}>
                    <CalendarOutlined /> <span>{formatDate(news.createdAt)}</span>
                </div>
                <h3 className={styles.title}>{news.title}</h3>
                <RichText
                    content={news.description}
                    clampLines={3}
                    className={styles.description}
                />
            </div>
        </Link>
    );
};

export default NewsCard;
