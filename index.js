import express from "express";
import fs from "fs";
import path, { dirname } from "path"; // package da type module bolgani uchun __dirnameni path module olqali olamiz
import { fileURLToPath } from "url";

// file pathlari
const __filename = fileURLToPath(import.meta.url);
// folder pathlari
const __dirname = dirname(__filename);

// express methodlarini saqlovchiga olish
const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/about", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
