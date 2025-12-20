'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import CourseCard from '@/components/common/CourseCard/CourseCard';
import { courseService } from '@/services/course.service';
import { Course } from '@/types/course.types';
import styles from './CoursesSection.module.css';

export default function CoursesSection() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseService.getHomeCourses();
                setCourses(data);
            } catch (error) {
                console.error('Failed to fetch home courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return null;
    }

    if (courses.length === 0) {
        return null;
    }

    return (
        <section className={styles.coursesSection}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className={styles.sectionTitle}>Lộ trình Quản lý Tài sản Toàn diện</h2>
                    <p className={styles.sectionSubtitle}>
                        Từ tiết kiệm thông minh đến đầu tư bền vững - Xây dựng tương lai tài chính vững chắc
                    </p>
                </div>

                <div className={styles.courseGrid}>
                    {courses.map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                <div className="text-center mt-5">
                    <a href="/courses" className={styles.viewMoreButton}>Xem tất cả khóa học <ArrowRightOutlined /></a>
                </div>
            </div>
        </section>
    );
}
