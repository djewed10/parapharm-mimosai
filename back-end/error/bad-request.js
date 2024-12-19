const{StatusCodes}=require("http-status-codes")
const Custom = require("./custom")
class BadRequest extends Custom{
    constructor(message){
        super(message)
       this.statusCode=StatusCodes.BAD_REQUEST
    }
}
module.exports=BadRequest