import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();
connectDB();
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(port, () => console.log(`Server starterd at http://localhost:${port}`));