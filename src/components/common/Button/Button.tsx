import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
    fullWidth?: boolean;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    fullWidth = false,
    disabled,
    className = '',
    href,
    ...props
}) => {
    const buttonClass = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        isLoading ? styles.loading : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (href) {
        return (
            <Link href={href} className={buttonClass}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={buttonClass}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className={styles.spinner}></span>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
