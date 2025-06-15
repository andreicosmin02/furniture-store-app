import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GenerateRoomState = {
  selectedImage: string | null;
  selectedStyle: string;
  generatedImage: string | null;
  matchedProducts: any[];
  
  setState: (state: Partial<GenerateRoomState>) => void;
  reset: () => void;
};

export const useGenerateRoomStore = create<GenerateRoomState>()(
  persist(
    (set) => ({
      selectedImage: null,
      selectedStyle: 'modern',
      generatedImage: null,
      matchedProducts: [],
      
      setState: (newState) => set(newState),
      reset: () => set({
        selectedImage: null,
        generatedImage: null,
        matchedProducts: [],
      }),
    }),
    {
      name: 'generate-room-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
