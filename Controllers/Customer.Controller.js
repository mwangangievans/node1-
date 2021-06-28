const createError = require('http-errors');
const Customer = require('../Model/Customer.model');
const mongoose = require('mongoose');

module.exports = {
    getAllCustomers : async (req,res,next)=>{
        try {
            const results = await Customer.find({},{  "__v": 0 });
            res.send(results);
        } catch (error) {
            console.log(error.message);
            res.send(error.message);
        }  
        
},
   getCustomerById : async(req,res,next) =>{
    const id = req.params.id;
    try {
        const customer = await Customer.findOne({ _id: id },{"__v": 0});
    if(!customer){
        throw createError(404,'Customer does not exist.');
        
    }
        res.send(customer);
        console.log(customer);   
    } catch (error) {
        if(error instanceof mongoose.CastError){
            next(createError(400, 'Invalid Customer id'));
            return;
        }
     next(error);
    }
    },
  updateCustomerById: async(req,res,next)=>{
    const id = req.params.id;
    const updates = req.body;
    const options = {new:true};
    try {
        const results = await Customer.findByIdAndUpdate(id,updates,options);
        if(!results){
            throw createError(404,'Customer does not exist.');  
        }
        res.send(results);
    } catch (error) {
       console.log(error.message);
       if(error instanceof mongoose.CastError){
           next(createError(400 ,'Invalid Customer id'));
           return;
       }
       next(error);
    }
    },
    deleteCustomerById:  async(req,res,next)=>{
        const id = req.params.id;
        try {
    const results  = await Customer.findByIdAndDelete(id);
    if(!results){
        throw createError(404,'Customer does not exist.'); 
    }
    res.send(results);
        } catch (error) {
           console.log(error.message);
           if(error instanceof mongoose.CastError){
               next(createError(400 ,'Invalid Customer id'));
               return;
           }
           next(error);
        }
    
    },
     postCustomer:  async(req,res,next)=>{
        try {
            const customer = new Customer(req.body);
            const result = await customer.save()
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