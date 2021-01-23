const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required:true, unique:true
    },
    password: { 
        type: String, 
        required:true 
    },
    name: { 
        type: String, 
        required:true 
    },
    type: { 
        type: String, 
        required:true 
    },
    job: [{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: "Job"
    }]
});

//To throw error if already exist email signup
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);