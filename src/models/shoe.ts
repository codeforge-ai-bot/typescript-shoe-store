export interface Shoe {
  id: string;
  name: string;
  brand: string;
  price: number;
  size: number;
  color: string;
  material: string;
  description?: string;
  inStock: boolean;
  stockQuantity: number;
  category: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShoeDTO {
  name: string;
  brand: string;
  price: number;
  size: number;
  color: string;
  material: string;
  description?: string;
  inStock: boolean;
  stockQuantity: number;
  category: string;
  imageUrl?: string;
}

export interface UpdateShoeDTO extends Partial<CreateShoeDTO> {
  id: string;
}

export interface FilterOptions {
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: number;
  color?: string;
}