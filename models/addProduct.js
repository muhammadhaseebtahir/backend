const mongoose= require("mongoose")
const productSchema = new mongoose.Schema(
    {
      productName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      sizes: {
        type: [String],  // Array of strings for sizes
        required: true,  // This ensures that sizes cannot be empty
      },
      userId: {
        type: String,
          },
      productId: {
        type: String,
              },
      imageUrl: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true, 
    }
  );
  
  const Product = mongoose.model('newProduct', productSchema);
  
  module.exports = Product;
  