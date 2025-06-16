const { pool } = require('../config/database');

class Product {
  constructor(productData) {
    this.name = productData.name;
    this.price = productData.price;
    this.quantity = productData.quantity || 0;
    this.description = productData.description || '';
  }

  // Create a new product
  async save() {
    try {
      const [result] = await pool.execute(
        'INSERT INTO products (name, price, quantity, description) VALUES (?, ?, ?, ?)',
        [this.name, this.price, this.quantity, this.description]
      );
      
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Find all products
  static async findAll(limit = 50, offset = 0) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Find product by ID
  static async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM products WHERE id = ?',
        [id]
      );
      
      return rows[0] || null;
    } catch (error) {
      throw error;
    }
  }

  // Update product
  static async update(id, productData) {
    try {
      const [result] = await pool.execute(
        'UPDATE products SET name = ?, price = ?, quantity = ?, description = ? WHERE id = ?',
        [productData.name, productData.price, productData.quantity, productData.description, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete product
  static async delete(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM products WHERE id = ?',
        [id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Search products by name
  static async searchByName(name) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM products WHERE name LIKE ? ORDER BY created_at DESC',
        [`%${name}%`]
      );
      
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get products count
  static async getCount() {
    try {
      const [rows] = await pool.execute('SELECT COUNT(*) as count FROM products');
      return rows[0].count;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;