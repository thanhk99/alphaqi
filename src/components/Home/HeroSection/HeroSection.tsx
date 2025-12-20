'use client';

import React from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    return (
        <section className={styles.hero}>
            <video
                className={styles.heroVideo}
                autoPlay
                muted
                loop
                playsInline
                poster="/imgs/dashboard-feature-16-9.png"
            >
                <source src="/videos/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </section>
    );
}
