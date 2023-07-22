import app from "./app.js"
import dbConnection from "./config/dbConfig.js";
const port=process.env.PORT || 5000;
app.listen(port,async ()=>{
    console.log(`App is running on port ${port}`);
    await dbConnection();
});
