import AppError from "../utils/utilError.js";

export const authorizedRoles=(...roles)=>async(req,res,next)=>{
    const currentUserRole=req.user.role;
    if(!roles.includes(currentUserRole)){
        return next(new AppError("Only an admin can do this",403));
    }
    next();
}