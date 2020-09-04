const express = require("express")
const {deleteProfile,getUser,userById,allUsers} = require("../controllers/user")
const {requireSignin} = require("../controllers/auth")

const router = express.Router();
router.param("userId",userById)
router.get("/user/:userId",requireSignin,getUser);
router.get("/Users",requireSignin,allUsers);
router.delete("/deleteuser/:userId",requireSignin,deleteProfile);
module.exports = router 