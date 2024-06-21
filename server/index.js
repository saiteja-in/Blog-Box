import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

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
app.use(express.json());

const PORT = 3000;

app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);

app.listen(PORT, () => console.log("server started"));
