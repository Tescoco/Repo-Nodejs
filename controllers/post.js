const Post = require("../models/post")
const formidable = require("formidable")
const fs = require("fs")

exports.postId = (req,res,next,id) =>{
    Post.findById(id)
    .populate("postedBy","_id Username")
      .exec((err,post) =>{
          if (err || !post){
              return res.status(400).json({
                  error:err
              })
          }
          req.post = post
          next()
      })
}
exports.getaPost = (req,res) =>{
    return res.json(req.post)
}

exports.getPosts =(req,res)=>{
   
     const posts = Post.find()
       .populate("postedBy","_id Username Dp")
       .sort({"created":-1})
       .then((posts) =>{
              res.json(posts)
          })
           .catch(err => console.log(err))
 
 }

exports.getUserPosts =(req,res)=>{
   const Userid = req.profile._id
    const userposts = Post.find({postedBy:Userid} )
      .populate("postedBy","_id Username Dp")
      .sort({"created":-1})
      .exec((err,posts) =>{
          if (err){
              return res.status(400).json({
                  error:err
              })
          }
          res.json(posts)
      })

}
    
   

exports.createPost = (req,res,next) =>{
      const post = new Post(req.body)
    req.profile.hashed_password = undefined
         req.profile.salt = undefined
       post.postedBy = req.profile

    post.save((err,result) =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.status(200).json({
            post: result
        })
    })
}
   exports.deletePost = (req,res)=>{
       let post = req.post
       post.remove((err,post) =>{
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

