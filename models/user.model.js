const  mongoose = require("mongoose");
const user = new mongoose.Schema({
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
    symptoms:{
        title:{
            type:String
        },
        description:{
            type:String
        }
    },
    startTreatment:{
        startdate:String,
        enddate:String,
        treatmentStatus:{
            type:String,
            default:"RUNING"
        }
    },
    belongHospital:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"hospital"
    },
    belongDoctor:{
        type:[mongoose.SchemaType.ObjectId],
        ref:"doctors"
    },
    haveMedician:{
        type:[String]
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