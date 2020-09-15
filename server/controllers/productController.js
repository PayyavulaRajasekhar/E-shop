const Product = require('../models/product');

exports.postProduct = (req, res) => {
    new Product(req.body).save().then(mongoRes => {
        res.json({
            error: false,
            message: 'Product added successfully',
            product: mongoRes
        });
    }).catch(err => {
        res.json({
            error: true,
            message: 'Failed to add product',
            errorData: err
        });
    });
}

exports.getProducts = (req, res) => {
    Product.find((err, responseData) => {
        if (err) {
            res.json({
                error: true,
                message: 'failed to fetch',
                errorData: err
            });
        } else {
            res.json({
                error: false,
                message: 'success',
                products: responseData
            });
        }
    });
}

exports.getProduct = (req, res) => {
    Product.findOne({ _id: req.params.id }, (err, responseData) => {
        if (err) {
            res.json({
                error: true,
                message: 'failed to fetch',
                errorData: err
            });
        } else {
            res.json({
                error: false,
                message: 'success',
                product: responseData
            });
        }
    });
}

exports.searchProduct = (req, res) => {
    Product.find({ $text: { $search: req.body.search } }).then(docs => {
        res.status(200).json({error: false, products: docs});
    }).catch(err => {
        res.status(200).json({error: true, errorData: err});
    })
}

exports.updateProduct = (req, res) => {
    Product.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.json({
                error: true,
                message: 'Failed to update product',
                errorData: err
            });
        } else {
            data.productName = req.body.productName;
            data.productPrice = req.body.productPrice;
            data.productImageURL = req.body.productImageURL;
            data.productDescription = req.body.productDescription;
            data.save().then(response => {
                res.json({
                    error: false,
                    message: 'Product updated successfully',
                    response: response
                });
            }).catch(error => {
                res.json({
                    error: true,
                    message: 'Failed to update product',
                    errorData: error
                });
            });
        }
    });
}

exports.deleteProduct = (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id }, (err, document) => {
        if (err) {
            res.json({
                error: true,
                message: 'Failed to delete product',
                errorData: error
            });
        } else {
            res.json({
                error: false,
                message: 'Product deleted successfully',
                product: document
            });
        }
    });
}

