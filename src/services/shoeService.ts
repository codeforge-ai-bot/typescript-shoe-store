import { Shoe, CreateShoeDTO, UpdateShoeDTO, FilterOptions } from '../models/shoe';

// In-memory database simulation
let shoes: Shoe[] = [
  {
    id: '1',
    name: 'Air Max 90',
    brand: 'Nike',
    price: 120,
    size: 9,
    color: 'White/Black',
    material: 'Leather',
    description: 'Classic Nike running shoes',
    inStock: true,
    stockQuantity: 15,
    category: 'Running',
    imageUrl: 'https://example.com/images/air-max-90.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Ultra Boost 22',
    brand: 'Adidas',
    price: 180,
    size: 10,
    color: 'Black',
    material: 'Primeknit',
    description: 'High-performance running shoes',
    inStock: true,
    stockQuantity: 8,
    category: 'Running',
    imageUrl: 'https://example.com/images/ultra-boost-22.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    price: 65,
    size: 8,
    color: 'Red',
    material: 'Canvas',
    description: 'Classic canvas sneakers',
    inStock: true,
    stockQuantity: 25,
    category: 'Casual',
    imageUrl: 'https://example.com/images/chuck-taylor.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Classic Leather',
    brand: 'Dr. Martens',
    price: 140,
    size: 9,
    color: 'Black',
    material: 'Leather',
    description: 'Iconic leather boots',
    inStock: true,
    stockQuantity: 12,
    category: 'Boots',
    imageUrl: 'https://example.com/images/classic-leather.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export class ShoeService {
  // Get all shoes with optional filtering
  async getAllShoes(filters?: FilterOptions): Promise<Shoe[]> {
    let filteredShoes = [...shoes];

    if (filters) {
      if (filters.brand) {
        filteredShoes = filteredShoes.filter(shoe => 
          shoe.brand.toLowerCase() === filters.brand!.toLowerCase()
        );
      }

      if (filters.category) {
        filteredShoes = filteredShoes.filter(shoe => 
          shoe.category.toLowerCase() === filters.category!.toLowerCase()
        );
      }

      if (filters.minPrice !== undefined) {
        filteredShoes = filteredShoes.filter(shoe => 
          shoe.price >= filters!.minPrice!
        );
      }

      if (filters.maxPrice !== undefined) {
        filteredShoes = filteredShoes.filter(shoe => 
          shoe.price <= filters!.maxPrice!
        );
      }

      if (filters.size !== undefined) {
        filteredShoes = filteredShoes.filter(shoe => 
          shoe.size === filters!.size
        );
      }

      if (filters.color) {
        filteredShoes = filteredShoes.filter(shoe => 
          shoe.color.toLowerCase().includes(filters.color!.toLowerCase())
        );
      }
    }

    return filteredShoes;
  }

  // Get a single shoe by ID
  async getShoeById(id: string): Promise<Shoe | null> {
    return shoes.find(shoe => shoe.id === id) || null;
  }

  // Create a new shoe
  async createShoe(shoeData: CreateShoeDTO): Promise<Shoe> {
    const newShoe: Shoe = {
      ...shoeData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    shoes.push(newShoe);
    return newShoe;
  }

  // Update an existing shoe
  async updateShoe(id: string, updateData: Partial<CreateShoeDTO>): Promise<Shoe | null> {
    const shoeIndex = shoes.findIndex(shoe => shoe.id === id);
    
    if (shoeIndex === -1) {
      return null;
    }

    const updatedShoe: Shoe = {
      ...shoes[shoeIndex],
      ...updateData,
      id, // Ensure ID doesn't change
      updatedAt: new Date()
    };

    shoes[shoeIndex] = updatedShoe;
    return updatedShoe;
  }

  // Delete a shoe
  async deleteShoe(id: string): Promise<boolean> {
    const shoeIndex = shoes.findIndex(shoe => shoe.id === id);
    
    if (shoeIndex === -1) {
      return false;
    }

    shoes.splice(shoeIndex, 1);
    return true;
  }

  // Get unique brands for filtering
  async getUniqueBrands(): Promise<string[]> {
    const brands = [...new Set(shoes.map(shoe => shoe.brand))];
    return brands;
  }

  // Get unique categories for filtering
  async getUniqueCategories(): Promise<string[]> {
    const categories = [...new Set(shoes.map(shoe => shoe.category))];
    return categories;
  }

  // Generate a simple ID (in a real app, use a proper ID library)
  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}