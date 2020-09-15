const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

mongoose.connect("mongodb+srv://rajasekhar:raja2129@e-shop.v7kvi.mongodb.net/e-shop?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('mongodb connected successfully');
    }
});

//routes
const product = require('./routes/products');
const user = require('./routes/users');
const cart = require('./routes/cart');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cors());

//using routes
app.use('/api/products', product);
app.use('/api/users', user );
app.use('/api/cart', cart );

app.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`app is running on port ${port}`);
    }
});

