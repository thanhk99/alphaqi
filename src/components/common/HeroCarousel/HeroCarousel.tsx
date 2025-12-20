'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRightOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './HeroCarousel.module.css';

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    buttonText: string;
    buttonLink: string;
}

const SLIDES: Slide[] = [
    {
        id: 1,
        title: 'Nền Tảng Đào Tạo Tài Chính Chuyên Nghiệp',
        subtitle: 'Trang bị kiến thức, kỹ năng và tư duy đầu tư bài bản. Đồng hành cùng bạn trên hành trình tự do tài chính bền vững.',
        image: 'url(/imgs/slide1.jpg)',
        buttonText: 'Khám phá khóa học',
        buttonLink: '/courses'
    },
    {
        id: 2,
        title: 'Học Từ Những Chuyên Gia Hàng Đầu',
        subtitle: 'Đội ngũ giảng viên là các Giám đốc đầu tư, chuyên gia phân tích từ các quỹ lớn như SSI, VinaCapital.',
        image: 'url(/imgs/slide2.jpg)',
        buttonText: 'Gặp gỡ chuyên gia',
        buttonLink: '#experts'
    },
    {
        id: 3,
        title: 'Lộ Trình Học Tập Cá Nhân Hóa',
        subtitle: 'Hệ thống AI phân tích năng lực và đề xuất lộ trình học tập tối ưu nhất cho riêng bạn.',
        image: 'url(/imgs/slide3.jpg)',
        buttonText: 'Tư vấn miễn phí',
        buttonLink: '/contact'
    }
];

const HeroCarousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Auto-scroll
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 50000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div className={styles.carousel}>
            <div
                className={styles.slidesContainer}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {SLIDES.map((slide) => (
                    <div
                        key={slide.id}
                        className={styles.slide}
                        style={{ backgroundImage: slide.image }}
                    >
                        <div className={styles.overlay}></div>
                        <div className={styles.container}>
                            <div className={styles.content}>
                                <h1 className={styles.title}>{slide.title}</h1>
                                <p className={styles.subtitle}>{slide.subtitle}</p>
                                <a href={slide.buttonLink} className={styles.button}>
                                    {slide.buttonText} <ArrowRightOutlined />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button className={`${styles.arrow} ${styles.prev}`} onClick={prevSlide}>
                <LeftOutlined />
            </button>
            <button className={`${styles.arrow} ${styles.next}`} onClick={nextSlide}>
                <RightOutlined />
            </button>

            {/* Dots */}
            <div className={styles.dots}>
                {SLIDES.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
