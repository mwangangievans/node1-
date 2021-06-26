const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{

res.send('loading all images');

});

router.post('/',(req,res,next)=>{
    res.send('product created successfully');
})

router.patch('/:id',(req,res,next)=>{
    res.send('product updated successfully');
});

router.delete('/:id',(req,res,next)=>{
res.send('product deleted successfully');
});

router.get('/:id',(req,res,next) =>{
    res.send('get a single product');

});



module.exports  = router;