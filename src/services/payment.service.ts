import { apiService } from './api.service';
import {
    Order,
    CreateOrderRequest,
    CreateOrderResponse,
} from '@/types/payment.types';
import { PaginatedResponse } from '@/types/api.types';

export const paymentService = {
    // Create order
    createOrder: async (orderData: CreateOrderRequest): Promise<CreateOrderResponse> => {
        const response = await apiService.post<CreateOrderResponse>('/orders', orderData);
        return response.data.data;
    },

    // Get order by ID
    getOrderById: async (orderId: string): Promise<Order> => {
        const response = await apiService.get<Order>(`/orders/${orderId}`);
        return response.data.data;
    },

    // Get user's order history
    getOrderHistory: async (page = 0, size = 10): Promise<PaginatedResponse<Order>> => {
        const response = await apiService.get<PaginatedResponse<Order>>(
            `/orders/my-orders?page=${page}&size=${size}`
        );
        return response.data.data;
    },

    // Process payment
    processPayment: async (orderId: string, paymentData: unknown): Promise<Order> => {
        const response = await apiService.post<Order>(
            `/orders/${orderId}/payment`,
            paymentData
        );
        return response.data.data;
    },

    // Verify payment (for callback from payment gateway)
    verifyPayment: async (orderId: string, transactionId: string): Promise<Order> => {
        const response = await apiService.post<Order>(`/orders/${orderId}/verify`, {
            transactionId,
        });
        return response.data.data;
    },

    // Cancel order
    cancelOrder: async (orderId: string): Promise<void> => {
        await apiService.post(`/orders/${orderId}/cancel`);
    },
};
