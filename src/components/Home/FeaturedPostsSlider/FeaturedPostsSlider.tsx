'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { featuredPostService } from '@/services/featured-post.service';
import { FeaturedPost } from '@/types/featured-post.types';
import { getImageUrl } from '@/utils/imageUtils';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './FeaturedPostsSlider.module.css';

const FeaturedPostsSlider = () => {
    const [posts, setPosts] = useState<FeaturedPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await featuredPostService.getActivePosts();
                console.log('Featured Posts Data:', data);
                setPosts(data || []);
            } catch (error) {
                console.error('Failed to fetch featured posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <section className={styles.sectionWrapper}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Bài viết nổi bật</h2>
                    <div className={styles.loading}>Đang tải...</div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.sectionWrapper}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Bài viết nổi bật</h2>
                {loading ? (
                    <div className={styles.loading}>Đang tải...</div>
                ) : posts.length === 0 ? (
                    <div className={styles.loading}>
                        Chưa có bài viết nổi bật nào được xuất bản.
                    </div>
                ) : (
                    <div className={styles.sliderContainer}>
                        <Swiper
                            spaceBetween={24}
                            slidesPerView={1}
                            loop={posts.length > 3}
                            autoplay={{
                                delay: 4000,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                                bulletActiveClass: styles.bulletActive
                            }}
                            navigation={{
                                nextEl: `.${styles.navNext}`,
                                prevEl: `.${styles.navPrev}`,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                            className={styles.swiper}
                        >
                            {posts.map((post) => (
                                <SwiperSlide key={post.id}>
                                    <Link href={`/featured-posts/${post.id}`} className={styles.card}>
                                        <div className={styles.imageWrapper}>
                                            <img
                                                src={getImageUrl(post.thumbnail)}
                                                alt={post.title}
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                        <div className={styles.content}>
                                            <h3 className={styles.title}>{post.title}</h3>
                                            <p className={styles.description}>
                                                {post.description}
                                            </p>
                                            <div className={styles.footer}>
                                                <span>Xem chi tiết</span>
                                                <span className={styles.arrow}>→</span>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        
                        <button className={`${styles.navBtn} ${styles.navPrev}`}>❮</button>
                        <button className={`${styles.navBtn} ${styles.navNext}`}>❯</button>
                    </div>
                )}
            </div>
        </section>
    );
}
;

export default FeaturedPostsSlider;
