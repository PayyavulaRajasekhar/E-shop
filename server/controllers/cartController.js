const Cart = require('../models/cart');
const Order = require('../models/order');

exports.addToCart = (req, res) => {
    Cart.findOne({ userId: req.body.userId, productId: req.body.productId }, (err, product) => {
        console.log(product);
        if (product) {
            Cart.updateOne(
                { userId: req.body.userId, productId: req.body.productId },
                { $set: { productQuantity: product.productQuantity + 1 } }
            ).then(value => {
                console.log('modified quantity')
                res.json({ error: false, message: 'Product added to cart' });
            }).catch(error => {
                res.json({ error: true, message: 'failed to add product to cart' });
            });
        } else {
            new Cart(req.body).save().then(value => {
                res.json({ error: false, message: 'Product added to cart' });
            }).catch(error => {
                res.json({ error: true, message: 'failed to add product to cart' });
            });
        }
    });
}

exports.getCart = (req, res) => {
    Cart.find({ userId: req.params.id }, (err, docs) => {
        if (!err) {
            let totalPrice = 0;
            docs.forEach(item => {
                totalPrice += (item.productPrice * item.productQuantity);
            });
            res.json({
                error: false,
                message: 'These are the list of products in your cart',
                items: docs,
                totalPrice: totalPrice
            });
        } else {
            res.json({
                error: true,
                message: 'Failed to fetch the cart',
                errorData: err
            });
        }
    });
}

exports.getCartNumber = (req, res) => {
    Cart.find({ userId: req.params.id }, (err, docs) => {
        if (err) {
            res.json({
                error: true,
                message: 'Failed to get Cart Total',
                errorData: error
            });
        } else {
            let total = 0;
            docs.forEach(doc => {
                total += doc.productQuantity;
            });
            res.json({
                error: false,
                count: total
            });
        }
    })
}

exports.deleteCartItem = (req, res) => {
    Cart.findOneAndDelete({ _id: req.params.id }, (err, document) => {
        if (err) {
            res.json({
                error: true,
                message: 'Failed to delete item',
                errorData: error
            });
        } else {
            res.json({
                error: false,
                message: 'Item from the cart deleted successfully',
                item: document
            });
        }
    });
}

exports.itemQuantityChange = (req, res) => {
    Cart.updateOne(
        { _id: req.params.id },
        { $set: { productQuantity: req.body.quantity } }
    ).then(value => {
        res.json({
            error: false,
            message: "Quantity updated"
        });
    }).catch(err => {
        res.json({
            error: true,
            message: 'failed to update the quantity'
        });
    });
}

exports.placeOrder = (req, res) => {
    Cart.deleteMany({ userId: req.body.userId }, err => {
        if (!err) {
            new Order({ ...req.body, status: "processing" }).save().then(value => {
                setTimeout(() => {
                    Order.updateOne({ _id: value._id }, { $set: { status: "Delivered" } }).then(data => {
                    }).catch(err => {
                    });
                }, 86400000);
                res.json({
                    error: false,
                    message: "Order placed successfully",
                    order: value
                });
            }).catch(err => {
                res.json({
                    error: true,
                    message: "Failed to place the Order. Please try after Sometime."
                });
            })
        }
    });
}

exports.getOrders = (req, res) => {
    Order.find({ userId: req.params.userId }, (err, docs) => {
        if (err) {
            res.json({
                error: true,
                errorData: err,
                message: 'Failed to fetch the orders'
            });
        } else {
            res.json({
                error: false,
                message: 'Order fetched successfully',
                orders: docs
            });
        }
    });
}

exports.getOrder = (req, res) => {
    Order.findById(req.params.id, (err, doc) => {
        if (err) {
            res.json({
                error: true,
                errorData: err,
                message: 'Failed to fetch the order'
            });
        } else {
            res.json({
                error: false,
                message: 'Order fetched successfully',
                order: doc
            });
        }
    });
}