const mongoose = require('mongoose');
const doctorShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    email:{
      type:String,
      required:true
    },
    phone:{
      type:Number,
      required:true
    },
    belongHospital:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"hospital"
    },
    havePatient:{
        type:[mongoose.Schema.ObjectId],
        ref:"user"
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
})
const doctor = mongoose.model("doctors",doctorShema);
module.exports = doctor;