'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/store/AuthContext';
import { useCart } from '@/store/CartContext';
import Button from '@/components/common/Button/Button';
import {
    ShoppingCartOutlined,
    UserOutlined,
    DashboardOutlined,
    BookOutlined,
    ProfileOutlined,
    ShoppingOutlined,
    LogoutOutlined,
    MenuOutlined,
    CloseOutlined,
    DownOutlined
} from '@ant-design/icons';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { cart } = useCart();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const toggleDropdown = (name: string, e: React.MouseEvent) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            setActiveDropdown(activeDropdown === name ? null : name);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}>
                        <img src="/imgs/profile 1.png" alt="AlphaQi" />
                    </span>
                </Link>

                <button
                    className={styles.mobileMenuButton}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                </button>

                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
                    <Link href="/courses" className={styles.navLink}>
                        Khóa học
                    </Link>

                    <div className={`${styles.navItemDropdownWrapper} ${activeDropdown === 'reports' ? styles.dropdownVisible : ''}`}>
                        <Link
                            href="/reports"
                            className={styles.navLink}
                            onClick={(e) => toggleDropdown('reports', e)}
                        >
                            Báo cáo <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                        </Link>
                        <div className={styles.navDropdown}>
                            <Link href="/reports/macro" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Báo cáo vĩ mô
                            </Link>
                            <Link href="/reports/strategy" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Báo cáo chiến lược đầu tư
                            </Link>
                            <Link href="/reports/industry" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Báo cáo công ty, nghành
                            </Link>
                            <Link href="/reports/asset-management" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Báo cáo quản lý tài sản
                            </Link>
                        </div>
                    </div>

                    <div className={`${styles.navItemDropdownWrapper} ${activeDropdown === 'services' ? styles.dropdownVisible : ''}`}>
                        <Link
                            href="/services"
                            className={styles.navLink}
                            onClick={(e) => toggleDropdown('services', e)}
                        >
                            Dịch vụ tổ chức/Cá nhân <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                        </Link>
                        <div className={styles.navDropdown}>
                            <Link href="/services" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Tư vấn đầu tư
                            </Link>
                            <Link href="/services" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Tư vấn quản lý gia sản
                            </Link>
                        </div>
                    </div>

                    <div className={`${styles.navItemDropdownWrapper} ${activeDropdown === 'news' ? styles.dropdownVisible : ''}`}>
                        <Link
                            href="/news"
                            className={styles.navLink}
                            onClick={(e) => toggleDropdown('news', e)}
                        >
                            Tin tức & Blog <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                        </Link>
                        <div className={styles.navDropdown}>
                            <Link href="/news" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Tin tức
                            </Link>
                            <Link href="/blog" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Blog
                            </Link>
                        </div>
                    </div>

                    <div className={`${styles.navItemDropdownWrapper} ${activeDropdown === 'about' ? styles.dropdownVisible : ''}`}>
                        <Link
                            href="/about"
                            className={styles.navLink}
                            onClick={(e) => toggleDropdown('about', e)}
                        >
                            Về AlphaQi <DownOutlined style={{ fontSize: '10px', marginLeft: '4px' }} />
                        </Link>
                        <div className={styles.navDropdown}>
                            <Link href="/about" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Giới thiệu
                            </Link>
                            <Link href="/contact" className={styles.navDropdownItem} onClick={() => setMobileMenuOpen(false)}>
                                Liên hệ
                            </Link>
                        </div>
                    </div>
                </nav>

                <div className={styles.actions}>
                    {isAuthenticated ? (
                        <>
                            <Link href="/cart" className={styles.cartButton}>
                                <ShoppingCartOutlined style={{ fontSize: '20px' }} />
                                {cart.totalItems > 0 && (
                                    <span className={styles.cartBadge}>{cart.totalItems}</span>
                                )}
                            </Link>
                            <div className={styles.userMenu}>
                                <button className={styles.userButton}>
                                    <span className={styles.userAvatar}>
                                        {(user?.avatar || (user as any)?.avatarUrl) ? (
                                            <img
                                                src={user?.avatar || (user as any)?.avatarUrl}
                                                alt={user?.fullName}
                                                className={styles.avatarImage}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                    const icon = document.createElement('span');
                                                    icon.className = 'anticon anticon-user';
                                                    (e.target as HTMLImageElement).parentElement!.appendChild(icon);
                                                }}
                                            />
                                        ) : (
                                            <UserOutlined />
                                        )}
                                    </span>
                                    <span className={styles.userName}>{user?.fullName}</span>
                                </button>
                                <div className={styles.dropdown}>
                                    <Link href="/dashboard" className={styles.dropdownItem}>
                                        <DashboardOutlined /> Dashboard
                                    </Link>
                                    <Link href="/dashboard/my-courses" className={styles.dropdownItem}>
                                        <BookOutlined /> Khóa học của tôi
                                    </Link>
                                    <Link href="/dashboard/profile" className={styles.dropdownItem}>
                                        <ProfileOutlined /> Hồ sơ
                                    </Link>
                                    <Link href="/dashboard/orders" className={styles.dropdownItem}>
                                        <ShoppingOutlined /> Đơn hàng
                                    </Link>
                                    <hr className={styles.divider} />
                                    <button onClick={handleLogout} className={styles.dropdownItem}>
                                        <LogoutOutlined /> Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                size="small"
                                href={`/auth/login?redirect=${encodeURIComponent(pathname)}`}
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                variant="primary"
                                size="small"
                                href="/auth/register"
                            >
                                Đăng ký
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
