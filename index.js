import express from "express";
import mongoose from "mongoose";
import { create } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import * as dotenv from "dotenv";
import flash from "connect-flash";
import varMiddleware from "./middleware/var.js";
import userMiddleware from "./middleware/user.js";
import hbsHelper from "./utils/index.js";
// Routes
import AutherRouters from "./routes/auth.js";
import ProductRouters from "./routes/products.js";
dotenv.config();

// express methodlarini saqlovchiga olish
const app = express();

// hbs configs
const hbs = create({
  defaultLayout: "main", // default shablon nomi
  extname: "hbs", // file kengaytirma nomi
  helpers: hbsHelper,
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views"); // Typo correction here

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: "darkUser", resave: false, saveUninitialized: false })
);
app.use(userMiddleware);
app.use(flash());
app.use(varMiddleware);
app.use(AutherRouters);
app.use(ProductRouters);

const startApp = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
      console.log("Mongo DB Connacted")
    );

    const PORT = process.env.PORT || 4100;
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
