const express = require("express");
const cookieParser = require("cookie-parser")
const mongoose = require ("mongoose");
const morgan = require("morgan");
const expressValidator =  require("express-validator") 
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors")

const postRoutes = require("./routes/Post");
const authRoutes = require("./routes/auth");
const Users = require("./routes/User");
const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then (()=> console.log("DB is IN!"))

mongoose.connection.on('error',err=>{
          console.log(`DB connection error:${err.message}`);
                
})

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json()) 
app.use(morgan("dev"));
app.use(expressValidator()); 
app.use("/" ,postRoutes) 
app.use("/" ,authRoutes) 
app.use("/" ,Users)
app.use(function(err,req,res,next){
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({error:'unauthourized'})
    }
})  

const port = process.env.PORT||8000;

app.listen(port,()=>{
    console.log("lift off")
});  