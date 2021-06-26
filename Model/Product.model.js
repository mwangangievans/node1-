const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{
        type: string,
        required:true
    },
    price:{
        type: number,
        required:true
    }
})

const Product = mongoose.model('product',ProductSchema)
module.exports = Product ;