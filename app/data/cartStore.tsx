import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product'

export interface CartItem {
    product: Product;
    quantity: number;
}

type CartState = {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    incrementQuantity: (productId: string) => void;
    decrementQuantity: (productId: string) => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addToCart: (product) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (item) => item.product.id === product.id
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((item) =>
                                item.product.id === product.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }
                    return {
                        items: [...state.items, { product, quantity: 1 }],
                    };
                }),
            removeFromCart: (productId) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.product.id !== productId
                    ),
                })),
            clearCart: () => set({ items: [] }),
            incrementQuantity: (productId) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.product.id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                })),
            decrementQuantity: (productId) =>
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.product.id === productId) {
                            const newQuantity = item.quantity - 1;
                            if (newQuantity <= 0) {
                                return null;
                            }
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    }).filter(Boolean) as CartItem[],
                })),
        }),
        {
            name: 'furniture-cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useCartStore;