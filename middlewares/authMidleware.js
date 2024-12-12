import Jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token Base

export const requireSignIn = async (req,res,next)=>{
    try {
        const decode= Jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user= decode;
        next();
    } catch (error) {
        console.log(Error);
        
    }
};

// Admin access 
export const isAdmin= async (req,res,next)=>{
 try {
    const user=await userModel.findById(req.user._id);
    if(user.Role !==1){
        return res.status(401).send({
       success:false,
       message:'UnAuthorized Access'
        });
    }else{
        next();
    }
 } catch (error) {
  console.log(Error);
  res.status(401).send({
    success:false,
    error,
    message:'Error in admin Middelware'
  })
    
 }
}