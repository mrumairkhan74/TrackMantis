const connection = require("../db/connection");
const mongoose = require('mongoose')


const Userchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        url: String,
        public_id: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'tester', 'developer'],
        default: 'user'
    },
    Bugs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bug',
    },
    ]
}, { timestamps: true })


const User = mongoose.model('User', Userchema)

module.exports = User