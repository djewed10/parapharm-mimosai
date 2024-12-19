const { StatusCodes } = require("http-status-codes")
const BadRequest = require("../error/bad-request")
const categorySchema = require("../models/category")
const NotFoundError = require("../error/not-found")


const postCategory=async(req,res)=>{
    const {role}=req.user
    if(role!=="Admin") throw new BadRequest("client is not allow to post category")
const {name,description,parentCategory}=req.body
if(!name) {
    throw new BadRequest("please provide full form")
}

const findname= await categorySchema.findOne({name:name}) 
if(findname){
    throw new BadRequest("this category is already posted try another name")
}
const neww=name.trim()
const parent=parentCategory.trim()
console.log(neww)
const category= await categorySchema.create({name:neww,description,parentCategory:parent})
res.status(StatusCodes.OK).json({success:true,category,message:"Category posted successfully!"})

}
const updateCategory=async(req,res)=>{
  
    const {role}=req.user
    if(role!=="Admin") throw new BadRequest("client is not allow to update category")
    const update=req.body
    const {id}=req.params
   
    const category= await categorySchema.findByIdAndUpdate(id,update )
      if(!category) throw new NotFoundError("OOPS! category not found.")
    res.status(StatusCodes.OK).json({success:true,message:"Category updated successfully!"})
    
    }
    const deleteCategory=async(req,res)=>{
        console.log("oooo")
        const {role}=req.user
    if(role!=="Admin") throw new BadRequest("client is not allow to delete category")
        const {id}=req.params
    console.log("oooo")
        const category= await categorySchema.findByIdAndDelete(id)
        if(!category) throw new NotFoundError("OOPS! category not found.")
        res.status(StatusCodes.OK).json({success:true,message:"Category deleted successfully!"})
        
        }   
const getPrincipalCategory=async(req,res)=>{
    
    const {categ}=req.query
    
    let category=await categorySchema.find({parentCategory:null})
    if(categ)  { category=await categorySchema.find({name:categ})}

        

    
    if(!category) throw new NotFoundError("there is no principal category")
    res.status(StatusCodes.OK).json({success:true,category})

}
const getSubcategory=async(req,res)=>{
const {parentCategory}=req.query

     const category=await categorySchema.find({parentCategory:parentCategory
    })
    if(!category) throw new NotFoundError("there is no  subcategory for this category")
    res.status(StatusCodes.OK).json({success:true,category})
}

const getallCategories=async(req,res)=>{
    
    const category=await categorySchema.find({})
    if(!category) throw new NotFoundError("there is no principal category")
    res.status(StatusCodes.OK).json({success:true,category})

}


module.exports={
    postCategory,
    deleteCategory,
    updateCategory,getPrincipalCategory,
    getSubcategory,
    getallCategories
}