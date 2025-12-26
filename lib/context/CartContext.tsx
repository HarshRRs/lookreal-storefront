'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity?: number, variantId?: string) => void;
    removeFromCart: (productId: string, variantId?: string) => void;
    updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('lookreal-cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart from localStorage', e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('lookreal-cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantity: number = 1, variantId?: string) => {
        setCart((prevCart) => {
            const existingItemIndex = prevCart.findIndex(
                (item) => item.productId === product.id && item.variantId === variantId
            );

            if (existingItemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            }

            return [
                ...prevCart,
                {
                    productId: product.id,
                    variantId,
                    quantity,
                    priceSnapshot: product.salePrice || product.basePrice,
                    product // Include product details for easy access in cart UI
                },
            ];
        });
    };

    const removeFromCart = (productId: string, variantId?: string) => {
        setCart((prevCart) =>
            prevCart.filter((item) => !(item.productId === productId && item.variantId === variantId))
        );
    };

    const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
        if (quantity <= 0) {
            removeFromCart(productId, variantId);
            return;
        }

        setCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId && item.variantId === variantId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce(
        (total, item) => total + item.priceSnapshot * item.quantity,
        0
    );

    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
