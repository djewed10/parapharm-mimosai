const jwt  = require("jsonwebtoken")
const UnauthenticatedError = require("../error/unauthenticated")
const userSchema=require("../models/user")

const authentication=async(req,res,next)=>{
    const {token}=req.cookies
if(!token){
    throw new UnauthenticatedError("user not authorized")
}
const decoded=jwt.verify(token,process.env.JWT_SECRET)
req.user= await userSchema.findById(decoded.id)
next()
}
module.exports=authentication