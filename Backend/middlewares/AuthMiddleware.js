import jwt from "jsonwebtoken";
import AppError from "../utils/utilError.js";

const isLoggedIn = async (req, res, next) => {
    // console.log(req)
    const token = req.cookies.token// Access token from cookies
    //  console.log(token);
    if (!token) {
        return next(new AppError("Unauthenticated", 400));
    }
    try {
        const userDetails = jwt.verify(token, process.env.SECRET);
        // console.log(userDetails);
        req.user = userDetails;
        next();
    } catch (error) {
        console.log(error);
        return next(new AppError("Invalid or expired token", 401));
    }
};

export { isLoggedIn };