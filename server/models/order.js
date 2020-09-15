const mongoose = require('mongoose');
const schema = mongoose.Schema;
const cartSchema = new schema({
    userId: String,
    productId: String,
    productName: String,
    productPrice: String,
    productImageURL: String,
    productDescription: String,
    productQuantity: Number
});

const orderSchema = new schema({
    userId: String,
    cart: [cartSchema],
    totalPrice: Number,
    status: String
})

module.exports = mongoose.model('order', orderSchema);