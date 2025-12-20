'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '@/types/payment.types';
import { Course } from '@/types/course.types';

interface CartContextType {
    cart: Cart;
    addToCart: (course: Course) => void;
    removeFromCart: (courseId: string) => void;
    clearCart: () => void;
    isInCart: (courseId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Cart>({
        items: [],
        totalPrice: 0,
        totalItems: 0,
    });

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to load cart from localStorage', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const calculateTotals = (items: CartItem[]) => {
        const totalItems = items.length;
        const totalPrice = items.reduce((sum, item) => {
            return sum + (item.discountPrice || item.price);
        }, 0);

        return { totalItems, totalPrice };
    };

    const addToCart = (course: Course) => {
        setCart((prevCart) => {
            // Check if course already in cart
            if (prevCart.items.some((item) => item.courseId === course.id)) {
                return prevCart;
            }

            const newItem: CartItem = {
                courseId: course.id,
                course: course,
                price: course.price,
            };

            const newItems = [...prevCart.items, newItem];
            const { totalItems, totalPrice } = calculateTotals(newItems);

            return {
                items: newItems,
                totalItems,
                totalPrice,
            };
        });
    };

    const removeFromCart = (courseId: string) => {
        setCart((prevCart) => {
            const newItems = prevCart.items.filter((item) => item.courseId !== courseId);
            const { totalItems, totalPrice } = calculateTotals(newItems);

            return {
                items: newItems,
                totalItems,
                totalPrice,
            };
        });
    };

    const clearCart = () => {
        setCart({
            items: [],
            totalPrice: 0,
            totalItems: 0,
        });
    };

    const isInCart = (courseId: string): boolean => {
        return cart.items.some((item) => item.courseId === courseId);
    };

    const value: CartContextType = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
