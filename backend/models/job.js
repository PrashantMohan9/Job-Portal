const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: { 
        type: String, 
        required:true
    },
    description: { 
        type: String, 
        required:true 
    },
    user: [{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
});

module.exports = mongoose.model('Job',jobSchema);