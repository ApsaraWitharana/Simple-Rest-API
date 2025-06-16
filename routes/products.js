const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { limit = 50, offset = 0, search } = req.query;
    
    let products;
    if (search) {
      products = await Product.searchByName(search);
    } else {
      products = await Product.findAll(parseInt(limit), parseInt(offset));
    }

    const totalCount = await Product.getCount();

    res.json({
      success: true,
      data: products,
      pagination: {
        total: totalCount,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + products.length < totalCount
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid product ID is required'
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
});

// Create new product
router.post('/', async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;

    // Validation
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Product name and price are required'
      });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid positive number'
      });
    }

    if (quantity && (isNaN(quantity) || quantity < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a valid positive number'
      });
    }

    // Create product
    const product = new Product({
      name: name.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity) || 0,
      description: description ? description.trim() : ''
    });

    const productId = await product.save();
    const newProduct = await Product.findById(productId);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message
    });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, description } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid product ID is required'
      });
    }

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Validation
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Product name and price are required'
      });
    }

    if (isNaN(price) || price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price must be a valid positive number'
      });
    }

    if (quantity && (isNaN(quantity) || quantity < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a valid positive number'
      });
    }

    // Update product
    const updateData = {
      name: name.trim(),
      price: parseFloat(price),
      quantity: parseInt(quantity) || 0,
      description: description ? description.trim() : ''
    };

    const updated = await Product.update(id, updateData);

    if (!updated) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update product'
      });
    }

    const updatedProduct = await Product.findById(id);

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message
    });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Valid product ID is required'
      });
    }

    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete product
    const deleted = await Product.delete(id);

    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete product'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: existingProduct
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

module.exports = router;