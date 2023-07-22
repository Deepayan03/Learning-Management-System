const register=(req,res,next)=>{
    return res.status(200).json({
        message:"Registred"
    });
}
const login=(req,res,next)=>{
    return res.status(200).json({
        message:"loggedin"
    });

}
const logout=(req,res,next)=>{
    return res.status(200).json({
        message:"Logged Out"
    });

}
const getProfile=(req,res,next)=>{
    return res.status(200).json({
        message:"Got your profile"
    });

}

export {register,login,logout, getProfile};