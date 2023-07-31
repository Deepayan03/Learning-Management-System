import mongoose from "mongoose";
mongoose.set("strictQuery",false);
const url=process.env.URL;
console.log(url);
const dbConnection=async()=>{
    try {
        await mongoose.connect(url);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log(error);
        process.exit("1");
    }
}
export default dbConnection;
