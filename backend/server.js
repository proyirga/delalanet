import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';

dotenv.config();
connectDB();
const app = express();

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//Routes
//app.use("/api/users", userRouter)

app.listen(port, () => console.log(`Server starterd at http://localhost:${port}`));