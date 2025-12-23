'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import CourseCard from '@/components/common/CourseCard/CourseCard';
import styles from './page.module.css';
import { courseService } from '@/services/course.service';
import { Course, CourseCategory } from '@/types/course.types';

export default function CoursesPage() {
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<CourseCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        category: undefined as string | undefined,
        sort: 'newest'
    });

    useEffect(() => {
        fetchCategories();
        fetchAllCourses();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, allCourses]);

    const fetchCategories = async () => {
        try {
            const data = await courseService.getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchAllCourses = async () => {
        try {
            setLoading(true);
            // Fetch all published courses
            const data = await courseService.getCourses({
                published: true
            });
            setAllCourses(data);
            setCourses(data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            setAllCourses([]);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let result = [...allCourses];

        // Filter by search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            result = result.filter(course =>
                course.title.toLowerCase().includes(searchLower) ||
                course.description.toLowerCase().includes(searchLower)
            );
        }

        // Filter by category
        if (filters.category) {
            result = result.filter(course => course.category === filters.category);
        }

        // Sort
        switch (filters.sort) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'popular':
                result.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
                break;
            case 'price_asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                result.sort((a, b) => b.price - a.price);
                break;
        }

        setCourses(result);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (category: string) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category === category ? undefined : category
        }));
    };

    const handleSearchClick = () => {
        setFilters({ ...filters, search: searchTerm });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setFilters({ ...filters, search: searchTerm });
        }
    };

    return (
        <MainLayout>
            <div className={styles.coursesPage}>
                {/* Hero Section */}
                <div className={styles.hero}>
                    <div className="container">
                        <h1>Khám phá khóa học</h1>

                        {/* Search Bar */}
                        <div className={styles.searchBar}>
                            <SearchOutlined className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={handleSearch}
                                onKeyDown={handleKeyDown}
                            />
                            <button className={styles.searchButton} onClick={handleSearchClick}>Tìm kiếm</button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container">
                    <div className={styles.content}>
                        {/* Filters Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.filterSection}>
                                <h3><FilterOutlined /> Bộ lọc</h3>

                                <div className={styles.filterGroup}>
                                    <h4>Danh mục</h4>
                                    {categories.map((cat) => (
                                        <label key={cat.id} className={styles.checkbox}>
                                            <input
                                                type="checkbox"
                                                checked={filters.category === cat.name}
                                                onChange={() => handleCategoryChange(cat.name)}
                                            />
                                            <span>{cat.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Courses Grid */}
                        <main className={styles.main}>
                            <div className={styles.header}>
                                <h2>Tất cả khóa học</h2>
                                <select
                                    className={styles.sortSelect}
                                    value={filters.sort}
                                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                                >
                                    <option value="newest">Mới nhất</option>
                                    <option value="popular">Phổ biến nhất</option>
                                    <option value="price_asc">Giá thấp đến cao</option>
                                    <option value="price_desc">Giá cao đến thấp</option>
                                </select>
                            </div>

                            {loading ? (
                                <div>Loading...</div>
                            ) : (
                                <div className={styles.coursesGrid}>
                                    {courses.map((course) => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            )}

                            {/* Pagination - To be implemented with API data */}
                            <div className={styles.pagination}>
                                <button className={styles.pageButton}>« Trước</button>
                                <button className={`${styles.pageButton} ${styles.active}`}>1</button>
                                <button className={styles.pageButton}>Sau »</button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
