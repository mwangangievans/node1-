const express =require('express');
const createError =require('http-errors');
const dotenv = require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// initialize DB

require('./init.DB')();

const ProductRoute = require('./Routes/product.routes');
app.use('/products',ProductRoute);

const CustomerRoute = require('./Routes/customer.routes');
app.use('/customers',CustomerRoute);

app.use((req,res,next) =>{
  
    next(createError(404,'not found')); 
});
  
 
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('server started at port '+ PORT + '...');
});