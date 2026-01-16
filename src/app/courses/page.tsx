'use client';

import React, { useEffect, useState, useMemo } from 'react';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import CourseCard from '@/components/common/CourseCard/CourseCard';
import styles from './page.module.css';
import { courseService } from '@/services/course.service';
import { Course, CourseCategory } from '@/types/course.types';

export default function CoursesPage() {
    const [allCourses, setAllCourses] = useState<Course[]>([]);
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

    const fetchCategories = async () => {
        try {
            const data = await courseService.getCategories();
            if (data) setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const fetchAllCourses = async () => {
        try {
            setLoading(true);
            const data = await courseService.getCourses({
                published: true
            });
            if (data) setAllCourses(data);
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            setAllCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = useMemo(() => {
        let result = [...allCourses];

        // Filter by search
        if (filters.search) {
            const searchLower = filters.search.toLowerCase().normalize('NFC');
            result = result.filter(course => {
                const title = (course.title || '').toLowerCase().normalize('NFC');
                const desc = (course.description || '').toLowerCase().normalize('NFC');
                return title.includes(searchLower) || desc.includes(searchLower);
            });
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
                result.sort((a, b) => (b.enrollmentCount || 0) - (a.enrollmentCount || 0));
                break;
            case 'price_asc':
                result.sort((a, b) => (a.price || 0) - (b.price || 0));
                break;
            case 'price_desc':
                result.sort((a, b) => (b.price || 0) - (a.price || 0));
                break;
        }

        return result;
    }, [filters, allCourses]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (category: string) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category === category ? undefined : category
        }));
    };

    const handleSearchClick = () => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
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
                        <div className={styles.searchBar} key="course-search-bar">
                            <SearchOutlined className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyUp={handleKeyUp}
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
                                                checked={filters.category === cat.id}
                                                onChange={() => handleCategoryChange(cat.id)}
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
                                <div className={styles.loadingWrapper}>Đang tải khóa học...</div>
                            ) : (
                                <>
                                    {!filters.category && !filters.search ? (
                                        // Group by Category View
                                        categories.map((cat) => {
                                            const catCourses = filteredCourses.filter(c => c.category === cat.id);
                                            if (catCourses.length === 0) return null;
                                            return (
                                                <div key={cat.id} className={styles.categorySection}>
                                                    <h3 className={styles.categoryTitle}>{cat.name}</h3>
                                                    <div className={styles.coursesGrid}>
                                                        {catCourses.map((course) => (
                                                            <CourseCard key={course.id} course={course} />
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        // Filtered View
                                        <div className={styles.coursesGrid}>
                                            {filteredCourses.length > 0 ? (
                                                filteredCourses.map((course) => (
                                                    <CourseCard key={course.id} course={course} />
                                                ))
                                            ) : (
                                                <div className={styles.noResults}>
                                                    Không tìm thấy khóa học nào phù hợp.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </>
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
