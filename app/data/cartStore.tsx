import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product'

type CartState = {
    items: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addToCart: (product: Product) =>
                set((state: { items: Product[]; }) => ({ items: [...state.items, product]})),
            removeFromCart: (productId: string) => 
                set((state: { items: Product[]; }) => ({
                    items: state.items.filter((item: { id: string; }) => item.id !== productId)
                })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'furniture-cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useCartStore;