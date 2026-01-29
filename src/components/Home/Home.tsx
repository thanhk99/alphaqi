'use client';

import React from 'react';
import HeroSection from './HeroSection/HeroSection';
import StatsSection from './StatsSection/StatsSection';
import ServicesNavSection from './ServicesNavSection/ServicesNavSection';
import HomeSlider from '../HomeSlider/HomeSlider';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import CoursesSection from './CoursesSection/CoursesSection';
import FeaturesSection from './FeaturesSection/FeaturesSection';
import ExpertSection from './ExpertSection/ExpertSection';
import ExpertReviewsSlider from './ExpertReviewsSlider/ExpertReviewsSlider';
import PartnerCompaniesSlider from './PartnerCompaniesSlider/PartnerCompaniesSlider';
import CTASection from './CTASection/CTASection';

export default function Home() {
    return (
        <>
            <HeroSection />
            <StatsSection />
            <ServicesNavSection />
            <CoursesSection />
            <HomeSlider />
            <WhyChooseUs />

            <FeaturesSection />
            <ExpertReviewsSlider />
            <PartnerCompaniesSlider />
            <ExpertSection />
            <CTASection />
        </>
    );
}
