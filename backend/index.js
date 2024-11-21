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

// middleware
app.use(cookieParser());

// Update CORS configuration to allow multiple origins
const corsOptions = {
    origin: 'http://localhost:5173', // Allowed origins
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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