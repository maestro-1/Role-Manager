import mongoose from 'mongoose';
const Schema = mongoose.Schema

let userSchema =new Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    created_on:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User',userSchema);
