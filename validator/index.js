exports.userSignupValidator = (req,res,next)=>{
    req.check ("Username","Username is required").notEmpty()
    req.check("Username")
    .isLength({ max:16 })
     .withMessage("Username is too long")
    

    req.check("email")
    .matches(/.+\@.+..+/)
    .withMessage("Email doesn't exist")

    

    //password
    req.check ("password","password is required").notEmpty()

    req.check("password")
    .isLength({ min:6 })
     .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/\D/)
    .withMessage("Password must contain a letter")
     req.check ("state","state is required").notEmpty()
     //post
    
   
    //errors
    const errors = req.validationErrors()
  //  console.log(errors);
    if (errors){
        const firstError = errors.map((error)=> error.msg)[0]
        return res.status(400).json({error:firstError})
    }
   next()
    

}
exports.CheckPosts = (req,res,next)=>{
  req.check("body","You cannot send an empty post").notEmpty()
  req.check("body")
  .isLength({ max:200 })
   .withMessage("Post is too long")
  

 //errors
 const errors = req.validationErrors()
//  console.log(errors);
 if (errors){
     const firstError = errors.map((error)=> error.msg)[0]
     return res.status(400).json({error:firstError})
 }
 next()


}