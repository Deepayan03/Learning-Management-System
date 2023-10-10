import AppError from "../utils/utilError.js";

export const isAuthorizedSubscriber=async(req,res,next)=>{
    const {subscription,role}=req.user;
    if(role!= "ADMIN" && subscription.status!=="ACTIVE"){
        return next(
            new AppError("Please subscribe to access this course!",403)
        );
    }
    
    next();
}