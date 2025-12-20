import React, { ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = false, onClick }) => {
    const cardClass = [
        styles.card,
        hover ? styles.hover : '',
        onClick ? styles.clickable : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={cardClass} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;
