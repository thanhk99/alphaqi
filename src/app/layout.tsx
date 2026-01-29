import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/store/AuthContext";
import { CartProvider } from "@/store/CartContext";
import { NotificationProvider } from "@/store/NotificationContext";
import { Notification } from "@/components/common/Notification/Notification";

export const metadata: Metadata = {
  title: "AQi",
  description: "Nền tảng Quản lý Tài sản hàng đầu Việt Nam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <NotificationProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Notification />
            </CartProvider>
          </AuthProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
