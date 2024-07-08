import express from "express";
import { create } from "express-handlebars";

// express methodlarini saqlovchiga olish
const app = express();

// hbs configs
const hbs = create({
  defaultLayout: "main", // default shablon nomi
  extname: "hbs", // file kengaytirma nomi
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("viewa", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
