const express = require('express');
const router = express.Router();

const ProductController = require('../Controllers/Product.Controller');

router.get('/',ProductController.getAllProducts);
router.post('/',ProductController.postProduct);
router.patch('/:id',ProductController.updateProductById);
router.delete('/:id',ProductController.deleteProductById);
router.get('/:id',ProductController.getProductById);

module.exports  = router;