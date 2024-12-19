
const express= require("express")
const { getPrincipalCategory, postCategory, getSubcategory, updateCategory, deleteCategory, getallCategories } = require("../controller/category")
const authentication = require("../middleware/auth")
const router=express.Router()


router.route("/category").get(getPrincipalCategory).post(authentication,postCategory)
router.route("/subcategory").get(getSubcategory)
router.route("/category/:id").patch(authentication,updateCategory).delete(authentication,deleteCategory)
router.route("/allcategories").get(getallCategories)
module.exports=router