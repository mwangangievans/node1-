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


app.all('/test',(req,res)=>{
    console.log(req.query);
    console.log(req.query.name);
    res.send(req.query);
});

app.all('/test/:id',(req,res)=>{
    console.log(req.params);
    res.send(req.params);
    
});

app.all('/test',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
    
});

const ProductRoute = require('./Routes/product.routes');
app.use('/products',ProductRoute);

app.use((req,res,next)=>{
  
    next(createError(404,'not found')); 
});

// const err = new Error('not found');
// err.status = 404;
// next(err);   
 
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