import { useWindowDimensions } from 'react-native';

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768; // Adjust threshold if needed
  const containerWidth = isTablet ? '80%' : '95%';
  const paddingHorizontal = isTablet ? 40 : 10;
  return { isTablet, containerWidth, paddingHorizontal };
};
