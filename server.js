import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import cors from "cors";
// Configure Env
dotenv.config();

// database Configure
connectDB();

// Rest Object
const app = express();

// Middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/products",productRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to MERN E-commerce Project",
  });
});

//PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server up and running..."));
