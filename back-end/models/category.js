const mongoose=require("mongoose")


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please provide category name"]
    },

       
    parentCategory:{
        type:String,
        default:null,
    },
    


  });
  
  module.exports = mongoose.model('Category', categorySchema);
  
 