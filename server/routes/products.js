const express = require('express');
const router = express.Router();
//controller
const productController = require('../controllers/productController');
//to authorize for accessing the routes
const authenticate = require('../config/authenticate');

router.post('', authenticate.authenticateAdmin, productController.postProduct);

router.get('', productController.getProducts);

router.get('/:id', authenticate.authenticateAny, productController.getProduct);

router.put('/:id', authenticate.authenticateAdmin, productController.updateProduct);

router.delete('/:id', authenticate.authenticateAdmin, productController.deleteProduct);

router.post('/search', productController.searchProduct);

module.exports = router;
