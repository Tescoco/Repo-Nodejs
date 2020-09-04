const express = require("express")
const {deletePost,postId,createPost,getPosts,getUserPosts} = require("../controllers/post")
const {CheckPosts} = require("../validator/index") 
const {requireSignin} = require("../controllers/auth")
const {userById} = require("../controllers/user")

const router = express.Router()

router.param("userId",userById)
router.param("postId",postId)
router.get("/allposts",getPosts)
router.delete("/deletePost/:postId",deletePost)
router.post("/post/new/:userId",requireSignin,CheckPosts,createPost) //we will exchange it back
router.get("/posts/:userId",requireSignin,getUserPosts)

module.exports = router 