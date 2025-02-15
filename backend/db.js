
// import mongoose, { model, Schema } from "mongoose"
const  mongoose = require("mongoose")

mongoose.connect("mongodb+srv://SaikatAdmin:IfpmTFPd3A8I9IYP@cluster0.uz1qv.mongodb.net/");

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
    },
    password:{
        type: String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        require:true,
        trim:true,
        maxLength:50
    }
});

const accountSchema = new  mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,//Refer  to the user schema  id
        ref:"User",
        required:true

    },
    balance:{
        type: Number,
        required:true
    }
});

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account",accountSchema);

module.exports={
    User,
    Account,
};