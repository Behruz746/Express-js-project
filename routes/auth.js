import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login | Boom Shoop",
    isLogin: true,
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register | Boom Shop",
    isRegister: true,
  });
});

router.post("/login", (req, res) => {
  console.log(req.body);
  // login bo'lgandan so'ng home pagega userni o'tqizvoradi   res.redirect("/")
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  try {
    // bcrypt yordamidan user passwordlarini hash qilsh
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // login bo'lgandan so'ng home pagega userni o'tqizvoradi   res.redirect("/")
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      // hashlangan password
      password: hashedPassword,
    };
    // console.log(req.body);
    // console.log(userData);
    const user = await User.create(userData);
    console.log(user);
    res.redirect("/");
  } catch (error) {
    console.error("User yaratishda xato yuz berdi:", error);
    res.status(500).send("User yaratishda xato yuz berdi");
  }
});

export default router;
