import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/product'

export interface CustomizationData {
    analysis?: any;
    customSelections?: Record<string, string>;
    generatedImage?: string | null;
    generatedRoomImage?: string | null;
}
  
export interface CartItem {
    product: Product;
    quantity: number;
    customization?: CustomizationData;
}

type CartState = {
    items: CartItem[];
    addToCart: (product: Product, customization?: CustomizationData) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    reset: () => void;
};  

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addToCart: (product, customization) =>
              set((state) => {
                const existingItem = state.items.find(
                    (item) => 
                        item.product._id === product._id &&
                        JSON.stringify(item.customization) === JSON.stringify(customization)
                );
                
                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                        item === existingItem
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        ),
                    };
                }
                
                return {
                  items: [...state.items, { product, quantity: 1, customization }],
                };
            }),
            removeFromCart: (productId) =>
                set((state) => ({
                    items: state.items.filter(
                        (item) => item.product._id !== productId
                    ),
                })),
            clearCart: () => set({ items: [] }),
            incrementQuantity: (productId) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.product._id === productId
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                })),
            decrementQuantity: (productId) =>
                set((state) => ({
                    items: state.items.map((item) => {
                        if (item.product._id === productId) {
                            const newQuantity = item.quantity - 1;
                            if (newQuantity <= 0) {
                                return null;
                            }
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    }).filter(Boolean) as CartItem[],
                })),
            reset: () => set({
                items: [],
            }),
        }),
        {
            name: 'furniture-cart-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useCartStore;