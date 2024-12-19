const mongoose = require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"please provide a name"]
    },
    price:{
        type:Number,
        require:[true,"please provide a price"]
    },
    description:{
   type:String,
   require:[true,"please provide description"]
    },
    quantity:{
        type:Number,
     
    },
    promotion:{
        type:Number,
        default:null
    },
    category:{
    type:String,
    require:[true,"you must provide category"]
    },
    subcategory:{
        type:String,
        require:[true,"you must provide subcategory"]
    },
    imageUrl:{
   type:String,
   require:[true,"please provide image"]

    },
    conseils:{
        type:String,
   
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now,
      },


})
module.exports = mongoose.model('Product', productSchema);
 