import { Router } from "express";
import User from "../models/User.js";
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
  // login bo'lgandan so'ng home pagega userni o'tqizvoradi   res.redirect("/")
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  // console.log(req.body);
  // console.log(userData);
  const user = await User.create(userData);
  console.log(user);
  res.redirect("/");
});

export default router;
