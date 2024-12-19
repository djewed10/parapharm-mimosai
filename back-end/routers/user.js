const express=require("express")
const { register, login, logout, getUser } = require("../controller/user")
const authentication = require("../middleware/auth")
const router=express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(authentication,logout)
router.route("/getuser").get(authentication, getUser);

module.exports=router