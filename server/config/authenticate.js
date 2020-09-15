const jwt = require('jsonwebtoken');
const config = require('./config');

exports.authenticateAdmin = (req, res, next) => {
    let myHeader = req.headers['authorization'];
    if (!myHeader) {
        res.status(400).send({message: 'not authorized'});
    } else {
        token = myHeader.split(' ')[1];
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(400).send({message: 'not authenticated'});
            } else {
                if (decoded && decoded.role === 'admin') {
                    next();
                } else {
                    res.status(400).send({message: 'Not authorized to perform this task'});
                }
            }
        })
    }
}

exports.authenticateUser = (req, res, next) => {
    let token = req.headers['authorization'];
    
    if (!token) {
        res.status(400).send({message: 'not authorized'});
    } else {
        token = token.split(' ')[1];
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(400).send({message: 'not authenticated'});
            } else {
                if (decoded && decoded.role === 'user') {
                    next();
                } else {
                    res.status(400).send({message: 'Not authorized to perform this task'});
                }
            }
        })
    }
}

exports.authenticateAny = (req, res, next) => {
    let token = req.headers['authorization'];
    
    if (!token) {
        res.status(400).send({message: 'not authorized'});
    } else {
        token = token.split(' ')[1];
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.status(400).send({message: 'not authenticated'});
            } else {
                if (decoded && (decoded.role === 'user' || decoded.role === 'admin')) {
                    next();
                } else {
                    res.status(400).send({message: 'Not authorized to perform this task'});
                }
            }
        })
    }
}