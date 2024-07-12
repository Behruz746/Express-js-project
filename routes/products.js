import { Router } from "express";
import { authProductMiddleware } from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";
import Product from "../models/Product.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    // Product.find(); product serverdagi hamma malumotlarni olibberadi
    // lean() method malumotni JSON formatga o'griberadi
    const products = await Product.find().lean();

    console.log(req.userId);

    res.render("index", {
      title: "Boom Shop",
      product: products.reverse(),
      userId: req.userId ? req.userId.toString() : null,
    });
  } catch (error) {
    console.log("Serverdan malumot olishda xatolik yuzberdi", error);
  }
});

router.get("/products", (req, res) => {
  res.render("products", {
    title: "Products | Boom Shop",
    isProducts: true,
  });
});

router.get("/add", authProductMiddleware, (req, res) => {
  res.render("add", {
    title: "Add Product | Boom Shop",
    isAdd: true,
    addProductErr: req.flash("addProductErr"),
  });
});

router.post("/add-products", userMiddleware, async (req, res) => {
  try {
    const { title, description, image, price } = req.body;

    if (!title || !description || !image || !price) {
      req.flash("addProductErr", "All fields is required");
      res.redirect("/add");
      return;
    }

    const product = await Product.create({ ...req.body, user: req.userId });
    res.redirect("/products");
  } catch (error) {
    console.log("Product yaratishda xatolik bo'ldi ", error);
  }
});

export default router;
