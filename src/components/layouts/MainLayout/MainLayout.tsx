import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FloatingSidebar from '../../common/FloatingSidebar/FloatingSidebar';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
            <FloatingSidebar />
        </div>
    );
};

export default MainLayout;
