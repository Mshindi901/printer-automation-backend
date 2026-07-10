import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./src/config/db-connect.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});