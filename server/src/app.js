import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'


dotenv.config({ path: './.env' })
const app = express();

app.use(cors({
   origin: process.env.FRONTEND_URI,
   credentials: true,
}))


app.use(express.json({
   limit: "16kb"
}))

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())



//importing the routes
import userRouter from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'



//routes declerations
app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRoute);

export { app }