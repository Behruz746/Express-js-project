import { Router } from "express";
import { authProductMiddleware } from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
const router = Router();

router.get("/", async (req, res) => {
  try {
    // Product.find(); product serverdagi hamma malumotlarni olibberadi
    // lean() method malumotni JSON formatga o'griberadi
    const products = await Product.find().lean();

    res.render("index", {
      title: "Boom Shop",
      product: products.reverse(),
      userId: req.userId ? req.userId.toString() : null,
    });
  } catch (error) {
    console.log("Serverdan malumot olishda xatolik yuzberdi", error);
  }
});

router.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const product = await Product.findById(id).populate("user").lean();
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("product", {
      product: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/edit-product/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  try {
    const product = await Product.findById(id).populate("user").lean();
    res.render("edit-product", {
      product: product,
      editProductErr: req.flash("editProductErr"),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/products", async (req, res) => {
  const user = req.userId ? req.userId.toString() : null;
  const myProducts = await Product.find({ user }).populate("user").lean();

  res.render("products", {
    title: "Products | Boom Shop",
    myProducts: myProducts.reverse(),
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

    await Product.create({ ...req.body, user: req.userId });
    res.redirect("/products");
  } catch (error) {
    console.log("Product yaratishda xatolik bo'ldi ", error);
  }
});

router.post("/edit-product/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const { title, description, image, price } = req.body;

    if (!title || !description || !image || !price) {
      req.flash("editProductErr", "All fields is required");
      res.redirect(`/edit-product/${id}`);
      return;
    }

    await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.redirect("/products");
  } catch (error) {
    console.log(error);
  }
});

router.post("/delete-product/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Product.findByIdAndDelete(id);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

export default router;
