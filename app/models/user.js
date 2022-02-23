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
        type: Date,
        required: true,
        default: Date.now
    },
    join_date: {
        type: String,
        required: true,
    },
    cart: [product]
})

module.exports = mongoose.model('Product', productSchema)