'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { newsService } from '@/services/news.service';
import { News } from '@/types/news.types';
import RichText from '@/components/common/RichText/RichText';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './HomeSlider.module.css';

const HomeSlider = () => {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await newsService.getFeaturedNews();
                setNews(data);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <section className={styles.sliderContainer}>
                <h2 className={styles.sectionTitle}>Tin tức nổi bật</h2>
                <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải...</div>
            </section>
        );
    }

    if (news.length === 0) {
        return null; // Don't show section if no news
    }

    return (
        <section className={styles.sliderContainer}>
            <h2 className={styles.sectionTitle}>Tin tức nổi bật</h2>
            <Swiper
                spaceBetween={30}
                slidesPerView={1.5}
                centeredSlides={true}
                loop={news.length > 3}
                breakpoints={{
                    640: {
                        slidesPerView: 2.5,
                    },
                    960: {
                        slidesPerView: 3,
                    },
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                style={{ paddingBottom: '50px', paddingLeft: '5px', paddingRight: '5px' }}
            >
                {news.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link href={`/news/${item.id}`} className={styles.cardLink}>
                            <div className={styles.card}>
                                <div className={styles.cardImage}>
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        referrerPolicy="no-referrer"
                                    />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{item.title}</h3>
                                    <RichText content={item.description.replace(/<[^>]+>/g, '')} clampLines={2} className={styles.cardDescription} />
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HomeSlider;
