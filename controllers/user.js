const _ = require('lodash')
const User = require("../models/user")

exports.userById = (req,res,next,id) =>{ // where is id gotten from
    User.findById(id).exec((err,user)=>{
        // if(err||  !user){
        //     return res.status(400).json({
        //         error:"user not found"
        //     })
        // }
        if( !user){
            return res.status(400).json({
                error:"user not found"
            })
        }
        if(err){
            return res.status(400).json({
                error:"errr"
            })
        }
        req.profile = user
        next()
    })
}

exports.hasAuthorization =(req,res,next)=>{
    const authorized = req.profile && req.profile._id //what does this mean
    if(!authorized){
        return res.status(403).json({
            error:"User is not authorized to perform this action"
        })
    }
}
 
exports.allUsers = (req,res)=>{
    User.find((err,users) =>{
        if (err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(users)
    }).select("name email updated created Username state Dp rank")
}
exports.getUser = (req,res) =>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
exports.deleteProfile = (req,res)=>{
    let profile = req.profile
    profile.remove((err,profile) =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json({
            message:"deleted successfully"
        })
    })
}

