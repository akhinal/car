const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
})
const userModels = mongoose.model('user',userSchema)
module.exports = userModels;