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

router.post("/login", async (req, res) => {
  try {
    // hozirga email bilan serverdagi emailni solish tirish
    const existUser = await User.findOne({ email: req.body.email });
    // agar email false bolsa error ishlasin
    if (!existUser) {
      throw new Error("User not found");
      return false;
    }

    // unday bo'lmasa passwordlarni solishtirsin
    const isPassEqual = await bcrypt.compare(
      req.body.password,
      existUser.password
    );
    // password false bo'lsa error ishlasin
    if (!isPassEqual) {
      throw new Error("Password Wrong");
      return false;
    }

    console.log(existUser);
    // login bo'lgandan so'ng home pagega userni o'tqizvoradi   res.redirect("/")
    res.redirect("/");
  } catch (error) {
    console.error("Userni topishda xato yuz berdi:", error);
    res.status(500).send("Userni topishda xato yuz berdi");
  }
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

    const user = await User.create(userData);
    console.log(user);
    res.redirect("/");
  } catch (error) {
    console.error("User yaratishda xato yuz berdi:", error);
    res.status(500).send("User yaratishda xato yuz berdi");
  }
});

export default router;
