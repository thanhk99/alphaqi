'use client';

import React from 'react';
import Link from 'next/link';
import { TeamOutlined, StarFilled } from '@ant-design/icons';
import { Course } from '@/types/course.types';
import { getImageUrl } from '@/utils/imageUtils';
import RichText from '@/components/common/RichText/RichText';
import styles from './CourseCard.module.css';

interface CourseCardProps {
    course: Course;
    gradient?: string;
}

export default function CourseCard({ course, gradient }: CourseCardProps) {
    // Generate a gradient based on course category if not provided
    const getGradient = () => {
        if (gradient) return gradient;

        const gradients: { [key: string]: string } = {
            'Cá nhân': 'linear-gradient(45deg, #4481eb, #04befe)',
            'Doanh nghiệp': 'linear-gradient(45deg, #89f7fe, #66a6ff)',
            'Đầu tư': 'linear-gradient(45deg, #f093fb, #f5576c)',
        };

        return gradients[course.category] || 'linear-gradient(45deg, #667eea, #764ba2)';
    };

    return (
        <div className={styles.courseCard}>
            <div className={styles.courseImageWrapper}>
                {course.thumbnail ? (
                    <img
                        src={getImageUrl(course.thumbnail)}
                        alt={course.title}
                        className={styles.courseImage}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div
                        className={styles.courseImagePlaceholder}
                        style={{ background: getGradient() }}
                    ></div>
                )}
                <span className={styles.courseCategory}>{course.category}</span>
            </div>
            <div className={styles.courseContent}>
                <h3 className={styles.courseTitle}>{course.title}</h3>
                <RichText
                    content={course.description}
                    clampLines={2}
                    className={styles.courseDescription}
                />
                <div className={styles.courseMeta}>
                    <span><TeamOutlined /> {course.enrollmentCount.toLocaleString()} học viên</span>
                    <span><StarFilled style={{ color: '#fadb14' }} /> {course.averageRating.toFixed(1)}</span>
                </div>
                <div className={styles.coursePrice}>
                    <span className={styles.priceCurrent}>
                        {course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString('vi-VN')}₫`}
                    </span>
                </div>
                <Link href={`/courses/${course.id}`} className={styles.courseButton}>
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
}
