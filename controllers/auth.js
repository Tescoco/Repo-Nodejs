const jwt = require("jsonwebtoken")
require('dotenv').config()
const expressjwt = require('express-jwt')
const User = require ("../models/user")


exports.signup = async (req,res) =>{
    const UsernameExists = await User.findOne({Username:req.body.Username})
    const userExists = await User.findOne({email:req.body.email})
    if(userExists) return res.status(403).json({
        error:"Email Taken"
    })
    if(UsernameExists) return res.status(403).json({
        error:"Username Taken"
    })
    const user = await new User(req.body)
    await user.save()
    res.status(200).json({message:"Success please login"})
}
exports.signin = (req,res)=>{
    //find user
    const { Username,password } = req.body
    User.findOne({Username} ,(err,user)=>{
        if (err || !user){
            return res.status(401).json({
                error:"User does not exist"
            })
        }
        // if user is found
        // create auth method in model and use here
        if(!user.authenticate(password)){
            return res.status(401).json({
                error:"Username and password do not match"
           
        })
}      //generate a token with user id and secret
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
   
   //persist the token in cookie with expiry date
    res.cookie("t", token,{expire:new Date() + 9999})
    //return response with user and token to frontend client
    const {_id,Username,created,Dp,rank} = user
    return res.json({token,user:{_id,Username,Dp,rank}}) 
 })  
}    
exports.signout = (req,res) =>{
    res.clearCookie("t")
    return res.json({message:"Peace!!!"})
}
exports.requireSignin = expressjwt({
    //if valid express jwt appen
    secret:process.env.JWT_SECRET,algorithms:['HS256'], userProperty:"auth"   
})