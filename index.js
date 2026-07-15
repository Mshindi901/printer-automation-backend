import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./src/config/db-connect.js";
import {apiRateLimiter} from './src/middleware/rate-limit.js'

//admin routes
import adminRoutes from './src/admin/router.js'
//file routes
import fileRoutes from './src/files/routes.js';
//print jobs routes
import printJobRoutes from './src/print-jobs/router.js'
//printer routes
import printerRoutes from './src/printer/routes.js'
//user routes
import userRoutes from './src/users/routes.js';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(apiRateLimiter);

app.use('/api', adminRoutes);
app.use('/api', fileRoutes);
app.use('/api', printJobRoutes);
app.use('/api', printerRoutes);
app.use('/api', userRoutes);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});