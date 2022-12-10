const  mongoose = require("mongoose");
const hospital = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    phone:{
        type:Number,
        required:true
    },
    belongUser:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"user"
    },
    belongDoctor:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"doctors"
    },
    Status:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now()
        },
        immutable:true
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now()
        }
    }
});
const userModel = mongoose.model("user",user);
module.exports = userModel;