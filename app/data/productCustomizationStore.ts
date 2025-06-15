import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProductCustomizationState = {
  productObject: any | null;
  roomImage: string | null;
  analysis: any | null;
  customSelections: Record<string, string>;
  generatedFurnitureImage: string | null;
  generatedRoomImage: string | null;
  customInputs: Record<string, string>;
  
  setState: (state: Partial<ProductCustomizationState>) => void;
  reset: () => void;
};

export const useProductCustomizationStore = create<ProductCustomizationState>()(
  persist(
    (set) => ({
      productObject: null,
      roomImage: null,
      analysis: null,
      customSelections: {},
      generatedFurnitureImage: null,
      generatedRoomImage: null,
      customInputs: {},
      
      setState: (newState) => set(newState),
      reset: () => set({
        roomImage: null,
        analysis: null,
        customSelections: {},
        generatedFurnitureImage: null,
        generatedRoomImage: null,
        customInputs: {},
      }),
    }),
    {
      name: 'product-customization-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
