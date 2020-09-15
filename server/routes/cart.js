const express = require('express');
const router = express.Router();
//controller
const cartController = require('../controllers/cartController');
//to authorize for accessing the routes
const authenticate = require('../config/authenticate');

router.post('/add', authenticate.authenticateUser, cartController.addToCart);

router.get('/:id', authenticate.authenticateUser, cartController.getCart);

router.delete('/:id', authenticate.authenticateUser, cartController.deleteCartItem);

router.put('/:id', authenticate.authenticateUser, cartController.itemQuantityChange);

router.post('/order', authenticate.authenticateUser, cartController.placeOrder);

router.get('/orders/:userId', authenticate.authenticateUser, cartController.getOrders);

router.get('/order/:id', authenticate.authenticateUser, cartController.getOrder);

router.get('/total/:id', authenticate.authenticateUser, cartController.getCartNumber );

module.exports = router;