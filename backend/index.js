import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// CORS Setup (Ensure cookies are allowed)
const corsOptions = {
    origin: 'https://project-1-pi-ashy.vercel.app', // Allowed frontend URL
    credentials: true, // Allow sending cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Ensure cookies & auth headers work
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Middleware Order Fix
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parses incoming cookies

// Debugging: Check if cookies are received
app.use((req, res, next) => {
    console.log("🔹 Cookies Received:", req.cookies);
    next();
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
