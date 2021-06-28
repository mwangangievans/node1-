const express = require('express');
const router = express.Router();

const CustomerController = require('../Controllers/Customer.Controller');

router.get('/',CustomerController.getAllCustomers);
router.post('/',CustomerController.postCustomer);
router.patch('/:id',CustomerController.updateCustomerById);
router.delete('/:id',CustomerController.deleteCustomerById);
router.get('/:id',CustomerController.getCustomerById);

module.exports  = router;