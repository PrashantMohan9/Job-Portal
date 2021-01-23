const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job")

const app  = express();

mongoose.connect("Your MongoDB Database Connection Sring",
    { useNewUrlParser: true }, { useUnifiedTopology: true }, {useFindAndModify: false} )
    .then(()=>{
        console.log("Connected to Database");
    })
    .catch(()=>{
        console.log("Connection Failed");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});

app.use("/api/user", userRoutes);
app.use("/api/job", jobRoutes);

module.exports = app;