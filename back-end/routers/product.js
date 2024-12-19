
const express=require("express")
const { getallProduct, postProduct, getSingleProduct, getSimilairProduct, updateProduct, deleteProduct, getQueryProduct, getCategorieProduct, getLatestProduct, getPromotionProduct, sendEmail } = require("../controller/product")
const authentication = require("../middleware/auth")
const router=express.Router()

router.route("/product").get(getallProduct).post(authentication,postProduct)
router.route("/product/:id").get(getSingleProduct).patch(authentication,updateProduct).delete(authentication,deleteProduct)
router.route("/similairproduct").get(getSimilairProduct)
router.route("/categoryproduct").get(getCategorieProduct)
router.route("/getLatestProduct").get(getLatestProduct)
router.route("/").get(getQueryProduct)
router.route("/getPromotionProduct").get(getPromotionProduct)
router.route("/sendemail").post(sendEmail)
module.exports=router