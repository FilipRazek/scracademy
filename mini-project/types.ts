export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images?: string[];
}

export type ProductWithoutImage = Omit<Product, "images">;

export interface ResponseData {
  products: Product[];
}

export enum SortOrder {
  ASC = "ascending",
  DESC = "descending",
}

export interface UserInput<RemoveImages extends boolean = boolean> {
  sort: SortOrder;
  removeImages: RemoveImages;
}
