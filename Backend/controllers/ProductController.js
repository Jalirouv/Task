



const ProductModel=require("../models/ProductModel")


const ProductController={

    getAll: async(req,res)=>{
        let products= await ProductModel.find()
        res.send(products)
    },

    post: async(req,res)=>{
        let {error}=ProductValidationSchema.validate(req.body)

   if(error){
       return res.send(error.details[0].message)
   }
    let newProduct= ProductModel(req.body)
     
    await newProduct.save()
    res.send(newProduct)
    }




}


module.exports=ProductController