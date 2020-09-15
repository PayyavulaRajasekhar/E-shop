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

module.exports = mongoose.model('cart', cartSchema);