import express from "express";
import { create } from "express-handlebars";
import AutherRouters from "./routes/auth.js";
import ProductRouters from "./routes/products.js";

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

app.use(AutherRouters);
app.use(ProductRouters);

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
