require("dotenv").config();
require("express-async-errors");
const express=require("express")
const app=express()
const config=require("./config/index")
const productrouter=require("./routers/product")
const categoryrouter=require("./routers/category")
const userrouter=require("./routers/user")
const notFound = require("./middleware/not-found")
const connect = require("./db/connect")
const cloudinary =require("cloudinary")

const errorHandler = require("./middleware/error-handler")
const cookieparser=require("cookie-parser")
const fileUpload=require("express-fileupload")
//security
//const helmet=require("helmet")
const cors = require('cors');
//const xss = require('xss-clean');
//const rateLimiter = require("express-rate-limit");
const {allowed}=config

app.use(express.json())

//app.use(helmet());
app.use(
    cors({
      origin: allowed,
      method: ["GET", "POST", "DELETE", "PATCH"],
      credentials: true,
    })
  );
  
//app.use(xss());
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/user",userrouter)
app.use("/",productrouter)
app.use("/",categoryrouter)
app.use(notFound)
app.use(errorHandler)


          
// cloudinary.v2.config({ 
//   cloud_name: process.env.cloud_name, 
//   api_key: process.env.api_key, 
//   api_secret: process.env.api_secret 
// });
let port =5000
 const start=async ()=>{
    try {
        await connect(process.env.MONGO_URI)
        app.listen(port,()=>
        console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
   
 }
start()