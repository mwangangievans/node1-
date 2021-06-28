const express =require('express');
const mongoose =require('mongoose');
const createError =require('http-errors');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Evans',
{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify: false
})
.then(()=>{
    console.log('mongodb connected...');
});

const ProductRoute = require('./Routes/product.routes');
app.use('/products',ProductRoute);

const CustomerRoute = require('./Routes/customer.routes');
app.use('/customers',CustomerRoute);

app.use((req,res,next)=>{
  
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

app.listen(3000,()=>{
    console.log('server started at port 3000');
});