const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productImageURL: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('product', productSchema);