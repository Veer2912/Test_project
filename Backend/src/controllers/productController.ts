import { Request, Response } from 'express';
import Product from '../models/product';


export const getProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export const addProduct = async (req: Request, res: Response) => {
    console.log("Received product data:", req.body); // Log the request body
  
    try {
      const { productName, description, price } = req.body;
  
      
      console.log("Validating fields:", { productName, description, price });
  
      if (!productName || description === undefined || price === undefined) {
        console.error('Validation failed: Missing fields', { name, description, price });
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }
  
      
      if (typeof price !== 'number' || price <= 0) {
        console.error('Validation failed: Price must be a positive number');
        res.status(400).json({ message: 'Price must be a positive number' });
        return;
      }
  
      const newProduct = await Product.create({
        productName,
        description,
        price,
      });
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  





