import React from 'react';
import styles from './RichText.module.css';

interface RichTextProps {
    content: string;
    className?: string;
    clampLines?: number;
}

const RichText: React.FC<RichTextProps> = ({ content, className = '', clampLines }) => {
    const combinedClassName = [
        styles.richText,
        clampLines ? styles.clamped : '',
        className
    ].filter(Boolean).join(' ');

    const style = clampLines ? { '--line-clamp': clampLines } as React.CSSProperties : {};

    // Sanitize content: Replace non-breaking spaces with regular spaces to allow proper wrapping
    const sanitizedContent = content ? content.replace(/&nbsp;/g, ' ') : '';

    return (
        <div
            className={combinedClassName}
            style={style}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
    );
};

export default RichText;
