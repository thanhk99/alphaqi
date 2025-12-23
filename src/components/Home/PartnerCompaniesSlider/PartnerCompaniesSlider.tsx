'use client';

import React, { useState, useEffect } from 'react';
import styles from './PartnerCompaniesSlider.module.css';
import { PartnerCompany } from '@/types/partnerCompany.types';
import partnerCompanyService from '@/services/partnerCompany.service';
import { getImageUrl } from '@/utils/imageUtils';

export default function PartnerCompaniesSlider() {
    const [partners, setPartners] = useState<PartnerCompany[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                setLoading(true);
                const data = await partnerCompanyService.getPartnerCompanies();
                setPartners(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch partner companies:', err);
                setError('Không thể tải danh sách đối tác');
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    if (loading) {
        return (
            <section className={styles.sliderWrapper}>
                <div className={styles.loadingState}>
                    <p>Đang tải đối tác...</p>
                </div>
            </section>
        );
    }

    if (error || partners.length === 0) {
        return null;
    }

    // Duplicate for marquee effect
    const doublePartners = [...partners, ...partners];

    return (
        <section className={styles.sliderWrapper}>
            <h2 className={styles.sectionTitle}>Đối tác tin cậy</h2>
            <div className={styles.marquee}>
                <div className={styles.marqueeContent}>
                    {doublePartners.map((partner, index) => (
                        <div key={`${partner.id}-${index}`} className={styles.partnerCard}>
                            <div className={styles.logoWrapper}>
                                <img
                                    src={getImageUrl(partner.logo)}
                                    alt={partner.name}
                                    onError={(e) => {
                                        const img = e.target as HTMLImageElement;
                                        img.src = '/placeholder-logo.png'; // Fallback
                                        img.style.display = 'none'; // Alternative: hide image and show text
                                    }}
                                />
                            </div>
                            <span className={styles.partnerName}>{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
