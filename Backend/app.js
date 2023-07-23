import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js";
import errorMiddleWare from "./middlewares/ErrorMiddleware.js";
const app=express();
dotenv.config();
app.use(express.json());
app.use(cors({
    origin:[process.env.CLIENT],
    credentials:true
}));

app.use(cookieParser());

app.use(morgan("dev"));

app.use("/ping",(req,res)=>{
    return res.status(200).json({
        data:"pong",
        success:true
    });
})
app.use("/project",userRoutes);

app.use(errorMiddleWare);

app.all("*",(req,res)=>{
    res.status(404).json({
        message:"OOPS Please check your url"
    });
});

export default app;