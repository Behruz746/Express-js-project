import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  // mongodb dagi malumotga qachon create bo'lgani va update bo'lgani haqida malumot qo'shishi uchun
  { timestamps: true }
);

const Product = model("Product", ProductSchema);
export default Product;
