import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan"
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js";
import errorMiddleWare from "./middlewares/ErrorMiddleware.js";
import courseRoutes from "./routes/courseRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import miscRoutes from "./routes/miscRoutes.js"
const app=express();
dotenv.config();
// express.json() parses the every form of data to json data
app.use(express.json());
// Using cors to enable cross origin requests
app.use(
    cors({
      origin: [process.env.FRONTEND_URL,"http://192.168.0.180:3000"],
      credentials: true,
    })
  );

app.use(express.json()); 
// express.urlencoded() ensures that urlencoded form data can also be used
app.use(express.urlencoded({ extended: true }));
// Using cookie parser for parsing cookies
app.use(cookieParser());
// Using morgan for getting request logs
app.use(morgan("dev"));
// for testing the server
// app.use("/ping",(req,res)=>{
//     return res.status(200).json({
//         data:"pong",
//         success:true
//     });
// })
// If someone hits the /user route they will be redirected to the userRoutes
app.use("/user",userRoutes);
// If someone hits the /courses route they will be redirected to the courseRoutes
app.use("/courses",courseRoutes);
app.use("/payments",paymentRoutes);
app.use('/misc', miscRoutes);
// Defined a custom middleware for throwing error
app.use(errorMiddleWare);
// If someone hits on the same port but wrong url then this error will be thrown 
app.all("*",(req,res)=>{
    res.status(404).json({
        message:"OOPS Please check your url"
    });
});

export default app;