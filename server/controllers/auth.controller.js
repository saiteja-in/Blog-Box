import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password || email===""||password===""){
        next(errorHandler(400,"All fields are required"));
        return;
    }
    try{
        const user=await User.findOne({email});
        if(!user){
            next(errorHandler(400,"User not found"));
            return;
        }
        const passwordMatch=bcryptjs.compareSync(password,user.password);
        if(!passwordMatch){
            next(errorHandler(400,"Invalid credentials"));
            return;
        }
        const token=jwt.sign({id:user._id,email:user.email,username:user.username},process.env.JWT_SECRET);
        const {password:pass,...rest}=user._doc;
        res.status(200).cookie("teja_token",token).json({message:"User logged in successfully",user:rest});
        // res.status(200).json({message:"User logged in successfully",user});
    }catch(error){
        next(error)
    }
}

export const logout=async(req,res)=>{
    res.clearCookie("teja_token").status(200).json({message:"User logged out successfully"});
}