const mongoose = require('mongoose');

const ROLE = {
    ADMIN: 'admin',
    USER: 'user'
}


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

});

const User = mongoose.model('User', userSchema)

module.exports = User, ROLE;