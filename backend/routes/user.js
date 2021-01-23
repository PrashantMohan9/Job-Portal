const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require("../models/user");

router.post("/signup", (req,res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user= new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                type: req.body.type
        });
        //console.log(user);
        user.save()
          .then(result => {
              res.status(201).json({
                  message: 'User Created',
                  result: result
              });
          })
          .catch(err => {
              res.status(500).json({
                  error:err
              });
          });
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    message: "Auth Failed"
                });
            }
            //If Email Exist then compare password
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message:"Auth Failed"
                });
            }
            //If Password is verified create token and return
            const token = jwt.sign(
                { email: fetchedUser.email, userId:fetchedUser._id, type: fetchedUser.type}, 
                "longer_secret_key",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                name: fetchedUser.name,
                type: fetchedUser.type,
                email: fetchedUser.email,
                _id: fetchedUser._id 
            });
        })
        .catch(err => {
                return res.status(401).json({
                message: "Auth Failed"
            });
        });
});


module.exports = router;