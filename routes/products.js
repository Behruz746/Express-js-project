import { Router } from "express";
import Product from "../models/Product.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Boom Shop",
  });
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products | Boom Shop",
    isProducts: true,
  });
});

router.get("/add", (req, res) => {
  res.render("add", {
    title: "Add Product | Boom Shop",
    isAdd: true,
  });
});

router.post("/add-products", async (req, res) => {
  try {
    const { title, description, image, price } = req.body;
    const product = await Product.create(req.body);

    console.log(product);
 
    res.redirect("/");
  } catch (error) {
    console.log("Product yaratishda xatolik bo'ldi ", error);
  }
});

export default router;
