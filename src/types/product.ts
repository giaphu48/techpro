export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  badge?: string;
  rating?: number;
  reviews?: number;
}
