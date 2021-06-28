const createError = require('http-errors');
const Product = require('../Model/Product.model');
const mongoose = require('mongoose');

module.exports = {
    getAllProducts : async (req,res,next)=>{
        try {
            const results = await Product.find({},{  "__v": 0 });
            res.send(results);
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }  
        
},
   getProductById : async(req,res,next) =>{
    const id = req.params.id;
    try {
        const product = await Product.findOne({ _id: id },{"__v": 0});
    if(!product){
        throw createError(404,'Product does not exist.');
        
    }
        res.send(product);
        console.log(product);   
    } catch (error) {
        if(error instanceof mongoose.CastError){
            next(createError(400, 'Invalid Product id'));
            return;
        }
     next(error);
    }
    },
  updateProductById: async(req,res,next)=>{
    const id = req.params.id;
    const updates = req.body;
    const options = {new:true};
    try {
        const results = await Product.findByIdAndUpdate(id,updates,options);
        if(!results){
            throw createError(404,'Product does not exist.');  
        }
        res.send(results);
    } catch (error) {
       console.log(error.message);
       if(error instanceof mongoose.CastError){
           next(createError(400 ,'Invalid Product id'));
           return;
       }
       next(error);
    }
    },
    deleteProductById:  async(req,res,next)=>{
        const id = req.params.id;
        try {
    const results  = await Product.findByIdAndDelete(id);
    if(!results){
        throw createError(404,'Product does not exist.'); 
    }
    res.send(results);
        } catch (error) {
           console.log(error.message);
           if(error instanceof mongoose.CastError){
               next(createError(400 ,'Invalid Product id'));
               return;
           }
           next(error);
        }
    
    },
     postProduct:  async(req,res,next)=>{
        try {
            const product = new Product(req.body);
            const result = await product.save()
            res.send(result)
        } catch (error) {
            console.log(error.message);
            if(error.name === 'ValidationError'){
                next(createError(422, error.message));
                return;
            }
            next(error);
        }
    },
};