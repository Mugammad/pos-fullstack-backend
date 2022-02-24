const mongoose = require('mongoose')
const product = require('./product')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    join_date: {
        type: Date,
        required: true,
        default: Date.now
    },
    cart: {
        type: Array,
        required: false,
        default: []
    }
})

module.exports = mongoose.model('User', userSchema)