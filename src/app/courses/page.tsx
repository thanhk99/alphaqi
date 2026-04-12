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
        sort: 'updatedAt,desc',
        page: 0,
        size: 12
    });
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchAllCourses();
    }, [filters.category, filters.search, filters.sort, page]);

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
            const response = await courseService.getCourses({
                published: true,
                category: filters.category,
                search: filters.search,
                sort: filters.sort,
                page: page - 1,
                size: filters.size
            });
            
            if (response && response.content) {
                setAllCourses(response.content);
                setTotalPages(response.totalPages);
            } else {
                setAllCourses([]);
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            setAllCourses([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    // We no longer need useMemo for filteredCourses as we fetch from server
    const displayCourses = allCourses;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (category: string) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category === category ? undefined : category
        }));
        setPage(1);
    };

    const handleSearchClick = () => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
        setPage(1);
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
                                    onChange={(e) => {
                                        setFilters({ ...filters, sort: e.target.value });
                                        setPage(1);
                                    }}
                                >
                                    <option value="updatedAt,desc">Mới nhất</option>
                                    <option value="reviewCount,desc">Phổ biến nhất</option>
                                    <option value="price,asc">Giá thấp đến cao</option>
                                    <option value="price,desc">Giá cao đến thấp</option>
                                </select>
                            </div>

                            {loading ? (
                                <div className={styles.loadingWrapper}>Đang tải khóa học...</div>
                            ) : (
                                <>
                                        <div className={styles.coursesGrid}>
                                            {displayCourses.length > 0 ? (
                                                displayCourses.map((course) => (
                                                    <CourseCard key={course.id} course={course} />
                                                ))
                                            ) : (
                                                <div className={styles.noResults}>
                                                    Không tìm thấy khóa học nào phù hợp.
                                                </div>
                                            )}
                                        </div>
                                </>
                            )}

                            {/* Pagination - To be implemented with API data */}
                            <div className={styles.pagination}>
                                <button 
                                    className={styles.pageButton} 
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >
                                    « Trước
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button 
                                        key={p}
                                        className={`${styles.pageButton} ${page === p ? styles.active : ''}`}
                                        onClick={() => setPage(p)}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button 
                                    className={styles.pageButton}
                                    disabled={page === totalPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Sau »
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
