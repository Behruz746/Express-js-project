import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const router = Router();

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login | Boom Shoop",
    isLogin: true,
    loginErr: req.flash("loginErr"),
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register | Boom Shop",
    isRegister: true,
    registerErr: req.flash("registerErr"),
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("loginErr", "All fields is required");
      res.redirect("/login");
      return;
    }

    // hozirga email bilan serverdagi emailni solish tirish
    const existUser = await User.findOne({ email });
    // agar email false bolsa error ishlasin
    if (!existUser) {
      req.flash("loginErr", "User not found");
      res.redirect("/login");
      return;
    }

    // unday bo'lmasa passwordlarni solishtirsin
    const isPassEqual = await bcrypt.compare(password, existUser.password);
    // password false bo'lsa error ishlasin
    if (!isPassEqual) {
      req.flash("loginErr", "Password Wrong");
      res.redirect("/login");
      return;
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
    const { firstName, lastName, email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (!firstName || !lastName || !email || !password) {
      req.flash("registerErr", "All fields is required");
      res.redirect("/register");

      // document.querySelector(".remove__btn").addEventListener("click", () => {
      //   req.flash("registerErr", "");
      // });

      return;
    }

    if (existUser) {
      req.flash("registerErr", "This email has been used before");
      res.redirect("/register");
      return;
    }

    // bcrypt yordamidan user passwordlarini hash qilsh
    const hashedPassword = await bcrypt.hash(password, 10);

    // login bo'lgandan so'ng home pagega userni o'tqizvoradi   res.redirect("/")
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
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
