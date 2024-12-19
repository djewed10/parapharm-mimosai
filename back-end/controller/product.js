const BadRequest = require("../error/bad-request")
const NotFoundError = require("../error/not-found")
const productSchema = require("../models/product")
const{StatusCodes}=require("http-status-codes")
const nodemailer = require('nodemailer');

const getallProduct=async(req,res)=>{
const product=await productSchema.find({})
res.status(StatusCodes.OK).json({success:true,product})
}
const getSingleProduct=async(req,res)=>{
    const {id}=req.params
    const product=await productSchema.findById(id)
    if(!product) throw new NotFoundError("product not found")
res.status(StatusCodes.OK).json({success:true,product})

}
const getQueryProduct=async(req,res)=>{

const {category,sort,name}=req.query
let object={}
if(category){
    object.category=category
}
if(name){
    object.name={$regex:name,$options:"i"}
    }

const result=productSchema.find(object)
if(sort){
    const sortlist=sort.split(",").join(" ")
    result.sort(sortlist)
}
else{
    result.sort("createdAt");
}
const product=await result
res.status(StatusCodes.OK).json({success:true,product})
}
const getCategorieProduct=async(req,res)=>{
    const {category,subcategory}=req.query
    const product=await productSchema.find({category:category})
    
   
    //if(!product) throw new NotFoundError("there is no similair product")

    res.status(StatusCodes.OK).json({success:true,product})
}

const getSimilairProduct=async(req,res)=>{
    const {subcategory}=req.query
    
    
    const product=await productSchema.find({subcategory:subcategory})
   console.log(product)
    if(!product) throw new NotFoundError("there is no similair product")

    res.status(StatusCodes.OK).json({success:true,product})
}
const postProduct=async(req,res)=>{
    const {role}=req.user
    if(role!=="Admin") throw new BadRequest("client is not allow to post product")
 const {name,price,description,category,subcategory,imageUrl,promotion,quantity}=req.body 
 if (!name||!price||!category||!subcategory||!imageUrl){
    throw new BadRequest("please provide full form")
 }  

const product=await productSchema.create({name,price,description,category,subcategory,imageUrl,promotion,quantity})
res.status(StatusCodes.OK).json({success:true,product,message:"product created Successfully!"})




}

const getLatestProduct=async(req,res)=>{

    const product=await productSchema.find({}).sort({createdAt:-1}).limit(15)
    if(!product) throw new NotFoundError("any product found")

    res.status(StatusCodes.OK).json({success:true,product})
}

const getPromotionProduct=async(req,res)=>{

    const product=await productSchema.find({promotion:{$ne:null}}).exec()
    if(!product) throw new NotFoundError("any product found")

    res.status(StatusCodes.OK).json({success:true,product})
}

const deleteProduct=async(req,res)=>{
    const {role}=req.user
    if(role!=="Admin") throw new BadRequest("client is not allow to delete product")
    const {id}=req.params
    const product=await productSchema.findByIdAndDelete(id)
    if(!product) throw new NotFoundError("product not found")
res.status(StatusCodes.OK).json({success:true,message:"product deleted"})

}
const updateProduct=async(req,res)=>{
    const update=req.body
    
    const {role}=req.user
    if(role!=="Admin") throw new BadRequest("client is not allow to update product")
    const {id}=req.params
    const product=await productSchema.findByIdAndUpdate(id,update)
   
    if(!product) throw new NotFoundError("product not found")
res.status(StatusCodes.OK).json({success:true,message:"product updated"})
}

const sendEmail=async(req,res)=>{

    const {address,name,phone,email, items } = req.body;

    if(!email||!address||!name||!phone) throw new BadRequest("please fill full form")
    if(!items) throw new BadRequest("votre panier est vide tu peut pas valider la commande")
   
      // Send confirmation email to the admin
      const transporter = nodemailer.createTransport({
       service:"gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
  
      const mailOptions = {
        from: email, // Using the client's email as the sender
        to: process.env.EMAIL,
        subject: 'New Order',
        html: `
          <p>Client Email: ${email}</p>
          <p>Client full name: ${name}</p>
          <p>Client phone: ${phone}</p>
          <p>Client address: ${address}</p><br/>
          <p>Order Details:</p>
          <pre>${JSON.stringify(items, null, 2)}</pre>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'Email sent successfully!' });
   
     
   
}



module.exports={
    postProduct,
    updateProduct,
    deleteProduct,
    getallProduct,
    getSimilairProduct,
    getSingleProduct,
    getQueryProduct,
    getCategorieProduct,
    getLatestProduct,
    getPromotionProduct,
    sendEmail
}