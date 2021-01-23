const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require("../models/user");
const Job = require("../models/job");
const checkAuth = require("../middleware/chek-auth");

router.post('', checkAuth, (req,res,next) => {
    const job = new Job({
        title: req.body.title,
        description: req.body.description
    });
    job.save()
    .then(result => {
        return User.findOneAndUpdate({ email: req.body.email }, {$push:{job: result._id}} ,{new: true});
    })
    .then(updatedUser => {
        res.status(201).json({
            message: 'Job Posted Successfully',
            result: updatedUser
        });
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
});

//Returns job posted by particular recruiter
router.get('/recruiter', checkAuth, (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "longer_secret_key");
    const userid = decode.userId;

    User.findOne({ _id: userid })
    .populate("job").select('job')
    .then(results => {
        res.status(200).json(results);
    })
    .catch(function(err) {
        res.status(500).json({
            error:err
        });
    });
});

//List of users who have applied to particular job
router.post('/getcandidates', checkAuth, (req,res,next) => {
    const jobId = req.body.jobId;

    Job.findOne({ _id:jobId })
        .populate("user", { _id: 1, name: 1 }).select('user')
        .then(result => {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).json({
                error:err
            });
        });
});

//Return All Jobs Posted
router.get('', checkAuth,(req,res,next) => {
    Job.find()
    .then(results => {
        res.status(200).json(results);
    })
    .catch(function(err) {
        res.status(500).json({
            error:err
        });
    });
});

//Return Jobs Applied by a Particular User
router.get('/candidate', checkAuth,(req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "longer_secret_key");
    const userid = decode.userId;
    User.findOne({ _id:userid }).populate("job", { title: 1, description: 1}).select('job')
    .then(results => {
        res.status(200).json(results);
    })
    .catch(function(err) {
        res.status(500).json({
            error:err
        });
    });
});

//Apply To Particular Job Id
router.post('/applyjob', checkAuth,(req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, "longer_secret_key");
    const userid = decode.userId;

    User.findOneAndUpdate({ _id:userid }, {$push:{job: req.body.jobId}}, {new: true})  //Push Job Id to User Schema
        .then(Result_updatedJob => {
            const updatedJob = Result_updatedJob;

            Job.findOneAndUpdate({ _id: req.body.jobId }, {$push:{user: userid}}, {new: true})  //Push User Id to Job schema
                .then(result => {
                        res.status(200).json({
                        message: 'Applied Successfully'
                    })
                })
                .catch(err => {
                    res.status(500).json({
                    error:err
                    });
                })
        })
        .catch(err => {
                res.status(500).json({
                error:err
            });
        });  
});


module.exports = router;


// User.findOneAndUpdate({ _id:userid }, {$push:{job: req.body.jobId}}, {new: true})  //Push Job Id to User Schema
//         .then(Result_updatedJob => {
//             const updatedJob = Result_updatedJob;

//             Job.findOneAndUpdate({ _id: req.body.jobId }, {$push:{user: userid}}, {new: true})  //Push User Id to Job schema
//                 .then(result => {
//                     User.findOne({ _id: updatedJob._id })        //Return Updated List of Jobs Applied by that user
//                     .populate("job").select('job')
//                     .then(results => {
//                         res.status(200).json(results);
//                     })
//                     .catch(err => {
//                         res.status(500).json({
//                         error:err
//                         });
//                     })
//                 })
//                 .catch(err => {
//                     res.status(500).json({
//                     error:err
//                     });
//                 })
//         })
//         .catch(err => {
//                 res.status(500).json({
//                 error:err
//             });
//         });  
// });

