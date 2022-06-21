const mongoose = require('mongoose');

// User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }  
},
{timestamps: true }
);

module.exports = mongoose.model('Users', userSchema)