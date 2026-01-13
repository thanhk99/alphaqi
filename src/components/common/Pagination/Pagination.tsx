import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Logic to show truncated pagination with dots
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pages.map((page, index) => {
            if (page === '...') {
                return (
                    <span key={`dots-${index}`} className={styles.dots}>
                        ...
                    </span>
                );
            }

            return (
                <button
                    key={page}
                    className={`${styles.button} ${page === currentPage ? styles.active : ''}`}
                    onClick={() => onPageChange(page as number)}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className={styles.pagination}>
            <button
                className={styles.button}
                onClick={handlePrevious}
                disabled={currentPage === 1}
                aria-label="Previous page"
            >
                &lt;
            </button>
            {renderPageNumbers()}
            <button
                className={styles.button}
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-label="Next page"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;
