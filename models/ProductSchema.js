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
        type: [String],  
        required: true,  
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
  
  const AddProduct = mongoose.model('newProduct', productSchema);
  
  module.exports = AddProduct;
  