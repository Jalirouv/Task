const mongoose=require("mongoose")
let ProductSchema= new mongoose.Schema({
    name:String,
    price:Number
})
let ProductModel= mongoose.model("product",ProductSchema)
module.exports=ProductModel