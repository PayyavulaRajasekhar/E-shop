const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');
const config = require('../config/config');
const salt = bcrypt.genSaltSync(10);

exports.registerUser = (req, res) => {
    userSchema.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                new userSchema({
                    email: req.body.email,
                    password: hash,
                    fullName: req.body.fullName,
                    role: req.body.role
                }).save().then(data => {
                    res.status(201).json({ message: 'user registered successfully' });
                }).catch(error => {
                    res.json({ message: 'Failed to create user', error: error });
                });
            });
        } else {
            console.log('user exists', user);
            res.json({ message: 'Email already exists', error: true });
        }
    });
}

exports.login = (req, res) => {
    userSchema.findOne({ email: req.body.email }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, success) => {
                if (success) {
                    payload = {
                        email: user.email,
                        role: user.role,
                        fullName: user.fullName
                    }
                    jwt.sign(payload, config.secret, { expiresIn: 60 * 60 }, (err, token) => {
                        res.status(200).json({ 
                            token: token, 
                            email: user.email, 
                            role: user.role, 
                            fullName: user.fullName , 
                            userId: user._id,
                            error: false
                        });
                    });
                } else {
                    res.json({ error: true, message: 'Incorrect password' });
                }
            });
        } else {
            res.json({ message: 'No user Found', error: true });
        }
    });
}