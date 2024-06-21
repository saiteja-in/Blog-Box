import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongoose");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log("server started"));
