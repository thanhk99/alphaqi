// Payment & Order Types
export interface Cart {
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
}

export interface CartItem {
    courseId: string;
    course: Course;
    price: number;
    discountPrice?: number;
}

export interface Order {
    id: string;
    userId: string;
    orderNumber: string;
    items: OrderItem[];
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    createdAt: string;
    updatedAt: string;
    paidAt?: string;
}

export interface OrderItem {
    id: string;
    orderId: string;
    courseId: string;
    courseName: string;
    price: number;
    discountPrice?: number;
}

export enum PaymentMethod {
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    PAYPAL = 'PAYPAL',
    BANK_TRANSFER = 'BANK_TRANSFER',
    VNPAY = 'VNPAY',
    MOMO = 'MOMO'
}

export enum PaymentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
}

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export interface CreateOrderRequest {
    courseIds: string[];
    paymentMethod: PaymentMethod;
}

export interface CreateOrderResponse {
    order: Order;
    paymentUrl?: string; // For redirect-based payments
}

// Import Course type
import { Course } from './course.types';
