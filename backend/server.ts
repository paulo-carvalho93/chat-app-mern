// import dotenv from "dotenv";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import connectDB from "./config/db";
import { chats } from "./data/data";
import userRoutes from "./routes/userRoutes";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

connectDB();
const app = express();

// Accept JSON Data
app.use(express.json());

app.get("/", (request, response) => {
  response.send("API is running!");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on Port ${PORT}`));
