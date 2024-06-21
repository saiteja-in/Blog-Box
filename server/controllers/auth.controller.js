import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username===""||email===""||password===""){
        next(errorHandler(400,"All fields are required"));
        return;
    }
    try {
        const hashedPassword=bcryptjs.hashSync(password,10);
        const user=await User.create({username,email,password:hashedPassword});
        res.status(201).json({message:"User created successfully",user});
    } catch (error) {
        next(error)
    }
}
export const signin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        res.status(400).json({message:"User not found"});
    }
}