import React from 'react';
import styles from './Loading.module.css';

interface LoadingProps {
    size?: 'small' | 'medium' | 'large';
    fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ size = 'medium', fullScreen = false }) => {
    if (fullScreen) {
        return (
            <div className={styles.fullScreen}>
                <div className={`${styles.spinner} ${styles[size]}`}></div>
            </div>
        );
    }

    return <div className={`${styles.spinner} ${styles[size]}`}></div>;
};

export default Loading;
