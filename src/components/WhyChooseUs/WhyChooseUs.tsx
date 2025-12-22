'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
    const services = [
        {
            id: 1,
            title: 'Báo cáo vĩ mô ',
            description: 'Báo cáo vĩ mô là một trong những dịch vụ chính của chúng tôi, cung cấp thông tin chi tiết về thị trường chứng khoán và các xu hướng tài chính.',
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 2,
            title: 'Báo cáo chiến lược đầu tư ',
            description: 'Báo cáo chiến lược đầu tư là một trong những dịch vụ chính của chúng tôi, cung cấp thông tin chi tiết về thị trường chứng khoán và các xu hướng tài chính.',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 3,
            title: 'Báo cáo công ty , ngành',
            description: 'Báo cáo công ty, ngành là một trong những dịch vụ chính của chúng tôi, cung cấp thông tin chi tiết về thị trường chứng khoán và các xu hướng tài chính.',
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },
        {
            id: 4,
            title: 'Báo cáo quản lý tài sản ',
            description: 'Báo cáo quản lý tài sản là một trong những dịch vụ chính của chúng tôi, cung cấp thông tin chi tiết về thị trường chứng khoán và các xu hướng tài chính.',
            color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        }
    ];

    return (
        <section className={styles.whyChooseUsContainer}>
            <h2 className={styles.sectionTitle}>Báo cáo</h2>
            <Swiper
                spaceBetween={30}
                slidesPerView={1.2}
                centeredSlides={false}
                loop={false}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    960: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    }
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
                {services.map((service) => (
                    <SwiperSlide key={service.id}>
                        <div className={styles.serviceCard}>
                            <div className={styles.cardInner}>
                                <div
                                    className={styles.serviceImage}
                                    style={{ backgroundImage: service.color }}
                                />
                                <div className={styles.serviceContent}>
                                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                                    <p className={styles.serviceDescription}>{service.description}</p>
                                    <a href="#" className={styles.learnMoreLink}>
                                        TÌM HIỂU THÊM →
                                    </a>
                                </div>
                            </div>
                            <div className={styles.cardTitle}>{service.title}</div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default WhyChooseUs;
