import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password || username===""||email===""||password===""){
        res.status(400).json({message:"All fields are required"});
    }
    const hashedPassword=bcryptjs.hashSync(password,10);
    const user=await User.create({username,email,password:hashedPassword});
    res.status(201).json({message:"User created successfully",user});
}
export const signin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        res.status(400).json({message:"User not found"});
    }
}