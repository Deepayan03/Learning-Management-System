import app from "./app.js"
import cloudinary from "cloudinary"
import dbConnection from "./config/dbConfig.js";
const port=process.env.PORT || 5000;

cloudinary.v2.config({
    cloud_name: process.env.cdnaryNAME,
    api_key: process.env.cdnaryKEY,
    api_secret: process.env.cdnarySECRET,
    secure: true,
  });


app.listen(port,async ()=>{
    console.log(`App is running on port ${port}`);
    await dbConnection();
});
