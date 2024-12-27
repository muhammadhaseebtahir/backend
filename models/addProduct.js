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
        required: true,  // This should also be marked required
      },
      productId: {
        type: String,
        required: true,  // Ensure productId is required
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
  
  const Product = mongoose.model('addProduct', productSchema);
  
  module.exports = Product;
  