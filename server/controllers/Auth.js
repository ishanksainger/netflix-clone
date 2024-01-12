const User = require("../models/User");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.signup=async(req,res)=>{
    try {
        const {
            firstName, lastName ,email, password, confirmPassword
        }=req.body;

        if(!email || !password || !confirmPassword || !firstName || !lastName){
            return res.status(403).send({
                success:false,
                message:"All Fields are Mandatory"
            })
        }
        if(password!==confirmPassword){
            return res.status(403).send({
                success:false,
                message:"Password and Confirm Password don't match"
            })
        }
        
        const existingUser=await User.findOne({email})

        if(existingUser){
            return res.status(400).send({
                success:false,
                message:"User is already Registered"
            })
        }

        const hashedPwd=await bcrypt.hash(password,10)
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:hashedPwd
        })
       
        return res.status(200).send({
            success:true,
            message:"User is successfully registered",
            user
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "User can't be registered. Please try again "
        })
    }
}

exports.login= async(req,res)=>{
    try {
        const {email,password}=req.body

        if(!email || !password){
            return res.status(403).send({
                success:false,
                message:"All Fields are Mandatory"
            })
        }

        const existingUser=await User.findOne({email}).populate("likedMovies")

        if(!existingUser){
            return res.status(401).send({
                success:false,
                message:"User is not registered. Please Signup"
            })
        }

        if(await bcrypt.compare(password,existingUser.password)){
            const payload={
                email:existingUser.email,
                id:existingUser._id,
                likedMovie:existingUser.likedMovies
            }
            const token=jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"24h"
            })
            existingUser.token=token
            existingUser.password=undefined

            const options={
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token", token,options).status(200).json({
                success:true,
                token,
                existingUser,
                message:"Logged In successfully"
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "Password is Incorrect"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login Failure. Please try again"
        })
    }
}