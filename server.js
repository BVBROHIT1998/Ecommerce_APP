import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

// Configure env
dotenv.config();

//Databse Confif
connectDB();

//Rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoute);

//port
const port = process.env.PORT || 8080;

//REST API
app.get("/", function (req, res) {
  res.send("Welcome to ecommerce App");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
