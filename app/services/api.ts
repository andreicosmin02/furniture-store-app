import { RelativePathString } from "expo-router";

export interface Category {
  name: string;
  imageProductId: string | null;
  redirectPath: RelativePathString;
}

// ✅ Fetch random product for each category
export const fetchCategoriesWithImages = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}products/get/random-per-category`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch random category products');
    }

    const categoriesWithImages: Category[] = data.products.map((item: { category: string; productId: string }) => ({
      name: item.category,
      imageProductId: item.productId || null,
      redirectPath: `./products/${item.category}` as RelativePathString,
    }));

    return categoriesWithImages;
  } catch (error) {
    console.error("Error fetching categories with images:", error);
    throw error;
  }
};

// Optional: directly generate image URL (e.g. for rendering)
export const fetchProductImage = (productId: string | null) => {
  if (!productId) return '';
  return `${process.env.EXPO_PUBLIC_API_URL}products/${productId}/image`;
};
