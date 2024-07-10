import { Router } from "express";
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

router.post("/register", (req, res) => {
  console.log(req.body);
  // login bo'lgandan so'ng home pagega userni o'tqizvoradi   res.redirect("/")
  res.redirect("/");
});

export default router;
