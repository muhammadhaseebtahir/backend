const express = require('express');
const Product = require('../models/addProduct'); // Assuming you have the Product model
const router = express.Router();

// Function to generate a random ID for products
const getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

// Route to add a new product
router.post('/add-product', async (req, res) => {
    

    const { productName, description, type, price, imageUrl, userId, sizes } = req.body;

    // Validate input data
    if (!productName || !description || !type || !price || !imageUrl || !userId || !sizes) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate sizes to be a non-empty array
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ message: 'Sizes should be a non-empty array' });
    }

    // Create a new product object
    const newProduct = new Product({
      productName,
      description,
      type,
      price,
      imageUrl,
      userId,
      sizes,  // Use the sizes array passed in the request
      productId: getRandomId(),
    });

    try {
      // Save the product to the database
      const savedProduct = await newProduct.save();

      // Return the saved product as a response
      res.status(201).json({
        message: 'Product added successfully',
        product: savedProduct,
      });
    } catch (error) {
      console.error('Error saving product:', error);
      res.status(500).json({ message: 'Failed to add product' });
    }
});

router.put('/update-product/:productId', async (req, res) => {
    const { productId } = req.params; // Get productId from request params
    const { productName, description, type, price, imageUrl, sizes, userId } = req.body;

    // Validate the required fields
    if (!productName || !description || !type || !price || !imageUrl || !sizes || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate sizes to be a non-empty array
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({ message: 'Sizes should be a non-empty array' });
    }

    try {
      // Find the product by productId and userId to ensure the user is updating their own product
      const product = await Product.findOne({ productId, userId });

      if (!product) {
        return res.status(404).json({ message: 'Product not found or you are not authorized to update this product' });
      }

      // Update the product details
      const updatedProduct = await Product.findOneAndUpdate(
        { productId, userId },  // Query to find the product by productId and userId
        { 
          productName,
          description,
          type,
          price,
          imageUrl,
          sizes,
        },
        { new: true }  // Return the updated product after the update
      );

      // Send the updated product as a response
      res.status(200).json({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Failed to update product' });
    }
});
// Route to get products by userId
router.get('/get-products', async (req, res) => {
  const { userId } = req.body; // Get userId from query params

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Fetch products from the database filtered by userId
    const products = await Product.find({ userId });

    // If no products are found for the user, return a 404 error
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this user' });
    }

    // Send the list of products with a 200 status
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Route to delete a product by productId and userId
router.delete('/delete-product/:productId', async (req, res) => {
  const { productId } = req.params; // Get productId from request params
//   const { userId } = req.body;

  if (!productId ) {
    return res.status(400).json({ message: 'Product ID and User ID are required' });
  }

  try {
    // Find the product by productId and userId to ensure the user is deleting their own product
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found or you are not authorized to delete this product' });
    }

    // Delete the product
    await Product.deleteOne({ productId });

    // Send a success response
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
