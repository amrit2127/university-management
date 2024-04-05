import mongoose from "mongoose";

const ShoppingCartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
  totalprice:{
    type:Number,
    default:0
  } 
});

// Define a virtual field for 'price'
ShoppingCartSchema.virtual("price").get(function () {
  return this.product.price * this.count;
});

ShoppingCartSchema.virtual("cartTotalPrice").get(function () {
  return this.model('shoppingCart').aggregate([
    { $match: { user: this.user } },
    { $group: { _id: null, total: { $sum: { $multiply: ['$product.price', '$count'] } } } },
    { $project: { _id: 0, total: 1 } }
  ]);
});

ShoppingCartSchema.set("toJSON", { virtuals: true });

const ShoppingCartModel = mongoose.model("shoppingCart", ShoppingCartSchema);

export default ShoppingCartModel;
