import { Slot } from "expo-router";
import AuthInitializer from '@/app/components/AuthInitializer';

export default function RootLayout() {
  return (
    <>
      <Slot />
    </>
  );
}