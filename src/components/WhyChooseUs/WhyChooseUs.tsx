'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
    const services = [
        {
            id: 1,
            title: 'Báo cáo CIO',
            description: 'Phân tích chuyên sâu từ Giám đốc Đầu tư về xu hướng thị trường và cơ hội đầu tư.',
            color: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
            link: '/reports/cio'
        },
        {
            id: 2,
            title: 'Báo cáo vĩ mô ',
            description: 'Báo cáo vĩ mô là một trong những dịch vụ chính của chúng tôi, cung cấp thông tin chi tiết về thị trường chứng khoán và các xu hướng tài chính.',
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            link: '/reports/macro'
        },
        {
            id: 3,
            title: 'Báo cáo chiến lược đầu tư ',
            description: 'Báo cáo chiến lược đầu tư là một trong những dịch vụ chính của chúng tôi, cung cấp thông tin chi tiết về thị trường chứng khoán và các xu hướng tài chính.',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            link: '/reports/strategy'
        },
        {
            id: 4,
            title: 'Báo cáo công ty , ngành',
            description: 'Báo cáo công ty, ngành là một trong những dịch vụ chính của chúng tôi, cung cấp thông tin chi tiết về thị trường chứng khoán và các xu hướng tài chính.',
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            link: '/reports/industry'
        },
        {
            id: 5,
            title: 'Báo cáo quản lý tài sản ',
            description: 'Báo cáo quản lý tài sản là một trong những dịch vụ chính của chúng tôi, cung cấp thông tin chi tiết về thị trường chứng khoán và các xu hướng tài chính.',
            color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            link: '/reports/asset-management'
        }
    ];

    return (
        <section className={styles.whyChooseUsContainer}>
            <h2 className={styles.sectionTitle}>Báo cáo</h2>

            <div style={{ position: 'relative' }}>
                {/* Custom Navigation Buttons */}
                <div className={styles.navigationWrapper}>
                    <div className={`swiper-button-prev-custom ${styles.navButton}`}>
                        <LeftOutlined />
                    </div>
                    <div className={`swiper-button-next-custom ${styles.navButton}`}>
                        <RightOutlined />
                    </div>
                </div>

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
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                    style={{ paddingBottom: '50px', paddingLeft: '5px', paddingRight: '5px' }}
                >
                    {services.map((service) => (
                        <SwiperSlide key={service.id}>
                            <a href={service.link} className={styles.cardLink}>
                                <div className={styles.serviceCard}>
                                    <div className={styles.cardInner}>
                                        <div
                                            className={styles.serviceImage}
                                            style={{ backgroundImage: service.color }}
                                        />
                                        <div className={styles.serviceContent}>
                                            <h3 className={styles.serviceTitle}>{service.title}</h3>
                                            <p className={styles.serviceDescription}>{service.description}</p>
                                            <span className={styles.learnMoreLink}>
                                                TÌM HIỂU THÊM →
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.cardTitle}>{service.title}</div>
                                </div>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default WhyChooseUs;
