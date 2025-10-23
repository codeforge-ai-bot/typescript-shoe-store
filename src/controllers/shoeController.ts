import { Request, Response } from 'express';
import { ShoeService } from '../services/shoeService';
import { CreateShoeDTO, UpdateShoeDTO, FilterOptions } from '../models/shoe';
import { validationResult } from 'express-validator';
import { AppError } from '../utils/errorHandler';

export class ShoeController {
  private shoeService: ShoeService;

  constructor() {
    this.shoeService = new ShoeService();
  }

  // Get all shoes with optional filtering
  getAllShoes = async (req: Request, res: Response) => {
    try {
      const filters: FilterOptions = {
        brand: req.query.brand as string,
        category: req.query.category as string,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        size: req.query.size ? Number(req.query.size) : undefined,
        color: req.query.color as string,
      };

      const shoes = await this.shoeService.getAllShoes(filters);
      
      res.status(200).json({
        success: true,
        data: shoes,
        count: shoes.length,
        filters: Object.keys(filters).filter(key => filters[key as keyof FilterOptions] !== undefined)
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };

  // Get a single shoe by ID
  getShoeById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const shoe = await this.shoeService.getShoeById(id);

      if (!shoe) {
        throw new AppError('Shoe not found', 404);
      }

      res.status(200).json({
        success: true,
        data: shoe
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };

  // Create a new shoe
  createShoe = async (req: Request, res: Response) => {
    try {
      // Validate request body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError('Validation failed', 400, errors.array());
      }

      const shoeData: CreateShoeDTO = req.body;
      const newShoe = await this.shoeService.createShoe(shoeData);

      res.status(201).json({
        success: true,
        data: newShoe,
        message: 'Shoe created successfully'
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };

  // Update an existing shoe
  updateShoe = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData: UpdateShoeDTO = req.body;

      // Validate that ID in params matches ID in body
      if (updateData.id && updateData.id !== id) {
        throw new AppError('ID in URL and body must match', 400);
      }

      // Remove ID from body as it's already in params
      const { id: _, ...updateDataWithoutId } = updateData;

      const updatedShoe = await this.shoeService.updateShoe(id, updateDataWithoutId);

      if (!updatedShoe) {
        throw new AppError('Shoe not found', 404);
      }

      res.status(200).json({
        success: true,
        data: updatedShoe,
        message: 'Shoe updated successfully'
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };

  // Delete a shoe
  deleteShoe = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.shoeService.deleteShoe(id);

      if (!deleted) {
        throw new AppError('Shoe not found', 404);
      }

      res.status(200).json({
        success: true,
        message: 'Shoe deleted successfully'
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }
    }
  };

  // Get unique brands for filtering
  getBrands = async (req: Request, res: Response) => {
    try {
      const brands = await this.shoeService.getUniqueBrands();
      
      res.status(200).json({
        success: true,
        data: brands,
        count: brands.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };

  // Get unique categories for filtering
  getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await this.shoeService.getUniqueCategories();
      
      res.status(200).json({
        success: true,
        data: categories,
        count: categories.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  };
}