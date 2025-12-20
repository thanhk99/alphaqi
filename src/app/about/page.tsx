'use client';
import MainLayout from '@/components/layouts/MainLayout/MainLayout';
import {
    TeamOutlined,
    RiseOutlined,
    GlobalOutlined,
    BulbOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import styles from './page.module.css';

export default function AboutPage() {
    return (
        <MainLayout>
            <div className={styles.aboutPage}>
                {/* Hero */}
                <div className={styles.hero}>
                    <div className="container">
                        <h1 className={styles.heroTitle}>Về AlphaQi</h1>
                        <p className={styles.heroSubtitle}>
                            Đồng hành cùng bạn xây dựng và quản lý tài sản bền vững
                        </p>
                    </div>
                </div>

                {/* Story */}
                <section className={styles.section}>
                    <div className="container">
                        <div className={styles.storyGrid}>
                            <div className={styles.storyContent}>
                                <h3>Câu chuyện của chúng tôi</h3>
                                <p>
                                    Thành lập từ năm 2021, AlphaQi được xây dựng trên nền tảng chuyên môn và kỷ luật đầu tư đã được kiểm chứng từ 6P Capital Management – một định chế quản lý tài sản uy tín theo triết lý tăng trưởng giá trị bền vững. Người sáng lập, ông Nguyễn Minh Hạnh, có hơn 20 năm kinh nghiệm trong phân tích và đầu tư chứng khoán, trực tiếp quản lý danh mục cho các quỹ chuyên nghiệp hàng đầu Việt Nam, đồng thời đồng hành cùng hàng ngàn khách hàng giàu và siêu giàu trong hành trình xây dựng – bảo toàn – gia tăng tài sản qua nhiều chu kỳ thị trường.
                                </p>
                                <p>
                                    Việt Nam đang bước vào giai đoạn tăng tốc tích lũy của cải, và cùng lúc đó là nhu cầu ngày một rõ nét về quản trị gia sản và chuyển giao thế hệ giữa người sáng lập doanh nghiệp và các thế hệ kế thừa. AlphaQi lựa chọn vai trò đơn vị tiên phong mở lối, đồng hành cùng các nhà sáng lập gia tộc và người kế thừa, để di sản không chỉ được bảo toàn mà còn thịnh vượng hơn theo thời gian.
                                </p>
                                <p><strong>Với đội ngũ chuyên gia dày dạn kinh nghiệm trong:</strong></p>
                                <ul>
                                    <li>Phân tích đầu tư và cố vấn chiến lược danh mục</li>
                                    <li>Cố vấn Family Office / quản trị gia sản & cấu trúc tài sản</li>
                                    <li>Quản lý danh mục cho khách hàng giàu/siêu giàu và ủy thác cho định chế tài chính (bảo hiểm nhân thọ, phi nhân thọ)</li>
                                    <li>Quản lý quỹ mở, ETF, Private Equity, và dịch vụ theo chuẩn mực của Private Banker</li>
                                </ul>
                                <p>
                                    …chúng tôi cam kết mang đến các giải pháp minh bạch – kỷ luật – phù hợp mục tiêu, giúp bạn đi đúng lộ trình từ tích lũy, tối ưu dòng tiền, đầu tư hiệu quả đến tự do tài chính.
                                </p>
                                <p><strong>Nếu bạn đang tìm kiếm một đối tác đáng tin cậy để:</strong></p>
                                <ul>
                                    <li>Xây dựng chiến lược đầu tư theo mục tiêu và khẩu vị rủi ro</li>
                                    <li>Quản lý gia sản một cách hệ thống, chuẩn bị cho kế hoạch chuyển giao thế hệ</li>
                                    <li>Nâng cấp năng lực tài chính cá nhân/doanh nghiệp qua các chương trình đào tạo bài bản</li>
                                    <li>Ra quyết định đầu tư dựa trên phương pháp và dữ liệu, thay vì cảm tính</li>
                                </ul>
                                <p>
                                    …AlphaQi sẵn sàng đồng hành cùng bạn.
                                </p>
                                <p>
                                    Hãy bắt đầu bằng một buổi trao đổi định hướng, để chúng tôi hiểu mục tiêu của bạn và đề xuất lộ trình phù hợp: tư vấn đầu tư – quản lý gia sản – đào tạo tài chính & đầu tư, được thiết kế riêng cho từng giai đoạn và từng ưu tiên của bạn.
                                </p>
                            </div>
                            <div className={styles.storyImage}>
                                <img src="imgs/avt-Photoroom.png" alt="Our Story" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className={`${styles.section} ${styles.valuesSection}`}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Giá Trị Cốt Lõi</h2>
                        <div className={styles.valuesGrid}>
                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <RiseOutlined />
                                </div>
                                <h3>Quản lý Tài sản Bền vững</h3>
                                <p>
                                    Tập trung vào xây dựng giá trị dài hạn, không chạy theo lợi nhuận ngắn hạn mà bỏ qua rủi ro.
                                </p>
                            </div>
                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <GlobalOutlined />
                                </div>
                                <h3>Minh bạch & Trách nhiệm</h3>
                                <p>
                                    Đề cao đạo đức nghề nghiệp và trách nhiệm xã hội trong mọi hoạt động tư vấn và đào tạo.
                                </p>
                            </div>
                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <TeamOutlined />
                                </div>
                                <h3>Cá nhân hóa Giải pháp</h3>
                                <p>
                                    Mỗi khách hàng có mục tiêu riêng, chúng tôi thiết kế lộ trình phù hợp với từng nhu cầu cụ thể.
                                </p>
                            </div>
                            <div className={styles.valueCard}>
                                <div className={styles.valueIcon}>
                                    <BulbOutlined />
                                </div>
                                <h3>Giáo dục Thực tiễn</h3>
                                <p>
                                    Kết hợp kiến thức lý thuyết với kinh nghiệm thực tế từ thị trường để mang lại giá trị tốt nhất.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Leadership */}
                <section className={`${styles.section} ${styles.leaderSection}`}>
                    <div className="container">
                        <h2 className={styles.sectionTitle}>Ban Lãnh Đạo</h2>
                        <div className={styles.leaderCard}>
                            <div className={styles.leaderImage}>
                                <img src="/imgs/avt-Photoroom.png" alt="Nguyen Minh Hanh" />
                            </div>
                            <div className={styles.leaderInfo}>
                                <h3>Ông Nguyễn Minh Hạnh</h3>
                                <span className={styles.leaderRole}>Chairman, CEO & CIO</span>
                                <div className={styles.leaderBio}>
                                    <p>
                                        Ông Hạnh sở hữu 20 năm kinh nghiệm sâu rộng trong lĩnh vực quản lý quỹ và chứng khoán, với chuyên môn đa dạng từ quản lý danh mục đầu tư, phát triển sản phẩm quỹ, đến phân tích thị trường và tư vấn chiến lược tài chính.
                                    </p>
                                    <p>
                                        Trong gần 8 năm tại Công ty Quản lý Quỹ SSI (SSIAM), ông đảm nhiệm vai trò Giám đốc đầu tư, phụ trách các sản phẩm SSI Prestiges – dịch vụ ủy thác đầu tư cao cấp – đạt hiệu quả vượt trội, gấp 3 lần VN-Index trong cùng kỳ, đồng thời là kiến trúc sư của các bộ chỉ số ETF tiên phong tại Việt Nam. Ông còn quản lý trực tiếp 3 quỹ ETF hàng đầu (VNFIN LEAD, VNX50, VN30) cùng các danh mục bảo hiểm nhân thọ và phi nhân thọ, với tổng tài sản quản lý gần 200 triệu USD, đồng thời kiêm nhiệm vai trò Giám đốc phân tích, đảm bảo mọi quyết định đầu tư đều dựa trên phân tích thị trường vững chắc.
                                    </p>
                                    <p>
                                        Trước khi gia nhập SSIAM, ông là Giám đốc phân tích kiêm Giám đốc chỉ số chứng khoán tại PSI, nơi ông xây dựng nền tảng dữ liệu và chỉ số cho các sản phẩm đầu tư chuyên nghiệp. Ông Hạnh đã tham gia trực tiếp và dẫn dắt nhiều thương vụ IPO, M&A và tái cấu trúc quan trọng trên thị trường Việt Nam, bao gồm IPO Vinhomes 2018, tư vấn tái cấu trúc một công ty viễn thông di động, và hỗ trợ các doanh nghiệp trong các ngành vàng bạc, thép và bất động sản.
                                    </p>
                                    <p>
                                        Bên cạnh đó, ông đóng vai trò then chốt trong các dự án tư vấn chiến lược và huy động vốn của Công ty Cổ phần Bất động sản TasecoLand, từ việc tư vấn phát hành riêng lẻ, tìm kiếm nhà đầu tư chiến lược, đến hỗ trợ các hoạt động đầu tư trực tiếp và tư vấn IR cho các đợt phát hành, tư vấn M&A sắp tới. Ông cũng đang đảm nhiệm vai trò chủ chốt trong dự án SHB phát hành và tìm kiếm các đối tác phát hành riêng lẻ trong năm 2025-2026 hiện nay.
                                    </p>
                                    <p>
                                        Với bề dày kinh nghiệm và khả năng kết hợp phân tích tài chính, kiến thức thị trường và quản lý chiến lược, ông Hạnh được coi là một trong những chuyên gia đầu ngành về quản lý quỹ, cố vấn quản lý gia sản và tư vấn đầu tư tại Việt Nam.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className={styles.contactSection}>
                    <div className="container">
                        <div className={styles.contactGrid}>
                            <div className={styles.contactItem}>
                                <EnvironmentOutlined style={{ fontSize: '2rem', marginBottom: '16px' }} />
                                <h3>Địa chỉ</h3>
                                <p>Tầng 18, Tòa nhà 789, 147 Hoàng Quốc Việt, Nghĩa Đô, Cầu Giấy, Hà Nội</p>
                            </div>
                            <div className={styles.contactItem}>
                                <MailOutlined style={{ fontSize: '2rem', marginBottom: '16px' }} />
                                <h3>Email</h3>
                                <p>6pcapital@6p.com.vn</p>
                            </div>
                            <div className={styles.contactItem}>
                                <PhoneOutlined style={{ fontSize: '2rem', marginBottom: '16px' }} />
                                <h3>Hotline</h3>
                                <p>09xx xxx xxx</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
